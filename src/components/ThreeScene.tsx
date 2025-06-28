'use client'

import { useEffect, useRef } from 'react'

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<any>(null)
  const rendererRef = useRef<any>(null)
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const initThree = async () => {
      try {
        const THREE = await import('three')
        
        if (!mountRef.current) return

        // Scene setup
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
        
        const renderer = new THREE.WebGLRenderer({ 
          alpha: true, 
          antialias: true 
        })
        
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        mountRef.current.appendChild(renderer.domElement)
        
        // Save references
        sceneRef.current = scene
        rendererRef.current = renderer
        
        // Camera position
        camera.position.z = 30
        
        // Create geometry
        const meshes: THREE.Mesh[] = []
        const geometry = new THREE.IcosahedronGeometry(1, 0)
        
        // Create multiple instances with different materials
        for (let i = 0; i < 50; i++) {
          const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(
              Math.random() * 0.2 + 0.5,
              Math.random() * 0.2 + 0.5,
              Math.random() * 0.2 + 0.8
            ),
            wireframe: true,
            transparent: true,
            opacity: Math.random() * 0.4 + 0.1
          })
          
          const mesh = new THREE.Mesh(geometry, material)
          
          // Random position
          mesh.position.set(
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40,
            (Math.random() - 0.5) * 40
          )
          
          // Random size
          const scale = Math.random() * 2 + 0.5
          mesh.scale.set(scale, scale, scale)
          
          // Random rotation
          mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          )
          
          scene.add(mesh)
          meshes.push(mesh)
        }
        
        // Mouse interaction
        const mouse = { x: 0, y: 0 }
        
        const handleMouseMove = (event: MouseEvent) => {
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        }
        
        window.addEventListener('mousemove', handleMouseMove)
        
        // Handle window resize
        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight
          camera.updateProjectionMatrix()
          renderer.setSize(window.innerWidth, window.innerHeight)
        }
        
        window.addEventListener('resize', handleResize)
        
        // Animation loop
        const animate = () => {
          animationIdRef.current = requestAnimationFrame(animate)
          
          // Rotate camera based on mouse position
          camera.position.x += (mouse.x * 10 - camera.position.x) * 0.05
          camera.position.y += (-mouse.y * 10 - camera.position.y) * 0.05
          camera.lookAt(scene.position)
          
          // Rotate meshes
          meshes.forEach((mesh, i) => {
            mesh.rotation.x += 0.003 * (i % 2 ? 1 : -1)
            mesh.rotation.y += 0.005 * (i % 3 ? 1 : -1)
          })
          
          renderer.render(scene, camera)
        }
        
        animate()

        // Cleanup function
        return () => {
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('resize', handleResize)
          
          if (animationIdRef.current) {
            cancelAnimationFrame(animationIdRef.current)
          }
          
          if (mountRef.current && renderer.domElement) {
            mountRef.current.removeChild(renderer.domElement)
          }
          
          // Dispose of Three.js objects
          meshes.forEach(mesh => {
            if (mesh.geometry) mesh.geometry.dispose()
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach(material => material.dispose())
              } else {
                mesh.material.dispose()
              }
            }
          })
          
          renderer.dispose()
        }
      } catch (error) {
        console.warn('Three.js not available:', error)
      }
    }
    
    initThree()
  }, [])

  return <div ref={mountRef} className="absolute inset-0 -z-10" />
}



