function countClusterValue (childrenValues) {
  if (childrenValues.length === 0)
    return 0;

  const childSum = childrenValues.reduce((sum, value) => sum + value);
  const childCount = childrenValues.length;

  return Math.round(((childSum / childCount) + Number.EPSILON) * 10) / 10; // mean value
}

export default countClusterValue;
