const DEFAULT_API_BASE="";
const params=new URLSearchParams(location.search);
const API_BASE=(params.get("api")||window.LONGEST_FORM_API_BASE||DEFAULT_API_BASE).replace(/\/$/,"");
const endpoints=[
  ["GET","/health"],["POST","/projects"],["POST","/projects/{projectId}/agent"],
  ["GET","/jobs/{jobId}"],["POST","/jobs/{jobId}/cancel"],["GET","/projects/{projectId}/output"]
];
const $=id=>document.getElementById(id);
$("base").textContent=API_BASE||"No production API configured";
$("endpoints").innerHTML=endpoints.map(([m,p])=>`<div class="endpoint"><span class="method">${m}</span><span class="path">${p}</span></div>`).join("");
$("health").onclick=()=>run("/health");
$("run").onclick=()=>run($("endpoint").value);
async function run(path){
  if(!API_BASE){
    $("status").textContent="Status: backend not configured";
    $("output").textContent="GitHub Pages is static hosting. Set ?api=https://YOUR-API-HOST/api/v1 to test a real backend.";
    return;
  }
  $("status").textContent="Status: checking…";
  $("output").textContent="Requesting GET "+API_BASE+path+"…";
  try{
    const response=await fetch(API_BASE+path,{headers:{"Accept":"application/json"}});
    const text=await response.text();
    let body;
    try{body=JSON.stringify(JSON.parse(text),null,2)}catch{throw new Error("The endpoint returned non-JSON content. Check that the configured URL is an API endpoint, not a GitHub Pages HTML page.")};
    $("output").textContent="HTTP "+response.status+"\n\n"+body;
    $("status").textContent=response.ok?"Status: API reachable":"Status: API returned HTTP "+response.status;
  }catch(error){
    $("output").textContent="The configured production API could not be reached.\n\n"+error;
    $("status").textContent="Status: unreachable";
  }
}