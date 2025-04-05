import { Stats, OrbitControls, Html } from "@react-three/drei"; // Import Html
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useCallback } from "react"; // Import useState, useCallback
import { Physics, PlaneProps, useBox, usePlane } from "@react-three/cannon";
import * as THREE from 'three';

import Box from "../../atoms/box";

import BoxRow from "../../molecules/boxRow";

function Plane(props: PlaneProps) {
  // Explicitly type the ref for a Mesh object
  const [ref] = usePlane(() => ({ mass: 0, ...props }), useRef<THREE.Mesh>(null));
  return (
    // Ensure the ref type matches the mesh element
    <mesh ref={ref as React.Ref<THREE.Mesh>} receiveShadow>
      <planeGeometry args={[25, 25]} />
      <meshStandardMaterial />
    </mesh>
  );
}
// function Plane(props: PlaneProps) {
//    const [ref, api] = useBox(
//     () => ({ args: [1, 1, 1], mass: 0, ...props }),
//     useRef()
//   )
//   return (
//     <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}  position={[0, 0, 0]}>
//       <boxGeometry args={[100, 1, 100]}/>
//        <meshNormalMaterial />
//      </mesh>
//   )
// }

// function Box(props) {
//   const [ref, api] = useBox(
//     () => ({ args: [1, 1, 1], mass: 1, ...props }),
//     useRef()
//   )

//   return (
//     <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshNormalMaterial />
//     </mesh>
//   )
// }

// function Sphere(props) {
//   const [ref, api] = useSphere(
//     () => ({ args: [0.75], mass: 1, ...props }),
//     useRef()
//   )

//   return (
//     <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
//       <sphereGeometry args={[0.75]} />
//       <meshNormalMaterial />
//     </mesh>
//   )
// }

// function Cylinder(props) {
//   const [ref, api] = useCylinder(
//     () => ({ args: [1, 1, 2, 8], mass: 1, ...props }),
//     useRef()
//   )

//   return (
//     <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
//       <cylinderGeometry args={[1, 1, 2, 8]} />
//       <meshNormalMaterial />
//     </mesh>
//   )
// }

// function TorusKnot(props) {
//   const geometry = useMemo(() => new TorusKnotGeometry(), [])
//   const [ref, api] = useTrimesh(
//     () => ({
//       args: [geometry.attributes.position.array, geometry.index.array],
//       mass: 1,
//       ...props,
//     }),
//     useRef()
//   )

//   return (
//     <mesh ref={ref} castShadow onPointerDown={() => api.velocity.set(0, 5, 0)}>
//       <torusKnotGeometry />
//       <meshNormalMaterial />
//     </mesh>
//   )
// }

const Base: React.FC = () => {
  const [ref] = useBox(() => ({
    mass: 0,
    args: [10, 1, 10],
    position: [0, 0, 0],
  }));

  return (
    // Cast the ref to the correct type for the mesh
    <mesh ref={ref as React.Ref<THREE.Mesh>} receiveShadow>
      <boxBufferGeometry args={[10, 1, 10]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

const Pillar: React.FC = () => {
  const [ref] = useBox(() => ({
    mass: 0,
    args: [1, 4, 1],
    position: [0, 2, 0],
  }));

  return (
    // Cast the ref to the correct type for the mesh
    <mesh ref={ref as React.Ref<THREE.Mesh>} castShadow>
      <boxBufferGeometry args={[1, 4, 1]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
};

// Initial data for the boxes
const initialArrayData = [5, 3, 8, 9, 10, 2, 1, 4, 6, 7];

export default function App() {
  const [items, setItems] = useState<number[]>(initialArrayData);
  const [isSorting, setIsSorting] = useState(false);
  const [sortSpeed, setSortSpeed] = useState(150); // Initial speed (delay in ms)

  // Bubble Sort implementation adapted for this component
  const bubbleSort = useCallback(async () => {
    setIsSorting(true);
    let arr = [...items]; // Create a mutable copy
    let n = arr.length;
    let swapped;

    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          // Swap elements
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;

          // Update state to visualize the step
          setItems([...arr]);
          // Add a small delay using the sortSpeed state
          await new Promise(resolve => setTimeout(resolve, sortSpeed));
        }
      }
      n--;
    } while (swapped);

    setIsSorting(false);
  }, [items]); // Dependency array includes items

  const handleSortClick = () => {
    if (!isSorting) {
      bubbleSort();
    }
  };

  const handleResetClick = () => {
     setItems(initialArrayData);
  }

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortSpeed(Number(event.target.value));
  };

  return (
    // Add position relative for Html positioning context if needed
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
       {/* Controls outside Canvas */}
       <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10, background: 'rgba(255,255,255,0.8)', padding: '10px', borderRadius: '5px' }}>
         {/* Sort/Reset Buttons */}
         <div style={{ marginBottom: '10px' }}>
           <button
             onClick={handleSortClick}
             disabled={isSorting}
             style={{ marginRight: '10px', padding: '8px 15px' }}
           >
             {isSorting ? 'Sorting...' : 'Bubble Sort'}
           </button>
           <button
             onClick={handleResetClick}
             disabled={isSorting}
             style={{ padding: '8px 15px' }}
           >
             Reset
           </button>
         </div>
         {/* Speed Slider */}
         <div>
           <label htmlFor="speedSlider" style={{ marginRight: '10px', verticalAlign: 'middle' }}>Speed (Delay ms): {sortSpeed}</label>
           <input
             type="range"
             id="speedSlider"
             min="10" // Min delay
             max="1000" // Max delay
             step="10"
             value={sortSpeed}
             onChange={handleSpeedChange}
             disabled={isSorting}
             style={{ verticalAlign: 'middle' }}
           />
         </div>
       </div>

      <Canvas shadows camera={{ position: [-2, 5, 15], fov: 50 }}> {/* Adjusted camera */}
        {/* <spotLight
          position={[-3, 15, 15]}
           disabled={isSorting}
           style={{ marginRight: '10px', padding: '8px 15px' }}
         >
           {isSorting ? 'Sorting...' : 'Bubble Sort'}
         </button>
         <button
           onClick={handleResetClick}
           disabled={isSorting}
           style={{ padding: '8px 15px' }}
         >
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
      /> */}
      <ambientLight intensity={1} />
      <spotLight
        position={[0, 25, 25]}
        angle={Math.PI / 4}
        penumbra={0.5}
        castShadow
      />
      {/* <Physics>
        <Base />
        <Pillar />
      </Physics> */}
      <Physics>
        {/* <Plane rotation={[-Math.PI / 2, 0, 0]} /> */}

        <Box
          positionVal={[0, 0, 0]}
          scaleVal={[100, 2, 100]}
          massVal={0}
          velocityVal={0}
          enableReceiveShadow={true}
          enablecastShadow={false}
          material="standard"
          enableGravity={false}
        />

        {/* Pass the items state to BoxRow */}
        <BoxRow items={items} />
        {/* <Box position={[-4, 3, 0]} x={1} y={1} z={1}  />
          <Box position={[-2, 3, 0]} x={1} y={2} z={1} />
          <Box position={[0, 3, 0]} x={1} y={2} z={1}  /> */}
        {/* <Cylinder radious={1} height={3} thickness={40} position={[1, 3, 0]} /> */}
        {/* <Sphere position={[-2, 3, 0]} />
          <Cylinder position={[0, 3, 0]} /> */}

        {/* <TorusKnot position={[4, 3, 0]} /> */}
      </Physics>
      <OrbitControls target-y={2} /> {/* Adjust OrbitControls target */}
      <Stats />

       {/* Alternative: Buttons inside Canvas using Html */}
       {/* <Html position={[-5, 5, 0]}>
         <div style={{ background: 'rgba(255, 255, 255, 0.7)', padding: '10px', borderRadius: '5px' }}>
           <button
             onClick={handleSortClick}
             disabled={isSorting}
             style={{ marginRight: '10px', padding: '8px 15px' }}
           >
             {isSorting ? 'Sorting...' : 'Bubble Sort'}
           </button>
           <button
             onClick={handleResetClick}
             disabled={isSorting}
             style={{ padding: '8px 15px' }}
           >
             Reset
           </button>
         </div>
       </Html> */}
    </Canvas>
   </div> // Close the wrapper div
  );
}
