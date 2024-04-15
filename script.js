import { updateOtherParameter, rotation1, rotation2, knob } from './knob.js';
let aContext; 
const startAudio = () =>{
    aContext = new AudioContext();
    let gainNodeMain = aContext.createGain()
    
    const osc1 = aContext.createOscillator();
    osc1.connect(gainNodeMain)
    
    const osc2 = aContext.createOscillator();
    osc2.connect(gainNodeMain)
    gainNodeMain.connect(aContext.destination)
    
    aContext.addEventListener('statechange', () => {
        if (aContext.state === 'running') {
            // Kontekst audio jest gotowy, możemy ustawić głośność
            gainNodeMain.gain.setValueAtTime(0, aContext.currentTime);
        }
    });
      
    window.addEventListener('keydown', (event) => { 
        if (event.key === ' ') {
            gainNodeMain.gain.setValueAtTime(0.5,aContext.currentTime)
        }
    });
    
    window.addEventListener('keyup', (event) => {
        if (event.key === ' ') {
            gainNodeMain.gain.setValueAtTime(0,aContext.currentTime)
        }
    });
    osc1.start()
    osc2.start();

    let waveArray = ['sine', 'square', 'sawtooth', 'triangle']

    function waveSet(osc, waveinput){

        osc.type = waveArray[waveinput];
    }

document.addEventListener('mousemove', ()=>{
    let waveInputOsc1 = document.getElementById('waveinputosc1').value
    let waveInputOsc2 = document.getElementById('waveinputosc2').value
    waveSet(osc1, waveInputOsc1)
    waveSet(osc2, waveInputOsc2)
})


osc2.type = 'sine';

    function frequencyKnob(rotation, osc){

        const minFrequency = 20;
        const maxFrequency = 2000;
        const frequencyRange = maxFrequency - minFrequency;
        const frequency = minFrequency + (rotation / 360) * frequencyRange;
        osc.frequency.value = frequency;
    }

    window.addEventListener('mousemove', () =>{
        frequencyKnob(rotation1, osc1)
        frequencyKnob(rotation2, osc2)
    })


}







document.addEventListener('click', startAudio, {once: true})




 

 

