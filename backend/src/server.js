import http from "node:http";
import {randomUUID} from "node:crypto";
import {JobStore} from "./job-store.js";
import {ProviderRegistry, createMockProvider} from "./provider-registry.js";
import {VideoOrchestrator} from "./orchestrator.js";

const port = Number(process.env.PORT || 8787);
const host = process.env.HOST || "0.0.0.0";
const prefix = "/api/v1";
const projects = new Map();
const jobs = new JobStore();
const providers = new ProviderRegistry().register(createMockProvider());
const orchestrator = new VideoOrchestrator({store: jobs, providers});

function json(res, status, body) {
  res.writeHead(status, {
    "Content-Type":"application/json; charset=utf-8",
    "Access-Control-Allow-Origin":process.env.CORS_ORIGINS || "*",
    "Access-Control-Allow-Headers":"Content-Type, Authorization",
    "Access-Control-Allow-Methods":"GET,POST,OPTIONS"
  });
  res.end(JSON.stringify(body));
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  try { return JSON.parse(raw); }
  catch { throw new Error("Request body must be valid JSON."); }
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") return json(res, 204, {});
  const url = new URL(req.url, "http://" + (req.headers.host || "localhost"));

  try {
    if (req.method === "GET" && url.pathname === prefix + "/health") {
      return json(res, 200, {
        ok:true,
        version:"3.0.0",
        durationModel:"unbounded-chunked-timeline",
        providers:providers.list()
      });
    }

    if (req.method === "GET" && url.pathname === prefix + "/providers") {
      return json(res, 200, {providers:providers.list()});
    }

    if (req.method === "POST" && url.pathname === prefix + "/projects") {
      const input = await readBody(req);
      const id = randomUUID();
      const project = {
        id,
        title:input.title || "Untitled AI Video",
        mode:input.mode || "all-in-one",
        prompt:input.prompt || "",
        script:input.script || "",
        scenes:Array.isArray(input.scenes) ? input.scenes : [],
        durationMode:"unbounded",
        resolution:input.resolution || "1080p",
        createdAt:new Date().toISOString()
      };
      projects.set(id, project);
      return json(res, 201, project);
    }

    const agent = url.pathname.match(new RegExp("^" + prefix + "/projects/([^/]+)/agent$"));
    if (req.method === "POST" && agent) {
      const project = projects.get(agent[1]);
      if (!project) return json(res, 404, {error:"Project not found."});
      const input = await readBody(req);
      const job = await orchestrator.start(project, input);
      return json(res, 202, {jobId:job.id, status:job.status});
    }

    const jobPath = url.pathname.match(new RegExp("^" + prefix + "/jobs/([^/]+)$"));
    if (req.method === "GET" && jobPath) {
      const job = jobs.get(jobPath[1]);
      return job ? json(res, 200, job) : json(res, 404, {error:"Job not found."});
    }

    const cancel = url.pathname.match(new RegExp("^" + prefix + "/jobs/([^/]+)/cancel$"));
    if (req.method === "POST" && cancel) {
      const job = jobs.cancel(cancel[1]);
      return job ? json(res, 200, job) : json(res, 404, {error:"Job not found."});
    }

    const output = url.pathname.match(new RegExp("^" + prefix + "/projects/([^/]+)/output$"));
    if (req.method === "GET" && output) {
      return json(res, 200, {projectId:output[1], jobs:jobs.forProject(output[1])});
    }

    return json(res, 404, {error:"Not found."});
  } catch (error) {
    return json(res, 400, {error:error instanceof Error ? error.message : String(error)});
  }
});

server.listen(port, host, () => {
  console.log("API listening on http://" + host + ":" + port + prefix);
});