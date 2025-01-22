import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import SphereWithShader from "./SphereWithShader";
import PlaneWithShader from "./PlaneWithShader";
import { degToRad } from "three/src/math/MathUtils.js";
import { DRACOLoader, GLTFLoader } from "three/examples/jsm/Addons.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import { useEffect, useRef } from "react";
import { Object3D } from "three";
import ModelWithShader from "./ModelWithShader";

function AppThree() {
  const modelRef = useRef<Object3D>();
  const loader = new GLTFLoader();
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath(
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  );
  loader.setDRACOLoader(dracoLoader);
  loader.setMeshoptDecoder(MeshoptDecoder);

  useEffect(() => {
    loader.load("/models/face.glb", (GLTF) => {
      modelRef.current = GLTF.scene;
    });
  }, []);

  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} />
      {/* <SphereWithShader /> */}
      {/* <PlaneWithShader /> */}
      {modelRef.current && <ModelWithShader model={modelRef.current} />}
      <Environment preset="city" blur={0.8} />
      <ContactShadows
        position={[0, 1, 0]}
        scale={15}
        resolution={512}
        blur={3}
      />
      <directionalLight
        position={[0, 10, 0]}
        intensity={1}
        rotation={[degToRad(-90), degToRad(0), degToRad(0)]}
      />
    </Canvas>
  );
}

export default AppThree;
