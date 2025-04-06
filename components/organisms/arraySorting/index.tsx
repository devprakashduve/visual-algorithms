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
  // State for comparison highlighting (used by multiple sorts)
  const [comparingIndices, setComparingIndices] = useState<number[] | null>(null);
  // State for Selection Sort highlighting (current minimum index found)
  const [minIndex, setMinIndex] = useState<number | null>(null);
   // State for Selection/Insertion/Shell Sort current index highlighting
   const [currentIndex, setCurrentIndex] = useState<number | null>(null);
   // State for Insertion/Shell Sort key/temp highlighting
   const [keyIndex, setKeyIndex] = useState<number | null>(null);
   // State for Merge Sort highlighting (range being merged)
   const [mergeRange, setMergeRange] = useState<{ left: number; right: number } | null>(null);
   // State for Quick Sort pivot highlighting
   const [pivotIndex, setPivotIndex] = useState<number | null>(null);
   // State for Heap Sort highlighting (root, left, right during heapify)
   const [heapIndices, setHeapIndices] = useState<{ root: number; left?: number; right?: number; largest?: number } | null>(null);
   // State to track the currently active algorithm for code display
   const [activeAlgorithm, setActiveAlgorithm] = useState<'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap' | 'shell' | null>(null);
   // State to track the line number to highlight in the code display
   const [activeCodeLine, setActiveCodeLine] = useState<number | null>(null);


   // --- Bubble Sort Algorithm ---
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
         setActiveCodeLine(7); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
         setActiveCodeLine(8); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
         if (arr[i] > arr[i + 1]) {
           setActiveCodeLine(10); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
           [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
           swapped = true;
           setActiveCodeLine(11); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
           setActiveCodeLine(12);
           setItems([...arr]);
           await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
           setActiveCodeLine(14); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
         } else {
           setActiveCodeLine(14); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
         }
         setComparingIndices(null);
       }
       n--;
       setActiveCodeLine(16); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
     } while (swapped);
     setActiveCodeLine(17); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setComparingIndices(null);
    setActiveCodeLine(18); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
    setActiveAlgorithm(null); setActiveCodeLine(null); setIsSorting(false);
  }, [items, sortSpeed]);


  // --- Selection Sort Algorithm ---
  const selectionSort = useCallback(async () => {
    setIsSorting(true); setActiveAlgorithm('selection');
    setActiveCodeLine(1); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let arr = [...items];
    setActiveCodeLine(2); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      setActiveCodeLine(3); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      setCurrentIndex(i);
      setActiveCodeLine(4); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      let minIdx = i;
      setActiveCodeLine(5); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      setMinIndex(minIdx);
      setActiveCodeLine(6); await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));
      for (let j = i + 1; j < n; j++) {
        setActiveCodeLine(7); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        setComparingIndices([minIdx, j]);
        setActiveCodeLine(8); await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));
        setActiveCodeLine(9); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        if (arr[j] < arr[minIdx]) {
          minIdx = j;
          setActiveCodeLine(10); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
          setMinIndex(minIdx);
          setActiveCodeLine(11); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        }
         setComparingIndices(null);
         setActiveCodeLine(13); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      }
       setActiveCodeLine(15);
       setComparingIndices(null);
       await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      setActiveCodeLine(16); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      if (minIdx !== i) {
        setActiveCodeLine(18); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setActiveCodeLine(19);
        setItems([...arr]);
        await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
         setActiveCodeLine(21); await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));
      } else {
         setActiveCodeLine(21); await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));
      }
      setMinIndex(null);
      setCurrentIndex(null);
      setActiveCodeLine(22); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    }
    setActiveCodeLine(24); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setCurrentIndex(null); setMinIndex(null); setComparingIndices(null);
    setActiveAlgorithm(null); setActiveCodeLine(null); setIsSorting(false);
  }, [items, sortSpeed]);

  // --- Insertion Sort Algorithm ---
  const insertionSort = useCallback(async () => {
    setIsSorting(true); setActiveAlgorithm('insertion');
    setActiveCodeLine(1); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let arr = [...items];
    setActiveCodeLine(2); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let n = arr.length;
    for (let i = 1; i < n; i++) {
      setActiveCodeLine(3); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      let key = arr[i];
      setKeyIndex(i);
      setActiveCodeLine(4); await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));
      let j = i - 1;
      setActiveCodeLine(5); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      setActiveCodeLine(7); await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));
      while (j >= 0 && arr[j] > key) {
        setComparingIndices([j, j + 1]);
        setActiveCodeLine(9);
        arr[j + 1] = arr[j];
        setItems([...arr]);
        await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
        j = j - 1;
        setActiveCodeLine(10); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        setComparingIndices(null);
        setActiveCodeLine(7); await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));
      }
      setComparingIndices(null);
      setActiveCodeLine(14);
      arr[j + 1] = key;
      setItems([...arr]);
      setKeyIndex(null);
      await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
    }
    setActiveCodeLine(18); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
    setComparingIndices(null); setCurrentIndex(null); setMinIndex(null); setKeyIndex(null);
    setActiveAlgorithm(null); setActiveCodeLine(null); setIsSorting(false);
  }, [items, sortSpeed]);

  // --- Merge Sort Algorithm ---
  const merge = async (arr: number[], left: number, mid: number, right: number) => {
    setActiveCodeLine(11); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setMergeRange({ left, right });
    const n1 = mid - left + 1; const n2 = right - mid;
    setActiveCodeLine(12); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let L = new Array(n1); let R = new Array(n2);
    setActiveCodeLine(13); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    for (let i = 0; i < n1; i++) L[i] = arr[left + i];
    for (let j = 0; j < n2; j++) R[j] = arr[mid + 1 + j];
    setActiveCodeLine(15); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
      setActiveCodeLine(16); setComparingIndices([left + i, mid + 1 + j]);
      await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
      setActiveCodeLine(17); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      if (L[i] <= R[j]) {
        setActiveCodeLine(18); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        arr[k] = L[i]; i++;
      } else {
        setActiveCodeLine(20); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        arr[k] = R[j]; j++;
      }
      setActiveCodeLine(22); setItems([...arr]); setComparingIndices(null);
      await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
      k++; setActiveCodeLine(23); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    }
    setActiveCodeLine(24); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    while (i < n1) { arr[k] = L[i]; setItems([...arr]); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2)); i++; k++; }
    while (j < n2) { arr[k] = R[j]; setItems([...arr]); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2)); j++; k++; }
    setActiveCodeLine(26); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setMergeRange(null);
    setActiveCodeLine(28); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
  };

  const mergeSortRecursive = async (arr: number[], l: number, r: number) => {
    setActiveCodeLine(1); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setActiveCodeLine(2); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    if (l >= r) { setActiveCodeLine(3); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4)); return; }
    setActiveCodeLine(5); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    const m = l + Math.floor((r - l) / 2);
    setActiveCodeLine(6); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    await mergeSortRecursive(arr, l, m);
    setActiveCodeLine(7); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    await mergeSortRecursive(arr, m + 1, r);
    setActiveCodeLine(8); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    await merge(arr, l, m, r);
    setActiveCodeLine(9); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
  };

  const startMergeSort = useCallback(async () => {
    setIsSorting(true); setActiveAlgorithm('merge');
    let arr = [...items];
    await mergeSortRecursive(arr, 0, arr.length - 1);
    setActiveAlgorithm(null); setActiveCodeLine(null); setIsSorting(false);
  }, [items, sortSpeed]);

  // --- Quick Sort Algorithm ---
  const partition = async (arr: number[], low: number, high: number): Promise<number> => {
    setActiveCodeLine(10); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let pivot = arr[high];
    setActiveCodeLine(11); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setPivotIndex(high);
    setActiveCodeLine(12); await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));
    let i = low - 1;
    setActiveCodeLine(13); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    for (let j = low; j <= high - 1; j++) {
      setActiveCodeLine(15); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      setComparingIndices([j, high]);
      setActiveCodeLine(16); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
      setActiveCodeLine(17); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      if (arr[j] < pivot) {
        i++;
        setActiveCodeLine(18); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        setActiveCodeLine(19);
        setComparingIndices([i, j]);
        await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setActiveCodeLine(21);
        setItems([...arr]);
        await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
        setComparingIndices(null);
      } else {
         setComparingIndices(null);
      }
      setActiveCodeLine(23); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    }
    setActiveCodeLine(25);
    setComparingIndices([i + 1, high]);
    await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setActiveCodeLine(27);
    setItems([...arr]);
    await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
    setComparingIndices(null);
    setPivotIndex(null);
    setActiveCodeLine(29); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setActiveCodeLine(30); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    return i + 1;
  };

  const quickSortRecursive = async (arr: number[], low: number, high: number) => {
    setActiveCodeLine(1); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setActiveCodeLine(2); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    if (low < high) {
      setActiveCodeLine(4); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      let pi = await partition(arr, low, high);
      setActiveCodeLine(5); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      await quickSortRecursive(arr, low, pi - 1);
      setActiveCodeLine(6); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      await quickSortRecursive(arr, pi + 1, high);
    }
     setActiveCodeLine(8); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
  };

   const startQuickSort = useCallback(async () => {
    setIsSorting(true); setActiveAlgorithm('quick');
    let arr = [...items];
    await quickSortRecursive(arr, 0, arr.length - 1);
    setActiveAlgorithm(null); setActiveCodeLine(null); setIsSorting(false);
  }, [items, sortSpeed]);

  // --- Heap Sort Algorithm ---
  const heapify = async (arr: number[], n: number, i: number) => {
    setActiveCodeLine(18); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let largest = i;
    setActiveCodeLine(19); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let l = 2 * i + 1;
    setActiveCodeLine(20); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let r = 2 * i + 2;
    setActiveCodeLine(21); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setHeapIndices({ root: i, left: l < n ? l : undefined, right: r < n ? r : undefined, largest: largest });
    setActiveCodeLine(22); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
    setActiveCodeLine(24); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
     if (l < n && arr[l] > arr[largest]) {
       largest = l;
       setActiveCodeLine(25); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
       setHeapIndices(prev => prev ? { ...prev, largest: largest } : null);
       await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
     }
     setActiveCodeLine(28); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
     if (r < n && arr[r] > arr[largest]) {
       largest = r;
       setActiveCodeLine(29); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
       setHeapIndices(prev => prev ? { ...prev, largest: largest } : null);
       await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
     }
    setHeapIndices(null);
    setActiveCodeLine(32); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    if (largest !== i) {
      setActiveCodeLine(33);
      setComparingIndices([i, largest]);
      await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      setActiveCodeLine(35);
      setItems([...arr]);
      setComparingIndices(null);
      await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
      setActiveCodeLine(37); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      await heapify(arr, n, largest);
    }
    setActiveCodeLine(39); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
  };

  const startHeapSort = useCallback(async () => {
    setIsSorting(true); setActiveAlgorithm('heap');
    setActiveCodeLine(1); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let arr = [...items];
    let n = arr.length;
    setActiveCodeLine(2); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setActiveCodeLine(4); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      setActiveCodeLine(5); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      await heapify(arr, n, i);
    }
    setActiveCodeLine(8); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    for (let i = n - 1; i > 0; i--) {
      setActiveCodeLine(9);
      setComparingIndices([0, i]);
      await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      [arr[0], arr[i]] = [arr[i], arr[0]];
      setActiveCodeLine(10); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      setActiveCodeLine(11);
      setItems([...arr]);
      setComparingIndices(null);
      await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));
      setActiveCodeLine(13); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      await heapify(arr, i, 0);
    }
    setActiveCodeLine(15); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    setActiveAlgorithm(null); setActiveCodeLine(null); setIsSorting(false);
  }, [items, sortSpeed]);

  // --- Shell Sort Algorithm ---
  const shellSort = useCallback(async () => {
    setIsSorting(true); setActiveAlgorithm('shell');
    setActiveCodeLine(1); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    let arr = [...items];
    let n = arr.length;
    setActiveCodeLine(2); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));

    setActiveCodeLine(4); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
      setActiveCodeLine(8); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
      for (let i = gap; i < n; i += 1) {
        let temp = arr[i];
        setKeyIndex(i); // Highlight the temp/key element
        setActiveCodeLine(11); await new Promise(resolve => setTimeout(resolve, sortSpeed / 3));

        let j;
        setActiveCodeLine(15); await new Promise(resolve => setTimeout(resolve, sortSpeed / 4));
        for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
          setComparingIndices([j - gap, i]); // Highlight comparison
          setCurrentIndex(j); // Highlight where shift might happen
          setActiveCodeLine(15); // Highlight loop condition check
          await new Promise(resolve => setTimeout(resolve, sortSpeed / 2));

          setActiveCodeLine(17); // Highlight shift
          arr[j] = arr[j - gap];
          setItems([...arr]); // Update visualization after shift
          setCurrentIndex(null); // Clear shift target highlight
          setComparingIndices(null); // Clear comparison highlight
          await new Promise(resolve => setTimeout(resolve, sortSpeed / 2)); // Pause after shift
        }
        setComparingIndices(null); // Clear comparison if loop condition fails immediately

        setActiveCodeLine(22); // Highlight placement
        setCurrentIndex(j); // Highlight placement index
        arr[j] = temp;
        setItems([...arr]); // Update visualization after placement
        await new Promise(resolve => setTimeout(resolve, sortSpeed / 2)); // Pause after placement

        setKeyIndex(null); // Clear key highlight
        setCurrentIndex(null); // Clear placement highlight
      }
    }
    setActiveCodeLine(28); await new Promise(resolve => setTimeout(resolve, sortSpeed / 2)); // Clear highlights
    setComparingIndices(null); setCurrentIndex(null); setKeyIndex(null);
    setActiveAlgorithm(null); setActiveCodeLine(null); setIsSorting(false);
  }, [items, sortSpeed]);


  // --- Event Handlers ---
  const handleBubbleSortClick = () => {
    if (!isSorting) {
      setMinIndex(null); setCurrentIndex(null); setKeyIndex(null); setMergeRange(null); setPivotIndex(null); setHeapIndices(null);
      setActiveCodeLine(null);
      bubbleSort();
    }
  };

   const handleSelectionSortClick = () => {
    if (!isSorting) {
      setComparingIndices(null); setKeyIndex(null); setMergeRange(null); setPivotIndex(null); setHeapIndices(null);
      setActiveCodeLine(null);
      selectionSort();
    }
  };

   const handleInsertionSortClick = () => {
    if (!isSorting) {
      setComparingIndices(null); setMinIndex(null); setCurrentIndex(null); setMergeRange(null); setPivotIndex(null); setHeapIndices(null);
      setActiveCodeLine(null);
      insertionSort();
    }
  };

   const handleMergeSortClick = () => {
    if (!isSorting) {
      setComparingIndices(null); setMinIndex(null); setCurrentIndex(null); setKeyIndex(null); setPivotIndex(null); setHeapIndices(null);
      setActiveCodeLine(null);
      startMergeSort();
    }
  };

   const handleQuickSortClick = () => {
    if (!isSorting) {
      setComparingIndices(null); setMinIndex(null); setCurrentIndex(null); setKeyIndex(null); setMergeRange(null); setHeapIndices(null);
      setActiveCodeLine(null);
      startQuickSort();
    }
  };

   const handleHeapSortClick = () => {
    if (!isSorting) {
      setComparingIndices(null); setMinIndex(null); setCurrentIndex(null); setKeyIndex(null); setMergeRange(null); setPivotIndex(null);
      setActiveCodeLine(null);
      startHeapSort();
    }
  };

   const handleShellSortClick = () => {
    if (!isSorting) {
      setComparingIndices(null); setMinIndex(null); setCurrentIndex(null); setKeyIndex(null); setMergeRange(null); setPivotIndex(null); setHeapIndices(null);
      setActiveCodeLine(null);
      shellSort(); // Call the Shell Sort function
    }
  };

  const handleResetClick = () => {
     setItems(initialArrayData);
     setComparingIndices(null); setMinIndex(null); setCurrentIndex(null); setKeyIndex(null); setMergeRange(null); setPivotIndex(null); setHeapIndices(null);
     setActiveAlgorithm(null);
     setActiveCodeLine(null);
  }

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortSpeed(Number(event.target.value));
  };

  // Removed rotation handlers

  return (
    // Add position relative for Html positioning context if needed
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
       {/* UI Controls Panel - Styled with Tailwind */}
       <div className="absolute top-2 left-2 z-10 bg-white/80 p-3 rounded-md shadow-md max-w-xs"> {/* Added max-width */}
         {/* Sort/Reset Buttons */}
         <div className="mb-2 flex flex-wrap gap-2">
           <button
             onClick={handleBubbleSortClick}
             disabled={isSorting}
             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed" // Smaller buttons
           >
             Bubble
           </button>
            <button
             onClick={handleSelectionSortClick}
             disabled={isSorting}
             className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Selection
           </button>
            <button
             onClick={handleInsertionSortClick}
             disabled={isSorting}
             className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Insertion
           </button>
            <button
             onClick={handleMergeSortClick}
             disabled={isSorting}
             className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Merge
           </button>
            <button
             onClick={handleQuickSortClick}
             disabled={isSorting}
             className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Quick
           </button>
            <button
             onClick={handleHeapSortClick}
             disabled={isSorting}
             className="bg-yellow-500 hover:bg-yellow-700 text-black font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
           >
             Heap
           </button>
            <button
             onClick={handleShellSortClick} // Add handler
             disabled={isSorting}
             className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed" // Style button
           >
             Shell
           </button>
           <button
             onClick={handleResetClick}
             disabled={isSorting}
             className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 text-xs rounded disabled:opacity-50 disabled:cursor-not-allowed"
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
             min="100"  // Reduced min speed for faster visualization option
             max="2000"
             step="50"
             value={sortSpeed}
             onChange={handleSpeedChange}
             disabled={isSorting}
             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
           />
         </div>
       </div>

       {/* Algorithm Code Display Panel */}
       <AlgorithmCodeDisplay algorithm={activeAlgorithm} currentLine={activeCodeLine} />

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
          keyIndex={keyIndex}
          mergeRange={mergeRange}
          pivotIndex={pivotIndex}
          heapIndices={heapIndices} // Pass heapIndices for Heap Sort highlight
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

// </final_file_content>

// IMPORTANT: For any future changes to this file, use the final_file_content shown above as your reference. This content reflects the current state of the file, including any auto-formatting (e.g., if you used single quotes but the formatter converted them to double quotes). Always base your SEARCH/REPLACE operations on this final version to ensure accuracy.



// New problems detected after saving the file:
// components/organisms/arraySorting/index.tsx
// - [ts Error] Line 624: Type '{ items: number[]; comparingIndices: number[] | null; minIndex: number | null; currentIndex: number | null; keyIndex: number | null; mergeRange: { left: number; right: number; } | null; pivotIndex: number | null; heapIndices: { ...; } | null; }' is not assignable to type 'IntrinsicAttributes & BoxRowProps'.
//   Property 'heapIndices' does not exist on type 'IntrinsicAttributes & BoxRowProps'.<environment_details>
// # VSCode Visible Files
// components/organisms/arraySorting/index.tsx

// # VSCode Open Tabs
// components/organisms/BubbleSortDemo/BubbleSortDemo.tsx
// next.config.js
// src/pages/index.tsx
// components/molecules/boxRow/index.tsx
// components/molecules/AlgorithmCodeDisplay/index.tsx
// components/organisms/arraySorting/index.tsx

// # Current Time
// 06/04/2025, 7:39:00 am (Asia/Calcutta, UTC+5.5:00)

// # Current Mode
// ACT MODE
// </environment_details>
