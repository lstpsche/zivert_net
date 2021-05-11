const valueThresholds = {
  20: "default",
  50: "warning",
  100: "danger",
  overhead: "critical",
  default: "default"
}

function generateMarkerClassName (value) {
  if (value === "" || value === undefined)
    return valueThresholds["default"];

  const threshold = Object.keys(valueThresholds).find(threshold => value < threshold);

  return valueThresholds[threshold] || valueThresholds["overhead"];
}

export default generateMarkerClassName;
