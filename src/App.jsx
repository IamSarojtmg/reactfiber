import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import * as THREE from "three";
import Cube from "./Cube";

const defaultPos = [3, 3, 7];

export default function App() {
  const [targetQuaternion, setTargetQuaternion] = useState(
    new THREE.Quaternion()
  );
  const targetPosition = new THREE.Vector3(0, 0, 0)
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

    // 1. Get camera's current rotation
    const cameraRotation = camera.quaternion.clone();

    // 2. Combine with music flip rotation
    const targetQuat = cameraRotation.multiply(Q_music);

    // 3. Set just the rotation (no position change)
    setTargetQuaternion(targetQuat);
  };

  const handleSportsHover = () => {
    if (!camera) return;
    const targetQuat = camera.quaternion.clone().multiply(Q_sports);
    setTargetQuaternion(targetQuat);
  };

  // const resetTransform = () => {
  //   setTargetQuaternion(new THREE.Quaternion());
  // };

  return (
    <>
      <button
        className="d"
        onMouseEnter={handleMusicHover}
        // onMouseLeave={resetTransform}
      >
        Music
      </button>
      <button
        className="d"
        onMouseEnter={handleSportsHover}
        // onMouseLeave={resetTransform}
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
        <TrackballControls rotateSpeed={2} noZoom noPan makeDefault />
      </Canvas>
    </>
  );
}
