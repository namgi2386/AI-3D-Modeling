"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

function Model() {
  const group = useRef(null);
  const { scene, animations } = useGLTF(
    "/models/Animation_Walking_withSkin.glb"
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.play());
  }, [actions]);

  return <primitive ref={group} object={scene} />;
}

export default function Pokemon3D() {
  return (
    <div style={{ width: "100%", height: "400px" }} className="bg-gray-700">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Model />
        <OrbitControls />
      </Canvas>
    </div>
  );
}
