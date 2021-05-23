import roundValue from "./round_value";

export function countClusterValue (childrenValues) {
  if (childrenValues.length === 0)
    return 0;

  const childSum = childrenValues.reduce((sum, value) => sum + value);
  const childCount = childrenValues.length;

  return childSum / childCount; // mean value
}

export function countRoundedClusterValue (childrenValues, digitsAfterDot = 0) {
  return roundValue(countClusterValue(childrenValues), digitsAfterDot);
}
