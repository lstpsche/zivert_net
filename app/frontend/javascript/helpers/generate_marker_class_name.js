const valueThresholds = {
  20: "default",
  50: "warning",
  100: "danger",
  default: "critical"
}

function generateMarkerClassName (value) {
  const threshold = Object.keys(valueThresholds).find(threshold => value < threshold);

  return valueThresholds[threshold] || valueThresholds["default"];
}

export default generateMarkerClassName;
