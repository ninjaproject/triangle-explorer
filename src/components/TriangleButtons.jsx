export default function TriangleButtons({ onSet }) {
  return (
    <div className="left-buttons">
      <h2>Set Triangle Type</h2>
      {["Equilateral", "Isosceles", "Scalene", "Right"].map((type) => (
        <button key={type} onClick={() => onSet(type)}>
          {type}
        </button>
      ))}
    </div>
  );
}
