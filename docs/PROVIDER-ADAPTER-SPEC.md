# Provider Adapter Specification

Every AI media provider adapter implements a common contract:

- id
- capabilities
- generate(input)

The neutral input can include projectId, sceneId, prompt, imageUrl, videoUrl, durationSeconds, mode and provider-specific options.

The adapter translates that neutral request into the provider's current official API.

The orchestrator owns scene sequencing, retries, progress, cancellation, continuity, timeline ordering and long-duration assembly.

This separation lets the frontend support many AI video generators without coupling the UI to one vendor.