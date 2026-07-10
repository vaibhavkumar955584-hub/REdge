"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  PerspectiveCamera,
  Html,
  ContactShadows,
  Environment,
  MeshDistortMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { AutoTypingResume } from "./AutoTypingResume";
import { motion as motion3d } from "framer-motion-3d";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { SparklesIcon, ChartBarIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";

const MotionGroup = motion3d.group;

const GlassElement = ({ position, color, scale = 1, speed = 1 }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() * speed) * 0.005;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh position={position} ref={meshRef} scale={scale}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshPhysicalMaterial
        color={color}
        transmission={1}
        thickness={0.5}
        roughness={0.1}
        envMapIntensity={2}
        transparent
        opacity={0.3}
      />
    </mesh>
  );
};

const FeatureBadge = ({ position, title, subtitle, icon: Icon, opacity }: any) => {
  return (
    <Html
      position={position}
      center
      transform
      distanceFactor={5}
    >
      <motion.div
        style={{ opacity }}
        className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl min-w-[180px] pointer-events-none"
      >
        <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg">
           <Icon className="h-6 w-6" />
        </div>
        <div className="text-center">
          <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest">{title}</p>
          <p className="text-sm font-bold text-white">{subtitle}</p>
        </div>
      </motion.div>
    </Html>
  );
};

const ResumePaper = ({ scrollYProgress }: { scrollYProgress: any }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const baseScale = isMobile ? 1.4 : 2.2;

  // Mouse interaction state
  const mouseInfluenceX = useRef(0);
  const mouseInfluenceY = useRef(0);

  // Smoother springs for scroll
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Scroll animations mapped across the entire page (0 to 1)
  const rotateX = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 0.2, -0.1, 0.3, -0.2, 0]);
  const rotateY = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, -0.4, 0.4, -0.6, 0.6, 0]);
  const positionX = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [1.5, 2.5, -2.5, 2.0, -2.0, 0]);
  const positionY = useTransform(smoothProgress, [0, 0.5, 1], [0, -0.5, 0]);
  const scale3d = useTransform(smoothProgress, [0, 0.8, 1], [1, 1.1, 1.3]);

  // Badge opacities
  const skillsOpacity = useTransform(smoothProgress, [0.15, 0.25, 0.35, 0.45], [0, 1, 1, 0]);
  const atsOpacity = useTransform(smoothProgress, [0.45, 0.55, 0.65, 0.75], [0, 1, 1, 0]);

  useFrame((state) => {
    // Smoothly interpolate mouse target
    mouseInfluenceX.current = THREE.MathUtils.lerp(mouseInfluenceX.current, state.mouse.x * 0.3, 0.05);
    mouseInfluenceY.current = THREE.MathUtils.lerp(mouseInfluenceY.current, state.mouse.y * 0.3, 0.05);

    if (groupRef.current) {
        // Apply mouse movement to a subtle additional rotation
        groupRef.current.rotation.y = mouseInfluenceX.current * 0.2;
        groupRef.current.rotation.x = -mouseInfluenceY.current * 0.2;

        // Also a slight position offset based on mouse
        groupRef.current.position.x = mouseInfluenceX.current * 0.3;
        groupRef.current.position.y = mouseInfluenceY.current * 0.3;
    }
  });

  return (
    <MotionGroup
      position-x={positionX}
      position-y={positionY}
      rotation-x={rotateX}
      rotation-y={rotateY}
      scale={scale3d}
    >
      <group ref={groupRef}>
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
          <mesh ref={meshRef} castShadow receiveShadow>
            <planeGeometry args={[2.1 * baseScale, 2.97 * baseScale]} />
            <meshStandardMaterial
              color="white"
              roughness={0.3}
              metalness={0.05}
              side={THREE.DoubleSide}
            />

            <Html
              transform
              distanceFactor={baseScale * 1.5}
              position={[0, 0, 0.01]}
              occlude="blending"
              style={{
                width: "400px",
                height: "565px",
                backgroundColor: "white",
                overflow: "hidden",
                borderRadius: "4px",
                boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                pointerEvents: 'none'
              }}
            >
              <div className="w-full h-full scale-[0.5] origin-top-left" style={{ width: '800px', height: '1130px' }}>
                  <AutoTypingResume />
              </div>
            </Html>

            <mesh position={[0, 0, -0.01]} rotation-y={Math.PI}>
               <planeGeometry args={[2.1 * baseScale, 2.97 * baseScale]} />
               <meshStandardMaterial color="#f8fafc" roughness={0.5} />
            </mesh>
          </mesh>

          <FeatureBadge
            position={[-3, 1, 0]}
            title="Typography"
            subtitle="Recruiter Approved"
            icon={CheckBadgeIcon}
            opacity={skillsOpacity}
          />
          <FeatureBadge
            position={[3, 0, 0]}
            title="ATS Score"
            subtitle="98% Match Rate"
            icon={ChartBarIcon}
            opacity={atsOpacity}
          />
        </Float>
      </group>
    </MotionGroup>
  );
};

const Scene = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={35} />
      <ambientLight intensity={0.4} />

      {/* Dynamic lighting that shifts based on scroll */}
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#8B5CF6" />
      <pointLight position={[-10, -10, 5]} intensity={0.5} color="#C084FC" />
      <spotLight position={[0, 15, 10]} angle={0.25} penumbra={1} intensity={2} castShadow />

      <Suspense fallback={null}>
        <ResumePaper scrollYProgress={scrollYProgress} />
        <Environment preset="apartment" />
      </Suspense>

      <ContactShadows
        position={[0, -5, 0]}
        opacity={0.2}
        scale={30}
        blur={3}
        far={10}
      />

      {/* Floating glass background elements */}
      <GlassElement position={[-10, 5, -8]} color="#7C3AED" scale={0.8} speed={0.4} />
      <GlassElement position={[12, -3, -10]} color="#C084FC" scale={1.5} speed={0.2} />
      <GlassElement position={[-8, -8, -6]} color="#6D28D9" scale={0.6} speed={0.6} />

      {/* Background glow distortion */}
      <mesh position={[0, 0, -12]} rotation={[0, 0, Math.PI / 4]}>
        <planeGeometry args={[120, 120]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          speed={2}
          distort={0.4}
          radius={1}
          opacity={0.07}
          transparent
        />
      </mesh>
    </>
  );
};

export const Resume3D = () => {
  return (
    <div className="h-full w-full relative">
      <Canvas shadows gl={{ antialias: true, alpha: true, stencil: false, depth: true }}>
        <Scene />
      </Canvas>

      {/* Ambient overlay for premium feel */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(255,255,255,0.05) 100%)',
          boxShadow: 'inset 0 0 100px rgba(139, 92, 246, 0.05)'
        }}
      />
    </div>
  );
};
