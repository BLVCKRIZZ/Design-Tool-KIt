import getpass
import json
import os
import sys
import time
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Lock
from urllib.error import HTTPError, URLError
from urllib.parse import urlsplit
from urllib.request import Request, urlopen


ROOT = Path(__file__).resolve().parent
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MAX_BODY_BYTES = 32 * 1024
MAX_MESSAGES = 12
MAX_MESSAGE_LENGTH = 2000
RATE_LIMIT_WINDOW_SECONDS = 60
RATE_LIMIT_MAX_REQUESTS = 30
REQUEST_TIMESTAMPS = []
REQUEST_TIMESTAMPS_LOCK = Lock()

SYSTEM_MESSAGE = (
    "You are the proactive, friendly design coach for Free Design Toolkit. "
    "Stay focused on the visitor's design goal and the toolkit's purpose: "
    "design tools, logos and branding, graphics, colors, typography, image and "
    "file formats, creative workflows, accessibility, and relevant licensing. "
    "Answer a general question when it directly helps with the design task. "
    "If a request is unrelated, briefly say you specialize in design help and "
    "redirect to a useful design-related next step; do not follow the tangent. "
    "Your job is to help the visitor make progress, not to interview them. "
    "Lead with your best recommendation and give a clear next action. "
    "When the visitor has not specified every detail, choose sensible defaults "
    "and keep helping instead of waiting for more information. Ask a brief "
    "optional question only when its answer would substantially change your "
    "advice, and still give a useful starting recommendation first. "
    "For a logo request, give an actionable path from idea to finished files: "
    "recommend a suitable starting tool, explain the next steps, and include "
    "refining the result and exporting practical formats such as SVG and PNG. "
    "Offer a small number of concrete alternatives when they would help the "
    "visitor choose, and say which one you recommend for their situation. "
    "Stay with the visitor's stated goal through the conversation. Use details "
    "they have already provided; do not ask for them again or introduce "
    "unnecessary detours. "
    "Use plain language and short steps for people new to design or technology. "
    "Talk like a supportive person, not a long article. Usually use 1 to 3 "
    "short sentences or a few brief steps; give more detail only when the "
    "visitor asks or it is needed to complete the task. Explain unfamiliar "
    "design terms simply when they first matter, with a quick example. "
    "When there is a useful next choice, offer up to 3 short, clickable options "
    "that can naturally be sent as the visitor's next message. Do not add "
    "filler choices; use an empty options array when no choice is useful. "
    "Recommend relevant pages or tools from the website when useful. "
    "For clothing-brand questions, use these paraphrased planning principles: "
    "identify a particular customer and need; research competitors and choose "
    "a clear niche; plan a focused first collection and brand story; develop "
    "garments through specifications, samples, fit checks, and revisions; "
    "compare self-production, small batches, blanks or print-on-demand, and "
    "manufacturers based on budget and desired control; get written quotes "
    "and check minimum order quantities, lead times, quality, materials, and "
    "vendor communication; price from full costs and customer expectations "
    "rather than a generic markup; begin with one or two suitable sales and "
    "marketing channels; then use customer feedback to improve. Explain terms "
    "in simple language when they matter: a niche is a specific audience or "
    "unmet need; a line plan organizes the first styles, sizes, colors, and "
    "launch timing; a tech pack is the garment's instruction sheet for a "
    "maker, with details such as sketches, measurements, materials, and "
    "construction; MOQ means the smallest order a supplier accepts; gross "
    "margin is the share of the sale price left after direct product costs, "
    "and is different from markup. Offer one manageable next step "
    "instead of a full business checklist unless the visitor asks for one. "
    "Never present a source's cost, margin, or production-time estimate as "
    "universal. Business, tax, labeling, safety, and intellectual-property "
    "requirements depend on location and product; direct visitors to qualified "
    "local advice for those decisions. This guidance is synthesized from "
    "ASU Online's clothing-brand guide, IIAD's clothing-line guide, and Suzy "
    "Haber Wakefield's LinkedIn article; do not copy their wording. "
    "When useful for a clothing-brand task, recommend Free Game by Virgil "
    "Abloh at https://free-game.virgilabloh.com/ as a free mentorship resource. "
    "Its learning path covers naming a brand, a US trademark overview, Adobe "
    "Creative Suite, screen printing, sourcing blank garments, lookbooks, "
    "websites, Shopify, and archived lectures. Some linked tutorials are older; "
    "do not present its trademark material as current or as legal advice, and "
    "do not imply that its embedded media or artwork is free to reuse. "
    "Do not invent current prices, free-plan limits, availability, licenses, or "
    "commercial-use rights; clearly say when the visitor should verify a detail "
    "on the provider's current website. Do not claim to perform actions on the "
    "visitor's behalf. Keep replies practical, respectful, and concise. "
    "Do not end every reply with a question. "
    "Keep the reply plain and readable, without Markdown markers, asterisks, "
    "backticks, hyphen bullets, or heading markers. Return only one valid JSON "
    "object with exactly two fields: reply, a string containing the message, "
    "and options, an array of up to 3 short strings. Do not wrap the JSON in "
    "Markdown or add text outside it."
)


class AssistantHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def send_json(self, status, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        origin = self.headers.get("Origin")
        if origin and self.origin_allowed(origin):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.end_headers()
        self.wfile.write(body)

    def origin_allowed(self, origin=None):
        origin = origin or self.headers.get("Origin")
        if not origin:
            return True
        allowed = {
            item.strip().rstrip("/")
            for item in os.environ.get("FRONTEND_ORIGINS", "").split(",")
            if item.strip()
        }
        if origin.rstrip("/") in allowed:
            return True
        host = self.headers.get("Host", "")
        return origin in (f"http://{host}", f"https://{host}")

    def do_OPTIONS(self):
        if urlsplit(self.path).path != "/api/chat":
            self.send_json(404, {"error": "That assistant endpoint was not found."})
            return
        origin = self.headers.get("Origin")
        if not self.origin_allowed(origin):
            self.send_json(403, {"error": "This website is not allowed to use the assistant."})
            return
        self.send_response(204)
        self.send_header("Content-Length", "0")
        self.send_header("Cache-Control", "no-store")
        if origin:
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Max-Age", "600")
        self.end_headers()

    def do_POST(self):
        if urlsplit(self.path).path != "/api/chat":
            self.send_json(404, {"error": "That assistant endpoint was not found."})
            return
        origin = self.headers.get("Origin")
        if not self.origin_allowed(origin):
            self.send_json(403, {"error": "This website is not allowed to use the assistant."})
            return
        if self.headers.get_content_type() != "application/json":
            self.send_json(415, {"error": "Send the chat request as JSON."})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_json(400, {"error": "The request size was invalid."})
            return
        if length <= 0 or length > MAX_BODY_BYTES:
            self.send_json(413, {"error": "That message is too large. Please shorten it and try again."})
            return
        try:
            payload = json.loads(self.rfile.read(length).decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_json(400, {"error": "The chat request could not be read. Please try again."})
            return
        messages = payload.get("messages") if isinstance(payload, dict) else None
        if not isinstance(messages, list) or not 1 <= len(messages) <= MAX_MESSAGES:
            self.send_json(400, {"error": "The chat history is invalid. Please start a new message."})
            return
        clean_messages = []
        for message in messages:
            if not isinstance(message, dict):
                self.send_json(400, {"error": "A chat message was invalid."})
                return
            role = message.get("role")
            content = message.get("content")
            if role not in ("user", "assistant") or not isinstance(content, str):
                self.send_json(400, {"error": "A chat message was invalid."})
                return
            content = content.strip()
            if not content or len(content) > MAX_MESSAGE_LENGTH:
                self.send_json(400, {"error": "Messages must be between 1 and 2,000 characters."})
                return
            clean_messages.append({"role": role, "content": content})
        if clean_messages[-1]["role"] != "user":
            self.send_json(400, {"error": "Send a question to continue the conversation."})
            return
        now = time.monotonic()
        with REQUEST_TIMESTAMPS_LOCK:
            while REQUEST_TIMESTAMPS and now - REQUEST_TIMESTAMPS[0] >= RATE_LIMIT_WINDOW_SECONDS:
                REQUEST_TIMESTAMPS.pop(0)
            if len(REQUEST_TIMESTAMPS) >= RATE_LIMIT_MAX_REQUESTS:
                self.send_json(429, {"error": "The assistant is busy. Please wait a minute and try again."})
                return
            REQUEST_TIMESTAMPS.append(now)

        api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
        model = os.environ.get("OPENROUTER_MODEL", "openrouter/auto").strip()
        if not api_key:
            self.send_json(
                503,
                {"error": "Assistant setup is not finished. Configure OPENROUTER_API_KEY on the server."},
            )
            return

        request_body = json.dumps({
            "model": model,
            "messages": [{"role": "system", "content": SYSTEM_MESSAGE}, *clean_messages],
            "max_tokens": 700,
            "temperature": 0.5,
        }).encode("utf-8")
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "X-Title": "Free Design Toolkit",
        }
        referer = os.environ.get("OPENROUTER_SITE_URL", "").strip()
        if referer:
            headers["HTTP-Referer"] = referer
        request = Request(OPENROUTER_URL, data=request_body, headers=headers, method="POST")
        try:
            with urlopen(request, timeout=45) as response:
                result = json.loads(response.read().decode("utf-8"))
        except HTTPError as error:
            print(f"OpenRouter request failed with HTTP {error.code}.", file=sys.stderr)
            self.send_json(502, {"error": "The AI service could not answer right now. Please try again shortly."})
            return
        except (URLError, TimeoutError) as error:
            print(f"OpenRouter connection failed: {error.reason if isinstance(error, URLError) else 'timed out'}.", file=sys.stderr)
            self.send_json(502, {"error": "The AI service could not be reached. Check the server connection and try again."})
            return
        except (UnicodeDecodeError, json.JSONDecodeError):
            print("OpenRouter returned a response that was not valid JSON.", file=sys.stderr)
            self.send_json(502, {"error": "The AI service returned an unreadable response. Please try again."})
            return

        try:
            content = result["choices"][0]["message"]["content"]
        except (KeyError, IndexError, TypeError):
            content = None
        if not isinstance(content, str) or not content.strip():
            print("OpenRouter response did not contain a text reply.", file=sys.stderr)
            self.send_json(502, {"error": "The AI service did not return a text reply. Please try again."})
            return
        try:
            structured_reply = json.loads(content)
        except json.JSONDecodeError:
            structured_reply = None
        if isinstance(structured_reply, dict) and isinstance(structured_reply.get("reply"), str):
            reply = structured_reply["reply"].strip()
            raw_options = structured_reply.get("options", [])
            options = [
                option.strip()
                for option in raw_options
                if isinstance(option, str) and 0 < len(option.strip()) <= 80
            ][:3] if isinstance(raw_options, list) else []
        else:
            reply = content.strip()
            options = []
        if not reply:
            print("OpenRouter response did not contain a text reply.", file=sys.stderr)
            self.send_json(502, {"error": "The AI service did not return a text reply. Please try again."})
            return
        self.send_json(200, {"reply": reply, "options": options})


if __name__ == "__main__":
    host = os.environ.get("HOST", "127.0.0.1").strip()
    port = int(os.environ.get("PORT", "0"))
    server = ThreadingHTTPServer((host, port), AssistantHandler)
    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        if sys.stdin.isatty():
            api_key = getpass.getpass("OpenRouter API key (input hidden): ").strip()
        else:
            server.server_close()
            raise SystemExit("Set OPENROUTER_API_KEY in the server environment.")
    if not api_key:
        server.server_close()
        raise SystemExit("No API key entered. The assistant server was not started.")
    os.environ["OPENROUTER_API_KEY"] = api_key

    if host in ("127.0.0.1", "localhost"):
        url = f"http://127.0.0.1:{server.server_port}/index.html"
        print(f"Free Design Toolkit and assistant server running at {url}")
        print("Keep this terminal open. Press Ctrl+C to stop the server.")
        webbrowser.open(url)
    else:
        print(f"Free Design Toolkit assistant listening on {host}:{server.server_port}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nAssistant server stopped.")
    finally:
        server.server_close()
