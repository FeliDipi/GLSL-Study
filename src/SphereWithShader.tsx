import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import vertex from "./shaders/grass/vertex.glsl?raw";
import fragment from "./shaders/grass/fragment.glsl?raw";

import { MeshPhysicalMaterial } from "three";
import { useTexture } from "@react-three/drei";

const SphereWithShader = () => {
  const materialRef = useRef<any>(null);

  const [noiseTxt, grassTxt] = useTexture(["/noise.png", "/grass.png"]);

  const materialData = useMemo(
    () => ({
      base: MeshPhysicalMaterial,
      uniforms: {
        time: { value: 0 },
        grassDiffTex: { value: grassTxt },
        grassMaskTex: { value: noiseTxt },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <shaderMaterial ref={materialRef} attach="material" {...materialData} />
    </mesh>
  );
};

export default SphereWithShader;
