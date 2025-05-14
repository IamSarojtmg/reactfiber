import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { TrackballControls } from "@react-three/drei";
import * as THREE from "three";
import Cube from "./Cube";

export default function App() {
const [clickedFace, setClickedFace] = useState("");

  const [targetQuaternion, setTargetQuaternion] = useState(
    new THREE.Quaternion()
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
      <div className="btn">
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
          // onMouseLeave={resetTransform}
        >
          Sports
        </button>
      </div>
      <Canvas
        camera={{ position: [3, 3, 7], fov: 50 }}
        onCreated={({ camera }) => {
          setCamera(camera);
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[-2, 2, 3]} />
        <Cube targetQuaternion={targetQuaternion} setClickedFace={setClickedFace} />
        <TrackballControls rotateSpeed={2} noZoom noPan makeDefault />
      </Canvas>

{clickedFace && (
  <div
    onClick={() => setClickedFace("")}
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0, 0, 0, 0.0)", // transparent but still blocks interactions
      zIndex: 999, // below message but above canvas
    }}
  >
    <div
      style={{
        position: "absolute",
        height: "100px",
        top: 290,
        left: "40%",
        width: "20%",
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        borderRadius: "8px",
        zIndex: 1000,
        pointerEvents: "auto", // keep clickable
      }}
    >
      You clicked {clickedFace}
    </div>
  </div>
)}


    </>
  );
}





















