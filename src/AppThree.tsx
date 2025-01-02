import { Canvas } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import SphereWithShader from "./SphereWithShader";
import PlaneWithShader from "./PlaneWithShader";

function AppThree() {
  return (
    <Canvas style={{ width: "600px", height: "600px" }}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls />
      <SphereWithShader />
      {/* <PlaneWithShader /> */}
      <Environment preset="city" blur={0.8} />
      <ContactShadows
        position={[0, -1, 0]}
        scale={15}
        resolution={512}
        blur={3}
      />
    </Canvas>
  );
}

export default AppThree;
