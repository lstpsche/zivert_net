const valueThresholdsOrder = [0.3, 0.5, 1, 'overhead', 'default'];

const valueThresholds = {
  0.3: "default",
  0.5: "warning",
  1: "danger",
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
