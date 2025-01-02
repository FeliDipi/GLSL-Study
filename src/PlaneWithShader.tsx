import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import vertex from "./shaders/test-0/vertex.glsl?raw";
import fragment from "./shaders/test-0/fragment.glsl?raw";

import { Color, MeshPhysicalMaterial, Vector2 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";

const PlaneWithShader = () => {
  const materialRef = useRef<any>(null);

  const materialData = useMemo(
    () => ({
      base: MeshPhysicalMaterial,
      uniforms: {
        u_time: { value: 0.0 },
        u_resolution: {
          value: new Vector2(600, 600),
        },
        u_frec_y: { value: 9.5 },
        u_amp_y: { value: 0.15 },
        u_color_a: { value: new Color(0xcba720) },
        u_color_b: { value: new Color(0x2e8ea7) },
        u_color_offset: { value: 0.05 },
        u_color_mult: { value: 3.0 },
      },
      fragmentShader: fragment,
      vertexShader: vertex,
      // wireframe: true,
    }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh rotation={[degToRad(-90), 0, 0]}>
      <planeGeometry args={[2, 2, 24, 24]} />
      <shaderMaterial ref={materialRef} attach="material" {...materialData} />
    </mesh>
  );
};

export default PlaneWithShader;
