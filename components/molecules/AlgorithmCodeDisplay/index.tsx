import React from 'react';

interface AlgorithmCodeDisplayProps {
  algorithm: 'bubble' | 'selection' | 'insertion' | 'merge' | 'quick' | 'heap' | 'shell' | 'tree' | 'tim' | 'cocktail' | 'comb' | 'gnome' | null; // Add 'gnome'
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

// Tree Sort Code String
const treeSortCode = `
class TreeNode { // Line 1
  key: number; left: TreeNode | null; right: TreeNode | null;
  constructor(item) { this.key = item; this.left = this.right = null; }
}

let root: TreeNode | null = null; // Line 6

async function insert(key) { // Line 8
  root = await insertRec(root, key);
}

async function insertRec(node, key) { // Line 12
  // Highlight node being compared/inserted at
  if (node === null) { // Line 14 Base case: insert here
    node = new TreeNode(key);
    // Update visualization (optional: show insertion)
    return node;
  }
  // Pause
  if (key < node.key) { // Line 20 Go left
    node.left = await insertRec(node.left, key);
  } else if (key >= node.key) { // Line 22 Go right (or equal)
    node.right = await insertRec(node.right, key);
  }
  return node; // Line 25 Return unchanged node pointer
}

let index = 0; // Line 27 For storing sorted array index

async function inorderRec(node, arr) { // Line 29
  if (node !== null) {
    await inorderRec(node.left, arr); // Line 31 Traverse left
    // Highlight node being visited
    arr[index++] = node.key; // Line 33 Store key
    // Update visualization (show placement in array)
    // Pause
    await inorderRec(node.right, arr); // Line 36 Traverse right
  }
}

async function treeSort(arr) { // Line 39
  root = null; index = 0; // Reset
  for (let i = 0; i < arr.length; i++) { // Line 41 Build BST
    // Highlight element being inserted
    await insert(arr[i]); // Line 43
  }
  // Store inorder traversal of BST in arr[]
  await inorderRec(root, arr); // Line 46
  // Clear highlights
 } // Line 48
  `.trim();

// Tim Sort Code String (Placeholder)
const timSortCode = `
// Tim Sort combines Insertion Sort and Merge Sort.
// 1. Divide the array into blocks (runs).
// 2. Sort each run using Insertion Sort.
// 3. Merge the sorted runs using Merge Sort.

const MIN_MERGE = 32; // Typical value

function calcMinRun(n) { /* ... calculates optimal run size ... */ }

async function insertionSortForTim(arr, left, right) { /* ... visualized insertion sort ... */ }

async function mergeForTim(arr, l, m, r) { /* ... visualized merge ... */ }

async function timSort(arr) {
  let n = arr.length;
  let minRun = calcMinRun(n);

  // Sort individual subarrays of size RUN
  for (let i = 0; i < n; i += minRun) {
    await insertionSortForTim(arr, i, Math.min((i + minRun - 1), (n - 1)));
  }

  // Start merging from size RUN (or 32). It will merge
  // to form size 64, then 128, 256 and so on ....
  for (let size = minRun; size < n; size = 2 * size) {
    // pick starting point of left sub array. We
    // are going to merge arr[left..left+size-1]
    // and arr[left+size..left+2*size-1]
    // After every merge, we increase left by 2*size
    for (let left = 0; left < n; left += 2 * size) {
      // find ending point of left sub array
      // mid+1 is starting point of right sub array
      let mid = left + size - 1;
      let right = Math.min((left + 2 * size - 1), (n - 1));

      // merge sub array arr[left.....mid] & arr[mid+1....right]
      if (mid < right) { // Ensure mid is less than right before merging
          await mergeForTim(arr, left, mid, right);
      }
    }
  }
  // Clear highlights
}
`.trim();

// Cocktail Shaker Sort Code String (Placeholder)
const cocktailSortCode = `
async function cocktailSort(arr) {
  let swapped = true;
  let start = 0;
  let end = arr.length - 1;

  while (swapped) {
    // Reset swapped flag
    swapped = false;

    // Forward pass (like Bubble Sort)
    // Highlight range [start..end] forward
    for (let i = start; i < end; ++i) {
      // Highlight comparison [i, i+1]
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        // Update visualization
      }
      // Pause
    }

    // If nothing moved, array is sorted
    if (!swapped) break;

    // Otherwise, reset swapped flag for backward pass
    swapped = false;
    // Move the end point back by one
    end--;

    // Backward pass
    // Highlight range [start..end] backward
    for (let i = end - 1; i >= start; --i) {
      // Highlight comparison [i, i+1]
      if (arr[i] > arr[i + 1]) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
        swapped = true;
        // Update visualization
      }
      // Pause
    }

    // Move the start point forward by one
    start++;
  }
  // Clear highlights
}
`.trim();

// Comb Sort Code String (Placeholder)
const combSortCode = `
// Function to get the next gap size
function getNextGap(gap) {
  // Shrink gap by Shrink factor
  gap = Math.floor((gap * 10) / 13); // Standard shrink factor = 1.3
  if (gap < 1) {
    return 1;
  }
  return gap;
}

async function combSort(arr) {
  let n = arr.length;
  // Initialize gap
  let gap = n;
  // Initialize swapped as true to make sure that loop runs
  let swapped = true;

  // Keep running while gap is more than 1 and last iteration caused a swap
  while (gap !== 1 || swapped === true) {
    // Find next gap
    gap = getNextGap(gap);
    // Highlight gap (optional visualization)

    // Initialize swapped as false so that we can check if swap happened or not
    swapped = false;

    // Compare all elements with current gap
    for (let i = 0; i < n - gap; i++) {
      // Highlight comparison [i, i + gap]
      if (arr[i] > arr[i + gap]) {
        // Swap arr[i] and arr[i+gap]
        [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
        swapped = true;
        // Update visualization
      }
      // Pause
    }
  }
  // Clear highlights
}
`.trim();

// Gnome Sort Code String (Placeholder)
const gnomeSortCode = `
async function gnomeSort(arr) {
  let n = arr.length;
  let index = 0;
  // Highlight index

  while (index < n) {
    if (index === 0) {
      // Move to next element if at the start
      index++;
      // Highlight index
    }
    // Highlight comparison [index, index - 1]
    if (arr[index] >= arr[index - 1]) {
      // Move forward if in order
      index++;
      // Highlight index
    } else {
      // Swap if out of order
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      // Update visualization
      // Move backward
      index--;
      // Highlight index
    }
    // Pause
  }
  // Clear highlights
}
`.trim();


 // --- Descriptions ---
 const descriptions = {
   bubble: "Compares adjacent elements and swaps them if they are in the wrong order. Repeats passes until sorted. Simple but inefficient (O(n^2)).",
   selection: "Finds the minimum element in the unsorted part and swaps it with the first unsorted element. Simple but inefficient (O(n^2)).",
   insertion: "Builds the final sorted array one item at a time, inserting each element into its proper position within the already sorted part. Efficient for small or nearly sorted data (O(n^2) worst case).",
   merge: "Divides the array into halves, recursively sorts them, then merges the sorted halves. Efficient (O(n log n)) but requires extra space.",
   quick: "Picks a 'pivot' element and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot. Recursively sorts the sub-arrays. Efficient on average (O(n log n)), but O(n^2) worst case.",
   heap: "Builds a max heap from the input data, then repeatedly extracts the maximum element from the heap and places it at the end of the sorted portion. Efficient (O(n log n)).",
   shell: "An improvement over insertion sort. Compares elements separated by a gap, then reduces the gap. More efficient than simple insertion sort (average complexity depends on gap sequence).",
   tree: "Builds a Binary Search Tree (BST) from the elements, then performs an in-order traversal to get the sorted sequence. Average O(n log n), but O(n^2) worst case for unbalanced trees. Requires extra space.",
   tim: "A hybrid algorithm derived from Merge Sort and Insertion Sort. Divides the array into 'runs', sorts runs using Insertion Sort, then merges runs using Merge Sort. Efficient (O(n log n)) and stable.",
   cocktail: "A variation of Bubble Sort that traverses the array in both directions per pass. Slightly improves performance over Bubble Sort by moving items to their correct position faster, but still O(n^2).",
   comb: "Improves on Bubble Sort by using a gap between compared elements that starts large and shrinks (typically by a factor of 1.3). Helps eliminate 'turtles' (small values near the end) quickly. Average case better than O(n^2).",
   gnome: "Compares the current element with the previous. If they're in order, move forward. If out of order, swap them and move backward. Simple, like Insertion Sort, but moves elements via swaps (O(n^2)).",
 };
 // ---
 
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
         return shellSortCode;
       case 'tree':
         return treeSortCode; // Added case
       case 'tim':
         return timSortCode; // Added case
       case 'cocktail':
         return cocktailSortCode; // Added case
       case 'comb':
         return combSortCode; // Added case
       case 'gnome':
         return gnomeSortCode; // Added case
       case 'selection':
         return selectionSortCode;
       default:
        return '// Select an algorithm to view its code.';
    }
  };

  const code = getCode();
  const lines = code.split('\n');

  return (
    <div className="absolute top-2 right-2 z-10 bg-white/40 text-green-900 p-4 rounded-md shadow-md max-h-[calc(100vh-2rem)] overflow-y-auto font-mono text-sm w-1/3">
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
       {/* Description Section */}
       {algorithm && descriptions[algorithm] && (
         <div className="mt-4 pt-2 border-t border-green-800">
           <h4 className="text-md font-semibold mb-1">Description:</h4>
           <p className="text-xs text-green-800">{descriptions[algorithm]}</p>
         </div>
       )}
     </div>
   );
};

export default AlgorithmCodeDisplay;
