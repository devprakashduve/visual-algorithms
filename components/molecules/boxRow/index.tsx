import React from "react";
import { useSprings, animated } from '@react-spring/three'; // Import react-spring
import Box from "../../atoms/box";
import { DoubleSide, Vector3 } from "three";
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

// Highlight Colors
const DEFAULT_BAR_COLOR = "hsl(210, 100%, 50%)"; // Blue
const COMPARE_COLOR = "hsl(0, 100%, 50%)"; // Red (Bubble Sort comparison)
const MIN_INDEX_COLOR = "hsl(120, 100%, 35%)"; // Green (Selection Sort min found)
const CURRENT_INDEX_COLOR = "hsl(60, 100%, 50%)"; // Yellow (Selection Sort current index)
// ---

// Define props interface
interface BoxRowProps {
  items: number[];
  comparingIndices?: number[] | null; // For Bubble Sort comparison
  minIndex?: number | null;          // For Selection Sort minimum found
  currentIndex?: number | null;      // For Selection Sort current index
}

const BoxRow: React.FC<BoxRowProps> = ({ items, comparingIndices, minIndex, currentIndex }) => {
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

  // Map springs to animated components
  return (
    <>
      {springs.map((props, i) => {
        const itemValue = items[i]; // Current value for static display
        const indexValue = i; // Current index for static display

        // Determine highlight state and color
        let barColor = DEFAULT_BAR_COLOR;
        if (currentIndex === i) {
          barColor = CURRENT_INDEX_COLOR; // Highest priority: current index in Selection Sort
        } else if (minIndex === i) {
          barColor = MIN_INDEX_COLOR; // Next priority: minimum index found in Selection Sort
        } else if (comparingIndices?.includes(i)) {
          barColor = COMPARE_COLOR; // Lowest priority: comparison highlight (Bubble or Selection)
        }

        return (
          // Each item is an animated group, its 'position' prop animates horizontally during swaps
          <animated.group key={`box-group-${i}`} position={props.position}>
            {/* Static background box */}
            <Box
              positionVal={[0, 0, 0]}
              scaleVal={[BOX_SPACING, LABEL_BOX_SCALE_Y, LABEL_BOX_SCALE_Z]} // Use constants
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
