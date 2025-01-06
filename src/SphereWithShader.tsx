import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import vertex from "./shaders/wave/vertex.glsl?raw";
import fragment from "./shaders/wave/fragment.glsl?raw";

import { MeshPhysicalMaterial } from "three";

const SphereWithShader = () => {
  const materialRef = useRef<any>(null);

  const materialData = useMemo(
    () => ({
      base: MeshPhysicalMaterial,
      uniforms: {
        u_time: { value: 0 },
      },
      fragmentShader: fragment,
      vertexShader: vertex,
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
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
