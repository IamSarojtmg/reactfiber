import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

import { TextureLoader } from "three";



function Cube({ targetQuaternion, targetPosition }) {
  const meshRef = useRef();

  const textures = useLoader(TextureLoader, [
    "/image/2.jpg",
    "/image/1.jpeg",
    "/image/3.jpg",
    "/image/4.jpg",
    "/image/5.jpg",
    "/image/6.jpg",
  ]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.slerp(targetQuaternion, 0.1);
      meshRef.current.position.lerp(targetPosition, 0.1);
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />

      {textures.map((ele, index) => (
        <meshStandardMaterial
          key={index}
          map={ele}
          attach={`material-${index}`}
        />
      ))}
    </mesh>
  );
}

export default Cube;
