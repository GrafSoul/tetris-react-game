import { useCallback, useRef } from 'react';

type SoundType = 'move' | 'rotate' | 'drop' | 'land' | 'clear' | 'tetris' | 'gameOver' | 'levelUp';

const audioContextRef = { current: null as AudioContext | null };

const getAudioContext = (): AudioContext => {
  if (!audioContextRef.current) {
    audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (audioContextRef.current.state === 'suspended') {
    audioContextRef.current.resume();
  }
  return audioContextRef.current;
};

const playTone = (
  frequency: number,
  duration: number,
  type: OscillatorType = 'square',
  volume: number = 0.3,
  decay: boolean = true
) => {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  if (decay) {
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
  }

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
};

const playSequence = (notes: { freq: number; duration: number; delay: number }[], type: OscillatorType = 'square') => {
  notes.forEach(({ freq, duration, delay }) => {
    setTimeout(() => {
      playTone(freq, duration, type, 0.2);
    }, delay * 1000);
  });
};

const sounds: Record<SoundType, () => void> = {
  move: () => {
    playTone(200, 0.05, 'square', 0.15);
  },
  rotate: () => {
    playTone(300, 0.08, 'square', 0.2);
    setTimeout(() => playTone(400, 0.06, 'square', 0.15), 40);
  },
  drop: () => {
    playTone(150, 0.1, 'square', 0.25);
    setTimeout(() => playTone(100, 0.15, 'square', 0.2), 50);
  },
  land: () => {
    playTone(180, 0.12, 'triangle', 0.3);
  },
  clear: () => {
    playSequence([
      { freq: 523, duration: 0.1, delay: 0 },
      { freq: 659, duration: 0.1, delay: 0.08 },
      { freq: 784, duration: 0.15, delay: 0.16 },
    ], 'square');
  },
  tetris: () => {
    playSequence([
      { freq: 523, duration: 0.1, delay: 0 },
      { freq: 659, duration: 0.1, delay: 0.1 },
      { freq: 784, duration: 0.1, delay: 0.2 },
      { freq: 1047, duration: 0.3, delay: 0.3 },
    ], 'square');
  },
  gameOver: () => {
    playSequence([
      { freq: 392, duration: 0.2, delay: 0 },
      { freq: 330, duration: 0.2, delay: 0.2 },
      { freq: 262, duration: 0.4, delay: 0.4 },
    ], 'sawtooth');
  },
  levelUp: () => {
    playSequence([
      { freq: 440, duration: 0.1, delay: 0 },
      { freq: 554, duration: 0.1, delay: 0.1 },
      { freq: 659, duration: 0.1, delay: 0.2 },
      { freq: 880, duration: 0.2, delay: 0.3 },
    ], 'square');
  },
};

export const useSound = () => {
  const enabledRef = useRef(true);

  const play = useCallback((sound: SoundType) => {
    if (!enabledRef.current) return;
    try {
      sounds[sound]();
    } catch {
      // Audio context not available
    }
  }, []);

  const setEnabled = useCallback((enabled: boolean) => {
    enabledRef.current = enabled;
  }, []);

  return { play, setEnabled, isEnabled: () => enabledRef.current };
};
