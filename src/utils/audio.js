let audioCtx;
let masterGain;
let isMutedGlobal = true;
let isInitialized = false;

export const initAudio = () => {
  if (isInitialized) return;
  isInitialized = true;

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  masterGain = audioCtx.createGain();
  masterGain.gain.value = 0;
  masterGain.connect(audioCtx.destination);

  // Drone Osc 1 (Low C)
  const osc1 = audioCtx.createOscillator();
  osc1.type = 'sine';
  osc1.frequency.value = 65.41;

  // Drone Osc 2 (Beating)
  const osc2 = audioCtx.createOscillator();
  osc2.type = 'triangle';
  osc2.frequency.value = 65.8;

  // Drone Osc 3 (Fifth - G)
  const osc3 = audioCtx.createOscillator();
  osc3.type = 'sine';
  osc3.frequency.value = 98.00;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 400;

  // LFO for filter sweep
  const lfo = audioCtx.createOscillator();
  lfo.type = 'sine';
  lfo.frequency.value = 0.05; // very slow 20s cycle
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 200;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);

  osc1.connect(filter);
  osc2.connect(filter);
  osc3.connect(filter);
  filter.connect(masterGain);

  osc1.start();
  osc2.start();
  osc3.start();
  lfo.start();

  // Setup global hover listener for buttons and links
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.glass-card') || e.target.closest('.feature-item')) {
      playHoverSound();
    }
  });
};

export const toggleMute = (isMuted) => {
  isMutedGlobal = isMuted;
  if (!isInitialized) initAudio();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const now = audioCtx.currentTime;
  masterGain.gain.cancelScheduledValues(now);

  if (isMuted) {
    masterGain.gain.linearRampToValueAtTime(0, now + 2); // 2 second fade out
  } else {
    masterGain.gain.linearRampToValueAtTime(0.4, now + 5); // 5 second gentle fade in
  }
};

export const playHoverSound = () => {
  if (!audioCtx || isMutedGlobal) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  const now = audioCtx.currentTime;

  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(0.05, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(now);
  osc.stop(now + 0.15);
};
