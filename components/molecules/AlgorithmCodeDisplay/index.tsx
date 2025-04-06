import React from 'react';

interface AlgorithmCodeDisplayProps {
  algorithm: 'bubble' | 'selection' | null;
  currentLine: number | null;
}

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
