// import { Canvas, useFrame, useLoader } from "@react-three/fiber";
// import { TextureLoader } from "three";
// import { useRef, useState } from "react";
// import { TrackballControls } from "@react-three/drei";

// // Check the GPT last code
// const pos = [0, 0, 7]
// const defaultPos = [3,3,6]
// function Cube({ position, size, targetRotation }) {
//   const meshRef = useRef();

//   const musicTexture = useLoader(TextureLoader, "/image/2.jpg");
//   const footballTexture = useLoader(TextureLoader, "/image/1.jpeg");
//   const threeTexture = useLoader(TextureLoader, "/image/3.jpg");
//   const fourTexture = useLoader(TextureLoader, "/image/4.jpg");
//   const fiveTexture = useLoader(TextureLoader, "/image/5.jpg");
//   const sixTexture = useLoader(TextureLoader, "/image/6.jpg");

//   useFrame(() => {
//     if (!meshRef.current) return;

//     meshRef.current.rotation.y +=
//       (targetRotation.y - meshRef.current.rotation.y) * 0.1;
//     meshRef.current.rotation.x +=
//       (targetRotation.x - meshRef.current.rotation.x) * 0.1;
//   });

//   return (
//     <mesh position={position} ref={meshRef}>
//       <boxGeometry args={size} /> /
//       <meshStandardMaterial map={musicTexture} attach="material-0" />
//       <meshStandardMaterial map={footballTexture} attach="material-1" />
//       <meshStandardMaterial map={threeTexture} attach="material-2" />
//       <meshStandardMaterial map={fourTexture} attach="material-3" />
//       <meshStandardMaterial map={fiveTexture} attach="material-4" />
//       <meshStandardMaterial map={sixTexture} attach="material-5" />
//     </mesh>
//   );
// }

// export default function R3fDemo() {
//   const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0 });

//   const handleMusicClick = () => {
//     setTargetRotation({ x: 0, y: -Math.PI / 2 });
//   };
//   const handleSportsClick = () => {
//     setTargetRotation({ x: 0, y: Math.PI / 2 });
//   };

//   return (
//     <>
//       <button className="d" onClick={handleMusicClick}>
//         Music
//       </button>
//       <button className="d" onClick={handleSportsClick}>
//         Sports
//       </button>

//       <Canvas camera={{ position: defaultPos, fov: 50 }}>
//         <ambientLight intensity={1} />
//         <directionalLight position={[-2, 2, 3]} />
//         <Cube
//           position={[0, 0, 0]}
//           size={[2.5, 2.5, 2.5]}
//           targetRotation={targetRotation}
//         />
//         <TrackballControls rotateSpeed={3} noZoom={true} noPan={true} />
//       </Canvas>
//     </>
//   );
// }

//usefram rotates the camera, meaning i will have to do something there, either find a way to change the camera to point to the specific side of cube or rotate the cube to the side where you want to camera to see it
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useRef, useState } from "react";
import { TrackballControls } from "@react-three/drei";

const defaultPos = [3, 3, 6];

function Cube({ position, size, targetRotation }) {
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
    if (!meshRef.current) return;
    meshRef.current.rotation.y +=
      (targetRotation.y - meshRef.current.rotation.y) * 0.1;
    meshRef.current.rotation.x +=
      (targetRotation.x - meshRef.current.rotation.x) * 0.1;
      meshRef.current.rotation.z +=
      (targetRotation.z - meshRef.current.rotation.z) * 0.1;


        // console.log("Cube rotation:", meshRef.current.rotation);
        // console.log("Camera position:", camera.position);

  });

  return (
    <mesh position={position} ref={meshRef}>
      <boxGeometry args={size} />
      {textures.map((texture, index) => (
        <meshStandardMaterial
          key={index}
          map={texture}
          attach={`material-${index}`}
        />
      ))}
    </mesh>
  );
}

export default function R3fDemo() {
  const [targetRotation, setTargetRotation] = useState({ x: 0, y: 0, z: 0 });

  const handleMusicClick = () => {
    setTargetRotation({ x: 0, y: -Math.PI / 2, z:0 });
  };

  const handleSportsClick = () => {
    setTargetRotation({ x: 0, y: Math.PI / 2,z:0 });
  };

  return (
    <>
      <button className="d" onMouseEnter={handleMusicClick}>
        Music
      </button>
      <button className="d" onMouseEnter={handleSportsClick}>
        Sports
      </button>

      <Canvas camera={{ position: defaultPos, fov: 50 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[-2, 2, 3]} />
        <Cube
          position={[0, 0, 0]}
          size={[2.5, 2.5, 2.5]}
          targetRotation={targetRotation}
        />
        <TrackballControls rotateSpeed={3} noZoom noPan makeDefault />
      </Canvas>
    </>
  );
}
