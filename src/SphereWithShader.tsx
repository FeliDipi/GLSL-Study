import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";

import vertex from "./shaders/grass/vertex.glsl?raw";
import fragment from "./shaders/grass/fragment.glsl?raw";

import { MeshPhysicalMaterial, Vector3, Vector4 } from "three";
import { useTexture } from "@react-three/drei";

const SphereWithShader = () => {
  const materialRef = useRef<any>(null);

  const noiseTxt = useTexture("/noise.png");

  const materialData = useMemo(
    () => ({
      base: MeshPhysicalMaterial,
      uniforms: {
        sway: { value: 1.14 },
        sway_: { value: 0.34 },
        sway_pow: { value: 1.3 },
        sway_time_scale: { value: 0.2 },
        sway_dir: { value: new Vector3(1.0, 0.0, 1.0) },
        sway_noise: { value: noiseTxt },
        grass_scale: { value: new Vector3(1.0, 1.0, 1.0) },
        sway_noise_sampeling_scale: { value: 0.12 },
        time: { value: 0 },
        color_scale: { value: 0.3 },
        color_grad_height: { value: -0.5 },
        top_color: { value: new Vector4(1, 0, 0, 1) },
        bot_color: { value: new Vector4(0, 1, 0, 1) },
        grass_roughness: { value: 0.3 },
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
