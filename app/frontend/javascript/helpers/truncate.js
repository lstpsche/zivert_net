function truncate (number, signsCount = 0) {
  const factor = 10 ** signsCount;

  const result = Math.round(number * factor) / factor;

  if (isNaN(result))
    return "";
  else
    return result;
}

export default truncate;
