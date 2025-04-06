import React from 'react';

interface AlgorithmCodeDisplayProps {
  algorithm: 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap' | 'shell' | null; // Add 'shell'
  currentLine: number | null;
}

// Corrected Bubble Sort Code String
const bubbleSortCode = `
async function bubbleSort(arr) {
  let n = arr.length;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < n - 1; i++) {
      // Highlight comparison [i, i+1]
      if (arr[i] > arr[i + 1]) {
        // Swap elements
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        // Update visualization
      }
      // Pause for visualization
    }
    n--; // Optimization
  } while (swapped);
   // Clear highlights
 }
 `.trim();
 
 // Corrected Insertion Sort Code String (no leading '+')
 const insertionSortCode = `
 async function insertionSort(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i]; // Highlight key
    let j = i - 1;
    // Highlight comparison j vs key
    while (j >= 0 && arr[j] > key) {
      // Shift element arr[j] to the right
      arr[j + 1] = arr[j];
      j = j - 1;
      // Highlight comparison j vs key (in loop)
    }
    // Place key in correct position
    arr[j + 1] = key;
    // Update visualization
    // Pause
  }
  // Clear highlights
 }
 `.trim();
 
 // Merge Sort Code String
 const mergeSortCode = `
 async function mergeSort(arr, l, r) { // Line 1
   if (l >= r) { // Line 2
     return; // Base case: 1 or 0 elements
   }
   let m = l + Math.floor((r - l) / 2); // Line 5 Find middle
   await mergeSort(arr, l, m); // Line 6 Sort left half
   await mergeSort(arr, m + 1, r); // Line 7 Sort right half
   await merge(arr, l, m, r); // Line 8 Merge halves
 } // Line 9
 
 async function merge(arr, left, mid, right) { // Line 11
   // Create temp arrays L and R
   // Copy data to temp arrays L and R
   // Merge the temp arrays back into arr[left..right]
   let i = 0, j = 0, k = left;
   while (i < n1 && j < n2) { // Line 16 Compare L[i] and R[j]
     if (L[i] <= R[j]) {
       arr[k] = L[i]; i++;
     } else {
       arr[k] = R[j]; j++;
     }
     // Update visualization for arr[k]
     k++;
   }
   // Copy remaining elements of L[] / R[]
   // Update visualization
   // Pause
   // Clear highlights
 } // Line 29
 `.trim();
 
 // Quick Sort Code String
 const quickSortCode = `
 async function quickSort(arr, low, high) { // Line 1
   if (low < high) { // Line 2
     // pi is partitioning index, arr[pi] is now at right place
     let pi = await partition(arr, low, high); // Line 4
     await quickSort(arr, low, pi - 1); // Line 5 Recursively sort elements before partition
     await quickSort(arr, pi + 1, high); // Line 6 Recursively sort elements after partition
   }
 } // Line 8
 
 async function partition(arr, low, high) { // Line 10
   let pivot = arr[high]; // Line 11 Choose pivot (last element)
   // Highlight pivot
   let i = low - 1; // Line 13 Index of smaller element
 
   for (let j = low; j <= high - 1; j++) { // Line 15 Iterate through subarray
     // Highlight comparison j vs pivot
     if (arr[j] < pivot) { // Line 17 If current element is smaller than pivot
       i++; // Line 18 Increment index of smaller element
       // Swap arr[i] and arr[j]
       [arr[i], arr[j]] = [arr[j], arr[i]];
       // Update visualization
     }
     // Pause
   }
   // Swap arr[i + 1] and arr[high] (pivot)
   [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
   // Update visualization
   // Pause
   // Clear highlights
   return i + 1; // Return partition index
 } // Line 31
 `.trim();
 
 // Heap Sort Code String
 const heapSortCode = `
 async function heapSort(arr) { // Line 1
   let n = arr.length;
   // Build heap (rearrange array)
   for (let i = Math.floor(n / 2) - 1; i >= 0; i--) { // Line 4
     await heapify(arr, n, i); // Line 5
   }
   // One by one extract an element from heap
   for (let i = n - 1; i > 0; i--) { // Line 8
     // Move current root to end (Swap arr[0] and arr[i])
     [arr[0], arr[i]] = [arr[i], arr[0]]; // Line 10
     // Update visualization
     // Call max heapify on the reduced heap
     await heapify(arr, i, 0); // Line 13
   }
   // Clear highlights
 } // Line 16
 
 async function heapify(arr, n, i) { // Line 18
   let largest = i; // Initialize largest as root
   let l = 2 * i + 1; // left = 2*i + 1
   let r = 2 * i + 2; // right = 2*i + 2
   // Highlight root i, left l, right r
   // If left child is larger than root
   if (l < n && arr[l] > arr[largest]) { // Line 24
     largest = l;
   }
   // If right child is larger than largest so far
   if (r < n && arr[r] > arr[largest]) { // Line 28
     largest = r;
   }
   // If largest is not root
   if (largest !== i) { // Line 32
     // Swap arr[i] and arr[largest]
     [arr[i], arr[largest]] = [arr[largest], arr[i]];
     // Update visualization
     // Recursively heapify the affected sub-tree
     await heapify(arr, n, largest); // Line 37
   }
   // Clear highlights
 } // Line 40
 `.trim();
 
 // Shell Sort Code String
 const shellSortCode = `
 async function shellSort(arr) { // Line 1
   let n = arr.length;
   // Start with a big gap, then reduce the gap
   for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) { // Line 4
     // Do a gapped insertion sort for this gap size.
     // The first gap elements arr[0..gap-1] are already in gapped order
     // keep adding one more element until the entire array is gap sorted
     for (let i = gap; i < n; i += 1) { // Line 8
       // add arr[i] to the elements that have been gap sorted
       // save arr[i] in temp and make a hole at position i
       let temp = arr[i]; // Line 11 Highlight temp/key
       // shift earlier gap-sorted elements up until the correct location for arr[i] is found
       let j;
       // Highlight comparison j vs temp
       for (j = i; j >= gap && arr[j - gap] > temp; j -= gap) { // Line 15
         // Highlight shift target j
         arr[j] = arr[j - gap]; // Line 17 Shift element
         // Update visualization
       }
       // put temp (the original arr[i]) in its correct location
       // Highlight placement j
       arr[j] = temp; // Line 22 Place temp
       // Update visualization
       // Pause
     }
   }
   // Clear highlights
 } // Line 29
 `.trim();
 
 // Corrected Selection Sort Code String (no leading '+')
 const selectionSortCode = `
 async function selectionSort(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    // Highlight current index i
    let minIdx = i;
    // Highlight minIdx
    for (let j = i + 1; j < n; j++) {
      // Highlight comparison [minIdx, j]
      if (arr[j] < arr[minIdx]) {
        minIdx = j;
        // Highlight new minIdx
      }
      // Clear comparison highlight
    }
    // Clear comparison highlight (end of inner loop)
    if (minIdx !== i) {
      // Swap elements arr[i] and arr[minIdx]
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      // Update visualization
    }
    // Pause for visualization
    // Clear min/current highlights
  }
  // Clear highlights
}
`.trim();


const AlgorithmCodeDisplay: React.FC<AlgorithmCodeDisplayProps> = ({ algorithm, currentLine }) => {
  const getCode = () => {
    switch (algorithm) {
       case 'bubble':
         return bubbleSortCode;
        case 'insertion':
          return insertionSortCode;
        case 'merge':
         return mergeSortCode;
       case 'quick':
         return quickSortCode;
       case 'heap':
         return heapSortCode;
       case 'shell':
         return shellSortCode; // Added case
       case 'selection':
         return selectionSortCode;
       default:
        return '// Select an algorithm to view its code.';
    }
  };

  const code = getCode();
  const lines = code.split('\n');

  return (
    <div className="absolute top-2 right-2 z-10 bg-gray-800 text-white p-4 rounded-md shadow-md max-h-[calc(100vh-2rem)] overflow-y-auto font-mono text-sm w-1/3">
      <h3 className="text-lg font-semibold mb-2 border-b border-gray-600 pb-1">
        {algorithm ? `${algorithm.charAt(0).toUpperCase() + algorithm.slice(1)} Sort Code` : 'Algorithm Code'}
      </h3>
      <pre>
        {lines.map((line, index) => (
          <div
            key={index}
            className={`whitespace-pre-wrap ${
              currentLine === index + 1 // Line numbers are 1-based
                ? 'bg-yellow-500 text-black rounded px-1' // Highlight style
                : ''
            }`}
          >
            {line || ' '} {/* Render a space for empty lines to maintain layout */}
          </div>
        ))}
      </pre>
    </div>
  );
};

export default AlgorithmCodeDisplay;
