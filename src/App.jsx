import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import * as THREE from "three";
import Cube from "./Cube";

export default function App() {
  const [targetQuaternion, setTargetQuaternion] = useState(
    new THREE.Quaternion()
  );

  const [camera, setCamera] = useState(null);

  const Q_music = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(),
    -Math.PI / 2
  );
  const Q_sports = new THREE.Quaternion().setFromAxisAngle(
    new THREE.Vector3(),
    Math.PI / 2
  );

  const handleMusicHover = () => {
    if (!camera) return;

    const cameraRotation = camera.quaternion.clone();

    const targetQuat = cameraRotation.multiply(Q_music);

    setTargetQuaternion(targetQuat);
  };

  const handleSportsHover = () => {
    if (!camera) return;
    const targetQuat = camera.quaternion.clone().multiply(Q_sports);

    setTargetQuaternion(targetQuat);
  };

  const resetTransform = () => {
    setTargetQuaternion(new THREE.Quaternion());
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
        camera={{ position: [3, 3, 7], fov: 50 }}
        onCreated={({ camera }) => {
          setCamera(camera);
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[-2, 2, 3]} />
        <Cube targetQuaternion={targetQuaternion} />
        <TrackballControls rotateSpeed={2} noZoom noPan makeDefault />
      </Canvas>
    </>
  );
}
