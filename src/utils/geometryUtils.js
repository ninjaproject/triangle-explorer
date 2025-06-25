export const distance = (p1, p2) =>
  Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);

export function getAngle(p1, vertex, p2) {
  const v1 = { x: p1.x - vertex.x, y: p1.y - vertex.y };
  const v2 = { x: p2.x - vertex.x, y: p2.y - vertex.y };
  const dot = v1.x * v2.x + v1.y * v2.y;
  const mag1 = Math.sqrt(v1.x ** 2 + v1.y ** 2);
  const mag2 = Math.sqrt(v2.x ** 2 + v2.y ** 2);
  let cosAngle = 0;
  if (mag1 > 0 && mag2 > 0) cosAngle = dot / (mag1 * mag2);
  cosAngle = Math.max(-1, Math.min(1, cosAngle));
  const angleRad = Math.acos(cosAngle);
  return angleRad * (180 / Math.PI);
}
