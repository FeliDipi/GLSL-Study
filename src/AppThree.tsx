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

function AppThree() {
  return (
    <Canvas style={{ width: "100vw", height: "100vh" }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false}/>
      <SphereWithShader />
      {/* <PlaneWithShader /> */}
      <Environment preset="city" blur={0.8} />
      <ContactShadows
        position={[0, 1, 0]}
        scale={15}
        resolution={512}
        blur={3}
      />
      <directionalLight position={[0, 10, 0]} intensity={1} rotation={[degToRad(-90),degToRad(0),degToRad(0)]}/>
    </Canvas>
  );
}

export default AppThree;
