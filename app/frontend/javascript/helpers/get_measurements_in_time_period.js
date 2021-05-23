function getMeasurementsInTimePeriod (measurements, startDate, endDate) {
  startDate = Date.parse(startDate);
  endDate = Date.parse(endDate);
  debugger
  return measurements.filter(m => {
    let createdAt = Date.parse(m.createdAt);
    return createdAt >= startDate && createdAt <= endDate;
  });
}

export default getMeasurementsInTimePeriod;
