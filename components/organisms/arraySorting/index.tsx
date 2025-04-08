import { Stats, OrbitControls, Html } from "@react-three/drei"; // Import Html
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useCallback } from "react"; // Import useState, useCallback
import { Physics, PlaneProps, useBox, usePlane } from "@react-three/cannon";
import * as THREE from 'three';

 import Box from "../../atoms/box";

 import BoxRow from "../../molecules/boxRow";
 import AlgorithmCodeDisplay from "../../molecules/AlgorithmCodeDisplay"; // Import the new component

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

// --- Tree Sort Helper Class ---
class TreeNode {
  key: number;
  left: TreeNode | null;
  right: TreeNode | null;
  originalIndex: number; // Store original index for visualization reference

  constructor(item: number, index: number) {
    this.key = item;
    this.left = this.right = null;
    this.originalIndex = index; // Store original index
  }
}
// ---

// --- Define the structure for a single sort step ---
interface SortStep {
  arrayState: number[];
  comparingIndices?: number[] | null;
  minIndex?: number | null;
  currentIndex?: number | null;
  keyIndex?: number | null;
  mergeRange?: { left: number; right: number } | null;
  pivotIndex?: number | null;
  heapIndices?: { root: number; left?: number; right?: number; largest?: number } | null;
  timSortRange?: { type: 'insertion' | 'merge'; start: number; end: number; mid?: number } | null;
  cocktailRange?: { start: number; end: number; direction: 'forward' | 'backward' } | null;
  strandInputIndices?: Set<number> | null;
  strandSublistIndices?: Set<number> | null;
  strandResultIndices?: Set<number> | null;
  strandMergeIndices?: { resultIdx: number; sublistIdx: number } | null;
  logicDetails?: Record<number, string> | null;
  activeCodeLine?: number | null;
  description?: string; // Optional overall description for the step
}


// Main component for the Array Sorting Visualization
export default function ArraySortingVisualization() { // Renamed component for clarity
  // State for the array values being visualized and sorted (now primarily for reset)
  const [initialItems, setInitialItems] = useState<number[]>(initialArrayData);
  // State to track if sorting is currently in progress (disables buttons/sliders) - repurposed for step generation phase
  const [isGeneratingSteps, setIsGeneratingSteps] = useState(false);
  // State for controlling the delay (in ms) between sort steps/animations (REMOVED - now manual)
  // const [sortSpeed, setSortSpeed] = useState(1000);

  // State for manual stepping
  const [allSteps, setAllSteps] = useState<SortStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // State to track the currently active algorithm for code display
  const [activeAlgorithm, setActiveAlgorithm] = useState<'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap' | 'shell' | 'tree' | 'tim' | 'cocktail' | 'comb' | 'gnome' | 'strand' | null>(null);

  // --- Generate Bubble Sort Steps (Synchronous) ---
  const generateBubbleSortSteps = (itemsToSort: number[]): SortStep[] => {
    const steps: SortStep[] = [];
    let arr = [...itemsToSort];
    let n = arr.length;
    let swapped;

    // Initial state
    steps.push({ arrayState: [...arr], activeCodeLine: 1, description: "Start Bubble Sort" });

    do {
      steps.push({ arrayState: [...arr], activeCodeLine: 4, description: "Start new pass" });
      swapped = false;
      steps.push({ arrayState: [...arr], activeCodeLine: 5, description: "Set swapped = false" });

      for (let i = 0; i < n - 1; i++) {
        steps.push({ arrayState: [...arr], activeCodeLine: 6, comparingIndices: [i, i + 1], description: `Comparing indices ${i} and ${i + 1}` });
        steps.push({ arrayState: [...arr], activeCodeLine: 7, comparingIndices: [i, i + 1], logicDetails: { [i]: `Comparing with ${i + 1}`, [i + 1]: `Comparing with ${i}` }, description: `Check if ${arr[i]} > ${arr[i + 1]}` });
        steps.push({ arrayState: [...arr], activeCodeLine: 8, comparingIndices: [i, i + 1], logicDetails: { [i]: `Comparing with ${i + 1}`, [i + 1]: `Comparing with ${i}` } }); // Highlight line 8

        if (arr[i] > arr[i + 1]) {
          steps.push({ arrayState: [...arr], activeCodeLine: 10, comparingIndices: [i, i + 1], logicDetails: { [i]: `Value ${arr[i]} > ${arr[i+1]}. Swapping...`, [i + 1]: `Value ${arr[i+1]} < ${arr[i]}. Swapping...` }, description: `Swap needed` });
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
          // Capture state *after* swap
          steps.push({ arrayState: [...arr], activeCodeLine: 11, comparingIndices: [i, i + 1], description: `Elements swapped` }); // State after swap
          steps.push({ arrayState: [...arr], activeCodeLine: 12, description: `Set swapped = true` });
          steps.push({ arrayState: [...arr], activeCodeLine: 14, description: `End of comparison block (swap occurred)` });
        } else {
          steps.push({ arrayState: [...arr], activeCodeLine: 14, comparingIndices: [i, i + 1], logicDetails: { [i]: `Value ${arr[i]} <= ${arr[i+1]}. No swap.`, [i + 1]: `Value ${arr[i+1]} >= ${arr[i]}. No swap.` }, description: `No swap needed` });
        }
        // Clear highlights for next iteration step
        steps.push({ arrayState: [...arr], activeCodeLine: 6, description: `End of iteration ${i}` }); // Back to loop start line
      }
      n--;
      steps.push({ arrayState: [...arr], activeCodeLine: 16, description: `Decrement n (outer loop boundary)` });
    } while (swapped);

    steps.push({ arrayState: [...arr], activeCodeLine: 17, description: "Sorting complete (no swaps in last pass)" });
    steps.push({ arrayState: [...arr], activeCodeLine: 18, description: "Finished" }); // Final state

    return steps;
  };


  // --- Bubble Sort Algorithm (Old async version - commented out) ---
  /*
   const bubbleSort = useCallback(async () => {
     setIsSorting(true); setActiveAlgorithm('bubble');
     setActiveCodeLine(1); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
     let arr = [...items];
     setActiveCodeLine(2); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
     let n = arr.length;
     let swapped;
     setActiveCodeLine(3); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
     do {
       setActiveCodeLine(4); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
       swapped = false;
       setActiveCodeLine(5); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
       for (let i = 0; i < n - 1; i++) {
         setActiveCodeLine(6); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        setComparingIndices([i, i + 1]);
        // Set logic details for the boxes being compared
        setLogicDetailsState({ [i]: `Comparing with index ${i + 1}`, [i + 1]: `Comparing with index ${i}` });
        setActiveCodeLine(7); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
        setActiveCodeLine(8); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        if (arr[i] > arr[i + 1]) {
          // Update logic details before swap
          setLogicDetailsState({ [i]: `Value ${arr[i]} > ${arr[i+1]}. Swapping...`, [i + 1]: `Value ${arr[i+1]} < ${arr[i]}. Swapping...` });
          setActiveCodeLine(10); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;
          setActiveCodeLine(11); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
          setActiveCodeLine(12);
          setItems([...arr]); // Update items state
          await new Promise(resolve => setTimeout(resolve, sortSpeed / 4)); // Wait for visual update
          // Clear logic details after swap animation likely finished
          setLogicDetailsState(null);
          setActiveCodeLine(14); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
        } else {
          // Update logic details for no swap
          setLogicDetailsState({ [i]: `Value ${arr[i]} <= ${arr[i+1]}. No swap.`, [i + 1]: `Value ${arr[i+1]} >= ${arr[i]}. No swap.` });
          setActiveCodeLine(14); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
          // Clear logic details after showing no swap
          setLogicDetailsState(null);
        }
        setComparingIndices(null);
      }
      n--;
       setActiveCodeLine(16); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
     } while (swapped);
    setActiveCodeLine(17); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setComparingIndices(null);
    setLogicDetailsState(null); // Clear any remaining details at end of sort
    setActiveCodeLine(18); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
    setActiveAlgorithm(null); setActiveCodeLine(null); setIsSorting(false);
  }, [items, sortSpeed]);
  */


  // --- Selection Sort Algorithm (Needs refactoring for step generation) ---
  const selectionSort = useCallback(async () => {
    // TODO: Refactor this function to generate steps like generateBubbleSortSteps
    console.warn("Selection Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Insertion Sort Algorithm (Needs refactoring for step generation) ---
  const insertionSort = useCallback(async () => {
    // TODO: Refactor this function to generate steps like generateBubbleSortSteps
    console.warn("Insertion Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Merge Sort Algorithm (Needs refactoring for step generation) ---
  const startMergeSort = useCallback(async () => {
    // TODO: Refactor this function and helpers to generate steps
    console.warn("Merge Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Quick Sort Algorithm (Needs refactoring for step generation) ---
   const startQuickSort = useCallback(async () => {
    // TODO: Refactor this function and helpers to generate steps
    console.warn("Quick Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Heap Sort Algorithm (Needs refactoring for step generation) ---
  const startHeapSort = useCallback(async () => {
    // TODO: Refactor this function and helpers to generate steps
    console.warn("Heap Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Shell Sort Algorithm (Needs refactoring for step generation) ---
  const shellSort = useCallback(async () => {
    // TODO: Refactor this function to generate steps
    console.warn("Shell Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Tree Sort Algorithm (Needs refactoring for step generation) ---
   const startTreeSort = useCallback(async () => {
    // TODO: Refactor this function and helpers to generate steps
    console.warn("Tree Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Tim Sort Algorithm (Needs refactoring for step generation) ---
  const startTimSort = useCallback(async () => {
    // TODO: Refactor this function and helpers to generate steps
    console.warn("Tim Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Cocktail Shaker Sort Algorithm (Needs refactoring for step generation) ---
  const startCocktailSort = useCallback(async () => {
    // TODO: Refactor this function to generate steps
    console.warn("Cocktail Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Comb Sort Algorithm (Needs refactoring for step generation) ---
  const startCombSort = useCallback(async () => {
    // TODO: Refactor this function and helpers to generate steps
    console.warn("Comb Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

  // --- Gnome Sort Algorithm (Needs refactoring for step generation) ---
  const startGnomeSort = useCallback(async () => {
    // TODO: Refactor this function to generate steps
    console.warn("Gnome Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed

   // --- Strand Sort Algorithm (Needs refactoring for step generation) ---
   const startStrandSort = useCallback(async () => {
    // TODO: Refactor this function and helpers to generate steps
    console.warn("Strand Sort not yet refactored for manual stepping.");
    // ... existing async logic ...
  }, [initialItems]); // Dependency changed


  // --- Event Handlers ---
  const handleBubbleSortClick = () => {
    if (isGeneratingSteps) return; // Prevent starting if already generating
    setIsGeneratingSteps(true);
    setActiveAlgorithm('bubble');
    const steps = generateBubbleSortSteps(initialItems);
    setAllSteps(steps);
    setCurrentStepIndex(0); // Start at the first step
    setIsGeneratingSteps(false);
  };

   const handleSelectionSortClick = () => {
     // TODO: Implement step generation for Selection Sort
     selectionSort(); // Keep old behavior for now
   };

   const handleInsertionSortClick = () => {
     // TODO: Implement step generation for Insertion Sort
     insertionSort(); // Keep old behavior for now
   };

   const handleMergeSortClick = () => {
     // TODO: Implement step generation for Merge Sort
     startMergeSort(); // Keep old behavior for now
   };

   const handleQuickSortClick = () => {
     // TODO: Implement step generation for Quick Sort
     startQuickSort(); // Keep old behavior for now
   };

   const handleHeapSortClick = () => {
     // TODO: Implement step generation for Heap Sort
     startHeapSort(); // Keep old behavior for now
   };

   const handleShellSortClick = () => {
     // TODO: Implement step generation for Shell Sort
     shellSort(); // Keep old behavior for now
   };

   const handleTreeSortClick = () => {
     // TODO: Implement step generation for Tree Sort
     startTreeSort(); // Keep old behavior for now
   };

  const handleTimSortClick = () => {
     // TODO: Implement step generation for Tim Sort
     startTimSort(); // Keep old behavior for now
  };

  const handleCocktailSortClick = () => {
     // TODO: Implement step generation for Cocktail Sort
     startCocktailSort(); // Keep old behavior for now
  };

  const handleCombSortClick = () => {
     // TODO: Implement step generation for Comb Sort
     startCombSort(); // Keep old behavior for now
  };

  const handleGnomeSortClick = () => {
     // TODO: Implement step generation for Gnome Sort
     startGnomeSort(); // Keep old behavior for now
  };

   const handleStrandSortClick = () => {
     // TODO: Implement step generation for Strand Sort
     startStrandSort(); // Keep old behavior for now
   };

  const handleResetClick = () => {
     // Reset all state related to steps and visualization
     setAllSteps([]);
     setCurrentStepIndex(0);
     setActiveAlgorithm(null);
     // Reset other specific algorithm states if they were used (though ideally step generation handles this)
     // setComparingIndices(null); setMinIndex(null); ... etc.
  }

  // --- Manual Step Navigation Handlers ---
  const handleNextStep = () => {
    setCurrentStepIndex((prevIndex) => Math.min(prevIndex + 1, allSteps.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStepIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  // --- Get Current Step Data ---
  // Derive the current step's data based on the index
  const currentStep: SortStep | null = allSteps.length > 0 ? allSteps[currentStepIndex] : { arrayState: initialItems }; // Show initial items if no steps generated


  return (
    // Add position relative for Html positioning context if needed
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
       {/* UI Controls Panel - Styled with Tailwind */}
       <div className="absolute top-2 left-2 z-10 bg-white/80 p-3 rounded-md shadow-md max-w-xs"> {/* Added max-width */}
         {/* Sort/Reset Buttons */}
         <div className="mb-2 flex flex-wrap gap-2">
           <button
             onClick={handleBubbleSortClick}
             disabled={isGeneratingSteps} // Disable while generating
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed" // Smaller buttons
           >
             Bubble
           </button>
            {/* Other sort buttons (currently use old async logic) */}
            <button onClick={handleSelectionSortClick} disabled={isGeneratingSteps} className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Selection</button>
            <button onClick={handleInsertionSortClick} disabled={isGeneratingSteps} className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Insertion</button>
            <button onClick={handleMergeSortClick} disabled={isGeneratingSteps} className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Merge</button>
            <button onClick={handleQuickSortClick} disabled={isGeneratingSteps} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Quick</button>
            <button onClick={handleHeapSortClick} disabled={isGeneratingSteps} className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Heap</button>
            <button onClick={handleShellSortClick} disabled={isGeneratingSteps} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Shell</button>
            <button onClick={handleTreeSortClick} disabled={isGeneratingSteps} className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Tree</button>
            <button onClick={handleTimSortClick} disabled={isGeneratingSteps} className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Tim</button>
            <button onClick={handleCocktailSortClick} disabled={isGeneratingSteps} className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Cocktail</button>
            <button onClick={handleCombSortClick} disabled={isGeneratingSteps} className="bg-lime-500 hover:bg-lime-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Comb</button>
            <button onClick={handleGnomeSortClick} disabled={isGeneratingSteps} className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Gnome</button>
            <button onClick={handleStrandSortClick} disabled={isGeneratingSteps} className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed">Strand</button>
            <button
              onClick={handleResetClick}
              disabled={isGeneratingSteps}
             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Reset
           </button>
         </div>
         {/* Speed Slider (REMOVED - No longer needed for manual steps) */}
         {/* <div className="flex items-center"> ... </div> */}

         {/* --- Manual Step Controls --- */}
         {allSteps.length > 0 && (
           <div className="mt-3 border-t pt-3">
             <div className="flex justify-between items-center mb-1">
               <button
                 onClick={handlePrevStep}
                 disabled={currentStepIndex === 0}
                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Prev Step
               </button>
               <span className="text-xs font-medium text-gray-700">
                 Step: {currentStepIndex + 1} / {allSteps.length}
               </span>
               <button
                 onClick={handleNextStep}
                 disabled={currentStepIndex === allSteps.length - 1}
                 className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Next Step
               </button>
             </div>
             {/* Optional: Step Description Display */}
             {currentStep?.description && (
                <p className="text-xs text-gray-600 mt-1 italic">
                    {currentStep.description}
                </p>
             )}
             {/* Optional: Slider for stepping */}
             <input
                type="range"
                min="0"
                max={allSteps.length - 1}
                value={currentStepIndex}
                onChange={(e) => setCurrentStepIndex(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 mt-2"
                aria-label="Algorithm Step Slider" // Added aria-label for accessibility
             />
           </div>
         )}
       </div>

       {/* Algorithm Code Display Panel - Use currentStep data */}
       <AlgorithmCodeDisplay algorithm={activeAlgorithm} currentLine={currentStep?.activeCodeLine ?? null} />

      <Canvas shadows camera={{ position: [-2, 5, 15], fov: 50 }}> {/* Adjusted camera */}
        <ambientLight intensity={1} color={'white'} />
        <spotLight
          position={[0, 25, 25]}
          angle={Math.PI / 4}
          penumbra={0.5}
          castShadow
        />
        <Physics>
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

          {/* Pass data from the CURRENT STEP to BoxRow */}
          {currentStep && (
            <BoxRow
              items={currentStep.arrayState}
              comparingIndices={currentStep.comparingIndices}
              minIndex={currentStep.minIndex}
              currentIndex={currentStep.currentIndex}
              keyIndex={currentStep.keyIndex}
              mergeRange={currentStep.mergeRange}
              pivotIndex={currentStep.pivotIndex}
              heapIndices={currentStep.heapIndices}
              timSortRange={currentStep.timSortRange}
              cocktailRange={currentStep.cocktailRange}
              strandInputIndices={currentStep.strandInputIndices}
              strandSublistIndices={currentStep.strandSublistIndices}
              strandResultIndices={currentStep.strandResultIndices}
              strandMergeIndices={currentStep.strandMergeIndices}
              logicDetails={currentStep.logicDetails}
            />
          )}
        </Physics>
        <OrbitControls target-y={2} />
        <Stats />
      </Canvas>
   </div> // Close the wrapper div
  );
}
