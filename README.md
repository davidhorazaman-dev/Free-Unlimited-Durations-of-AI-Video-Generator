# Longest Form AI Explainer Video Generator

Mega Complete / Full Version — web studio, provider-neutral backend architecture and cross-platform application packaging.

## Official URLs
- Production Website: https://longestformaiexplainervideogenerator.ai/
- GitHub Pages: https://davidhorazaman-dev.github.io/Free-Unlimited-Durations-of-AI-Video-Generator/
- API Console: https://longestformaiexplainervideogenerator.ai/api/v1/

## Rebuilt architecture
1. Static Web Studio — GitHub Pages/custom domain.
2. Production API — separate HTTPS Node.js service at /api/v1.
3. Provider adapters — text-to-video, image-to-video, photo-to-video, video-to-video and all-in-one.
4. Unbounded timeline — scenes/jobs can be appended without an application-level total-duration ceiling.
5. Desktop distribution — Windows, macOS and Linux packages built by GitHub Actions.

## Error corrections
- GitHub Pages is never used as the JSON backend.
- The website no longer assumes /api/v1 on the Pages origin is a live API.
- Non-JSON API responses are detected and explained.
- Production API URLs are configurable without exposing credentials.
- Canonical custom-domain and GitHub.io URLs are declared in site-config.json.
- 404.html redirects to the canonical website.
- CI validates URLs, JSON, backend syntax, Python syntax and static-site smoke tests.
- Nginx proxies /api/ to backend port 8787.

## Distribution
Windows x64: EXE/ZIP/Complete Installer
macOS x64 + arm64: APP/ZIP/TAR.GZ
Linux x64 + arm64: executable bundle/ZIP/TAR.GZ
Source: ZIP/TAR.GZ

“Infinite duration” is an unbounded chunked timeline, not a physically infinite render request. Real providers and infrastructure still impose finite resource limits.
