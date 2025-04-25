import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";

import { TextureLoader } from "three";



function Cube({ targetQuaternion }) {
  const meshRef = useRef();

  const textures = useLoader(TextureLoader, [
    "/image/2.jpg",
    "/image/1.jpg",
    "/image/3.jpeg",
    "/image/4.jpg",
    "/image/5.jpg",
    "/image/6.jpg",
  ]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.slerp(targetQuaternion, 0.05); //rotation and the somtheness of it
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3.5, 3.5, 3.5]} />

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
