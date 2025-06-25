import React, { useRef } from "react";

export default function TriangleCanvas({
  points,
  setPoints,
  dragging,
  setDragging,
}) {
  const svgRef = useRef(null);

  const handleMouseDown = (pt) => (e) => {
    e.preventDefault();
    setDragging(pt);
  };

  const handleMouseMove = (e) => {
    if (!dragging || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    const y = ((e.clientY - rect.top) / rect.height) * 400;

    const padding = 5;
    const newX = Math.max(padding, Math.min(400 - padding, x));
    const newY = Math.max(padding, Math.min(400 - padding, y));

    setPoints((prev) => ({
      ...prev,
      [dragging]: { x: newX, y: newY },
    }));
  };

  const handleMouseUp = () => setDragging(null);

  return (
    <svg
      ref={svgRef}
      className="svg-container"
      viewBox="0 0 400 400"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <polygon
        points={`${points.A.x},${points.A.y} ${points.B.x},${points.B.y} ${points.C.x},${points.C.y}`}
        className="triangle-polygon"
      />
      {["A", "B", "C"].map((pt) => (
        <circle
          key={pt}
          r="10"
          className="draggable-point"
          cx={points[pt].x}
          cy={points[pt].y}
          onMouseDown={handleMouseDown(pt)}
          style={{ cursor: dragging === pt ? "grabbing" : "grab" }}
        />
      ))}
      {["A", "B", "C"].map((pt) => (
        <text
          key={pt}
          x={points[pt].x + 15}
          y={points[pt].y - 15}
          fontSize="18"
          fontWeight="bold"
          className="point-label"
        >
          {pt}
        </text>
      ))}
    </svg>
  );
}
