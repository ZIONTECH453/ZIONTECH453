/* ZIONTECH iPhone Panic Analyzer v3.0
   Model-specific diagnostic database: iPhone 6s -> iPhone 17 / Air.
   Diagnostic aid only: confirm with measurements, schematics, boardview,
   known-good parts and physical inspection. */
(() => {
"use strict";

const DB = {"version":"1.0.0","scope":"iPhone 6s through iPhone 17 families","lastReviewed":"2026-08-16","modelIdentifiers":{"iPhone 6s":["iPhone8,1","iPhone8,2"],"iPhone 7":["iPhone9,1","iPhone9,2","iPhone9,3","iPhone9,4"],"iPhone 8":["iPhone10,1","iPhone10,2","iPhone10,4","iPhone10,5"],"iPhone X":["iPhone10,3","iPhone10,6"],"iPhone XR":["iPhone11,8"],"iPhone XS":["iPhone11,2"],"iPhone XS Max":["iPhone11,4","iPhone11,6"],"iPhone 11":["iPhone12,1"],"iPhone 11 Pro":["iPhone12,3"],"iPhone 11 Pro Max":["iPhone12,5"],"iPhone SE (2nd gen)":["iPhone12,8"],"iPhone 12 mini":["iPhone13,1"],"iPhone 12":["iPhone13,2"],"iPhone 12 Pro":["iPhone13,3"],"iPhone 12 Pro Max":["iPhone13,4"],"iPhone 13 mini":["iPhone14,4"],"iPhone 13":["iPhone14,5"],"iPhone 13 Pro":["iPhone14,2"],"iPhone 13 Pro Max":["iPhone14,3"],"iPhone 14":["iPhone14,7"],"iPhone 14 Plus":["iPhone14,8"],"iPhone 14 Pro":["iPhone15,2"],"iPhone 14 Pro Max":["iPhone15,3"],"iPhone 15":["iPhone15,4"],"iPhone 15 Plus":["iPhone15,5"],"iPhone 15 Pro":["iPhone16,1"],"iPhone 15 Pro Max":["iPhone16,2"],"iPhone 16":["iPhone17,3","iPhone17,4"],"iPhone 16 Plus":["iPhone17,2"],"iPhone 16 Pro":["iPhone17,1"],"iPhone 16 Pro Max":["iPhone17,2"],"iPhone 16e":["iPhone17,5"],"iPhone 17":["iPhone18,3"],"iPhone 17 Pro":["iPhone18,1"],"iPhone 17 Pro Max":["iPhone18,2"],"iPhone Air":["iPhone18,4"]},"rules":[{"id":"thermal-watchdog","title":"Thermalmonitord / missing-sensor watchdog","family":"Sensor / thermal monitoring","level":"high","patterns":["userspace watchdog timeout","thermalmonitord","missing sensor(s)"],"diagnosis":"iOS is not receiving expected sensor data. On supported models this commonly produces a ~180-second restart loop.","checks":["Read the exact Missing sensor(s) value.","Identify the assembly that carries that sensor for this exact model.","Test a known-good OEM/premium assembly where appropriate.","Inspect connector, corrosion, filters and sensor/data line before board repair."],"confidence":"strong","source":"iFixit iPhone Kernel Panics; technician reports"},{"id":"prs0","title":"PRS0 / barometric sensor","family":"Barometer / charge-port assembly","level":"high","patterns":["missing sensor(s): prs0","missing sensor(s): prs0"],"modelMap":{"iPhone 11":"Charge-port assembly / barometer path","iPhone 11 Pro":"Charge-port assembly / barometer path","iPhone 11 Pro Max":"Charge-port assembly / barometer path","iPhone 12":"Charge-port assembly / barometer path","iPhone 12 mini":"Charge-port assembly / barometer path","iPhone 12 Pro":"Charge-port assembly / barometer path","iPhone 12 Pro Max":"Charge-port assembly / barometer path","iPhone 13":"Charge-port assembly / barometer path","iPhone 13 Pro":"Charge-port assembly / barometer path","iPhone 13 Pro Max":"Charge-port assembly / barometer path","iPhone 13 mini":"Charge-port assembly / barometer path","iPhone 14":"Charge-port assembly / barometer path","iPhone 14 Plus":"Charge-port assembly / barometer path","iPhone 14 Pro":"Charge-port assembly / barometer path","iPhone 14 Pro Max":"Charge-port assembly / barometer path"},"diagnosis":"PRS0 is used as a barometric-pressure sensor clue. On these families, the charge-port assembly/path is a primary place to test.","checks":["Test the charge-port assembly with a known-good part.","Inspect the board connector and related line for damage.","Do not call the charge flex bad solely from PRS0 if board-side communication is abnormal."],"confidence":"strong","source":"iFixit kernel-panic reference"},{"id":"tg0b-tg0v","title":"TG0B / TG0V battery sensor data","family":"Battery / gas-gauge sensor path","level":"high","patterns":["missing sensor(s): tg0b","missing sensor(s): tg0v","missing sensor(s): tg0b tg0v","tg0b","tg0v"],"modelMap":{"iPhone XS":"Battery / battery data path","iPhone XS Max":"Battery / battery data path","iPhone 11":"Battery / battery data path","iPhone 11 Pro":"Battery / battery data path","iPhone 11 Pro Max":"Battery / battery data path","iPhone 12":"Battery / battery data path","iPhone 12 Pro":"Battery / battery data path","iPhone 12 Pro Max":"Battery / battery data path"},"diagnosis":"Battery temperature/voltage sensor communication is implicated. Start with the battery and its data path, then move to board-side circuitry if a known-good battery does not clear the panic.","checks":["Test with a known-good battery of the correct model.","Inspect battery connector and data path.","Check for corrosion or damaged filters/components.","Re-test after the known-good part."],"confidence":"strong","source":"Technician/community reports; model-specific examples"},{"id":"mic2-11","title":"Missing sensor: mic2 on iPhone 11 family","family":"Power-button / rear-microphone flex path","level":"high","patterns":["missing sensor(s): mic2"],"models":["iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max"],"diagnosis":"On iPhone 11-family examples, mic2 has been associated with the power/flash/rear-microphone flex path.","checks":["Test the power/flash flex with a known-good OEM/premium part.","Inspect connector and flex damage.","If the flex does not clear it, trace the board-side sensor communication path."],"confidence":"strong","source":"iFixit iPhone 11 case reports"},{"id":"mic1-se2","title":"Missing sensor: mic1 on iPhone SE (2nd gen)","family":"Charging-port / microphone flex path","level":"medium","patterns":["missing sensor(s): mic1"],"models":["iPhone SE (2nd gen)"],"diagnosis":"Technician reports associate mic1 with the charging-port/microphone flex path on SE 2.","checks":["Test a known-good charging-port assembly.","Inspect connector and microphone path.","Confirm the same panic repeats after the replacement test."],"confidence":"medium","source":"Technician/community reports"},{"id":"smc-13-15","title":"SMC BSC failure / sensor-array mapping","family":"SMC / sensor communication","level":"high","patterns":["smc panic","smc bsc failure","s.sensor array"],"codeMap":{"iPhone 13":{"0x10000":"Front Sensor Assembly","0x800":"Charge Port Assembly","0x40000":"Battery"},"iPhone 13 mini":{"0x400":"Gyroscope / bottom board"},"iPhone 14":{"0x100000":"Charge Port Assembly","0x200000":"Front Sensor Assembly","0x400000":"Wireless Charger Coil","0x500000":"Battery"},"iPhone 14 Plus":{"0x100000":"Charge Port Assembly","0x200000":"Front Sensor Assembly","0x400000":"Wireless Charger Coil","0x500000":"Battery"},"iPhone 14 Pro":{"0x41":"Battery","0x20000":"Gyroscope / bottom board","0x40000":"Charge Port Assembly","0x80000":"Front Sensor Assembly","0x100000":"Power Button Flex"},"iPhone 14 Pro Max":{"0x41":"Battery","0x20000":"Gyroscope / bottom board","0x40000":"Charge Port Assembly","0x80000":"Front Sensor Assembly","0x100000":"Power Button Flex"},"iPhone 15":{"0x80000":"Charge Port Assembly","0x100000":"Front Sensor Assembly","0x200000":"Wireless Charge Coil"},"iPhone 15 Plus":{"0x80000":"Charge Port Assembly","0x100000":"Front Sensor Assembly","0x200000":"Wireless Charge Coil"},"iPhone 15 Pro":{"0xa1":"Battery","0x300000":"Charge Port Assembly","0x400000":"Wireless Charge Coil"},"iPhone 15 Pro Max":{"0xa1":"Battery","0x300000":"Charge Port Assembly","0x400000":"Wireless Charge Coil"},"iPhone 16 Pro":{"3145728":"Charge Port Assembly","0x300000":"Charge Port Assembly","1048576":"Charge Port Assembly"},"iPhone 16 Pro Max":{"3145728":"Charge Port Assembly","0x300000":"Charge Port Assembly","1048576":"Charge Port Assembly"},"iPhone 17":{"0x300000":"Charge Port / sensor flex path (reported; verify)"},"iPhone 17 Pro":{"0x300000":"Charge Port / sensor flex path (reported; verify)"},"iPhone 17 Pro Max":{"0x300000":"Charge Port / sensor flex path (reported; verify)"},"iPhone Air":{"0x300000":"Charge Port / sensor flex path (reported; verify)"}},"diagnosis":"SMC BSC means the SMC subsystem is not receiving expected sensor communication. Use the model-specific sensor-array code before choosing a part.","checks":["Extract every S.sensor array value, not only the first one.","Convert decimal values to hexadecimal when necessary.","Apply the exact model mapping.","If more than one bit/code is present, treat it as a multi-sensor event.","Inspect connectors and board-side communication if a known-good part does not resolve it."],"confidence":"strong","source":"iFixit SMC Panic Assert reference; newer-model technician reports"},{"id":"aop-no-pulse","title":"AOP PANIC / No pulse","family":"Always-On Processor / peripheral power or communication","level":"medium","patterns":["aop panic","no pulse on"],"models":["iPhone X","iPhone XS","iPhone XS Max","iPhone 11","iPhone 11 Pro","iPhone 11 Pro Max"],"diagnosis":"AOP no-pulse panics require the full AOP text. On iPhone X-family examples, the Taptic/charge-port path can be involved; the exact endpoint must be confirmed from the complete log.","checks":["Read the endpoint/address and AOP client name.","Inspect charge-port/Taptic-related paths where applicable.","Check for flex or liquid damage.","Do not replace a part from the phrase 'AOP' alone."],"confidence":"medium","source":"iFixit case reports / kernel-panic reference"},{"id":"aop-k2","title":"AOP K2 / Bosch control-channel write failure","family":"AOP / motion or audio-related peripheral communication","level":"medium","patterns":["k2","bosch control channel write failure","control channel write failure"],"diagnosis":"This AOP signature is associated with peripheral communication. The exact affected flex/assembly varies by model, so the complete log and schematic are needed.","checks":["Capture the entire AOP panic.","Identify the AOP client and endpoint.","Inspect related peripheral flexes and connectors.","Use known-good parts only after identifying the path."],"confidence":"medium","source":"iFixit kernel-panic reference"},{"id":"ans2","title":"ANS2 recoverable panic","family":"NAND / storage controller / storage communication","level":"high","patterns":["ans2","nand_findflashmedia","apple nand","flash media"],"diagnosis":"ANS2 points toward the storage subsystem or communication with storage. It is not proof that NAND itself must be replaced.","checks":["Check storage power and stability.","Look for repeated ANS2/storage errors across logs.","Rule out board-level power/communication faults.","Only then consider NAND-level repair/programming."],"confidence":"strong","source":"iFixit kernel-panic reference"},{"id":"sep-rom","title":"SEP ROM boot panic","family":"Secure Enclave / CPU communication","level":"high","patterns":["sep rom","seprom","sep.*boot.*panic"],"diagnosis":"SEP ROM panics point to SEP/CPU communication or SEP ROM integrity and require advanced board-level diagnosis.","checks":["Confirm the exact SEP panic text.","Rule out software/restore conditions where appropriate.","Inspect CPU/SEP-related board history and communication.","Do not erase/restore a device containing important data without understanding the data implications."],"confidence":"medium","source":"iFixit kernel-panic reference"},{"id":"soc-hot","title":"AppleSocHot / Hot Hot Hot","family":"CPU / PMIC / board-level thermal or power path","level":"high","patterns":["applesochot","hot hot hot"],"diagnosis":"This signature points to a CPU/PMIC-related thermal or electrical path and is generally a board-level clue.","checks":["Check CPU/PMIC-related power stability.","Look for abnormal heating/current draw.","Inspect areas with previous repair or liquid damage.","Do not assume the CPU itself is the failed component."],"confidence":"strong","source":"iFixit kernel-panic reference"},{"id":"i2c","title":"I²C communication panic","family":"Peripheral communication bus","level":"medium","patterns":["i2c","i²c","i2c.*error","i2c.*timeout"],"diagnosis":"I²C panics identify a communication failure but the correct component depends on the channel, address and model.","checks":["Capture the I²C channel/address.","Use the exact schematic for the model.","Check SDA/SCL for shorts/opens and abnormal diode readings.","Check pull-ups and peripheral power."],"confidence":"medium","source":"iFixit kernel-panic reference"},{"id":"watchdog-no-checkin","title":"Watchdog timeout without a named missing sensor","family":"System service / dependent subsystem","level":"medium","patterns":["userspace watchdog timeout","no successful checkins"],"diagnosis":"A service stopped responding. Without a named sensor or subsystem, this is not enough to identify a component.","checks":["Read the service name and check-in history.","Compare repeated logs.","Test software restore/update when the signature is software-like.","If hardware is suspected, trace the named service's dependencies."],"confidence":"medium","source":"iFixit kernel-panic reference"},{"id":"kernel-generic","title":"Generic kernel panic / undefined instruction","family":"Kernel / software / memory / storage","level":"low","patterns":["undefined kernel instruction","kernel panic","panic(cpu"],"diagnosis":"A generic kernel panic is insufficient for component-level diagnosis. More context is required.","checks":["Extract panicString and backtrace.","Check iOS version/build and whether the panic repeats.","Test software restore when appropriate.","Compare with known-good hardware and other panic logs before board repair."],"confidence":"low","source":"iFixit kernel-panic reference"}],"notes":["Never claim a component is definitely bad from a panic keyword alone.","Model-specific mappings are intentionally tagged with evidence strength.","iPhone 13+ SMC sensor-array mappings are the strongest model-specific section in this database.","Some 16/17 mappings are newer technician/community observations and are marked verify.","iPhone 6s–8 family entries use generic signatures unless a model-specific mapping is documented; this prevents false precision."]};
const $=id=>document.getElementById(id);
const input=$("panicInput"), file=$("panicFile"), result=$("result"),
      analyzeBtn=$("analyzeBtn"), clearBtn=$("clearBtn");
if(!input||!file||!result||!analyzeBtn||!clearBtn){
 console.error("ZIONTECH Analyzer: required HTML element missing"); return;
}
const MODEL_NAMES=Object.keys(DB.modelIdentifiers);

function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
function norm(t){return String(t||"").replace(/\r\n/g,"\n").replace(/\u0000/g,"").trim();}
function field(t,names){
 const r=new RegExp("(?:"+names.join("|")+")\\s*[:=]\\s*[\"']?([^\\n\\r]{1,250})","i"),m=t.match(r);
 return m?m[1].replace(/[\"']$/,"").trim():"";
}
function detectModel(t){
 const raw=field(t,["product","productname","product_name","device","model","hardwaremodel","hwmodel"]);
 let identifier="";
 const idm=t.match(/\biPhone\d{1,2},\d+\b/i); if(idm) identifier=idm[0];
 let model="Unknown iPhone";
 if(raw){
  for(const n of MODEL_NAMES) if(raw.toLowerCase().includes(n.toLowerCase())) {model=n;break;}
 }
 if(model==="Unknown iPhone" && identifier){
  for(const n of MODEL_NAMES) if(DB.modelIdentifiers[n].some(x=>x.toLowerCase()===identifier.toLowerCase())) {model=n;break;}
 }
 if(model==="Unknown iPhone"){
  const m=t.match(/\biPhone\s*(?:SE|X|XR|XS|11|12|13|14|15|16|17)(?:\s+(?:mini|Plus|Pro|Pro Max|Air))?/i);
  if(m){const s=m[0].replace(/\s+/g," ").trim(); for(const n of MODEL_NAMES) if(n.toLowerCase()===s.toLowerCase()) {model=n;break;}}
 }
 return {raw:raw||identifier||"Not detected",identifier,model};
}
function panicString(t){
 let m=t.match(/panicString\s*[:=]\s*([\s\S]*?)(?:\n\S[^:\n]{0,50}\s*[:=]|\n\n|$)/i);
 return (m?m[1]:(t.match(/panicString[^\n]*/i)||[""])[0]).trim().slice(0,1800);
}
function sensorCodes(t){
 const out=[];
 const re=/(?:s\.sensor\s+array[^\\n]*|sensor\s+array[^\\n]*|missing\s+sensor\(s\)\s*:\s*[^\n]+)/ig;
 for(const m of t.matchAll(re)) out.push(m[0].slice(0,500));
 const nums=[...t.matchAll(/\b(?:0x[0-9a-f]+|\d{6,})\b/ig)].map(x=>x[0]);
 return {lines:[...new Set(out)],numbers:[...new Set(nums)]};
}
function evidence(t){
 return t.split("\n").filter(x=>/panicString|backtrace|debugger message|thermalmonitord|watchdog|missing sensor|s\.sensor array|aop panic|ans2|nand|sep|smc|i2c|baseband|commcenter|applesochot|usb|audio/i.test(x)).slice(0,24);
}
function modelMap(rule,model){
 if(rule.modelMap && rule.modelMap[model]) return rule.modelMap[model];
 if(rule.models && rule.models.includes(model)) return rule.diagnosis;
 return null;
}
function smcMapping(rule,model,t){
 if(!rule.codeMap?.[model]) return null;
 const map=rule.codeMap[model], found=[];
 const rawNums=sensorCodes(t).numbers;
 for(const [code,part] of Object.entries(map)){
  const variants=[code, code.toLowerCase(), code.toUpperCase()];
  if(variants.some(v=>t.toLowerCase().includes(v.toLowerCase()))) found.push([code,part]);
  if(code.startsWith("0x")){
   const dec=parseInt(code,16);
   if(t.includes(String(dec))) found.push([code,part]);
  }
 }
 return [...new Map(found.map(x=>[x[0],x])).values()];
}
function matches(rule,t,model){
 let hits=0,matched=[];
 for(const p of (rule.patterns||[])){
  try{const r=new RegExp(p,"i"); if(r.test(t)){hits++;matched.push(p);}}
  catch{}
 }
 let mapping=modelMap(rule,model);
 let smc=smcMapping(rule,model,t);
 if(mapping) hits+=2;
 if(smc?.length) hits+=3;
 return {hits,matched,mapping,smc};
}
function analyzeRules(t,model){
 return DB.rules.map(r=>({...r,_:matches(r,t,model)}))
 .filter(r=>r._.hits>0)
 .sort((a,b)=>b._.hits-a._.hits);
}
function confidence(rule){
 if(!rule)return "LOW";
 if(rule._.smc?.length || rule._.mapping) return "HIGH";
 if(rule._.hits>=3)return "HIGH";
 if(rule._.hits>=2)return "MEDIUM";
 return "LOW";
}
function analyze(){
 const t=norm(input.value);
 if(!t){alert("Paste or upload a panic log first.");return;}
 const d=detectModel(t), hits=analyzeRules(t,d.model), top=hits[0],
       ps=panicString(t), ev=evidence(t), sc=sensorCodes(t);
 let mappingText="";
 if(top?._.smc?.length) mappingText=top._.smc.map(x=>`${x[0]} → ${x[1]}`).join("<br>");
 else if(top?._.mapping) mappingText=top._.mapping;

 let html=`<h3>ZIONTECH Panic Analyzer v3.0</h3>
 <div class="finding"><b>Detected device:</b> ${esc(d.raw)}</div>
 <div class="finding"><b>Model family:</b> ${esc(d.model)}</div>
 <div class="finding"><b>Model identifier:</b> ${esc(d.identifier||"Not detected")}</div>
 <div class="finding"><b>Primary signature:</b> ${esc(top?.title||"No strong database signature")}</div>
 <div class="finding"><b>Subsystem:</b> ${esc(top?.family||"Unknown")}</div>
 <div class="finding"><b>Confidence:</b> ${confidence(top)}</div>`;
 if(mappingText) html+=`<div class="finding"><b>Model-specific mapping:</b><br>${mappingText}</div>`;
 html+=`<div class="finding"><b>Panic string:</b><br><code>${esc(ps||"Not detected")}</code></div>`;
 if(sc.lines.length) html+=`<div class="finding"><b>Sensor evidence:</b><br>${sc.lines.map(esc).join("<br>")}</div>`;
 html+=`<h3>Technician diagnosis</h3>
 <div class="finding">${esc(top?.diagnosis||"The database did not find a model-specific signature. Do not guess a component.")}</div>
 <h3>Recommended checks</h3>
 <ol>${(top?.checks||[
 "Read the exact panicString and surrounding evidence.",
 "Confirm the product/model identifier.",
 "Identify the named subsystem and its dependencies.",
 "Check power, communication and connector integrity.",
 "Compare with a known-good board/assembly and schematic."
 ]).map(x=>`<li>${esc(x)}</li>`).join("")}</ol>`;
 if(hits.length>1){
  html+=`<h3>Secondary database matches</h3><div class="finding">`;
  for(const r of hits.slice(1,7)) html+=`<b>${esc(r.title)}</b> — ${esc(r.family)} (${confidence(r)})<br>`;
  html+=`</div>`;
 }
 if(ev.length) html+=`<h3>Relevant evidence</h3><pre style="white-space:pre-wrap;overflow:auto;background:#f5f7f9;padding:12px;border-radius:8px;">${esc(ev.join("\n"))}</pre>`;
 html+=`<h3>Important technician note</h3>
 <p><small>A panic log is evidence, not absolute proof. A mapped sensor code identifies the diagnostic path; it does not prove the flex, connector, filter, trace or IC is defective. Confirm with measurements and a known-good comparison.</small></p>`;
 result.innerHTML=html;
}
file.addEventListener("change",async()=>{
 const f=file.files?.[0]; if(!f)return;
 if(!/\.(ips|panic|txt|log|json)$/i.test(f.name)&&!f.type.startsWith("text/")){
  alert("Accepted: .ips, .panic, .txt, .log and .json panic logs."); file.value=""; return;
 }
 try{input.value=await f.text(); result.innerHTML="";}catch(e){alert("Unable to read this file.");}
});
analyzeBtn.addEventListener("click",analyze);
clearBtn.addEventListener("click",()=>{input.value="";file.value="";result.innerHTML="";});
input.addEventListener("keydown",e=>{if((e.ctrlKey||e.metaKey)&&e.key==="Enter")analyze();});
window.ZIONTECH_PANIC_ANALYZER_VERSION="3.0";
window.ZIONTECH_PANIC_DATABASE_VERSION=DB.version;
})();