# Free Unlimited-Durations AI Explainer Video Generator

Long-form explainer-video workbench using scene-based rendering. “Unlimited duration” means the project can contain arbitrarily many scenes; individual AI providers, hardware, storage, quotas, and render limits still apply.

## Features
- Long-form script editor
- Automatic scene segmentation
- Duration estimation from words/minute
- Scene generation queue with demo progress
- Provider-agnostic architecture
- Project JSON export
- Static browser UI
- Local Python server

## Run
`python server.py` then open `http://localhost:8000`.

## Production integration
Keep API keys server-side. Implement a provider adapter that renders each scene independently, persists job state, retries failures, and assembles completed clips with a media pipeline such as FFmpeg.

MIT License.