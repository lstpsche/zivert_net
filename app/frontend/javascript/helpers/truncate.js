function truncate (number, signsCount = 0) {
  let factor = 10 ** signsCount;

  return Math.round(number * factor) / factor;
}

export default truncate;
