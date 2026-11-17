# Publish the site and assistant

GitHub Pages can host the static website, but it cannot run the Python assistant. This project uses Render for the Python API and GitHub Pages for the website.

## 1. Put the project in GitHub

Push the project files, including `assistant_server.py`, `render.yaml`, `.github/workflows/pages.yml`, the generated HTML pages, and the `assets` folder, to the `blvckrizz/Design-Tool-KIt` repository. Do not add an API key to the repository.

## 2. Deploy the assistant on Render

In Render, choose **New → Blueprint** and connect the repository. Render reads `render.yaml` and asks for the API key:

- `OPENROUTER_API_KEY`: enter the key in Render's environment-variable form. Keep it secret.

The allowed site origin is set to `https://blvckrizz.github.io` in `render.yaml`.

Deploy the service. Render will provide a public service URL.

## 3. Configure GitHub Pages

In the GitHub repository, open **Settings → Pages** and select **GitHub Actions** as the publishing source. Then open **Settings → Secrets and variables → Actions → Variables** and add:

- Name: `FDT_CHAT_ENDPOINT`
- Value: `https://YOUR-SERVICE.onrender.com/api/chat`, using the URL Render assigned.

Push the project to the `main` branch or run the **Publish GitHub Pages** workflow manually. It builds the pages with the endpoint variable and publishes them. The workflow fails with a clear message if that variable is missing.

The assistant uses OpenRouter's automatic model router by default. Set an appropriate spending limit on the OpenRouter API key. The server also limits request size, response length, and request frequency. Render's free service may take longer to answer after a period without use.
