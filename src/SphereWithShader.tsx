import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import vertex from "./shaders/initial-three/vertex.glsl?raw";
import fragment from "./shaders/initial-three/fragment.glsl?raw";

import { MeshPhysicalMaterial, Vector2 } from "three";

const SphereWithShader = () => {
  const materialRef = useRef<any>(null);

  const materialData = useMemo(
    () => ({
      base: MeshPhysicalMaterial,
      uniforms: {
        u_time: { value: 0 },
        u_resolution: {
          value: new Vector2(600, 600),
        },
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
