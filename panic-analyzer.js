const input=document.getElementById('panicInput');
const file=document.getElementById('panicFile');
const result=document.getElementById('result');

file.addEventListener('change',async()=>{if(file.files[0]) input.value=await file.files[0].text();});
document.getElementById('clearBtn').onclick=()=>{input.value='';file.value='';result.innerHTML='';};
document.getElementById('analyzeBtn').onclick=analyze;

function analyze(){
 const t=input.value,s=t.toLowerCase();
 if(!t.trim()){alert('Paste or upload a panic log first.');return;}
 let type='General kernel panic',area='Unknown',confidence='LOW',checks=[];
 if(/missing sensor|thermalmonitord/.test(s)){type='Missing / sensor watchdog';area='Sensor / thermal monitoring';confidence='HIGH';checks=['Check the named sensor path','Check its supply and communication lines','Inspect connector/corrosion'];}
 else if(/userspace watchdog timeout|watchdog timeout|watchdogd/.test(s)){type='Userspace watchdog timeout';area='System service / hardware dependency';confidence='HIGH';checks=['Read the service named near the timeout','Check the dependent hardware subsystem'];}
 else if(/baseband|cellular|modem/.test(s)){type='Baseband / cellular-related panic';area='Baseband / RF subsystem';confidence='MEDIUM';checks=['Check baseband power','Check clocks and communication lines'];}
 else if(/nand|apfs|i\/o error|storage|nvme|ufs/.test(s)){type='Storage / I/O-related panic';area='Storage subsystem';confidence='MEDIUM';checks=['Check storage power','Check communication and data integrity'];}
 else if(/smc|pmic|power management/.test(s)){type='Power-management-related panic';area='Power / SMC subsystem';confidence='MEDIUM';checks=['Check relevant power rails','Check SMC/power communication'];}
 else if(/i2c|spi|bus error|communication/.test(s)){type='Bus / communication fault';area='I2C / SPI / peripheral communication';confidence='MEDIUM';checks=['Check bus lines','Check connector and peripheral power'];}
 else checks=['Inspect the panic string and backtrace','Compare measurements with a known-good board'];

 const model=(t.match(/(?:product|device|model)[\s:=_-]*([A-Za-z0-9 ,+.-]{3,40})/i)||[])[1]||'Not detected';
 const panic=(t.match(/panicString[^\n]*[=:][^\n]*/i)||[])[0]||'Not detected';
 result.innerHTML='<h3>ZIONTECH Diagnostic Report</h3>'+
 '<div class="finding"><b>Device:</b> '+esc(model)+'</div>'+
 '<div class="finding"><b>Panic Type:</b> '+esc(type)+'</div>'+
 '<div class="finding"><b>Likely Area:</b> '+esc(area)+'</div>'+
 '<div class="finding"><b>Confidence:</b> '+confidence+'</div>'+
 '<div class="finding"><b>Panic String:</b> '+esc(panic)+'</div>'+
 '<h3>Technician Checks</h3><ul>'+checks.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>'+
 '<p><small>This tool provides diagnostic clues, not a guaranteed component-level diagnosis. Confirm with measurements, schematics and known-good comparison.</small></p>';
}
function esc(x){return String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));}