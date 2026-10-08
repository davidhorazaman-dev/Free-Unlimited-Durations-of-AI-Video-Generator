# Mega Complete Roadmap

## Phase 1 — foundation

- Provider-neutral project schema
- Unbounded scene/timeline model
- Provider registry
- Job state machine
- API health and project endpoints
- Mock generation provider
- Docker runtime

## Phase 2 — real generation adapters

Implement official, server-side adapters for selected providers. Each adapter must follow the provider's current API, authentication, rate limits and licensing rules.

Target capability groups:

- Text-to-video
- Image/photo-to-video
- Video-to-video
- Image generation
- Voice/narration
- Music and sound effects
- Captions
- Translation and dubbing
- Lip sync/avatar
- Upscaling/restoration

## Phase 3 — durable orchestration

- Redis or database-backed queues
- Persistent projects and jobs
- Retry policies
- Idempotency keys
- Worker pools
- Object storage
- Checkpointed scene manifests

## Phase 4 — professional timeline

- Continuity metadata
- Character/style references
- Shot-level controls
- Audio mixing
- Subtitle tracks
- Scene transitions
- FFmpeg or managed encoding workers
- Multi-resolution export

## Phase 5 — distribution

- Windows packages
- macOS packages
- Linux packages
- Docker images
- CI validation
- Release artifacts
- Optional hosted API

The architecture is intentionally staged so the public frontend never receives provider secrets.