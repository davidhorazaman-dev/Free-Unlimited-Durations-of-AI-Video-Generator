# Longest Form AI Video Generator — Backend

Server-side runtime for the static GitHub Pages frontend.

Supports text-to-video, image-to-video, photo-to-video, video-to-video, script/storyboard orchestration, provider adapters, scene jobs, retries, and timeline assembly.

## Unbounded duration

The project has no application-level duration ceiling. The orchestrator creates independent scene jobs instead of sending one enormous request to a provider:

Project -> Scenes -> Provider Jobs -> Assets -> Timeline -> Finalization

Actual provider quotas, clip limits, compute, storage, network and encoding limits still apply.

The included mock provider is for API development. Production adapters must use each provider's official API and current terms.

## Run

    cp .env.example .env
    npm start

API: http://localhost:8787/api/v1

Never place provider secrets in browser code or GitHub Pages.