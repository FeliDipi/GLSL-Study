import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import vertex from "./shaders/test-0/vertex.glsl?raw";
import fragment from "./shaders/test-0/fragment.glsl?raw";

import { degToRad } from "three/src/math/MathUtils.js";

const PlaneWithShader = () => {
  const materialRef = useRef<any>(null);

  const materialData = useMemo(
    () => ({
      fragmentShader: fragment,
      vertexShader: vertex,
      wireframe: true,
    }),
    []
  );

  // useFrame(({ clock }) => {
  //   if (materialRef.current) {
  //     materialRef.current.uniforms.u_time.value = clock.getElapsedTime();
  //   }
  // });

  return (
    <mesh rotation={[degToRad(-90), 0, 0]}>
      <planeGeometry args={[2, 2, 24, 24]} />
      <shaderMaterial ref={materialRef} attach="material" {...materialData} />
    </mesh>
  );
};

export default PlaneWithShader;
