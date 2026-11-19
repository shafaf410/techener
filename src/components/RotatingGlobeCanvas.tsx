import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { WORLD_MAP_MASK_B64 } from '../data/worldMapMask';

interface RotatingGlobeCanvasProps {
  className?: string;
}

export const RotatingGlobeCanvas: React.FC<RotatingGlobeCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 600;

    // --- 1. SCENE, CAMERA, RENDERER ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 2000);
    camera.position.set(0, 0, 520);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Root group for the entire globe assembly
    const rootGroup = new THREE.Group();
    // Default Earth axial tilt (approx 15-20 deg)
    rootGroup.rotation.x = THREE.MathUtils.degToRad(12);
    rootGroup.rotation.z = THREE.MathUtils.degToRad(-15);
    scene.add(rootGroup);

    const GLOBE_RADIUS = 185;

    // --- 2. OPAQUE WHITE INNER SPHERE ---
    // Masks out continents on the far side so only front-facing continents are visible (clean editorial look)
    const innerSphereGeo = new THREE.SphereGeometry(GLOBE_RADIUS - 1.5, 64, 64);
    const innerSphereMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.98,
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    rootGroup.add(innerSphere);

    // Subtle atmospheric outline rim
    const atmGeo = new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64);
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const atmSphere = new THREE.Mesh(atmGeo, atmMat);
    rootGroup.add(atmSphere);

    // --- 3. DOTTED CONTINENTS POINT CLOUD ---
    // Decode precomputed world map binary mask (240 x 120 equirectangular)
    const rawBinary = atob(WORLD_MAP_MASK_B64);
    const maskBuffer = new Uint8Array(rawBinary.length);
    for (let i = 0; i < rawBinary.length; i++) {
      maskBuffer[i] = rawBinary.charCodeAt(i);
    }
    const maskW = 240;
    const maskH = 120;

    const isLand = (u: number, v: number): boolean => {
      // u: 0..1 (lon: -180..180), v: 0..1 (lat: 90..-90)
      const x = Math.min(maskW - 1, Math.max(0, Math.floor(u * maskW)));
      const y = Math.min(maskH - 1, Math.max(0, Math.floor(v * maskH)));
      const bitIndex = y * maskW + x;
      const byteIndex = Math.floor(bitIndex / 8);
      const bitPos = bitIndex % 8;
      if (byteIndex >= maskBuffer.length) return false;
      return (maskBuffer[byteIndex] & (1 << bitPos)) !== 0;
    };

    // Helper: circular dot texture for crisp vector-like round dots
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, 64, 64);
        ctx.beginPath();
        ctx.arc(32, 32, 28, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };
    const circleTexture = createCircleTexture();

    // Sample dots across sphere using concentric latitude rings for uniform aesthetic spacing
    const landPositions: number[] = [];
    const oceanPositions: number[] = [];

    const latRings = 110;
    for (let i = 0; i <= latRings; i++) {
      const lat = (i / latRings) * Math.PI - Math.PI / 2; // -pi/2 to pi/2
      const y = GLOBE_RADIUS * Math.sin(lat);
      const ringRadius = GLOBE_RADIUS * Math.cos(lat);

      // Number of dots along this latitude ring proportional to circumference
      const ringCircumference = 2 * Math.PI * ringRadius;
      const dotsInRing = Math.max(1, Math.floor(ringCircumference / 4.4));

      for (let j = 0; j < dotsInRing; j++) {
        const lon = (j / dotsInRing) * 2 * Math.PI - Math.PI; // -pi to pi

        // Convert lat/lon to UV coordinate on equirectangular map
        // Add longitude offset so Africa/Europe/Middle East face forward on load
        const u = ((lon + Math.PI + THREE.MathUtils.degToRad(35)) % (2 * Math.PI)) / (2 * Math.PI);
        const v = 0.5 - lat / Math.PI;

        const x = ringRadius * Math.sin(lon);
        const z = ringRadius * Math.cos(lon);

        if (isLand(u, v)) {
          landPositions.push(x, y, z);
        } else if (Math.random() < 0.04) {
          // Subtle sparse dots on ocean for spherical volume
          oceanPositions.push(x, y, z);
        }
      }
    }

    // Land Points
    const landGeo = new THREE.BufferGeometry();
    landGeo.setAttribute('position', new THREE.Float32BufferAttribute(landPositions, 3));
    const landMat = new THREE.PointsMaterial({
      color: 0x334155, // Clean graphite/slate matching reference image
      size: 2.8,
      map: circleTexture,
      transparent: true,
      opacity: 0.95,
      alphaTest: 0.1,
    });
    const landPoints = new THREE.Points(landGeo, landMat);
    rootGroup.add(landPoints);

    // Ocean Points (very faint)
    const oceanGeo = new THREE.BufferGeometry();
    oceanGeo.setAttribute('position', new THREE.Float32BufferAttribute(oceanPositions, 3));
    const oceanMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 1.4,
      map: circleTexture,
      transparent: true,
      opacity: 0.25,
      alphaTest: 0.1,
    });
    const oceanPoints = new THREE.Points(oceanGeo, oceanMat);
    rootGroup.add(oceanPoints);

    // --- 4. 3D ORBITAL TRAJECTORY ARCS ---
    // Orbit definition parameters (matching reference image angles and red/slate palette)
    interface OrbitDef {
      radiusX: number;
      radiusY: number;
      tiltX: number;
      tiltY: number;
      tiltZ: number;
      color: number;
      opacity: number;
      nodeCount: number;
      packetCount: number;
      speed: number;
    }

    const orbitDefs: OrbitDef[] = [
      {
        radiusX: GLOBE_RADIUS * 1.15,
        radiusY: GLOBE_RADIUS * 1.08,
        tiltX: THREE.MathUtils.degToRad(26),
        tiltY: THREE.MathUtils.degToRad(18),
        tiltZ: THREE.MathUtils.degToRad(12),
        color: 0xf01b25, // Brand Red
        opacity: 0.85,
        nodeCount: 5,
        packetCount: 2,
        speed: 0.0035,
      },
      {
        radiusX: GLOBE_RADIUS * 1.24,
        radiusY: GLOBE_RADIUS * 1.12,
        tiltX: THREE.MathUtils.degToRad(-38),
        tiltY: THREE.MathUtils.degToRad(-22),
        tiltZ: THREE.MathUtils.degToRad(42),
        color: 0x64748b, // Slate
        opacity: 0.65,
        nodeCount: 4,
        packetCount: 2,
        speed: -0.0028,
      },
      {
        radiusX: GLOBE_RADIUS * 1.28,
        radiusY: GLOBE_RADIUS * 1.18,
        tiltX: THREE.MathUtils.degToRad(64),
        tiltY: THREE.MathUtils.degToRad(-15),
        tiltZ: THREE.MathUtils.degToRad(-35),
        color: 0xf01b25, // Brand Red
        opacity: 0.75,
        nodeCount: 4,
        packetCount: 2,
        speed: 0.003,
      },
      {
        radiusX: GLOBE_RADIUS * 1.35,
        radiusY: GLOBE_RADIUS * 1.22,
        tiltX: THREE.MathUtils.degToRad(-12),
        tiltY: THREE.MathUtils.degToRad(45),
        tiltZ: THREE.MathUtils.degToRad(-18),
        color: 0x475569, // Darker Slate
        opacity: 0.5,
        nodeCount: 3,
        packetCount: 1,
        speed: 0.002,
      },
    ];

    interface ActivePacket {
      mesh: THREE.Mesh;
      group: THREE.Group;
      progress: number;
      speed: number;
      radiusX: number;
      radiusY: number;
    }
    const activePackets: ActivePacket[] = [];

    // Shared sphere geometry for nodes on orbits
    const redNodeMat = new THREE.MeshBasicMaterial({ color: 0xf01b25 });
    const slateNodeMat = new THREE.MeshBasicMaterial({ color: 0x475569 });

    orbitDefs.forEach((def) => {
      const orbitGroup = new THREE.Group();
      orbitGroup.rotation.set(def.tiltX, def.tiltY, def.tiltZ);
      rootGroup.add(orbitGroup);

      // Generate 3D ellipse curve points
      const curvePoints: THREE.Vector3[] = [];
      const segments = 128;
      for (let s = 0; s <= segments; s++) {
        const theta = (s / segments) * Math.PI * 2;
        const ox = def.radiusX * Math.cos(theta);
        const oz = def.radiusY * Math.sin(theta);
        curvePoints.push(new THREE.Vector3(ox, 0, oz));
      }

      // Draw Orbit Line
      const orbitLineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const orbitLineMat = new THREE.LineBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: def.opacity,
        linewidth: 1.5,
      });
      const orbitLine = new THREE.Line(orbitLineGeo, orbitLineMat);
      orbitGroup.add(orbitLine);

      // Place Static Circular Nodes along the orbit
      for (let n = 0; n < def.nodeCount; n++) {
        const theta = (n / def.nodeCount) * Math.PI * 2 + (def.color === 0xf01b25 ? 0.3 : 0.8);
        const nx = def.radiusX * Math.cos(theta);
        const nz = def.radiusY * Math.sin(theta);

        const isRed = (n % 2 === 0) || def.color === 0xf01b25;
        const nodeGeo = new THREE.SphereGeometry(isRed ? 3.5 : 2.8, 16, 16);
        const nodeMesh = new THREE.Mesh(nodeGeo, isRed ? redNodeMat : slateNodeMat);
        nodeMesh.position.set(nx, 0, nz);
        orbitGroup.add(nodeMesh);
      }

      // Animated Transit Packets traveling along the orbit
      for (let p = 0; p < def.packetCount; p++) {
        const packetGeo = new THREE.SphereGeometry(3.8, 16, 16);
        const packetMat = new THREE.MeshBasicMaterial({
          color: 0xffffff,
        });
        const packetMesh = new THREE.Mesh(packetGeo, packetMat);

        // Halo ring around the packet
        const ringGeo = new THREE.RingGeometry(4.2, 5.6, 24);
        const ringMat = new THREE.MeshBasicMaterial({
          color: def.color,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.9,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = Math.PI / 2;
        packetMesh.add(ringMesh);

        orbitGroup.add(packetMesh);

        activePackets.push({
          mesh: packetMesh,
          group: orbitGroup,
          progress: p / def.packetCount,
          speed: def.speed,
          radiusX: def.radiusX,
          radiusY: def.radiusY,
        });
      }
    });

    // --- 5. KEY REGIONAL HUBS (DUBAI HQ, EUROPE, ASIA, AMERICAS) ---
    // Helper to convert lat/lon on globe to 3D Vector3
    const latLonToVector3 = (latDeg: number, lonDeg: number, r: number) => {
      const lat = THREE.MathUtils.degToRad(latDeg);
      const lon = THREE.MathUtils.degToRad(lonDeg) + THREE.MathUtils.degToRad(35);
      const x = r * Math.cos(lat) * Math.sin(lon);
      const y = r * Math.sin(lat);
      const z = r * Math.cos(lat) * Math.cos(lon);
      return new THREE.Vector3(x, y, z);
    };

    interface HubLocation {
      name: string;
      lat: number;
      lon: number;
      isPrimary?: boolean;
    }

    const hubs: HubLocation[] = [
      { name: 'Dubai / UAE (HQ)', lat: 25.26, lon: 55.3, isPrimary: true },
      { name: 'Milan / Italy', lat: 45.46, lon: 9.19 },
      { name: 'Singapore', lat: 1.35, lon: 103.82 },
      { name: 'Riyadh / KSA', lat: 24.71, lon: 46.67 },
      { name: 'London / UK', lat: 51.5, lon: -0.12 },
      { name: 'Houston / USA', lat: 29.76, lon: -95.36 },
    ];

    interface PulsingRing {
      mesh: THREE.Mesh;
      basePos: THREE.Vector3;
      phase: number;
    }
    const pulsingRings: PulsingRing[] = [];

    hubs.forEach((hub) => {
      const pos = latLonToVector3(hub.lat, hub.lon, GLOBE_RADIUS + 1);

      // Pin core sphere
      const hubGeo = new THREE.SphereGeometry(hub.isPrimary ? 4.5 : 3.2, 16, 16);
      const hubMat = new THREE.MeshBasicMaterial({
        color: 0xf01b25,
      });
      const hubMesh = new THREE.Mesh(hubGeo, hubMat);
      hubMesh.position.copy(pos);
      rootGroup.add(hubMesh);

      // White center beacon
      const centerGeo = new THREE.SphereGeometry(hub.isPrimary ? 2.0 : 1.4, 12, 12);
      const centerMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const centerMesh = new THREE.Mesh(centerGeo, centerMat);
      hubMesh.add(centerMesh);

      // Pulsing Radar Rings for Dubai HQ and Europe
      if (hub.isPrimary || hub.name.includes('Milan')) {
        for (let r = 0; r < 2; r++) {
          const pRingGeo = new THREE.RingGeometry(3.5, 4.5, 32);
          const pRingMat = new THREE.MeshBasicMaterial({
            color: 0xf01b25,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.8,
          });
          const pRingMesh = new THREE.Mesh(pRingGeo, pRingMat);
          pRingMesh.position.copy(pos);
          pRingMesh.lookAt(pos.clone().multiplyScalar(2));
          rootGroup.add(pRingMesh);

          pulsingRings.push({
            mesh: pRingMesh,
            basePos: pos,
            phase: r * Math.PI,
          });
        }
      }
    });

    // Connecting Great-Circle Arc from Dubai to Milan (Trade Bridge)
    const dubaiPos = latLonToVector3(25.26, 55.3, GLOBE_RADIUS + 1);
    const milanPos = latLonToVector3(45.46, 9.19, GLOBE_RADIUS + 1);
    const midPoint = new THREE.Vector3()
      .addVectors(dubaiPos, milanPos)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(GLOBE_RADIUS * 1.2);

    const arcCurve = new THREE.QuadraticBezierCurve3(dubaiPos, midPoint, milanPos);
    const arcGeo = new THREE.BufferGeometry().setFromPoints(arcCurve.getPoints(40));
    const arcMat = new THREE.LineBasicMaterial({
      color: 0xf01b25,
      transparent: true,
      opacity: 0.75,
      linewidth: 1.5,
    });
    const arcLine = new THREE.Line(arcGeo, arcMat);
    rootGroup.add(arcLine);

    // --- 6. INTERACTIVE DRAG & ROTATION PHYSICS ---
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;

    // Mouse parallax hover offset
    const targetParallax = { x: 0, y: 0 };
    const currentParallax = { x: 0, y: 0 };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetParallax.x = nx * 0.12;
      targetParallax.y = ny * 0.12;

      if (!isDragging) return;

      const deltaX = e.clientX - previousPointerX;
      const deltaY = e.clientY - previousPointerY;

      dragVelocityX = deltaX * 0.005;
      dragVelocityY = deltaY * 0.005;

      rootGroup.rotation.y += dragVelocityX;
      rootGroup.rotation.x += dragVelocityY;

      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 600;
      height = container.clientHeight || 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);
    window.addEventListener('resize', handleResize);

    // Visibility Observer to pause when scrolled out of viewport
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // --- 7. MAIN ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsedTime = clock.getElapsedTime();

      // Continuous automatic slow rotation (or momentum inertia decay if dragged)
      if (!isDragging) {
        if (Math.abs(dragVelocityX) > 0.0001) {
          rootGroup.rotation.y += dragVelocityX;
          dragVelocityX *= 0.94;
        } else {
          rootGroup.rotation.y += 0.002; // Majestic continuous forward spin
        }

        if (Math.abs(dragVelocityY) > 0.0001) {
          rootGroup.rotation.x += dragVelocityY;
          dragVelocityY *= 0.94;
        }
      }

      // Smooth mouse hover parallax ease
      currentParallax.x += (targetParallax.x - currentParallax.x) * 0.05;
      currentParallax.y += (targetParallax.y - currentParallax.y) * 0.05;
      camera.position.x = currentParallax.x * 40;
      camera.position.y = currentParallax.y * 40;
      camera.lookAt(0, 0, 0);

      // Animate Transit Packets along orbits
      activePackets.forEach((p) => {
        p.progress = (p.progress + p.speed) % 1;
        if (p.progress < 0) p.progress += 1;
        const theta = p.progress * Math.PI * 2;
        p.mesh.position.x = p.radiusX * Math.cos(theta);
        p.mesh.position.z = p.radiusY * Math.sin(theta);
      });

      // Animate Pulsing Radar Rings
      pulsingRings.forEach((pr) => {
        const cycle = (elapsedTime * 1.8 + pr.phase) % (Math.PI * 2);
        const scale = 1 + (cycle / (Math.PI * 2)) * 3.2;
        const opacity = Math.max(0, 0.85 * (1 - cycle / (Math.PI * 2)));

        pr.mesh.scale.set(scale, scale, 1);
        (pr.mesh.material as THREE.MeshBasicMaterial).opacity = opacity;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      observer.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ touchAction: 'none' }}
      title="Click and drag to spin the 3D globe"
    />
  );
};
