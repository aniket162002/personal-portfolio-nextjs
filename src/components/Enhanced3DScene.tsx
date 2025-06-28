'use client'

import { Suspense, useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Stars,
  Float,
  Center
} from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import { useThemeStore } from '@/store/themeStore'
import * as THREE from 'three'

// Animated floating geometry
function FloatingGeometry({ position, geometry, color }: any) {
  const meshRef = useRef<THREE.Mesh>(null)
  const { particlesEnabled } = useThemeStore()
  
  const { scale } = useSpring({
    scale: particlesEnabled ? 1 : 0,
    config: { mass: 1, tension: 280, friction: 60 }
  })

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.01
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5
    }
  })

  return (
    <animated.mesh ref={meshRef} position={position} scale={scale}>
      {geometry}
      <meshStandardMaterial color={color} transparent opacity={0.8} />
    </animated.mesh>
  )
}

// Interactive particle system
function ParticleSystem() {
  const { particlesEnabled } = useThemeStore()
  const particlesRef = useRef<THREE.Points>(null)
  
  const particlesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(1000 * 3)
    
    for (let i = 0; i < 1000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [])

  useFrame((state) => {
    if (particlesRef.current && particlesEnabled) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.1
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  if (!particlesEnabled) return null

  return (
    <points ref={particlesRef} geometry={particlesGeometry}>
      <pointsMaterial size={0.1} color="#3b82f6" transparent opacity={0.6} />
    </points>
  )
}

// Interactive 3D text (simplified without external font)
function Interactive3DText() {
  const textRef = useRef<THREE.Mesh>(null)
  const { colorScheme } = useThemeStore()

  const colors = {
    blue: '#3b82f6',
    purple: '#8b5cf6',
    green: '#10b981',
    orange: '#f59e0b',
    pink: '#ec4899',
    cyan: '#06b6d4'
  }

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <mesh ref={textRef}>
          <boxGeometry args={[4, 1, 0.5]} />
          <meshStandardMaterial color={colors[colorScheme]} />
        </mesh>
      </Center>
    </Float>
  )
}

// Animated geometric shapes
function AnimatedShapes() {
  const { backgroundEffects } = useThemeStore()
  
  if (!backgroundEffects) return null

  return (
    <>
      <Float speed={1} rotationIntensity={1} floatIntensity={2}>
        <FloatingGeometry 
          position={[-8, 2, -5]} 
          geometry={<boxGeometry args={[1, 1, 1]} />}
          color="#3b82f6"
        />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <FloatingGeometry 
          position={[8, -2, -3]} 
          geometry={<sphereGeometry args={[0.8, 32, 32]} />}
          color="#8b5cf6"
        />
      </Float>
      
      <Float speed={0.8} rotationIntensity={2} floatIntensity={1.5}>
        <FloatingGeometry 
          position={[0, 4, -8]} 
          geometry={<torusGeometry args={[1, 0.3, 16, 100]} />}
          color="#10b981"
        />
      </Float>
      
      <Float speed={1.2} rotationIntensity={1.5} floatIntensity={0.8}>
        <FloatingGeometry 
          position={[-5, -4, -6]} 
          geometry={<octahedronGeometry args={[1]} />}
          color="#f59e0b"
        />
      </Float>
    </>
  )
}

// Camera controller
function CameraController() {
  const { camera, mouse } = useThree()
  
  useFrame(() => {
    camera.position.x += (mouse.x * 2 - camera.position.x) * 0.05
    camera.position.y += (-mouse.y * 2 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)
  })
  
  return null
}

// Loading fallback
function SceneLoading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white/70">Loading 3D Scene...</p>
      </div>
    </div>
  )
}

export default function Enhanced3DScene() {
  const { backgroundEffects, reducedMotion } = useThemeStore()

  if (!backgroundEffects || reducedMotion) {
    return (
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />
    )
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Suspense fallback={<SceneLoading />}>
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          onCreated={({ gl }) => {
            gl.setClearColor('#000000', 0)
          }}
        >
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

          {/* Simple stars background */}
          <Stars radius={100} depth={50} count={500} factor={4} saturation={0} fade />

          {/* 3D Content */}
          <Interactive3DText />
          <AnimatedShapes />
          <ParticleSystem />

          {/* Controls */}
          <CameraController />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            autoRotate
            autoRotateSpeed={0.5}
          />
        </Canvas>
      </Suspense>
    </div>
  )
}
