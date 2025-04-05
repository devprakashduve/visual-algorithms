import React from "react";
import { useSprings, animated } from '@react-spring/three'; // Import react-spring
import Box from "../../atoms/box";
import { DoubleSide, Vector3 } from "three";
import InfoBox from "../infoBox";

// Define props interface
interface BoxRowProps {
  items: number[];
}

const BoxRow: React.FC<BoxRowProps> = ({ items }) => {
  // Use useSprings to manage animations for each item
  const springs = useSprings(
    items.length,
    items.map((itemValue, i) => {
      const px = -5 + (i + 1); // Calculate target x position based on index
      const sy = itemValue; // Target scale/height based on value

      return {
        // Animated properties
        position: [px + 1, 1.2, 0] as [number, number, number], // Animate group position
        valueBoxScale: [1 / 2, sy / 2, 1 / 2] as [number, number, number], // Animate value box scale
        valueBoxPosition: [px + 1, 1.95 + sy / 2 / 2, 0] as [number, number, number], // Animate value box position
        config: { mass: 1, tension: 170, friction: 26 }, // Spring physics configuration
      };
    })
  );

  // Map springs to animated components
  return (
    <>
      {springs.map((props, i) => {
        const itemValue = items[i]; // Get the current value for non-animated parts
        const indexValue = i; // Get the current index for non-animated parts
        const px = -5 + (i + 1); // Base x position for static elements within the group

        return (
          // Use animated.group and apply animated position
          <animated.group key={`box-group-${i}`} position={props.position}>
            {/* Static Box (Label Background) - Position relative to animated group */}
            <Box
              positionVal={[0, 0, 0]} // Positioned at the group's origin
              scaleVal={[1, 1 / 2, 1]}
              velocityVal={0}
              massVal={0}
              material="normal"
              enableTransparent={true}
              side={DoubleSide}
            >
              {/* <InfoBox position={new Vector3(0, 1, 0)} text={"This is info box"} /> */}
            </Box>
             {/* Static Box (Index Label) - Position relative to animated group */}
            <Box
              positionVal={[0, 0, 0]} // Positioned at the group's origin
              scaleVal={[1 / 2, 1 / 2, 1 / 2]}
              velocityVal={0}
              massVal={0}
              enableTransparent={false}
              customTexture={true}
              arrayValue={indexValue} // Display static index
            />
             {/* Static Box (Value Label) - Position relative to animated group */}
            <Box
              positionVal={[0, 0.5, 0]} // Positioned slightly above group origin
              scaleVal={[1 / 2, 1 / 2, 1 / 2]}
              velocityVal={0}
              massVal={0}
              material="standard"
              enableTransparent={false}
              customTexture={true}
              arrayValue={itemValue} // Display static value (texture updates instantly)
            />
            {/* Animated Box (Value Bar) */}
            <animated.mesh // Use animated.mesh for the value bar
              // Calculate position relative to the group's animated position
              // The group's animated position handles the X-axis movement (swapping places)
              // We only need to animate the Y position of the value bar based on its height (sy)
              position={props.valueBoxPosition.to((_x, y, _z) => [0, y - 1.2, 0])}
              scale={props.valueBoxScale} // Apply animated scale for height changes
            >
               {/* Re-create the Box component's internals here for animation */}
               <boxGeometry args={[1,1,1]} /> {/* Use scale prop for size */}
               {/* Apply material properties from the original Box component */}
               {/* TODO: Adapt material/texture based on original Box logic if needed */}
               <meshStandardMaterial attach="material" color="hsl(210, 100%, 50%)" />
            </animated.mesh>
          </animated.group>
        );
      })}
    </>
  );
};

// Ensure this is the default export
export default BoxRow;
