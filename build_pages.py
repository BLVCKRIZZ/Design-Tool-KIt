import html
import json
import os
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent
SOURCE = ROOT / "site-source.html"
ASSETS = ROOT / "assets"

PAGES = [
    ("home", "index.html", "Home", "Free design tools, creative workflows, and practical resources for designers.", "home"),
    ("tools", "tools.html", "Tools directory", "Browse free and freemium design tools by category, save favorites, and compare options.", "tools"),
    ("ai", "ai-generators.html", "AI generators", "Compare AI image and design tools, free limits, strengths, and commercial-use caveats.", "ai"),
    ("formats", "file-formats.html", "File formats", "A practical guide to choosing SVG, PNG, JPG, WebP, PDF, video, and more.", "formats"),
    ("learn", "learn.html", "Learn design", "Short design guides and a searchable glossary for creative fundamentals.", "learn"),
    ("workflows", "workflows.html", "Workflows", "Step-by-step design workflows using free and freemium creative tools.", "workflows"),
    ("prompts", "prompt-library.html", "Prompt library", "Copyable AI prompts for logos, posters, product concepts, icons, and patterns.", "prompts"),
    ("inspiration", "inspiration.html", "Inspiration", "Moodboard ideas, typography, color palettes, and design culture references.", "inspiration"),
    ("resources", "resources.html", "Resources", "Free fonts, stock images, mockups, icon packs, textures, and palette resources.", "resources"),
    ("lab", "design-tools-lab.html", "Design tools lab", "Browser-based color, contrast, image, QR, and aspect-ratio utilities.", "lab"),
    ("downloads", "downloads.html", "Downloads", "Free printable design cheat sheets. No email signup required.", "downloads"),
    ("alternatives", "alternatives.html", "Free alternatives", "Explore alternatives to paid creative software, with tradeoffs and verification notes.", "alternatives"),
    ("about", "about.html", "About and contact", "About Free Design Toolkit, suggest a tool, and see community and contact placeholders.", "about"),
]

NAV_ITEMS = [
    ("home", "Home"), ("tools", "Tools"), ("learn", "Learn"), ("lab", "Tools Lab"),
    ("alternatives", "Alternatives"),
]
MORE_NAV_ITEMS = [
    ("ai", "AI generators"), ("formats", "File formats"), ("workflows", "Workflows"),
    ("prompts", "Prompts"), ("inspiration", "Inspiration"), ("resources", "Resources"),
    ("downloads", "Downloads"), ("about", "About / Contact"),
]

VARIABLES = {
    "tools": ["tools"],
    "ai": ["aiTools"],
    "formats": ["formats", "formatRecs"],
    "learn": ["learnItems", "glossaryItems"],
    "workflows": ["workflows"],
    "prompts": ["prompts"],
    "resources": ["resources"],
    "alternatives": ["alternatives"],
    "downloads": ["sheets"],
}

ALT_SLUGS = {
    "Photoshop": "photoshop",
    "Illustrator": "illustrator",
    "Figma paid tiers": "figma-paid-tiers",
    "InDesign": "indesign",
    "Lightroom": "lightroom",
    "Premiere Pro": "premiere-pro",
    "After Effects": "after-effects",
    "Canva Pro": "canva-pro",
}


def extract(pattern, text, label):
    match = re.search(pattern, text, re.S)
    if not match:
        raise ValueError(f"Could not find {label} in {SOURCE.name}")
    return match.group(1)


def plain_text(markup):
    markup = re.sub(r"<script\b[^>]*>.*?</script>", " ", markup, flags=re.S | re.I)
    markup = re.sub(r"<style\b[^>]*>.*?</style>", " ", markup, flags=re.S | re.I)
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", " ", markup))).strip()


def slug(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def section_map(source):
    sections = re.findall(r"<section\b[^>]*>.*?</section>", source, re.S | re.I)
    if len(sections) != 16:
        raise ValueError(f"Expected 16 toolkit sections; found {len(sections)}.")
    mapping = {"home": sections[:4]}
    for section in sections[4:]:
        match = re.search(r'\bid="([^"]+)"', section)
        if not match:
            raise ValueError("A non-home section is missing its route id.")
        mapping[match.group(1)] = [section]
    return mapping


def make_index(sections, variable_sources):
    index = []
    for key, filename, title, description, _ in PAGES:
        extra = " ".join(variable_sources.get(name, "") for name in VARIABLES.get(key, []))
        index.append({
            "title": title,
            "url": filename,
            "description": description,
            "search": f"{plain_text(' '.join(sections[key]))} {extra}",
        })

    tools_source = variable_sources.get("tools", "")
    for line in tools_source.splitlines():
        match = re.search(r'\{name:"([^"]+)",category:"([^"]+)",description:"([^"]+)"', line)
        if not match:
            continue
        name, category, description = match.groups()
        index.append({
            "title": name,
            "url": f"tools.html#tool-{slug(name)}",
            "description": f"{category} · {description}",
            "search": line,
        })

    for paid_tool, route in ALT_SLUGS.items():
        index.append({
            "title": f"Alternatives to {paid_tool}",
            "url": f"alternatives/{route}.html",
            "description": f"Free options and tradeoffs for {paid_tool}.",
            "search": f"{paid_tool} alternatives free options paid software",
        })
    return index


def build():
    source = SOURCE.read_text(encoding="utf-8")
    css = extract(r"<style>(.*?)</style>", source, "stylesheet")
    script = extract(r"<script>\s*(.*?)\s*</script>", source, "application script")
    sections = section_map(source)
    script_variables = {}
    for name in {name for names in VARIABLES.values() for name in names}:
        pattern = rf"(const\s+{re.escape(name)}\s*=\s*.*?;\n)"
        script_variables[name] = extract(pattern, script, f"{name} data").strip()
    search_index = make_index(sections, script_variables)
    footer = extract(r"(<footer\b.*?</footer>)", source, "footer")

    css += """
    .search-shell { position: relative; flex: 0 1 270px; }
    .search-shell .header-search { width: 100%; }
    .search-results {
      position: absolute;
      z-index: 30;
      top: calc(100% + .4rem);
      right: 0;
      width: min(520px, calc(100vw - 2rem));
      max-height: min(65vh, 480px);
      overflow-y: auto;
      border: 2px solid var(--line);
      background: var(--surface);
      box-shadow: var(--shadow);
    }
    .search-result { display: grid; gap: .15rem; padding: .7rem .85rem; border-bottom: 1px solid color-mix(in srgb, var(--line) 30%, transparent); text-decoration: none; }
    .search-result:last-child { border-bottom: 0; }
    .search-result:hover, .search-result:focus-visible { background: var(--accent-soft); }
    .search-result span { color: var(--muted); font-size: .8rem; }
    .search-results-heading {
      margin: 0;
      padding: .55rem .85rem;
      border-bottom: 1px solid var(--line);
      color: var(--muted);
      font-size: .72rem;
      font-weight: 800;
      letter-spacing: .08em;
      text-transform: uppercase;
    }
    .search-empty { display: grid; gap: .25rem; padding: 1rem; }
    .search-empty span { color: var(--muted); font-size: .86rem; }
    .page-content > section { min-height: 65vh; border-bottom: 0; }
    .page-content > section > .section-head:first-child { padding-top: 1rem; }
    .page-content > section > .section-head:first-child h2 { font-size: clamp(2.4rem, 7vw, 6rem); }
    .footer a { text-decoration-thickness: 1px; text-underline-offset: 3px; }
    .footer a:hover { color: var(--accent); }
    .back-to-top {
      position: fixed;
      z-index: 15;
      right: 1rem;
      bottom: calc(1rem + env(safe-area-inset-bottom, 0));
      min-height: 40px;
      padding-inline: .7rem;
      box-shadow: var(--shadow);
    }
    .nav-more-button, .footer-links a {
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }
    .search-result { min-height: 44px; }
    details, .panel, .table-wrap, .compare-panel {
      border-radius: 8px;
    }
    details {
      border-width: 1px;
    }
    .format-grid details[open] {
      box-shadow: 0 8px 22px rgba(32,37,34,.08);
    }
    .main-nav a[aria-current="page"], .nav-more a[aria-current="page"] {
      color: var(--accent);
      text-decoration: underline;
      text-decoration-thickness: 3px;
      text-underline-offset: .35rem;
    }
    @media (max-width: 760px) {
      .search-shell { flex: 1 1 0; min-width: 0; }
      .header-actions { min-width: 0; }
      .simple-start-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .nav-scroll { overflow: visible; }
      .main-nav {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        width: 100%;
        min-width: 0;
        max-width: none;
        gap: 0;
        padding: .35rem 1rem .6rem;
      }
      .main-nav a {
        min-height: 44px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid color-mix(in srgb, var(--line) 22%, transparent);
      }
    }
    """
    ASSETS.mkdir(exist_ok=True)
    (ASSETS / "site.css").write_text(css, encoding="utf-8")
    (ASSETS / "site.js").write_text(script, encoding="utf-8")
    (ASSETS / "chat-config.js").write_text(
        "window.FDT_CHAT_ENDPOINT=" + json.dumps(os.environ.get("FDT_CHAT_ENDPOINT", "").strip()) + ";\n",
        encoding="utf-8",
    )
    (ASSETS / "search-index.js").write_text(
        "window.FDT_PAGE_INDEX=" + json.dumps(search_index, ensure_ascii=False) + ";\n",
        encoding="utf-8",
    )

    nav_by_key = {key: (filename, label) for key, filename, label, *_ in PAGES}
    for key, filename, title, description, _ in PAGES:
        output = render_page(
            key=key,
            filename=filename,
            title=title,
            description=description,
            content="".join(sections[key]),
            nav_by_key=nav_by_key,
            search_index=search_index,
            footer=footer,
        )
        (ROOT / filename).write_text(output, encoding="utf-8")

    for paid_tool, alternative_slug in ALT_SLUGS.items():
        detail = (
            '<section id="alternative-detail" aria-labelledby="alternative-detail-heading">'
            '<div id="alternative-detail-content"></div></section>'
        )
        output = render_page(
            key="alternatives",
            filename=f"alternatives/{alternative_slug}.html",
            title=f"Alternatives to {paid_tool}",
            description=f"Free alternatives to {paid_tool}, with best-for notes, tradeoffs, and license reminders.",
            content=detail,
            nav_by_key=nav_by_key,
            search_index=search_index,
            footer=footer,
            alternative=alternative_slug,
        )
        target = ROOT / "alternatives" / f"{alternative_slug}.html"
        target.parent.mkdir(exist_ok=True)
        target.write_text(output, encoding="utf-8")

    legacy = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=index.html"><meta name="viewport" content="width=device-width"><title>Free Design Toolkit</title><link rel="canonical" href="index.html"></head><body><p>The toolkit has moved to <a href="index.html">the multi-page home page</a>.</p></body></html>
"""
    (ROOT / "Designer Toolkit.html").write_text(legacy, encoding="utf-8")
    print(f"Built {len(PAGES)} main pages and {len(ALT_SLUGS)} alternative detail pages.")


def render_page(key, filename, title, description, content, nav_by_key, search_index, footer, alternative=None):
    in_subdirectory = "/" in filename
    prefix = "../" if in_subdirectory else ""
    nav = "".join(
        f'<a href="{prefix}{nav_by_key[page_key][0]}" data-page-link="{page_key}">{label}</a>'
        for page_key, label in NAV_ITEMS
    )
    nav += "".join(
        f'<a href="{prefix}{nav_by_key[page_key][0]}" data-page-link="{page_key}">{label}</a>'
        for page_key, label in MORE_NAV_ITEMS
    )
    content = re.sub(r'id="search-status"', 'id="hero-search-status"', content)
    content = re.sub(
        r'href="#([a-z][a-z0-9-]*)"',
        lambda match: f'href="{prefix}{nav_by_key.get(match.group(1), ("index.html",))[0]}#{match.group(1)}"',
        content,
    )
    body_alternative = f' data-alternative="{alternative}"' if alternative else ""
    escaped_title = html.escape(title)
    escaped_description = html.escape(description)
    footer = re.sub(
        r'href="#([a-z][a-z0-9-]*)"',
        lambda match: f'href="{prefix}{nav_by_key.get(match.group(1), ("index.html",))[0]}#{match.group(1)}"',
        footer,
    )
    assistant_markup = """<button class="assistant-launcher" id="assistant-launcher" type="button" aria-controls="assistant-panel" aria-expanded="false">Ask for help</button>
  <aside class="assistant-panel" id="assistant-panel" aria-label="Design assistant" hidden>
    <div class="assistant-heading">
      <div><h2 id="assistant-title">Design helper</h2><p>Friendly guidance for your next design step</p></div>
      <button class="assistant-close" id="assistant-close" type="button" aria-label="Close design assistant">Close</button>
    </div>
    <div class="assistant-messages" id="assistant-messages" role="log" aria-live="polite" aria-relevant="additions text">
      <div class="assistant-message" data-role="assistant"><p>Hi! Tell me what you’re making, and I’ll help you choose a next step, tool, color, or file type. You don’t need to know the technical terms.</p></div>
    </div>
    <div class="assistant-suggestions" id="assistant-suggestions" aria-label="Suggested questions">
      <button type="button" data-assistant-prompt="I want to make a logo. Where should I start?">Make a logo</button>
      <button type="button" data-assistant-prompt="Help me choose colors for a project.">Choose colors</button>
      <button type="button" data-assistant-prompt="Which file format should I use for my design?">Pick a file type</button>
    </div>
    <p class="assistant-status" id="assistant-status" role="status" aria-live="polite"></p>
    <form class="assistant-form" id="assistant-form">
      <label class="visually-hidden" for="assistant-input">Ask the design assistant</label>
      <textarea class="assistant-input" id="assistant-input" rows="1" maxlength="2000" placeholder="What are you trying to make?"></textarea>
      <button class="assistant-send" id="assistant-send" type="submit">Send</button>
    </form>
  </aside>"""
    return f"""<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#ad442d">
  <meta name="description" content="{escaped_description}">
  <meta property="og:title" content="{escaped_title} · Free Design Toolkit">
  <meta property="og:description" content="{escaped_description}">
  <meta property="og:type" content="website">
  <title>{escaped_title} · Free Design Toolkit</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600;6..72,700&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="{prefix}assets/site.css">
  <script>window.FDT_BASE_PATH="{prefix}";</script>
  <script src="{prefix}assets/search-index.js" defer></script>
  <script src="{prefix}assets/chat-config.js" defer></script>
  <script src="{prefix}assets/site.js" defer></script>
</head>
<body data-page="{key}"{body_alternative}>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-main">
      <a class="brand" href="{prefix}index.html" aria-label="Free Design Toolkit home">Free Design<br>Toolkit<span class="accent-text">.</span></a>
      <div class="header-actions">
        <div class="search-shell">
          <label class="visually-hidden" for="header-search">Search for a tool or topic</label>
          <input class="header-search" id="header-search" type="search" placeholder="Search tools or topics…" autocomplete="off" aria-controls="global-search-results">
          <div class="search-results" id="global-search-results" role="list" aria-label="Search results" hidden></div>
        </div>
        <button class="theme-button" id="theme-toggle" type="button" aria-label="Switch color theme" title="Toggle light and dark mode">◐</button>
      </div>
      <p class="visually-hidden" id="search-status" role="status" aria-live="polite">Search every page. Press / or Ctrl+K to jump to search.</p>
    </div>
    <div class="nav-scroll"><nav class="main-nav" aria-label="Main navigation">{nav}</nav></div>
  </header>
  <main id="main" class="page-content">
    {content}
  </main>
  <a class="button back-to-top" href="#main" aria-label="Back to top">↑ Top</a>
  {assistant_markup}
  {footer}
  <script>document.getElementById("year").textContent=new Date().getFullYear();</script>
</body>
</html>
"""


if __name__ == "__main__":
    build()
