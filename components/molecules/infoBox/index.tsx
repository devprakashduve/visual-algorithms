import React from "react";
import { Html, Line } from "@react-three/drei";
import * as THREE from 'three'; // Import THREE for Vector3 if needed, though Line points can be arrays

import { InfoBoxProps } from "./_infoBox.interface";

const InfoBox = (props: InfoBoxProps) => {
  const { position, text } = props;
  const htmlYOffset = 0.2; // How far above the anchor point the HTML appears
  const lineEndYOffset = 0.05; // Where the line visually connects below the HTML

  return (
    // Group to hold both HTML and Line, positioned by the parent
    <group position={position}>
      {/* Position the HTML slightly above the group's origin */}
      <Html position={[0, htmlYOffset, 0]} center>
        {/* Basic styling to make it visible */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '2px 5px',
        borderRadius: '3px',
        fontSize: '10px',
          whiteSpace: 'nowrap' // Prevent text wrapping
        }}>
          {text}
        </div>
      </Html>
      {/* Line connecting the HTML's approximate bottom to the group's origin */}
      <Line
        points={[[0, lineEndYOffset, 0], [0, 0, 0]]} // From just below HTML to the anchor point
        color="white"
        lineWidth={1}
      />
    </group>
  );
};

export default InfoBox;
