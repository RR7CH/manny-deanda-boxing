import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Particle {
  mesh: THREE.Mesh;
  age: number;
  rotationSpeed: number;
  driftX: number;
  driftY: number;
  fadeSpeed: number;
}

const COLORS = ['#c41e1e', '#e02828', '#ff3333', '#8a1515'];
const MAX_PARTICLES = 150;

export default function NeonCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, moved: false });
  const particlesRef = useRef<Particle[]>([]);
  const colorIndexRef = useRef(0);
  const poolRef = useRef<THREE.Mesh[]>([]);
  const animRef = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'ontouchstart' in document) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.OrthographicCamera(-width / 2, width / 2, height / 2, -height / 2, 0.1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(0, 0, 0);

    const scene = new THREE.Scene();
    const geometry = new THREE.PlaneGeometry(1, 1);

    for (let i = 0; i < MAX_PARTICLES; i++) {
      const material = new THREE.MeshBasicMaterial({
        transparent: true,
        opacity: 0,
        color: new THREE.Color(COLORS[0]),
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.visible = false;
      scene.add(mesh);
      poolRef.current.push(mesh);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX - window.innerWidth / 2;
      mouseRef.current.y = -(e.clientY - window.innerHeight / 2);
      mouseRef.current.moved = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const spawnParticle = () => {
      const mouse = mouseRef.current;
      if (!mouse.moved) return;
      const availableMesh = poolRef.current.find(m => !m.visible);
      if (!availableMesh) return;

      const jitterX = (Math.random() - 0.5) * 12;
      const jitterY = (Math.random() - 0.5) * 12;

      availableMesh.visible = true;
      availableMesh.position.set(mouse.x + jitterX, mouse.y + jitterY, 0);
      const scale = 3 + Math.random() * 3;
      availableMesh.scale.set(scale, scale, 1);
      availableMesh.rotation.z = Math.random() * Math.PI * 2;

      const mat = availableMesh.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.8;
      colorIndexRef.current = (colorIndexRef.current + 1) % COLORS.length;
      mat.color.set(new THREE.Color(COLORS[colorIndexRef.current]));

      particlesRef.current.push({
        mesh: availableMesh,
        age: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        driftX: (Math.random() - 0.5) * 0.3,
        driftY: -0.8 + (Math.random() - 0.5) * 0.4,
        fadeSpeed: 0.015,
      });
    };

    const clock = new THREE.Clock();

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      for (let i = 0; i < 2; i++) {
        if (particlesRef.current.length < MAX_PARTICLES) spawnParticle();
      }

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.age += delta * 60;
        p.mesh.position.x += p.driftX * delta * 60;
        p.mesh.position.y += p.driftY * delta * 60;
        p.mesh.rotation.z += p.rotationSpeed * delta * 60;

        const alpha = Math.max(0, 1 - p.age * p.fadeSpeed);
        (p.mesh.material as THREE.MeshBasicMaterial).opacity = alpha;

        if (alpha <= 0) {
          p.mesh.visible = false;
          particlesRef.current.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.left = -w / 2; camera.right = w / 2;
      camera.top = h / 2; camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      poolRef.current.forEach(m => (m.material as THREE.MeshBasicMaterial).dispose());
    };
  }, []);

  if (typeof window !== 'undefined' && 'ontouchstart' in document) return null;

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        zIndex: 9999, pointerEvents: 'none',
      }}
    />
  );
}
