export type Vec2 = [number, number]
export type Polygon = Vec2[]

export const diff = (a: Vec2, b: Vec2): Vec2 => [a[0] - b[0], a[1] - b[1]]
export const cross = (a: Vec2, b: Vec2): number => a[0] * b[1] - a[1] * b[0]

export const intersected = (
  sa: Vec2,
  ea: Vec2,
  sb: Vec2,
  eb: Vec2,
): boolean => {
  const c1 = cross(diff(ea, sa), diff(sb, sa))
  const c2 = cross(diff(ea, sa), diff(eb, sa))
  const c3 = cross(diff(eb, sb), diff(sa, sb))
  const c4 = cross(diff(eb, sb), diff(ea, sb))
  return c1 < 0 && c2 > 0 && c3 > 0 && c4 < 0
}
