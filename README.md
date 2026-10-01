# Longest Form AI Video Generator

Version 2.0.0 GitHub-hosted web UI with **60 AI features per page**.

## Rebuilt studio
The main page includes AI Explainer Video, Image-to-Video, Text-to-Video, Video-to-Video, Featurettes, video/image/audio workflows, an All-in-One Sound Toggle, 360p/480p/720p/1080p/2160p selections, storyboards, scenes, characters, B-roll, VFX, subtitles, dubbing, upscaling, frame interpolation, restoration, timeline assembly, batch generation and project export.

## API / Fetch repair
The browser adapter no longer treats a GitHub Pages HTML response as a successful API response. A health request must return JSON; otherwise the UI reports that the API is unavailable.

The production API base is configurable with `?api=https://your-api.example/api/v1`. The default remains the canonical production API origin.

## GitHub Pages limitation
GitHub Pages is static hosting. It can host the frontend and the `/api/v1/` documentation UI, but it cannot run private AI rendering workers, FFmpeg, databases, queues or provider adapters.

The repository **does not contain real provider API keys** and the frontend must never contain them. Real keys belong in server-side environment variables/secrets on the actual API backend. The API backend must allow CORS from the GitHub Pages/custom-domain origin.

## API contract
See `api-contract.json` for the v2 contract and security boundary.

Supported paths:
- GET `/api/v1/health`
- POST `/api/v1/projects`
- POST `/api/v1/projects/{projectId}/agent`
- GET `/api/v1/jobs/{jobId}`
- POST `/api/v1/jobs/{jobId}/cancel`
- GET `/api/v1/projects/{projectId}/output`

## Unlimited duration model
“Unlimited” means the project/timeline is modeled as a sequence of scenes and jobs rather than one unbounded provider request. Actual provider, account, compute, storage, network and encoding limits still apply.

MIT License.
