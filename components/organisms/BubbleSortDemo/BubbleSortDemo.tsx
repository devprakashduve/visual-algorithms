import React, { useState, useCallback } from 'react';

// Define the structure of the objects we'll sort
interface SortableObject {
  id: number;
  value: number;
}

// Initial data
const initialData: SortableObject[] = [
  { id: 1, value: 50 },
  { id: 2, value: 20 },
  { id: 3, value: 80 },
  { id: 4, value: 10 },
  { id: 5, value: 60 },
];

const BubbleSortDemo: React.FC = () => {
  const [items, setItems] = useState<SortableObject[]>(initialData);
  const [isSorting, setIsSorting] = useState(false);

  // Bubble Sort implementation
  const bubbleSort = useCallback(async () => {
    setIsSorting(true);
    let arr = [...items]; // Create a mutable copy
    let n = arr.length;
    let swapped;

    do {
      swapped = false;
      for (let i = 0; i < n - 1; i++) {
        if (arr[i].value > arr[i + 1].value) {
          // Swap elements
          [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
          swapped = true;

          // Update state to visualize the step (optional, adds delay)
          setItems([...arr]);
          // Add a small delay to visualize the sorting process
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
      // After each pass, the largest element is in its correct place
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
     setItems(initialData);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Bubble Sort Demo</h2>
      <div style={{ marginBottom: '15px' }}>
        <button
          onClick={handleSortClick}
          disabled={isSorting}
          style={{ marginRight: '10px', padding: '8px 15px' }}
        >
          {isSorting ? 'Sorting...' : 'Sort by Value'}
        </button>
         <button
          onClick={handleResetClick}
          disabled={isSorting}
          style={{ padding: '8px 15px' }}
        >
          Reset
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '5px',
              backgroundColor: '#f9f9f9',
            }}
          >
            ID: {item.id}, Value: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BubbleSortDemo;
