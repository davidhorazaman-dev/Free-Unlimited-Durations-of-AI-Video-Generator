# Production web deployment

Canonical public origin: https://longestformaiexplainervideogenerator.ai

The frontend is static. The private application API is expected at /api/v1 and is reverse-proxied by the production web server.

Configure DNS and HTTPS at the hosting provider. The repository does not create DNS records or certificates.

Keep API keys and provider credentials exclusively on private backend/render infrastructure. The desktop launcher opens the canonical origin directly and does not create a localhost server.
