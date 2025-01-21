import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import vertex from "./shaders/novathena/vertex.glsl?raw";
import fragment from "./shaders/novathena/fragment.glsl?raw";

import { MeshPhysicalMaterial, Vector2, Vector3 } from "three";

const SphereWithShader = () => {
  const materialRef = useRef<any>(null);

  const materialData = useMemo(
    () => ({
      base: MeshPhysicalMaterial,
      uniforms: {
        uLightPosition: {
          value: new Vector3(0, 10, 0),
        },
        uTime: { value: 0 },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
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
