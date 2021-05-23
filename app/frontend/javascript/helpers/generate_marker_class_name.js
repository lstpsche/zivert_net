const valueThresholds = {
  20: "default",
  50: "warning",
  100: "danger",
  overhead: "critical",
  default: "default"
}

function generateMarkerClassName (valueUrh) {
  if (valueUrh === "" || valueUrh === undefined)
    return valueThresholds["default"];

  const threshold = Object.keys(valueThresholds).find(threshold => valueUrh < threshold);

  return valueThresholds[threshold] || valueThresholds["overhead"];
}

export default generateMarkerClassName;
