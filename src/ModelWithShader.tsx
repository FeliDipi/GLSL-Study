import { useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";

import vertex from "./shaders/novathena/vertex.glsl?raw";
import fragment from "./shaders/novathena/fragment.glsl?raw";

import { Mesh, MeshPhysicalMaterial, Object3D, Vector3 } from "three";

interface IModelWithShader {
  model: Object3D;
}

const ModelWithShader: React.FC<IModelWithShader> = ({ model }) => {
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

  // useEffect(() => {
  //   model.traverse((child: any) => {
  //     if (child instanceof Mesh) {
  //       console.log(child.name);

  //       child.material = materialData;
  //     }
  //   });
  // }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <primitive object={model} position={[0, 0, 0]} scale={[100, 100, 100]} />
  );
};

export default ModelWithShader;
