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

// Note: The commented-out components below (Plane, Box, Sphere, Cylinder, TorusKnot variations)
// seem like experiments or unused alternatives and have been removed for clarity.

// Base component representing the ground plane
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

// Initial data for the boxes/array elements
const initialArrayData = [5, 3, 8, 9, 10, 2, 1, 4, 6, 7];

// Main component for the Array Sorting Visualization
export default function ArraySortingVisualization() { // Renamed component for clarity
  // State for the array values being visualized and sorted
  const [items, setItems] = useState<number[]>(initialArrayData);
  // State to track if sorting is currently in progress (disables buttons/sliders)
  const [isSorting, setIsSorting] = useState(false);
  // State for controlling the delay (in ms) between sort steps/animations
  const [sortSpeed, setSortSpeed] = useState(1000);
  // State for Bubble Sort highlighting (elements being compared)
  const [comparingIndices, setComparingIndices] = useState<number[] | null>(null);
  // State for Selection Sort highlighting (current minimum index found)
  const [minIndex, setMinIndex] = useState<number | null>(null);
  // State for Selection Sort highlighting (current index being processed in outer loop)
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);


  // --- Bubble Sort Algorithm ---
  // Uses useCallback to memoize the function, preventing unnecessary re-creation
  const bubbleSort = useCallback(async () => {
    setIsSorting(true); // Disable controls
    let arr = [...items]; // Mutable copy for sorting logic
    let n = arr.length;
    let swapped;

    // Outer loop continues as long as swaps are made
    do {
      swapped = false;
      // Inner loop for comparing adjacent elements
      for (let i = 0; i < n - 1; i++) {
        // --- Step 1: Highlight ---
        setComparingIndices([i, i + 1]); // Set indices to highlight
        await new Promise(resolve => setTimeout(resolve, sortSpeed / 2)); // Pause 1: Show highlight

        // --- Step 2: Compare and Swap ---
        if (arr[i] > arr[i + 1]) {
          // Swap logic
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;

          // Update state to trigger animation *before* the second pause
          setItems([...arr]);

          // Pause 2a: Allow swap animation to play out
          await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
        } else {
          // No swap occurred
          // Pause 2b: Maintain step timing even without a swap
          await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
        }
        // Highlight ([i, i+1]) remains active until the *next* iteration sets a new highlight
        // or the sort completes and clears it.
      }
      n--; // Optimization: largest element is now in its final position
    } while (swapped);

    setComparingIndices(null); // Clear Bubble Sort highlight
    setIsSorting(false); // Re-enable controls
  }, [items, sortSpeed]); // Dependencies: re-run if items or speed changes


  // --- Selection Sort Algorithm ---
  const selectionSort = useCallback(async () => {
    setIsSorting(true);
    let arr = [...items];
    let n = arr.length;

    for (let i = 0; i < n - 1; i++) {
      setCurrentIndex(i); // Highlight the current position we're trying to fill
      let minIdx = i;
      setMinIndex(minIdx); // Assume current is min initially
      await new Promise(resolve => setTimeout(resolve, sortSpeed / 3)); // Pause 1: Show current index

      // Find the minimum element in the unsorted array
      for (let j = i + 1; j < n; j++) {
        setComparingIndices([minIdx, j]); // Highlight comparison: current min vs element j
        await new Promise(resolve => setTimeout(resolve, sortSpeed / 3)); // Pause 2: Show comparison

        if (arr[j] < arr[minIdx]) {
          minIdx = j; // Found a new minimum
          setMinIndex(minIdx); // Highlight the new minimum
          // Optional pause after finding new minimum
          // await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        }
         setComparingIndices(null); // Clear comparison highlight before next iteration
      }

       // Clear comparison highlight if loop finishes
       setComparingIndices(null);

      // Swap the found minimum element with the first element (arr[i])
      if (minIdx !== i) {
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setItems([...arr]); // Update state to trigger animation
         // Highlight the swapped elements briefly? (Optional)
         // setComparingIndices([i, minIdx]);
         await new Promise(resolve => setTimeout(resolve, sortSpeed / 3)); // Pause 3: Show swap/final placement
         // setComparingIndices(null);
      } else {
         // If minIdx didn't change, still pause to maintain rhythm
         await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));
      }

      setMinIndex(null); // Clear min index highlight for the next outer loop iteration
      setCurrentIndex(null); // Clear current index highlight
    }

    // Clear all highlights at the end
    setCurrentIndex(null);
    setMinIndex(null);
    setComparingIndices(null);
    setIsSorting(false);
  }, [items, sortSpeed]);


  // --- Event Handlers ---
  const handleBubbleSortClick = () => {
    if (!isSorting) {
      // Clear other algorithm highlights before starting
      setMinIndex(null);
      setCurrentIndex(null);
      bubbleSort();
    }
  };

   const handleSelectionSortClick = () => {
    if (!isSorting) {
       // Clear other algorithm highlights before starting
      setComparingIndices(null);
      selectionSort();
    }
  };

  const handleResetClick = () => {
     setItems(initialArrayData); // Reset array to initial state
     // Clear all highlights
     setComparingIndices(null);
     setMinIndex(null);
     setCurrentIndex(null);
  }

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortSpeed(Number(event.target.value));
  };

  // Removed rotation handlers

  return (
    // Add position relative for Html positioning context if needed
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
       {/* UI Controls Panel - Styled with Tailwind */}
       <div className="absolute top-2 left-2 z-10 bg-white/80 p-3 rounded-md shadow-md">
         {/* Sort/Reset Buttons */}
         <div className="mb-2 flex flex-wrap gap-2">
           <button
             onClick={handleBubbleSortClick}
             disabled={isSorting}
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Bubble Sort
           </button>
            <button
             onClick={handleSelectionSortClick}
             disabled={isSorting}
             className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Selection Sort
           </button>
           <button
             onClick={handleResetClick}
             disabled={isSorting}
             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Reset
           </button>
         </div>
         {/* Speed Slider */}
         <div className="flex items-center">
           <label htmlFor="speedSlider" className="mr-2 text-sm font-medium text-gray-700">Speed (ms): {sortSpeed}</label>
           <input
             type="range"
             id="speedSlider"
             min="1000"
             max="2000"
             step="50"
             value={sortSpeed}
             onChange={handleSpeedChange}
             disabled={isSorting}
             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
       {/* Removed rotation group wrapper */}
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

        {/* Pass items and all highlighting states to BoxRow */}
        <BoxRow
          items={items}
          comparingIndices={comparingIndices}
          minIndex={minIndex}
          currentIndex={currentIndex}
         />
        {/* <Box position={[-4, 3, 0]} x={1} y={1} z={1}  />
          <Box position={[-2, 3, 0]} x={1} y={2} z={1} />
          <Box position={[0, 3, 0]} x={1} y={2} z={1}  /> */}
        {/* <Cylinder radious={1} height={3} thickness={40} position={[1, 3, 0]} /> */}
        {/* <Sphere position={[-2, 3, 0]} />
          <Cylinder position={[0, 3, 0]} /> */}

        {/* <TorusKnot position={[4, 3, 0]} /> */}
      </Physics>
      <OrbitControls target-y={2} /> {/* OrbitControls handles drag-to-rotate */}
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
