import  { useRef } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { Html } from "@react-three/drei";
function Cube({ targetQuaternion,setClickedFace  }) {
  const meshRef = useRef();
  const rayCaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

const onClick = (e) => {
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

  rayCaster.setFromCamera(mouse, e.camera);
  const intersects = rayCaster.intersectObject(meshRef.current);

  if (intersects.length > 0) {
    const intersection = intersects[0];
    const normal = intersection.face.normal;
    const uv = intersection.uv; // this is the clicked texture coordinate (0 to 1)

    // Check if it's in top-right region
    const isTopRight = uv.x > 0.5 && uv.y > 0.5;

    if (!isTopRight) return; // Only respond to top-right clicks

    // Determine face by normal
    if (Math.abs(normal.x) > Math.abs(normal.y) && Math.abs(normal.x) > Math.abs(normal.z)) {
      if (normal.x > 0) {
        setClickedFace("Conference");
      } else {
        setClickedFace("Food Fest");
      }
    } else if (Math.abs(normal.y) > Math.abs(normal.x) && Math.abs(normal.y) > Math.abs(normal.z)) {
      if (normal.y > 0) {
        setClickedFace("Sports");
      } else {
        setClickedFace("Music");
      }
    } else {
      if (normal.z > 0) {
        setClickedFace("Meet Up");
      } else {
        setClickedFace("Gaming");
      }
    }
  }
};


  // Load textures for each side of the cube
  const textures = useLoader(TextureLoader, [
    "/image/confrence.jpg",
    "/image/foodfestival.jpg",
    "/image/sports.jpeg",
    "/image/music.jpg",
    "/image/meetup.jpg",
    "/image/gaming.jpg",
  ]);

  // Smoothly rotate the cube towards the target quaternion
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.quaternion.slerp(targetQuaternion, 0.05);
    }
  });
const highlightStyle = {
  width: "20px",
  height: "20px",
  backgroundColor: "rgba(238, 9, 9, 0.7)",
  borderRadius: "50%",
  border: "1px solid #fff",
};

  return (
    <>


<mesh ref={meshRef} onClick={onClick}>
  <boxGeometry args={[3.5, 3.5, 3.5]} />
  {textures.map((texture, index) => (
    <meshStandardMaterial
      key={index}
      map={texture}
      attach={`material-${index}`}
    />
  ))}

</mesh>
{/** Top-right corner markers for each face */}
<Html position={[1.75, 1.75, 0]} transform >
  <div style={highlightStyle} />
</Html>

<Html position={[-1.75, 1.75, 0]} transform >
  <div style={highlightStyle} />
</Html>

<Html position={[0, 1.75, 1.75]} transform >
  <div style={highlightStyle} />
</Html>

<Html position={[0, 1.75, -1.75]} transform >
  <div style={highlightStyle} />
</Html>

<Html position={[1.75, 1.75, 1.75]} transform >
  <div style={highlightStyle} />
</Html>

<Html position={[1.75, 1.75, -1.75]} transform >
  <div style={highlightStyle} />
</Html>

    </>
  );
}

export default Cube;










































// import { useRef } from "react";

// import { useFrame, useLoader } from "@react-three/fiber";

// import { TextureLoader } from "three";

// function Cube({ targetQuaternion }) {
//   const meshRef = useRef();

//   const textures = useLoader(TextureLoader, [
//     "/image/2.jpg",
//     "/image/1.jpg",
//     "/image/3.jpeg",
//     "/image/4.jpg",
//     "/image/5.jpg",
//     "/image/6.jpg",
//   ]);

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.quaternion.slerp(targetQuaternion, 0.05);
//     }
//   });

//   return (
//     <mesh ref={meshRef}>
//       <boxGeometry args={[3.5, 3.5, 3.5]} />
//       {textures.map((ele, index) => (
//         <meshStandardMaterial
//           key={index}
//           map={ele}
//           attach={`material-${index}`}
//         />
//       ))}
//     </mesh>
//   );
// }

// export default Cube;
