"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

function Model({ modelPath }: { modelPath: string }) {
  const group = useRef(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    // 이전 애니메이션 정리
    Object.values(actions).forEach((action) => action?.stop());

    // 새 애니메이션 재생
    Object.values(actions).forEach((action) => action?.play());

    return () => {
      // 컴포넌트 언마운트 시 애니메이션 정리
      Object.values(actions).forEach((action) => action?.stop());
    };
  }, [actions, modelPath]);

  return <primitive ref={group} object={scene} />;
}

export default function Pokemon3D() {
  const [animeNum, setAnimeNum] = useState(
    "/models/Animation_Running_withSkin.glb"
  );
  const [modelKey, setModelKey] = useState(0); // 강제 리렌더링용

  const handleModelChange = () => {
    if (animeNum === "/models/Animation_Running_withSkin.glb") {
      setAnimeNum("/models/Animation_Slow_Orc_Walk_withSkin.glb");
    } else if (animeNum === "/models/Animation_Slow_Orc_Walk_withSkin.glb") {
      setAnimeNum("/models/Animation_Walking_withSkin.glb");
    } else {
      setAnimeNum("/models/Animation_Running_withSkin.glb");
    }
    setModelKey((prev) => prev + 1); // 강제 리렌더링
  };

  return (
    <div style={{ width: "100%", height: "400px" }} className="bg-gray-700">
      <Canvas key={modelKey}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <Model modelPath={animeNum} />
        <OrbitControls />
      </Canvas>
      <button onClick={handleModelChange} className="p-3 bg-rose-300 m-3">
        change to {animeNum}
      </button>
    </div>
  );
}
