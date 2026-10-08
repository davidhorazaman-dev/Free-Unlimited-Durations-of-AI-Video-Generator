import http from "node:http";
import {randomUUID} from "node:crypto";
import {JobStore} from "./job-store.js";
import {ProviderRegistry, createMockProvider} from "./provider-registry.js";
import {VideoOrchestrator} from "./orchestrator.js";

const port=Number(process.env.PORT||8787),host=process.env.HOST||"0.0.0.0",prefix="/api/v1";
const version="3.2.0";
const projects=new Map(),jobs=new JobStore(),providers=new ProviderRegistry().register(createMockProvider());
const orchestrator=new VideoOrchestrator({store:jobs,providers});
const configuredOrigins=String(process.env.CORS_ORIGINS||"").split(",").map(x=>x.trim()).filter(Boolean);
const allowedOrigins=configuredOrigins.length?configuredOrigins:["https://longestformaiexplainervideogenerator.ai"];
const defaultProvider=String(process.env.DEFAULT_PROVIDER||"mock");
const backendConfigured=true;
function json(res,status,body,origin){const allow=allowedOrigins.includes("*")?"*":(allowedOrigins.includes(origin)?origin:allowedOrigins[0]||"null");res.writeHead(status,{"Content-Type":"application/json; charset=utf-8","Access-Control-Allow-Origin":allow,"Vary":"Origin","Access-Control-Allow-Headers":"Content-Type, Authorization","Access-Control-Allow-Methods":"GET,POST,OPTIONS"});res.end(JSON.stringify(body))}
async function readBody(req){const chunks=[];for await(const chunk of req)chunks.push(chunk);const raw=Buffer.concat(chunks).toString("utf8");if(!raw)return{};try{return JSON.parse(raw)}catch{throw new Error("Request body must be valid JSON.")}}
const server=http.createServer(async(req,res)=>{const origin=String(req.headers.origin||"");if(req.method==="OPTIONS")return json(res,204,{},origin);const url=new URL(req.url,"http://"+(req.headers.host||"localhost"));try{
if(req.method==="GET"&&url.pathname===prefix+"/health")return json(res,200,{ok:true,status:"backend configured",backendConfigured,version,durationModel:"unbounded-chunked-timeline",apiBase:prefix,defaultProvider,providers:providers.list(),serverTime:new Date().toISOString()},origin);
if(req.method==="GET"&&url.pathname===prefix+"/status")return json(res,200,{ok:true,status:"backend configured",backendConfigured,version,apiBase:prefix,defaultProvider,providers:providers.list(),serverTime:new Date().toISOString()},origin);
if(req.method==="GET"&&url.pathname===prefix+"/providers")return json(res,200,{providers:providers.list(),defaultProvider,backendConfigured},origin);
if(req.method==="POST"&&url.pathname===prefix+"/projects"){const input=await readBody(req),id=randomUUID(),project={id,title:input.title||"Untitled AI Video",mode:input.mode||"all-in-one",prompt:input.prompt||"",script:input.script||"",scenes:Array.isArray(input.scenes)?input.scenes:[],durationMode:"unbounded",resolution:input.resolution||"1080p",createdAt:new Date().toISOString()};projects.set(id,project);return json(res,201,project,origin)}
const agent=url.pathname.match(new RegExp("^"+prefix+"/projects/([^/]+)/agent$"));if(req.method==="POST"&&agent){const project=projects.get(agent[1]);if(!project)return json(res,404,{error:"Project not found."},origin);const input=await readBody(req),job=await orchestrator.start(project,input);return json(res,202,{jobId:job.id,status:job.status},origin)}
const jobPath=url.pathname.match(new RegExp("^"+prefix+"/jobs/([^/]+)$"));if(req.method==="GET"&&jobPath){const job=jobs.get(jobPath[1]);return job?json(res,200,job,origin):json(res,404,{error:"Job not found."},origin)}
const cancel=url.pathname.match(new RegExp("^"+prefix+"/jobs/([^/]+)/cancel$"));if(req.method==="POST"&&cancel){const job=jobs.cancel(cancel[1]);return job?json(res,200,job,origin):json(res,404,{error:"Job not found."},origin)}
const output=url.pathname.match(new RegExp("^"+prefix+"/projects/([^/]+)/output$"));if(req.method==="GET"&&output)return json(res,200,{projectId:output[1],jobs:jobs.forProject(output[1])},origin);
return json(res,404,{error:"Not found."},origin)}catch(error){return json(res,400,{error:error instanceof Error?error.message:String(error)},origin)}});
server.listen(port,host,()=>console.log("API listening on http://"+host+":"+port+prefix));
