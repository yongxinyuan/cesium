import Cartesian3 from "@/Core/Cartesian3";
import defined from "@/Core/defined";
import DeveloperError from "@/Core/DeveloperError";
import CesiumMath from "@/Core/Math";

const scaleToGeodeticSurfaceIntersection = new Cartesian3();
const scaleToGeodeticSurfaceGradient = new Cartesian3();

/**
 * Scales the provided Cartesian position along the geodetic surface normal
 * so that it is on the surface of this ellipsoid.  If the position is
 * at the center of the ellipsoid, this function returns undefined.
 *
 * @param {Cartesian3} cartesian The Cartesian position to scale.
 * @param {Cartesian3} oneOverRadii One over radii of the ellipsoid.
 * @param {Cartesian3} oneOverRadiiSquared One over radii squared of the ellipsoid.
 * @param {Number} centerToleranceSquared Tolerance for closeness to the center.
 * @param {Cartesian3} [result] The object onto which to store the result.
 * @returns {Cartesian3} The modified result parameter, a new Cartesian3 instance if none was provided, or undefined if the position is at the center.
 *
 * @function scaleToGeodeticSurface
 *
 * @private
 */
const scaleToGeodeticSurface = (
  cartesian: Cartesian3,
  oneOverRadii: Cartesian3,
  oneOverRadiiSquared: Cartesian3,
  centerToleranceSquared: number,
  result: Cartesian3
): Cartesian3 => {
  //>>includeStart('debug', pragmas.debug);
  if (!defined(cartesian)) {
    throw new DeveloperError("cartesian is required.");
  }
  if (!defined(oneOverRadii)) {
    throw new DeveloperError("oneOverRadii is required.");
  }
  if (!defined(oneOverRadiiSquared)) {
    throw new DeveloperError("oneOverRadiiSquared is required.");
  }
  if (!defined(centerToleranceSquared)) {
    throw new DeveloperError("centerToleranceSquared is required.");
  }
  //>>includeEnd('debug');
};

export default scaleToGeodeticSurface;
