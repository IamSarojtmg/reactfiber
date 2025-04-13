import React, { useRef, useState } from "react";
import { Canvas, useFrame,useLoader } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three";


const defaultPos = [3, 3, 7];
const cubeSize = 2.5;
const halfSize = cubeSize / 2;

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
      <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />

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

export default function App() {
  const [targetQuaternion, setTargetQuaternion] = useState(
    new THREE.Quaternion()
  );
  const [targetPosition, setTargetPosition] = useState(
    new THREE.Vector3(0, 0, 0)
  );
  const [camera, setCamera] = useState(null);

  const Q_music = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    -Math.PI / 2
  );
  const Q_sports = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(1, 0, 0),
    Math.PI / 2
  );

  const handleMusicHover = () => {
    if (!camera) return;
    const targetQuat = camera.quaternion.clone().multiply(Q_music);
    let offset = new THREE.Vector3(0, halfSize, 0).applyQuaternion(targetQuat);
    const targetPos = offset.multiplyScalar(-1);
    setTargetQuaternion(targetQuat);
    setTargetPosition(targetPos);
  };

  const handleSportsHover = () => {
    if (!camera) return;
    const targetQuat = camera.quaternion.clone().multiply(Q_sports);
    let offset = new THREE.Vector3(0, -halfSize, 0).applyQuaternion(targetQuat);
    const targetPos = offset.multiplyScalar(-1);
    setTargetQuaternion(targetQuat);
    setTargetPosition(targetPos);
  };

  const resetTransform = () => {
    setTargetQuaternion(new THREE.Quaternion());
    setTargetPosition(new THREE.Vector3(0, 0, 0));
  };

  return (
    <>
      <button
        className="d"
        onMouseEnter={handleMusicHover}
        onMouseLeave={resetTransform}
      >
        Music
      </button>
      <button
        className="d"
        onMouseEnter={handleSportsHover}
        onMouseLeave={resetTransform}
      >
        Sports
      </button>

      <Canvas
        camera={{ position: defaultPos, fov: 50 }}
        onCreated={({ camera }) => {
          setCamera(camera);
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[-2, 2, 3]} />
        <Cube
          targetQuaternion={targetQuaternion}
          targetPosition={targetPosition}
        />
        <TrackballControls rotateSpeed={1} noZoom noPan makeDefault />
      </Canvas>
    </>
  );
}
