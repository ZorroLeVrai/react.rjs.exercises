export function getTimeValue(timeInStr) {
  let timeInSeconds = 0;
  const timeArr = timeInStr.split(" ");
  for (let timeItem of timeArr) {
    timeInSeconds += getTime(timeItem);
  }

  return timeInSeconds;
}

function getTime(timeItem) {
  const timeUnit = timeItem.at(-1);
  if ("dhms".includes(timeUnit)) {
    const timeFactor = getTimeFactor(timeUnit);
    const numberOfUnits = parseFloat(timeItem.slice(0, -1));
    return timeFactor * numberOfUnits;
  }

  return parseFloat(timeItem);
}

function getTimeFactor(timeUnit) {
  switch (timeUnit) {
    case 'd':
      return 8 * 3600;
    case 'h':
      return 3600;
    case 'm':
      return 60;
    case 's':
      return 1;
    default:
      throw new Error("Invalid Time Unit");
  }
}