# Longest Form AI Explainer Video Generator

Production-oriented long-form AI explainer video workbench for planning, agenting, generating, monitoring, and assembling arbitrarily long projects.

## Canonical web application
https://longestformaiexplainervideogenerator.ai

The product no longer treats localhost as its application server. The desktop launcher opens the canonical production web application, and the browser UI uses /api/v1 on that origin.

Unlimited duration means an unbounded project/timeline model. Actual generation remains subject to provider, account, compute, storage, network, and encoding limits.

## Web UI
- Plan: script analysis, duration estimates, scene segmentation and shot planning.
- Agent: server-side planning/agent job creation, progress polling and cancellation.
- Generate: job monitoring, progress and final output links.
- Provider-agnostic architecture with credentials kept server-side.

## API v1 Web UI
The repository now includes a GitHub-hosted static API Web UI at `/api/v1/`. When the custom domain is configured for the GitHub website, its canonical page is:

https://longestformaiexplainervideogenerator.ai/api/v1/

The Web UI documents the API v1 surface and provides a read-only `GET /health` tester. GitHub Pages hosts the interface only; it does not run private AI rendering workers or backend processes.

## API contract
GET /api/v1/health
POST /api/v1/projects
POST /api/v1/projects/{projectId}/plan
POST /api/v1/projects/{projectId}/agent
GET /api/v1/jobs/{jobId}
POST /api/v1/jobs/{jobId}/cancel
GET /api/v1/projects/{projectId}/output

See api-contract.json. The repository provides the frontend and deployment contract; provider credentials and rendering workers belong behind the production API.

## Deployment
deploy/nginx.conf documents production routing: static assets are served directly and /api/ is forwarded to the private API service. Dockerfile provides a static web container.

The desktop launcher intentionally does not create a localhost HTTP server.

## Releases
GitHub Actions builds native Windows, macOS and Linux artifacts. The executable is a production-site launcher rather than a local web server.

MIT License.
