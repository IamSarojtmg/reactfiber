import React, { useRef, useState } from "react";
import * as THREE from "three";

import { useFrame, useLoader } from "@react-three/fiber";

import { TextureLoader } from "three";

function Cube({ targetQuaternion}) {


  const meshRef = useRef();
  const [msg, setMsg] = useState('')
const rayCaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

const onClick = (e)=>{
  mouse.x = (e.clientX /window.innetWidth) * 2 -1
  mouse.y = -(e.clientY/window.innerHeight) * 2+1

  rayCaster.setFromCamera(mouse, e.camera)

  const intersects = rayCaster.intersectObjects(meshRef.current)
    if (intersects.length > 0) {
      const faceIndex = intersects[0].faceIndex;
      
      // Log a different message based on which face was clicked
      if (faceIndex === 0) {
        console.log('Hello from Side 1');
        setMsg('Hello from Side 1');
      } else if (faceIndex === 1) {
        console.log('Bye from Side 2');
        setMsg('Bye from Side 2');
      }
      // Add additional cases for other faces if needed
    }

}


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
      meshRef.current.quaternion.slerp(targetQuaternion, 0.05);
    }
  });


  return (
    <mesh ref={meshRef} onClick={onClick}>
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

