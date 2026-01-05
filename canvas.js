// ========== CANVAS DESIGNER JS (CLEAN, FIXED) ==========
let brandLogoImg = new Image();
brandLogoImg.src = "media/logo.png"; // Path to your brand logo image


let tool = "draw";
let objects = [];
let selectedId = null;
let actionHistory = [], redoHistory = [];
let clipboardObj = null;
let penDown = false, dragOffsetX=0, dragOffsetY=0, dragging = false, resizing = false, rotating = false;
let startX = 0, startY = 0;
let brushSize = 4, strokeColor = "#00eeff", fillColor = "#1e293b", fontFamily = "Poppins", fontSize = 32, bold = false, italic = false;
let tempShape = null, gridSnap = false, showBG = false;

let polygonSides = 5, starPoints = 5, pickingColor = false, previewState = 0;
let resizeDir = null, rotateBase = 0, dragStartAngle = 0;

const canvas = document.getElementById("logoCanvas");
const ctx = canvas.getContext("2d");

// canvas background color for Preview BG (real pixels)
let canvasBgColor = "#000000";
function paintCanvasBackground(color) {
  canvasBgColor = color;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "destination-over";
  ctx.fillStyle = canvasBgColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

const tools = {
  draw: document.getElementById("penTool"),
  eraser: document.getElementById("eraserTool"),
  line: document.getElementById("lineTool"),
  rect: document.getElementById("rectTool"),
  circle: document.getElementById("circleTool"),
  //poly: document.getElementById("polyTool"),
  star: document.getElementById("starTool"),
  text: document.getElementById("textTool"),
  image: document.getElementById("imgTool"),
  picker: document.getElementById("pickerTool"),
};


// ----- Tool Handlers -----
Object.keys(tools).forEach(t => {
  tools[t].onclick = () => {
    tool = t;
    updateToolbar();
    if (tool === "image") document.getElementById("imgInput").click();
    // if (tool === "poly") {
    //   let sides = prompt("Number of polygon sides?", polygonSides);
    //   sides = parseInt(sides);
    //   polygonSides = (!isNaN(sides) && sides >= 3) ? sides : 5;
    // }
    if (tool === "star") {
      let pts = prompt("Number of star points?", starPoints);
      pts = parseInt(pts);
      starPoints = (!isNaN(pts) && pts >= 3) ? pts : 5;
    }
    if (tool === "picker") {
      pickingColor = true;
    }
  };
});
function updateToolbar() {
  Object.keys(tools).forEach(t => tools[t].classList.toggle("active", t === tool));
  document.getElementById("fontProps").style.display = (tool === "text") ? "" : "none";
}
function updateProps() {
  brushSize = +document.getElementById("brushSize").value;
  strokeColor = document.getElementById("strokeColor").value;
  fillColor = document.getElementById("fillColor").value;
  fontFamily = document.getElementById("fontFamily").value;
  fontSize = +document.getElementById("fontSize").value;
}
updateToolbar();


// ----- Layer Rendering -----
function renderLayers() {
  const list = document.getElementById("layersList");
  list.innerHTML = "";
  objects.forEach((obj) => {
    if (!obj) return;
    const li = document.createElement("li");
    li.textContent = (obj.name || obj.type.toUpperCase());
    if (obj.locked) li.textContent += " 🔒";
    if (obj.hidden) li.textContent += " 👁️";
    li.className = (obj.id === selectedId ? "selected" : "");
    li.onclick = () => { selectedId = obj.id; drawAll(); };
    list.appendChild(li);
  });
}
document.getElementById("bringUp").onclick = ()=>{
  if (selectedId === null) return;
  let idx = objects.findIndex(o => o.id === selectedId);
  if (idx < objects.length - 1) [objects[idx], objects[idx+1]] = [objects[idx+1], objects[idx]];
  drawAll(); renderLayers();
};
document.getElementById("sendDown").onclick = ()=>{
  if (selectedId === null) return;
  let idx = objects.findIndex(o => o.id === selectedId);
  if (idx > 0) [objects[idx], objects[idx-1]] = [objects[idx-1], objects[idx]];
  drawAll(); renderLayers();
};
document.getElementById("deleteLayer").onclick = ()=>{
  if (selectedId === null) return;
  let idx = objects.findIndex(o => o.id === selectedId);
  objects.splice(idx, 1); selectedId = null; saveHistory(); drawAll(); renderLayers();
};
document.getElementById("toggleLock").onclick = ()=>{
  if (selectedId === null) return;
  let obj = objects.find(o => o.id === selectedId);
  obj.locked = !obj.locked; drawAll(); renderLayers();
};
document.getElementById("toggleHide").onclick = ()=>{
  if (selectedId === null) return;
  let obj = objects.find(o => o.id === selectedId);
  obj.hidden = !obj.hidden; drawAll(); renderLayers();
};
document.getElementById("brushSize").oninput = updateProps;
document.getElementById("strokeColor").oninput = updateProps;
document.getElementById("fillColor").oninput = updateProps;
document.getElementById("fontFamily").onchange = updateProps;
document.getElementById("fontSize").oninput = updateProps;
document.getElementById("boldBtn").onclick = ()=>{ bold = !bold; };
document.getElementById("italicBtn").onclick = ()=>{ italic = !italic; };


// ----- Canvas Events -----
canvas.onmousedown = e => { penDown = true; handlePointer(e.offsetX, e.offsetY, "down"); };
canvas.onmousemove = e => { handlePointer(e.offsetX, e.offsetY, "move"); };
canvas.onmouseup = e => { penDown = false; handlePointer(e.offsetX, e.offsetY, "up"); };
canvas.onmouseleave = ()=>{ penDown = false; dragging = resizing = rotating = false; };

canvas.addEventListener("touchstart",e=>{
  let r = canvas.getBoundingClientRect();
  let x = e.touches[0].clientX - r.left, y = e.touches[0].clientY - r.top;
  penDown = true; handlePointer(x, y, "down");
}, { passive: false });
canvas.addEventListener("touchmove",e=>{
  let r = canvas.getBoundingClientRect();
  let x = e.touches[0].clientX - r.left, y = e.touches[0].clientY - r.top;
  handlePointer(x, y, "move");
}, {passive: false});
canvas.addEventListener("touchend",()=>{ penDown=false; dragging = resizing = rotating = false; }, {passive: false});


// ----- Color Picker -----
canvas.addEventListener("click", function(e) {
  if (!pickingColor) return;
  const rect = canvas.getBoundingClientRect();
  const [x, y] = [e.clientX - rect.left, e.clientY - rect.top];
  const imgData = ctx.getImageData(x, y, 1, 1).data;
  const hex = '#' + [...imgData].slice(0,3).map(b=>b.toString(16).padStart(2,'0')).join('');
  document.getElementById("strokeColor").value = hex;
  pickingColor = false;
});


// ----- Pointer (Drawing and Manipulation) -----
function handlePointer(x, y, phase="move") {
  updateProps();
  if (phase === "down") {
    startX = x; startY = y;
    if (selectedId) {
      let sel = objects.find(o=>o.id===selectedId);
      if (sel) {
        let {rx, ry, rw, rh, angle} = getObjRect(sel);
        let rotHandle = getHandlePosition(rx, ry, rw, rh, angle, "rot");
        if (dist2(rotHandle.x,rotHandle.y,x,y)<16) {
          rotating = true;
          dragStartAngle = angle;
          rotateBase = Math.atan2(y-(ry+rh/2),x-(rx+rw/2));
          return;
        }
        let resHandle = getResizeHandle(rx, ry, rw, rh, angle, x, y);
        if(resHandle){
          resizing = true;
          resizeDir = resHandle;
          dragOffsetX = x; dragOffsetY = y;
          return;
        }
        if (pointInRotRect(x, y, rx, ry, rw, rh, angle)) {
          dragging = true;
          dragOffsetX = x - (sel.x !== undefined ? sel.x : rx);
          dragOffsetY = y - (sel.y !== undefined ? sel.y : ry);
          return;
        }
      }
    }
    // --- Tool logic ---
    let sel = null;
    for (let i = objects.length-1; i>=0; --i) {
      let o = objects[i];
      if (o.hidden) continue;
      if (hitTest(o,x,y)) { sel=o; break;}
    }
    if (tool === "eraser") {
      objects = objects.filter(o=>!hitTest(o,x,y)); saveHistory(); drawAll(); renderLayers();
      return;
    }
    if (tool === "draw") {
      tempShape = {id:genId(), type:"path", color:strokeColor, size:brushSize, pts:[[x,y]], name:"Draw", angle:0};
      drawAll();
      return;
    }
    if (tool === "star") {
      tempShape = {
        id: genId(),
        type: "star",
        color: strokeColor,
        fill: fillColor,
        size: brushSize,
        x1: x, y1: y, x2: x, y2: y,
        points: starPoints,
        angle: 0,
        name: "Star"
      };
      drawAll();
      return;
    }
    if (tool==="line" || tool==="rect" || tool==="circle") {
      tempShape = {id:genId(), type:tool, color:strokeColor, fill:fillColor, size:brushSize,
        x1:x, y1:y, x2:x, y2:y, angle:0, name:tool.charAt(0).toUpperCase()+tool.slice(1)};
      drawAll();
      return;
    }
    if (tool === "text") {
      let txt = prompt("Enter text:");
      if (!txt) return;

      ctx.font = `${italic?"italic ":""}${bold?"bold ":""}${fontSize}px ${fontFamily}`;
      const metrics = ctx.measureText(txt);
      const textW = metrics.width;
      const textH = fontSize + 12;

      let obj = {
        id: genId(),
        type: "text",
        text: txt,
        color: strokeColor,
        font: fontFamily,
        size: fontSize,
        x: x,
        y: y,
        w: textW,
        h: textH,
        bold,
        italic,
        angle: 0,
        name: "Text"
      };
      objects.push(obj); selectedId = obj.id; saveHistory(); drawAll(); renderLayers();
      return;
    }

    if (tool === "image") { return; }
    if(sel && !sel.locked){ selectedId=sel.id; drawAll(); renderLayers(); }
    else { selectedId=null; drawAll(); renderLayers();}
  }
  if (phase === "move") {
    if (dragging && selectedId) {
      let obj = objects.find(o=>o.id===selectedId);
      if (obj) {
        let nx = x - dragOffsetX, ny = y - dragOffsetY;
        if ("x" in obj && "y" in obj) { obj.x = nx; obj.y = ny; }
        if ("x1" in obj && "x2" in obj && "y1" in obj && "y2" in obj) {
          let dx = x-dragOffsetX-obj.x1, dy = y-dragOffsetY-obj.y1;
          obj.x1 += dx; obj.x2 += dx; obj.y1 += dy; obj.y2 += dy;
        }
        drawAll();
      }
      return;
    }
    if (resizing && selectedId) {
      let obj = objects.find(o=>o.id===selectedId);
      if (obj) {
        resizeObj(obj, x, y, resizeDir, dragOffsetX, dragOffsetY);
        dragOffsetX = x; dragOffsetY = y;
        drawAll();
      }
      return;
    }
    if (rotating && selectedId) {
      let obj = objects.find(o=>o.id===selectedId);
      if (obj) {
        let {rx, ry, rw, rh} = getObjRect(obj);
        let cx = rx + rw/2, cy = ry + rh/2;
        let a0 = rotateBase, a1 = Math.atan2(y-cy, x-cx);
        obj.angle = dragStartAngle + a1 - a0;
        drawAll();
      }
      return;
    }
    if (tool==="draw" && tempShape && penDown) {
      tempShape.pts.push([x,y]);
      drawAll();
      drawObj(tempShape,"temp");
      return;
    }
    if (["line","rect","circle","star"].includes(tool) && tempShape && penDown) {
      tempShape.x2 = x; tempShape.y2 = y;
      drawAll();
      drawObj(tempShape,"temp");
      return;
    }
  }
  if (phase === "up") {
    dragging = resizing = rotating = false;
    if (tool === "draw" && tempShape) {
      objects.push(tempShape); tempShape = null; saveHistory(); drawAll(); renderLayers();
      return;
    }
    if (["line","rect","circle","star"].includes(tool) && tempShape) {
      tempShape.x2 = x; tempShape.y2 = y;
      objects.push(Object.assign({}, tempShape)); tempShape = null; saveHistory(); drawAll(); renderLayers();
      return;
    }
  }
}


// ----- Geometry helpers -----
function getObjRect(o) {
  if (o.type === "rect" || o.type === "star" || o.type === "circle" || o.type === "line") {
    let x1 = o.x1, y1 = o.y1, x2 = o.x2, y2 = o.y2;
    let rx = Math.min(x1, x2);
    let ry = Math.min(y1, y2);
    let rw = Math.abs(x2 - x1);
    let rh = Math.abs(y2 - y1);
    return { rx, ry, rw, rh, angle: o.angle || 0 };
  }

  if (o.type === "text") {
    let w = o.w || (o.text.length * o.size);
    let h = o.h || (o.size + 12);
    let rx = o.x;
    let ry = o.y - h;   // text baseline -> box top
    return { rx, ry, rw: w, rh: h, angle: o.angle || 0 };
  }

  if (o.type === "image") {
    let w = o.w || 120;
    let h = o.h || 90;
    let rx = o.x;
    let ry = o.y;
    return { rx, ry, rw: w, rh: h, angle: o.angle || 0 };
  }

  return { rx: o.x1 || 0, ry: o.y1 || 0, rw: 50, rh: 50, angle: o.angle || 0 };
}
function pointInRotRect(x, y, rx, ry, rw, rh, ang) {
  let cx=rx+rw/2, cy=ry+rh/2;
  let dx=x-cx, dy=y-cy;
  let a = -ang;
  let tx = dx*Math.cos(a)-dy*Math.sin(a), ty=dx*Math.sin(a)+dy*Math.cos(a);
  return (Math.abs(tx)<=rw/2 && Math.abs(ty)<=rh/2);
}
function dist2(x1,y1,x2,y2){ return Math.hypot(x1-x2,y1-y2);}
function getHandlePosition(x,y,w,h,a,type){
  let cx=x+w/2, cy=y+h/2;
  let px=cx, py=cy;
  if (type==="nw") { px=x; py=y; }
  if (type==="ne") { px=x+w; py=y; }
  if (type==="sw") { px=x; py=y+h; }
  if (type==="se") { px=x+w; py=y+h; }
  if (type==="rot") { px=cx; py=y-28; }
  let dx=px-cx, dy=py-cy, ang=-a;
  let rx=cx+dx*Math.cos(ang)-dy*Math.sin(ang), ry=cy+dx*Math.sin(ang)+dy*Math.cos(ang);
  return {x:rx,y:ry};
}
function getResizeHandle(x,y,w,h,a,mx,my) {
  const handles=["nw","ne","se","sw"];
  for(let hname of handles) {
    let pos = getHandlePosition(x,y,w,h,a,hname);
    if (dist2(mx,my,pos.x,pos.y)<14) return hname;
  }
  return null;
}
function resizeObj(o, x, y, dir, ox, oy) {
  let dtx=x-ox, dty=y-oy;
  if (["rect","star","circle","line"].includes(o.type)) {
    if(dir==="se"){ o.x2+=dtx; o.y2+=dty;}
    if(dir==="sw"){ o.x1+=dtx; o.y2+=dty;}
    if(dir==="ne"){ o.x2+=dtx; o.y1+=dty;}
    if(dir==="nw"){ o.x1+=dtx;o.y1+=dty;}
  }
  if (o.type==="image"||o.type==="text") {
    if (dir==="se"){ o.w=(o.w||120)+dtx; o.h=(o.h||90)+dty; }
    if (dir==="sw"){ o.x+=dtx; o.w-=(dtx); o.h=(o.h||90)+dty;}
    if (dir==="ne"){ o.y+=dty; o.h-=(dty); o.w=(o.w||120)+dtx;}
    if (dir==="nw"){ o.x+=dtx;o.w-=(dtx);o.y+=dty;o.h-=(dty);}
    if (o.w < 1) o.w = 1;
    if (o.h < 1) o.h = 1;
  }
}
function hitTest(o,x,y) {
  if (o.type==="path") {
    return o.pts.some(([px,py])=>Math.abs(px-x)<7 && Math.abs(py-y)<7);
  }
  if (o.type==="circle") {
    let r = Math.hypot(o.x2-o.x1,o.y2-o.y1);
    return Math.hypot(x-o.x1,y-o.y1) <= r;
  }
  let {rx, ry, rw, rh} = getObjRect(o);
  return (x>=rx && x<=rx+rw && y>=ry && y<=ry+rh);
}
function pointLineDist(x1,y1,x2,y2,x0,y0) {
  let t = ((x0-x1)*(x2-x1)+(y0-y1)*(y2-y1))/((x2-x1)**2+(y2-y1)**2);
  t = Math.max(0,Math.min(1,t));
  let xp=x1+t*(x2-x1), yp=y1+t*(y2-y1);
  return Math.sqrt((x0-xp)**2+(y0-yp)**2);
}
function genId() { return Math.random().toString(36).slice(2); }


// ----- Drawing -----
function drawObj(o,tmp) {
  if (o.hidden && !tmp) return;
  ctx.save();
  if (o.angle) {
    let rc = getObjRect(o);
    ctx.translate(rc.rx+rc.rw/2, rc.ry+rc.rh/2);
    ctx.rotate(o.angle);
    ctx.translate(-(rc.rx+rc.rw/2), -(rc.ry+rc.rh/2));
  }
  if (o.type=="rect") {
    ctx.lineWidth = o.size; ctx.strokeStyle=o.color;
    ctx.beginPath();
    ctx.rect(o.x1,o.y1,o.x2-o.x1,o.y2-o.y1);
    if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
    ctx.stroke();
  } else if (o.type=="circle") {
    ctx.lineWidth = o.size; ctx.strokeStyle=o.color;
    let r = Math.hypot(o.x2-o.x1,o.y2-o.y1);
    ctx.beginPath(); ctx.arc(o.x1,o.y1,r,0,Math.PI*2);
    if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
    ctx.stroke();
  } else if (o.type=="line") {
    ctx.lineWidth = o.size; ctx.strokeStyle=o.color;
    ctx.beginPath(); ctx.moveTo(o.x1,o.y1); ctx.lineTo(o.x2,o.y2); ctx.stroke();
  } else if (o.type=="text") {
    ctx.font = `${o.italic?"italic ":""}${o.bold?"bold ":""}${o.size}px ${o.font}`;
    ctx.fillStyle = o.color;
    ctx.fillText(o.text, o.x, o.y, o.w || undefined);
  } else if (o.type=="path") {
    ctx.strokeStyle=o.color; ctx.lineWidth=o.size;
    ctx.beginPath();
    o.pts.forEach(([x,y],i)=>i===0?ctx.moveTo(x,y):ctx.lineTo(x,y));
    ctx.stroke();
  } else if (o.type=="image" && o.img) {
    ctx.drawImage(o.img,o.x,o.y,o.w || 120,o.h || 90);
  } else if (o.type=="star") {
    let cx = (o.x1 + o.x2) / 2, cy = (o.y1 + o.y2) / 2;
    let rOuter = Math.max(Math.abs(o.x2-o.x1),Math.abs(o.y2-o.y1))/2;
    let rInner = rOuter * 0.5;
    let n = o.points || 5;
    ctx.beginPath();
    for (let i=0;i<n*2;i++) {
      let r = (i%2===0) ? rOuter : rInner;
      let theta = Math.PI * i / n - Math.PI/2;
      let x = cx + r * Math.cos(theta), y = cy + r * Math.sin(theta);
      if(i===0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    }
    ctx.closePath();
    if(o.fill) { ctx.fillStyle = o.fill; ctx.fill(); }
    ctx.strokeStyle = o.color; ctx.lineWidth = o.size; ctx.fill(); ctx.stroke();
  }
  ctx.restore();

  // Draw selection handles if selected
  if (!tmp && o.id === selectedId) {
    let {rx, ry, rw, rh, angle} = getObjRect(o);
    ctx.save();
    ctx.strokeStyle="#00eeff"; ctx.lineWidth=2.2;
    ctx.setLineDash([6,6]);
    ctx.translate(rx+rw/2, ry+rh/2); ctx.rotate(angle); ctx.translate(-rx-rw/2, -ry-rh/2);
    ctx.strokeRect(rx, ry, rw, rh);
    ctx.setLineDash([]);
    let hs = ["nw", "ne", "se", "sw"];
    hs.forEach(h => {
      let p = getHandlePosition(rx, ry, rw, rh, angle, h);
      ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, 2*Math.PI);
      ctx.fillStyle = "#00eeff"; ctx.fill(); ctx.stroke();
    });
    let rotP = getHandlePosition(rx, ry, rw, rh, angle, "rot");
    ctx.beginPath(); ctx.arc(rotP.x, rotP.y, 7, 0, 2*Math.PI);
    ctx.fillStyle = "#ffa726"; ctx.fill(); ctx.stroke();
    ctx.restore();
  }
}
function drawLogoImageBottomRight() {
  if (!brandLogoImg.complete || brandLogoImg.naturalWidth === 0) return;
  ctx.save();
  let margin = 28;
  let logoW = Math.round(canvas.width * 0.16);
  let logoH = Math.round(logoW * brandLogoImg.naturalHeight / brandLogoImg.naturalWidth);
  let x = canvas.width - logoW - margin;
  let y = canvas.height - logoH - margin;
  ctx.globalAlpha = 0.90;
  ctx.shadowColor = "#0ef";
  ctx.shadowBlur = 13;
  ctx.drawImage(brandLogoImg, x, y, logoW, logoH);
  ctx.restore();
}


function drawGrid() {
  if (!gridSnap) return;
  ctx.save();
  ctx.strokeStyle = "#d2faff44";
  ctx.lineWidth = 1;
  for(let i=0; ianvas.width; i+=40){
    ctx.beginPath();
    ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
  }
  ctx.restore();
}


function drawAll() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  paintCanvasBackground(canvasBgColor);
  objects.forEach(o=>drawObj(o));
  if (tempShape) drawObj(tempShape,"temp");
  drawGrid();
  drawLogoImageBottomRight();
}


// ----- History / UI -----
function saveHistory() {
  actionHistory.push(JSON.stringify(objects));
  redoHistory = [];
}
function undo() {
  if (actionHistory.length>1) {
    redoHistory.push(actionHistory.pop());
    objects = JSON.parse(actionHistory[actionHistory.length-1]);
    selectedId=null;
    drawAll(); renderLayers();
  }
}
function redo() {
  if (redoHistory.length) {
    let redoA = redoHistory.pop();
    actionHistory.push(redoA);
    objects = JSON.parse(redoA);
    selectedId=null;
    drawAll(); renderLayers();
  }
}
document.getElementById("undoBtn").onclick = undo;
document.getElementById("redoBtn").onclick = redo;
document.getElementById("clearBtn").onclick = ()=>{
  objects=[]; selectedId=null; saveHistory(); drawAll(); renderLayers();
};
document.getElementById("copyBtn").onclick = function(){
  if(selectedId){
    clipboardObj = JSON.parse(JSON.stringify(objects.find(o=>o.id===selectedId)));
  }
};
document.getElementById("pasteBtn").onclick = function(){
  if(clipboardObj){
    let nCopy = JSON.parse(JSON.stringify(clipboardObj));
    nCopy.id=genId(); nCopy.x+=(Math.random()*30+20); nCopy.y+=(Math.random()*20+20);
    objects.push(nCopy); selectedId=nCopy.id; saveHistory(); drawAll();renderLayers();
  }
};
document.getElementById("imgInput").onchange = function(e){
  let file = e.target.files[0]; if(!file) return;
  let url = URL.createObjectURL(file); let img = new window.Image();
   img.onload = function(){
    // limit image size on the pad
    const maxW = canvas.width * 0.5;   // at most half canvas width
    const maxH = canvas.height * 0.5;  // at most half canvas height

    let w = img.width;
    let h = img.height;

    const scale = Math.min(maxW / w, maxH / h, 1); // never scale up
    w = w * scale;
    h = h * scale;

    let obj = {
      id: genId(),
      type: "image",
      img: img,
      x: 40 + Math.random() * 60,
      y: 40 + Math.random() * 40,
      w: w,
      h: h,
      name: file.name,
      angle: 0
    };
    objects.push(obj); selectedId = obj.id; saveHistory(); drawAll(); renderLayers();
    URL.revokeObjectURL(url);
  };

  img.src = url;
};
document.getElementById("snapBtn").onclick = function(){
  gridSnap = !gridSnap;
  drawAll();
};
document.getElementById("exportPng").onclick = function(){
  let url = canvas.toDataURL("image/png");
  let a = document.createElement('a'); a.href = url; a.download = "logo.png"; a.click();
};
document.getElementById("exportSvg").onclick = function(){
  let svg = [`<svg xmlns="http://www.w3.org/2000/svg" width="${canvas.width}" height="${canvas.height}">`];
  for(let o of objects){
    if (o.type=="rect") svg.push(`<rect x="${o.x1}" y="${o.y1}" width="${o.x2-o.x1}" height="${o.y2-o.y1}" fill="${o.fill||'none'}" stroke="${o.color}" stroke-width="${o.size}"/>`);
    if (o.type=="circle") {
      let r=Math.hypot(o.x2-o.x1,o.y2-o.y1);
      svg.push(`ircle cx="${o.x1}" cy="${o.y1}" r="${r}" fill="${o.fill||'none'}" stroke="${o.color}" stroke-width="${o.size}"/>`);
    }
    if (o.type=="line") svg.push(`<line x1="${o.x1}" y="${o.y1}" x2="${o.x2}" y2="${o.y2}" stroke="${o.color}" stroke-width="${o.size}"/>`);
    if (o.type=="text") svg.push(`<text x="${o.x}" y="${o.y}" font-size="${o.size}" font-family="${o.font}" fill="${o.color}">${o.text}</text>`);
    if (o.type=="path") {
      let d = o.pts.map((p,i)=>(i==0?"M":"L")+p[0]+" "+p[1]).join(" ");
      svg.push(`<path d="${d}" fill="none" stroke="${o.color}" stroke-width="${o.size}"/>`);
    }
    if (o.type=="star") {
      let cx = (o.x1 + o.x2) / 2, cy = (o.y1 + o.y2) / 2;
      let rOuter = Math.max(Math.abs(o.x2-o.x1),Math.abs(o.y2-o.y1))/2;
      let rInner = rOuter * 0.5;
      let n = o.points||5, pts=[];
      for (let i=0;i<n*2;i++) {
        let r = (i%2===0) ? rOuter : rInner;
        let theta = Math.PI*i/n - Math.PI/2;
        let x = cx + r * Math.cos(theta), y = cy + r * Math.sin(theta);
        pts.push([x,y]);
      }
      svg.push(`<polygon points="${pts.map(([x,y])=>`${x},${y}`).join(" ")}" fill="${o.fill||'none'}" stroke="${o.color}" stroke-width="${o.size}"/>`);
    }
  }
  svg.push("</svg>");
  let b = new Blob([svg.join("")], {type: "image/svg+xml"});
  let u = URL.createObjectURL(b); let a = document.createElement('a'); a.href=u; a.download="logo.svg"; a.click(); URL.revokeObjectURL(u);
};


function refreshDraftsList() {
  let list = document.getElementById("draftsList");
  let drafts = Object.keys(localStorage).filter(k=>k.startsWith("logoDraft_"));
  list.innerHTML = "";
  drafts.forEach(key=>{
    let opt = document.createElement("option");
    opt.value = key; opt.textContent = key.replace("logoDraft_","");
    list.appendChild(opt);
  });
}
document.getElementById("saveDraftBtn").onclick = function(){
  let name = document.getElementById("draftName").value.trim();
  if (!name) { alert("Enter a name!"); return; }
  localStorage.setItem("logoDraft_" + name, JSON.stringify(objects));
  refreshDraftsList();
};
document.getElementById("loadDraftBtn").onclick = function(){
  let key = document.getElementById("draftsList").value;
  if (!key) { alert("No draft selected."); return; }
  let data = localStorage.getItem(key);
  if (!data) return;
  objects = JSON.parse(data);
  selectedId = null;
  saveHistory();
  drawAll(); renderLayers();
};
document.getElementById("deleteDraftBtn").onclick = function(){
  let key = document.getElementById("draftsList").value;
  if (!key) { alert("No draft selected."); return; }
  if (!confirm("Delete this draft?")) return;
  localStorage.removeItem(key);
  refreshDraftsList();
};
document.getElementById("themeToggle").onclick = function() {
  document.body.classList.toggle("light");
  this.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
};
document.getElementById("bgBtn").onclick = ()=>{
  previewState=(previewState+1)%3;
  if(previewState===0) paintCanvasBackground("#ffffff");
  if(previewState===1) paintCanvasBackground("#000000");
  if(previewState===2) paintCanvasBackground("#222233");
  drawAll();
};


function mainInit() {
  objects = [];
  tempShape = null;
  actionHistory = [];
  selectedId = null;
  previewState = 1;
  canvasBgColor = "#000000";
  saveHistory();
  drawAll();
  renderLayers();
  refreshDraftsList();
}


brandLogoImg.onload = function() { drawAll(); };
window.onload = function() { drawAll(); };
mainInit();
// ========== jQuery UI Animations ==========
$(function () {
  // Slide the Layers panel when clicking on "Layers" title
  $(".panel-title").on("click", function () {
    const $panel = $("#layerPanel");

    if ($panel.hasClass("hidden")) {
      // Show: remove hidden, then small opacity animation for smoothness
      $panel.removeClass("hidden").stop(true, false).animate({ opacity: 1 }, 150);
    } else {
      // Hide: quick fade then add hidden class to slide out
      $panel.stop(true, false).animate({ opacity: 0.3 }, 150, function () {
        $panel.addClass("hidden");
        $panel.css("opacity", 0.2); // keep low until next show
      });
    }
  });

  // Soft hover animation on tool buttons
  $(".tool-btn").hover(
    function () {
      $(this).stop(true, false).animate(
        { paddingLeft: "16px" }, // move slightly right
        120
      );
    },
    function () {
      $(this).stop(true, false).animate(
        { paddingLeft: "13px" }, // back to original in your CSS
        120
      );
    }
  );
});

// ========== END OF CANVAS DESIGNER JS ==========
