export default function TriangleProperties({ properties }) {
  return (
    <div className="properties-grid">
      <div className="card">
        <h2 className="card-heading">Side Lengths</h2>
        <p className="card-text">AB: {properties.sideAB} cm</p>
        <p className="card-text">BC: {properties.sideBC} cm</p>
        <p className="card-text">CA: {properties.sideCA} cm</p>
      </div>

      <div className="card">
        <h2 className="card-heading">Angles (°)</h2>
        <p className="card-text">∠A: {properties.angleA}°</p>
        <p className="card-text">∠B: {properties.angleB}°</p>
        <p className="card-text">∠C: {properties.angleC}°</p>
        <p className="card-text">
          <strong>
            Sum: {properties.angleSum}° {properties.isSum180 ? "✅" : "❌"}
          </strong>
        </p>
      </div>

      <div className="card">
        <h2 className="card-heading">Triangle Type</h2>
        <p className="card-text">By Sides: {properties.triangleType}</p>
        <p className="card-text">
          By Angles:{" "}
          {properties.isRightAngled ? "Right-angled" : "Acute/Obtuse"}
        </p>
      </div>

      <div className="card">
        <h2 className="card-heading">Validations</h2>
        <p className="card-text">
          Triangle Inequality:{" "}
          {properties.satisfiesTriangleInequality ? "✅ Valid" : "❌ Invalid"}
        </p>
        <p className="card-text">
          Pythagorean Theorem:{" "}
          {properties.isPythagorean ? "✅ Holds True" : "❌ Does Not Hold"}
        </p>
      </div>
    </div>
  );
}
