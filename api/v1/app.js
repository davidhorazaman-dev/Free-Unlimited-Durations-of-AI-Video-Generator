const API_BASE=(location.origin&&location.origin!=="null"?location.origin:"https://longestformaiexplainervideogenerator.ai")+"/api/v1";
const endpoints=[
  ["GET","/health"],["POST","/projects"],["POST","/projects/{projectId}/plan"],
  ["POST","/projects/{projectId}/agent"],["GET","/jobs/{jobId}"],
  ["POST","/jobs/{jobId}/cancel"],["GET","/projects/{projectId}/output"]
];
const $=id=>document.getElementById(id);
$("base").textContent=API_BASE;
$("endpoints").innerHTML=endpoints.map(([m,p])=>`<div class="endpoint"><span class="method">${m}</span><span class="path">${p}</span></div>`).join("");
$("health").onclick=()=>run("/health");
$("run").onclick=()=>run($("endpoint").value);
async function run(path){
  $("status").textContent="Status: checking…";
  $("output").textContent="Requesting GET "+API_BASE+path+"…";
  try{
    const response=await fetch(API_BASE+path,{headers:{"Accept":"application/json"}});
    const text=await response.text();
    let body=text;try{body=JSON.stringify(JSON.parse(text),null,2)}catch{}
    $("output").textContent="HTTP "+response.status+"\n\n"+body;
    $("status").textContent=response.ok?"Status: API reachable":"Status: API returned HTTP "+response.status;
  }catch(error){
    $("output").textContent="The GitHub-hosted Web UI could not reach the production API.\n\n"+error;
    $("status").textContent="Status: unreachable";
  }
}