import React, { useEffect, useState } from "react";
import TriangleCanvas from "./components/TriangleCanvas";
import TriangleButtons from "./components/TriangleButtons";
import TriangleProperties from "./components/TriangleProperties";
import { distance, getAngle } from "./utils/geometryUtils";

export default function App() {
  const [points, setPoints] = useState({
    A: { x: 150, y: 100 },
    B: { x: 300, y: 300 },
    C: { x: 50, y: 300 },
  });

  const [dragging, setDragging] = useState(null);

  const [properties, setProperties] = useState({
    sideAB: 0,
    sideBC: 0,
    sideCA: 0,
    angleA: 0,
    angleB: 0,
    angleC: 0,
    angleSum: 0,
    triangleType: "",
    isRightAngled: false,
    satisfiesTriangleInequality: false,
    isPythagorean: false,
    isSum180: false,
  });

  useEffect(() => {
    const AB = distance(points.A, points.B);
    const BC = distance(points.B, points.C);
    const CA = distance(points.C, points.A);

    const angleA = getAngle(points.B, points.A, points.C);
    const angleB = getAngle(points.C, points.B, points.A);
    const angleC = getAngle(points.A, points.C, points.B);

    const typeBySides =
      Math.abs(AB - BC) < 0.5 && Math.abs(BC - CA) < 0.5
        ? "Equilateral"
        : Math.abs(AB - BC) < 0.5 ||
          Math.abs(BC - CA) < 0.5 ||
          Math.abs(CA - AB) < 0.5
        ? "Isosceles"
        : "Scalene";

    const isRight = [angleA, angleB, angleC].some(
      (a) => Math.abs(a - 90) < 0.5
    );
    const isSum180 = Math.abs(angleA + angleB + angleC - 180) < 0.1;
    const isPythagorean = (() => {
      const [a, b, c] = [AB, BC, CA].sort((x, y) => x - y);
      return Math.abs(a ** 2 + b ** 2 - c ** 2) < 0.25;
    })();
    const validTriangle = AB + BC > CA && BC + CA > AB && CA + AB > BC;

    setProperties({
      sideAB: AB.toFixed(1),
      sideBC: BC.toFixed(1),
      sideCA: CA.toFixed(1),
      angleA: angleA.toFixed(1),
      angleB: angleB.toFixed(1),
      angleC: angleC.toFixed(1),
      angleSum: (angleA + angleB + angleC).toFixed(1),
      triangleType: typeBySides,
      isRightAngled: isRight,
      satisfiesTriangleInequality: validTriangle,
      isPythagorean,
      isSum180,
    });
  }, [points]);

  const setPreset = (type) => {
    if (type === "Equilateral") {
      setPoints({
        A: { x: 200, y: 100 },
        B: { x: 100, y: 100 + 173.2 },
        C: { x: 300, y: 100 + 173.2 },
      });
    } else if (type === "Isosceles") {
      setPoints({
        A: { x: 200, y: 100 },
        B: { x: 120, y: 300 },
        C: { x: 280, y: 300 },
      });
    } else if (type === "Scalene") {
      setPoints({
        A: { x: 180, y: 100 },
        B: { x: 100, y: 250 },
        C: { x: 300, y: 300 },
      });
    } else if (type === "Right") {
      setPoints({
        A: { x: 100, y: 100 },
        B: { x: 100, y: 300 },
        C: { x: 300, y: 300 },
      });
    }
  };

  return (
    <div className="container">
      <h1 className="main-heading">Interactive Triangle Explorer</h1>
      <h3>
        You can drag the points to reshape the triangle and explore its
        properties interactively.
      </h3>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <TriangleCanvas
          points={points}
          setPoints={setPoints}
          dragging={dragging}
          setDragging={setDragging}
        />
        <TriangleButtons onSet={setPreset} />
      </div>
      <TriangleProperties properties={properties} />
    </div>
  );
}
