"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeStudioBoxCanvasProps {
  images?: string[];
  className?: string;
}

const DEFAULT_CUBE_IMAGES = [
  "/images/about/team-1.jpg",
  "/images/about/team-3.jpg",
  "/images/about/team-5.jpg",
  "/images/about/team-umar.jpg",
  "/images/about/team-6.jpg",
  "/images/about/team-8.jpg",
];

/**
 * Brandappart-Inspired 3D Interactive Rolling Box Canvas for LOOMIE Studio
 * Built with Three.js WebGL:
 * - 3D Box geometry featuring team & studio photos mapped across all 6 faces
 * - Continuous smooth auto-rotation and interactive mouse momentum tilt
 * - Seamless integration on warm #F5F3EF studio substrate
 */
export function ThreeStudioBoxCanvas({
  images = DEFAULT_CUBE_IMAGES,
  className = "",
}: ThreeStudioBoxCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 450;

    // 1. Three.js Scene, Camera, & WebGL Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7.5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 2. Lighting Architecture
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 8, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(-5, -5, 5);
    scene.add(pointLight);

    // 3. Texture Loader & Materials for 6 Faces
    const textureLoader = new THREE.TextureLoader();
    const materials: THREE.MeshStandardMaterial[] = [];

    images.slice(0, 6).forEach((imgUrl) => {
      const texture = textureLoader.load(imgUrl);
      texture.colorSpace = THREE.SRGBColorSpace;
      materials.push(
        new THREE.MeshStandardMaterial({
          map: texture,
          roughness: 0.2,
          metalness: 0.1,
        })
      );
    });

    // 4. Create 3D Box Mesh
    const geometry = new THREE.BoxGeometry(3.1, 3.1, 3.1);
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);

    // Initial slight angle tilt like brandappart.com
    cube.rotation.x = 0.35;
    cube.rotation.y = 0.45;

    // 5. Interactive Mouse Tilt & Drag Controls
    let targetRotationX = 0.35;
    let targetRotationY = 0.45;
    let mouseX = 0;
    let mouseY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - width / 2;
      const y = event.clientY - rect.top - height / 2;

      mouseX = (x / width) * 0.8;
      mouseY = (y / height) * 0.8;

      if (isDragging) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;

        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
      }
    };

    const handleMouseDown = (event: MouseEvent) => {
      isDragging = true;
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // 6. Animation Loop (Auto-Rolling + Mouse Dampening)
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        // Continuous auto-rolling rotation
        targetRotationY += 0.006;
        targetRotationX += 0.003;
      }

      // Smooth lerp dampening
      cube.rotation.y += (targetRotationY - cube.rotation.y) * 0.08;
      cube.rotation.x += (targetRotationX - cube.rotation.x) * 0.08;

      // Subtle float wave
      cube.position.y = Math.sin(Date.now() * 0.0015) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;

      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      materials.forEach((mat) => {
        if (mat.map) mat.map.dispose();
        mat.dispose();
      });
      renderer.dispose();
    };
  }, [images]);

  return (
    <div className={`relative w-full flex items-center justify-center ${className}`}>
      <div
        ref={mountRef}
        className="w-full h-[280px] sm:h-[420px] lg:h-[540px] cursor-grab active:cursor-grabbing select-none"
      />
    </div>
  );
}
