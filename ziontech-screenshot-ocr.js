
/* ZIONTECH Screenshot OCR Extension v1.0
   Screenshot -> OCR -> panic extraction -> existing analyzer.
   Add this script after panic-analyzer.js.
*/
(() => {
"use strict";
const input=document.getElementById("panicInput");
const file=document.getElementById("panicFile");
const result=document.getElementById("result");
if(!input||!file||!result)return;

let ocrBox=document.getElementById("ziontechOcrBox");
if(!ocrBox){
  ocrBox=document.createElement("div");
  ocrBox.id="ziontechOcrBox";
  ocrBox.style.cssText="margin:15px 0;padding:16px;border:1px solid #dbe3ea;border-radius:12px;background:#fff;";
  file.parentNode.insertBefore(ocrBox,file);
}
ocrBox.innerHTML=`
  <div style="font-weight:700;margin-bottom:8px">📸 Screenshot Panic Reader</div>
  <div style="font-size:13px;margin-bottom:10px;color:#555">
    Upload an iPhone panic-log screenshot. ZIONTECH will extract the text in your browser
    and place it into the analyzer.
  </div>
  <input id="ziontechScreenshot" type="file" accept="image/png,image/jpeg,image/webp,image/jpg"
    style="width:100%;padding:8px">
  <div id="ziontechOcrStatus" style="margin-top:10px;font-size:13px"></div>
  <progress id="ziontechOcrProgress" value="0" max="1" style="width:100%;display:none;margin-top:8px"></progress>
`;

const shot=document.getElementById("ziontechScreenshot");
const status=document.getElementById("ziontechOcrStatus");
const progress=document.getElementById("ziontechOcrProgress");

function loadTesseract(){
 return new Promise((resolve,reject)=>{
   if(window.Tesseract)return resolve(window.Tesseract);
   const s=document.createElement("script");
   s.src="https://cdn.jsdelivr.net/npm/tesseract.js@5/dist/tesseract.min.js";
   s.onload=()=>resolve(window.Tesseract);
   s.onerror=()=>reject(new Error("OCR library could not be loaded"));
   document.head.appendChild(s);
 });
}

function cleanOCR(text){
 return text
   .replace(/\r/g,"\n")
   .replace(/[ \t]+/g," ")
   .replace(/\n{3,}/g,"\n\n")
   .trim();
}

function extractUseful(text){
 const lines=text.split("\n").map(x=>x.trim()).filter(Boolean);
 const keep=lines.filter(x=>/panic|watchdog|sensor|smc|aop|ans2|nand|baseband|thermal|i2c|kernel|cpu|sep|product|model|iphone|missing|backtrace|debugger/i.test(x));
 return keep.length>=3 ? keep.join("\n") : text;
}

shot.addEventListener("change",async()=>{
 const f=shot.files?.[0]; if(!f)return;
 status.textContent="Loading OCR engine…";
 progress.style.display="block"; progress.value=0;
 try{
   const T=await loadTesseract();
   status.textContent="Reading screenshot…";
   const out=await T.recognize(f,"eng",{
     logger:m=>{
       if(typeof m.progress==="number")progress.value=m.progress;
       if(m.status)status.textContent="OCR: "+m.status;
     }
   });
   const text=cleanOCR(out.data.text||"");
   if(!text){
     status.textContent="No readable text detected. Try a clearer screenshot.";
     return;
   }
   const useful=extractUseful(text);
   input.value=useful;
   status.textContent="✅ OCR complete. Panic text extracted. Click Analyze Panic Log.";
   result.innerHTML=`<div class="finding"><b>OCR extracted ${text.length} characters.</b><br>
   Review the extracted text before diagnosis. OCR can misread characters such as
   <code>0/O</code>, <code>1/I</code>, and hexadecimal values.</div>`;
   // Keep the complete OCR in a hidden field for copy/debugging.
   input.dataset.ocrFullText=text;
 }catch(e){
   console.error(e);
   status.textContent="OCR failed. Check your internet connection and try again.";
 }finally{
   progress.style.display="none";
 }
});
})();
