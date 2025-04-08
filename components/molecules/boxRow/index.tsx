// 'use client'; // Ensure this is a client component
import React, { useMemo } from "react";
import { useSprings, animated } from '@react-spring/three'; // Import react-spring
import Box from "../../atoms/box";
import { DoubleSide, Vector3 } from "three"; // Import Vector3
import InfoBox from "../infoBox";

// --- Constants for Layout and Styling ---
const START_X = -5; // Initial X position offset for the row
const BOX_SPACING = 1; // Spacing between the start of each box group
const GROUP_BASE_Y = 1.2; // Base Y position for the animated group
const VALUE_BOX_BASE_Y_OFFSET = 1.95; // Base Y offset for the value bar before scaling
const VALUE_BOX_BASE_SCALE_X = 0.5;
const VALUE_BOX_BASE_SCALE_Z = 0.5;
const VALUE_BOX_SCALE_Y_MULTIPLIER = 0.5; // Multiplier for item value to get Y scale
const LABEL_BOX_SCALE_X = 0.5;
const LABEL_BOX_SCALE_Y = 0.5;
const LABEL_BOX_SCALE_Z = 0.5;
const VALUE_LABEL_Y_OFFSET = 0.5; // Y offset for the static value label box
const LINE_COLOR = "green";
const LINE_WIDTH = 5;


// Highlight Colors
const DEFAULT_BAR_COLOR = "hsl(210, 100%, 50%)"; // Blue
 const COMPARE_COLOR = "hsl(0, 100%, 50%)"; // Red (Comparison highlight)
 const MIN_INDEX_COLOR = "hsl(120, 100%, 35%)"; // Green (Selection Sort min found)
 const CURRENT_INDEX_COLOR = "hsl(60, 100%, 50%)"; // Yellow (Selection/Insertion current index)
 const KEY_COLOR = "hsl(280, 100%, 50%)"; // Purple (Insertion Sort key)
 const MERGE_RANGE_COLOR = "hsl(30, 100%, 50%)"; // Orange (Merge Sort range)
 const PIVOT_COLOR = "hsl(330, 100%, 50%)"; // Pink (Quick Sort pivot)
 const HEAP_NODE_COLOR = "hsl(180, 70%, 40%)"; // Teal (Heapify nodes: root, left, right)
 const HEAP_LARGEST_COLOR = "hsl(180, 100%, 60%)"; // Lighter Teal (Heapify largest node)
 const TIM_SORT_INSERTION_COLOR = "hsl(240, 60%, 70%)"; // Lighter Blue (Tim Sort Insertion Run)
 const TIM_SORT_MERGE_COLOR = "hsl(30, 60%, 70%)"; // Lighter Orange (Tim Sort Merge Run)
 const COCKTAIL_RANGE_FORWARD_COLOR = "hsl(150, 70%, 60%)"; // Mint Green (Cocktail Forward Pass)
 const COCKTAIL_RANGE_BACKWARD_COLOR = "hsl(200, 70%, 60%)"; // Sky Blue (Cocktail Backward Pass)
 const STRAND_INPUT_COLOR = "hsl(210, 30%, 70%)"; // Light Gray-Blue (Strand Input List)
 const STRAND_SUBLIST_COLOR = "hsl(100, 70%, 60%)"; // Light Green (Strand Current Sublist)
 const STRAND_RESULT_COLOR = "hsl(50, 100%, 60%)"; // Yellow (Strand Result List)
 const STRAND_MERGE_COMPARE_COLOR = "hsl(0, 100%, 70%)"; // Lighter Red (Strand Merge Comparison)
 // ---
 
// Define props interface
interface BoxRowProps {
  items: number[];
  logicDetails?: Record<number, string> | null; // Map index to logic text
  comparingIndices?: number[] | null; // For comparison highlight
  minIndex?: number | null;          // For Selection Sort minimum found
   currentIndex?: number | null;      // For Selection/Insertion Sort current index
   keyIndex?: number | null;          // For Insertion Sort key
    mergeRange?: { left: number; right: number } | null; // For Merge Sort range
    pivotIndex?: number | null;        // For Quick Sort pivot
    heapIndices?: { root: number; left?: number; right?: number; largest?: number } | null; // For Heap Sort heapify
    timSortRange?: { type: 'insertion' | 'merge'; start: number; end: number; mid?: number } | null; // For Tim Sort phases
    cocktailRange?: { start: number; end: number; direction: 'forward' | 'backward' } | null; // For Cocktail Shaker Sort range
    // Strand Sort States (using Sets to track indices belonging to each list)
    strandInputIndices?: Set<number> | null;
    strandSublistIndices?: Set<number> | null;
    strandResultIndices?: Set<number> | null;
   strandMergeIndices?: { resultIdx: number; sublistIdx: number } | null; // Indices being compared during merge
}

const BoxRow: React.FC<BoxRowProps> = ({
  items, logicDetails, comparingIndices, minIndex, currentIndex, keyIndex, mergeRange, pivotIndex, heapIndices, timSortRange, cocktailRange,
  strandInputIndices, strandSublistIndices, strandResultIndices, strandMergeIndices
 }) => {
  // Use useSprings to manage animations for each item
  const springs = useSprings(
    items.length,
    items.map((itemValue, i) => {
      const targetX = START_X + (i * BOX_SPACING) + BOX_SPACING; // Calculate target X for the group
      const targetScaleY = itemValue * VALUE_BOX_SCALE_Y_MULTIPLIER; // Calculate target Y scale for the value bar
      const targetValueBoxY = (VALUE_BOX_BASE_Y_OFFSET + targetScaleY / 2) - GROUP_BASE_Y; // Calculate target Y position relative to group

      return {
        // Animated properties for the group and the value bar within it
        position: [targetX, GROUP_BASE_Y, 0] as [number, number, number],
        valueBoxScale: [VALUE_BOX_BASE_SCALE_X, targetScaleY, VALUE_BOX_BASE_SCALE_Z] as [number, number, number],
        valueBoxPosition: [0, targetValueBoxY, 0] as [number, number, number], // Relative Y position
        config: { mass: 1, tension: 170, friction: 26 }, // Spring physics
      };
    })
  );
  const linePoints = useMemo(() => {
    // Start point: Center of the background box (at the group's origin)
    const start = new Vector3(0, 0, 0);
    // End point: Position of the InfoBox
    const end = new Vector3(0, 0, 5); // Matches InfoBox position prop below
    // Return coordinates flattened into a Float32Array for bufferAttribute
    return new Float32Array([...start.toArray(), ...end.toArray()]);
  }, []); // Empty dependency array means this runs once per item
  

  const ValueLinePoints = useMemo(() => {
    // Start point: Center of the background box (at the group's origin)
    const start = new Vector3(0, 0.5, 0);
    // End point: Position of the InfoBox
    const end = new Vector3(0, 0.5, 5); // Matches InfoBox position prop below
    // Return coordinates flattened into a Float32Array for bufferAttribute
    return new Float32Array([...start.toArray(), ...end.toArray()]);
  }, []); 
  // Map springs to animated components
  return (
    <>
      {springs.map((props, i) => {
        const itemValue = items[i]; // Current value for static display
        const indexValue = i; // Current index for static display
 
 
 
         // Determine highlight state and color (with priority)
         let barColor = DEFAULT_BAR_COLOR;
          const isInMergeRange = mergeRange && i >= mergeRange.left && i <= mergeRange.right;
          const isHeapNode = heapIndices && (i === heapIndices.root || i === heapIndices.left || i === heapIndices.right);
          const isHeapLargest = heapIndices && i === heapIndices.largest;
          const isInTimSortRange = timSortRange && i >= timSortRange.start && i <= timSortRange.end;
          const isTimSortInsertion = isInTimSortRange && timSortRange.type === 'insertion';
          const isTimSortMerge = isInTimSortRange && timSortRange.type === 'merge';
          const isInCocktailRange = cocktailRange && i >= cocktailRange.start && i <= cocktailRange.end;
          const isCocktailForward = isInCocktailRange && cocktailRange.direction === 'forward';
          const isCocktailBackward = isInCocktailRange && cocktailRange.direction === 'backward';
          const isStrandInput = strandInputIndices?.has(i);
          const isStrandSublist = strandSublistIndices?.has(i);
          const isStrandResult = strandResultIndices?.has(i);
          // Note: strandMergeIndices refers to indices *within* the conceptual result/sublist arrays,
          // not the main 'items' array index 'i'. We'll use comparingIndices for the merge comparison highlight.

          if (isHeapLargest) {
            barColor = HEAP_LARGEST_COLOR; // 1. Heapify largest
          } else if (isHeapNode) {
            barColor = HEAP_NODE_COLOR; // 2. Heapify root/children
          } else if (pivotIndex === i) {
            barColor = PIVOT_COLOR; // 3. Quick Sort Pivot
          } else if (keyIndex === i) {
           barColor = KEY_COLOR; // 4. Insertion sort key
         } else if (currentIndex === i) {
           barColor = CURRENT_INDEX_COLOR; // 5. Selection/Insertion current index
         } else if (minIndex === i) {
            barColor = MIN_INDEX_COLOR; // 6. Selection sort min index
          } else if (comparingIndices?.includes(i)) {
            barColor = COMPARE_COLOR; // 7. General Comparison highlight (also used for Strand merge compare)
          } else if (isStrandSublist) {
            barColor = STRAND_SUBLIST_COLOR; // 8. Strand Sublist
          } else if (isStrandResult) {
            barColor = STRAND_RESULT_COLOR; // 9. Strand Result List
          } else if (isStrandInput) {
            barColor = STRAND_INPUT_COLOR; // 10. Strand Input List
          } else if (isCocktailForward) {
            barColor = COCKTAIL_RANGE_FORWARD_COLOR; // 11. Cocktail Forward Pass Range
          } else if (isCocktailBackward) {
            barColor = COCKTAIL_RANGE_BACKWARD_COLOR; // 12. Cocktail Backward Pass Range
          } else if (isTimSortInsertion) {
            barColor = TIM_SORT_INSERTION_COLOR; // 13. Tim Sort Insertion Run
          } else if (isTimSortMerge) {
            barColor = TIM_SORT_MERGE_COLOR; // 14. Tim Sort Merge Run
          } else if (isInMergeRange) {
            barColor = MERGE_RANGE_COLOR; // 15. General Merge sort range
          }
 
        const logicText = logicDetails?.[i]; // Get logic text for this index, if any
        const valueBarScaleY = itemValue * VALUE_BOX_SCALE_Y_MULTIPLIER;
        const valueBarTopY = VALUE_BOX_BASE_Y_OFFSET + valueBarScaleY / 2; // Y position of the top of the value bar relative to group origin

        return (
          // Each item is an animated group, its 'position' prop animates horizontally during swaps
          <animated.group key={`box-group-${i}`} position={props.position}>
            {/* Render InfoBox for logic details if text exists */}
            {logicText && (
              <InfoBox
                text={logicText}
                // Position slightly above the top of the value bar
                position={new Vector3(0,  2, -10)} // Adjust Y offset as needed
              />
            )}
            {/* Static background box */}
            <Box
              positionVal={[0, 0, 0]}
              scaleVal={[BOX_SPACING, LABEL_BOX_SCALE_Y, 1]} // Use constants
              // --- Other static props ---
              velocityVal={0}
              massVal={0}
              material="normal"
              enableTransparent={true}
              side={DoubleSide}
            />
             {/* Static index label box */}
            <Box
              positionVal={[0, 0, 0]}
              scaleVal={[LABEL_BOX_SCALE_X, LABEL_BOX_SCALE_Y, LABEL_BOX_SCALE_Z]} // Use constants
              // --- Other static props ---
              velocityVal={0}
              massVal={0}
              enableTransparent={false}
              customTexture={true}
              arrayValue={indexValue}
            />
           {indexValue==0 && <> 
           <InfoBox
              text={`Array index starts with ${indexValue}`} // Display specific index
              position={new Vector3(0, -0.1, 5)} // Moved significantly back in Z
            />
             {/* --- FIXED: Added Connecting Line (Object <-> InfoBox) --- */}
             <line>
              <bufferGeometry attach="geometry">
                 <bufferAttribute
                   attach="attributes-position"
                   count={2}
                   array={linePoints} // Use the calculated points
                   itemSize={3}
                 />
              </bufferGeometry>
              <lineBasicMaterial
                attach="material"
                color={LINE_COLOR}    // Use line color constant
                linewidth={LINE_WIDTH} // Use line width constant
                                       // Reminder: linewidth > 1 might not render thicker
              />
            </line></>} {/* InfoBox for Array Index */}

            {indexValue==springs.length-1 && <> 
           <InfoBox
              text={`Array values`} // Display specific index
              position={new Vector3(0, 0.4, 5)} // Moved significantly back in Z
            />
             {/* --- FIXED: Added Connecting Line (Object <-> InfoBox) --- */}
             <line>
              <bufferGeometry attach="geometry">
                 <bufferAttribute
                   attach="attributes-position"
                   count={2}
                   array={ValueLinePoints} // Use the calculated points
                   itemSize={3}
                 />
              </bufferGeometry>
              <lineBasicMaterial
                attach="material"
                color={LINE_COLOR}    // Use line color constant
                linewidth={LINE_WIDTH} // Use line width constant
                                       // Reminder: linewidth > 1 might not render thicker
              />
            </line></>}
           
             {/* Static value label box */}
            <Box
              positionVal={[0, VALUE_LABEL_Y_OFFSET, 0]} // Use constant
              scaleVal={[LABEL_BOX_SCALE_X, LABEL_BOX_SCALE_Y, LABEL_BOX_SCALE_Z]} // Use constants
              // --- Other static props ---
              velocityVal={0}
              massVal={0}
              material="standard"
              enableTransparent={false}
              customTexture={true}
              arrayValue={itemValue}
            />
            {/* Animated value bar mesh */}
            <animated.mesh
              // Position animates vertically relative to the group's origin
              position={props.valueBoxPosition}
              // Scale animates vertically (Y) based on the item's value
              scale={props.valueBoxScale}
            >
              <boxGeometry args={[1, 1, 1]} />
              {/* Apply determined color */}
              <meshStandardMaterial
                attach="material"
                color={barColor}
              />
            </animated.mesh>
          </animated.group>
        );
      })}
    </>
  );
};

// Ensure this is the default export
export default BoxRow;
