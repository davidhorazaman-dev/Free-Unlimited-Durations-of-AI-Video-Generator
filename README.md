# Longest Form AI Video Generator

**Mega Complete / Full Version architecture — v3.0.0**

A provider-neutral long-form AI video studio supporting AI Text-to-Video, Image-to-Video, Photo-to-Video, Video-to-Video and All-in-One orchestration.

## Frontend

The GitHub Pages UI includes the existing 60-feature studio, 360p/480p/720p/1080p/2160p output choices, scene planning, audio controls, subtitles, dubbing, B-roll, VFX, restoration, timeline assembly, batch generation and project export.

## Backend

A new backend runtime provides:

- Provider registry and capability discovery
- Project creation
- Long-form scene orchestration
- Retryable job architecture
- Job progress and cancellation
- Provider-neutral generation contracts
- Output/project job inspection
- Docker deployment

Run locally:

    cd backend
    cp .env.example .env
    npm start

The API base is /api/v1.

## Infinite Duration / Infinite Hours

The product uses unbounded project duration. It does not submit one literally infinite API request. Instead, a project is an ordered timeline of independent scenes and jobs, allowing hours or longer projects to continue until available compute, storage, provider quota, bandwidth and encoding resources are exhausted.

See docs/INFINITE-DURATION.md and docs/MEGA-COMPLETE-ARCHITECTURE.md.

## Provider support

The frontend is provider-neutral. New AI video generators are integrated through adapters implementing the contract in docs/PROVIDER-ADAPTER-SPEC.md.

The repository intentionally includes only a mock provider by default. Real provider credentials belong in server-side environment variables and real adapters must use each provider's official API and current terms.

## GitHub Pages limitation

GitHub Pages is static hosting. It cannot execute the private rendering backend, FFmpeg workers, queues or provider credentials. Configure the frontend with ?api=https://YOUR-API-HOST/api/v1.

## Security

Never put AI provider keys in browser JavaScript, GitHub Pages, repository source, or public configuration.

MIT License.
