const knob = document.getElementById('knob');
const knob2 = document.getElementById('knob2')
const marker = document.getElementById('marker');
const marker2 = document.getElementById('marker2')

let rotation1 = 0; 
let rotation2 = 0;
let isDragging1 = false;
let isDragging2 = false;

knob.addEventListener('mousedown', startDrag1);
window.addEventListener('mouseup', endDrag1);
window.addEventListener('mousemove', drag1);

function startDrag1(e) {
  isDragging1 = true;
}

function endDrag1() {
  isDragging1 = false;
}

function drag1(e) {
  if (isDragging1) {
    const knobRect = knob.getBoundingClientRect();
    const knobCenterX = knobRect.left + knobRect.width / 2;
    const knobCenterY = knobRect.top + knobRect.height / 2;
    const angle = Math.atan2(e.clientY - knobCenterY, e.clientX - knobCenterX);
    let angleDeg = angle * (180 / Math.PI);
    if (angleDeg < 0) {
      angleDeg += 360; 
    }
    rotation1 = ((angleDeg + 90) % 360).toFixed(0); 
    marker.style.transform = `rotate(${rotation1}deg)`;
    updateOtherParameter();
  }
}

knob2.addEventListener('mousedown', startDrag2);
window.addEventListener('mouseup', endDrag2);
window.addEventListener('mousemove', drag2);

function startDrag2(e) {
  isDragging2 = true;
}

function endDrag2() {
  isDragging2 = false;
}

function drag2(e) {
  if (isDragging2) {
    const knobRect = knob2.getBoundingClientRect();
    const knobCenterX = knobRect.left + knobRect.width / 2;
    const knobCenterY = knobRect.top + knobRect.height / 2;
    const angle = Math.atan2(e.clientY - knobCenterY, e.clientX - knobCenterX);
    let angleDeg = angle * (180 / Math.PI);
    if (angleDeg < 0) {
      angleDeg += 360; 
    }
    rotation2 = ((angleDeg + 90) % 360).toFixed(0); 
    marker2.style.transform = `rotate(${rotation2}deg)`;
    updateOtherParameter();
  }
}

function updateOtherParameter() {
}


document.addEventListener('mousemove', () =>{
  console.log('This is Rotation 1: ' + rotation1)
  console.log('This is Rotation 2: ' + rotation2)
})
export { updateOtherParameter, rotation1, rotation2, knob };