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
      function defaultPlay(){
        if (event.key === ' ') {
            gainNodeMain.gain.setValueAtTime(0.5,aContext.currentTime)
        }
      }
      function defaultStop(){
        if (event.key === ' ') {
            gainNodeMain.gain.setValueAtTime(0,aContext.currentTime)
        }
      }
    window.addEventListener('keydown', defaultPlay);
    
    window.addEventListener('keyup', defaultStop);
    osc1.start()
/*     osc2.start(); */

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
    function frequencyHandler(){
        frequencyKnob(rotation1,osc1)
        frequencyKnob(rotation2,osc2) 
    }
    window.addEventListener('mousemove', frequencyHandler)

    let btnC = document.getElementById('btn-c')
    let btnCX = document.getElementById('btn-c#')
    let btnD = document.getElementById('btn-d')
    let btnDX = document.getElementById('btn-d#')
    let btnE = document.getElementById('btn-e')
    let btnF = document.getElementById('btn-f')
    let btnFX = document.getElementById('btn-f#')
    let btnG = document.getElementById('btn-g')
    let btnGX = document.getElementById('btn-g#')
    let btnA = document.getElementById('btn-a')
    let btnAX = document.getElementById('btn-a#')
    let btnB = document.getElementById('btn-b')

    let notesFrequency = {
        C5: 523.25,
        CX5: 554.37,
        D5: 587.33,
        DX5: 622.25,
        E5: 659.25,
        F5: 698.46,
        FX5: 739.99,
        G5: 783.99,
        GX5: 830.61,
        A5: 880.00,
        AX5: 932.33,
        B5: 987.77
    };
    


    let divTextC = document.getElementById('key-c')
    let divTextCX = document.getElementById('key-c#')
    let divTextD = document.getElementById('key-d')
    let divTextDX = document.getElementById('key-d#')
    let divTextE = document.getElementById('key-e')
    let divTextF = document.getElementById('key-f')
    let divTextFX = document.getElementById('key-f#')
    let divTextG = document.getElementById('key-g')
    let divTextGX = document.getElementById('key-g#')
    let divTextA = document.getElementById('key-a')
    let divTextAX = document.getElementById('key-a#')
    let divTextB = document.getElementById('key-b')
    

    let keyMatchBtn = document.getElementById('keyMatch')
    let keyMatchON = 0;

    keyMatchBtn.addEventListener('click', () => {
        if (keyMatchON === 0) {
            window.removeEventListener('keydown', defaultPlay);
            window.removeEventListener('keyup', defaultStop);
            window.removeEventListener('mousemove', frequencyHandler);
            keyMatchON = 1;
            keyMatchBtn.style.backgroundColor = 'red';
            MatchAll()
        } else {
            window.addEventListener('keyup', defaultStop);
            window.addEventListener('keydown', defaultPlay);
            window.addEventListener('mousemove', frequencyHandler);
            keyMatchON = 0;
            keyMatchBtn.style.backgroundColor = 'white';

            
        }
        console.log(keyMatchON)
    });

    function MatchAll(){
        Matching(btnC,notesFrequency.C5, divTextC);
        Matching(btnCX,notesFrequency.CX5, divTextCX);
        Matching(btnD,notesFrequency.D5, divTextD);
        Matching(btnDX,notesFrequency.DX5, divTextDX);
        Matching(btnE,notesFrequency.E5, divTextE);
        Matching(btnF,notesFrequency.F5, divTextF);
        Matching(btnFX,notesFrequency.FX5, divTextFX);
        Matching(btnG,notesFrequency.G5, divTextG);
        Matching(btnGX,notesFrequency.GX5, divTextGX);
        Matching(btnA,notesFrequency.A5, divTextA);
        Matching(btnAX,notesFrequency.AX5, divTextAX);
        Matching(btnB,notesFrequency.B5, divTextB);

    }

    function Matching(btn , frequency, divText){
        btn.addEventListener('click', ()=>{
            let assignedKey = null
            const keyPressHandler = (event) =>{
               assignedKey = event.key
               console.log(assignedKey)
/*                window.removeEventListener('keypress', keyPressHandler)
 */            }
    
            window.addEventListener('keypress', keyPressHandler, {once: true})
            
            window.addEventListener('keydown', (event)=>{
                if(event.key == assignedKey && keyMatchON == 1){
    
                    gainNodeMain.gain.setValueAtTime(0.5,aContext.currentTime)
                    osc1.frequency.setValueAtTime(frequency,aContext.currentTime)
                    osc2.frequency.setValueAtTime(frequency,aContext.currentTime)
                    divText.textContent = assignedKey
    
                }
            })
            window.addEventListener('keyup', (event)=>{
                if(event.key == assignedKey){
                    gainNodeMain.gain.setValueAtTime(0,aContext.currentTime)
                }
            })
        })
    }
}







document.addEventListener('click', startAudio, {once: true})

