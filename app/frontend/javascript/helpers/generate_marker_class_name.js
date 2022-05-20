const valueThresholdsOrder = [30, 50, 100, 'overhead', 'default'];

const valueThresholds = {
  30: "default",
  50: "warning",
  100: "danger",
  overhead: "critical",
  default: "default"
}

function generateMarkerClassName (valueUrh) {
  if (valueUrh === "" || valueUrh === undefined)
    return valueThresholds["default"];

  const threshold = valueThresholdsOrder.find(threshold => valueUrh < threshold);

  return valueThresholds[threshold] || valueThresholds["overhead"];
}

export default generateMarkerClassName;
