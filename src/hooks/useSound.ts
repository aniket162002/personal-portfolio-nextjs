import { useCallback, useRef, useEffect } from 'react'
import { useThemeStore } from '@/store/themeStore'

interface SoundOptions {
  volume?: number
  playbackRate?: number
  loop?: boolean
}

// Web Audio API based sound system
class SoundManager {
  private audioContext: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()
  private gainNode: GainNode | null = null

  async initialize() {
    if (typeof window === 'undefined') return

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      this.gainNode = this.audioContext.createGain()
      this.gainNode.connect(this.audioContext.destination)
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  async loadSound(name: string, url: string): Promise<void> {
    if (!this.audioContext) return

    try {
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
      this.sounds.set(name, audioBuffer)
    } catch (error) {
      console.warn(`Failed to load sound ${name}:`, error)
    }
  }

  playSound(name: string, options: SoundOptions = {}): void {
    if (!this.audioContext || !this.gainNode) return

    const audioBuffer = this.sounds.get(name)
    if (!audioBuffer) return

    const source = this.audioContext.createBufferSource()
    const gainNode = this.audioContext.createGain()

    source.buffer = audioBuffer
    source.playbackRate.value = options.playbackRate || 1
    source.loop = options.loop || false

    gainNode.gain.value = options.volume || 0.5
    
    source.connect(gainNode)
    gainNode.connect(this.gainNode)

    source.start()
  }

  setMasterVolume(volume: number): void {
    if (this.gainNode) {
      this.gainNode.gain.value = Math.max(0, Math.min(1, volume))
    }
  }

  // Generate procedural sounds using Web Audio API
  generateTone(frequency: number, duration: number, type: OscillatorType = 'sine'): void {
    if (!this.audioContext || !this.gainNode) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.type = type
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime)

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    oscillator.connect(gainNode)
    gainNode.connect(this.gainNode)

    oscillator.start()
    oscillator.stop(this.audioContext.currentTime + duration)
  }
}

const soundManager = new SoundManager()

export function useSound() {
  const { soundEnabled } = useThemeStore()
  const isInitialized = useRef(false)

  useEffect(() => {
    if (soundEnabled && !isInitialized.current) {
      soundManager.initialize()
      isInitialized.current = true
    }
  }, [soundEnabled])

  const playHoverSound = useCallback(() => {
    if (!soundEnabled) return
    soundManager.generateTone(800, 0.1, 'sine')
  }, [soundEnabled])

  const playClickSound = useCallback(() => {
    if (!soundEnabled) return
    soundManager.generateTone(1000, 0.15, 'square')
  }, [soundEnabled])

  const playSuccessSound = useCallback(() => {
    if (!soundEnabled) return
    // Play a pleasant chord
    soundManager.generateTone(523.25, 0.3, 'sine') // C5
    setTimeout(() => soundManager.generateTone(659.25, 0.3, 'sine'), 100) // E5
    setTimeout(() => soundManager.generateTone(783.99, 0.3, 'sine'), 200) // G5
  }, [soundEnabled])

  const playErrorSound = useCallback(() => {
    if (!soundEnabled) return
    soundManager.generateTone(200, 0.2, 'sawtooth')
  }, [soundEnabled])

  const playNotificationSound = useCallback(() => {
    if (!soundEnabled) return
    soundManager.generateTone(880, 0.1, 'sine')
    setTimeout(() => soundManager.generateTone(1108.73, 0.1, 'sine'), 150)
  }, [soundEnabled])

  const playTypingSound = useCallback(() => {
    if (!soundEnabled) return
    const frequencies = [400, 450, 500, 550, 600]
    const frequency = frequencies[Math.floor(Math.random() * frequencies.length)]
    soundManager.generateTone(frequency, 0.05, 'square')
  }, [soundEnabled])

  return {
    playHoverSound,
    playClickSound,
    playSuccessSound,
    playErrorSound,
    playNotificationSound,
    playTypingSound,
    soundEnabled
  }
}

// Hook for adding sound effects to elements
export function useSoundEffects(ref: React.RefObject<HTMLElement>) {
  const { playHoverSound, playClickSound } = useSound()

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseEnter = () => playHoverSound()
    const handleClick = () => playClickSound()

    element.addEventListener('mouseenter', handleMouseEnter)
    element.addEventListener('click', handleClick)

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter)
      element.removeEventListener('click', handleClick)
    }
  }, [ref, playHoverSound, playClickSound])
}

// Hook for form sound effects
export function useFormSounds() {
  const { playTypingSound, playSuccessSound, playErrorSound } = useSound()

  const handleInputChange = useCallback(() => {
    playTypingSound()
  }, [playTypingSound])

  const handleSubmitSuccess = useCallback(() => {
    playSuccessSound()
  }, [playSuccessSound])

  const handleSubmitError = useCallback(() => {
    playErrorSound()
  }, [playErrorSound])

  return {
    handleInputChange,
    handleSubmitSuccess,
    handleSubmitError
  }
}
