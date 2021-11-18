/**
 * ArcType defines the path that should be taken connecting vertices.
 */
enum ArcType {
  /**
   * Straight line that does not conform to the surface of the ellipsoid.
   */
  NONE = 0,

  /**
   * Follow geodesic path.
   */
  GEODESIC = 1,

  /**
   * Follow rhumb or loxodrome path.
   */
  RHUMB = 2,
}

export default ArcType;
