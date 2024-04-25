
const NB_SECONDS_PER_DAY = 8 * 3600;
const NB_SECONDS_PER_HOUR = 3600;
const NB_SECONDS_PER_MINUTE = 60;

export function getTimeValue(timeInStr) {
  let timeInSeconds = 0;
  const timeArr = timeInStr.split(" ");
  for (let timeItem of timeArr) {
    timeInSeconds += getTimeInSeconds(timeItem);
  }

  return timeInSeconds;
}

function getTimeInSeconds(timeNotation) {
  const timeUnit = timeNotation.at(-1);
  if ("dhms".includes(timeUnit)) {
    const timeFactor = getTimeFactor(timeUnit);
    const numberOfUnits = parseFloat(timeNotation.slice(0, -1));
    return timeFactor * numberOfUnits;
  }

  return parseFloat(timeNotation);
}

export function getTimeInFormat(timeInSeconds) {
  const timeArr = [
    [NB_SECONDS_PER_DAY, 'd'],
    [NB_SECONDS_PER_HOUR, 'h'],
    [NB_SECONDS_PER_MINUTE, 'm']
  ];

  let timeNotation = "";
  let arrIndex = 0;
  while (timeInSeconds >= NB_SECONDS_PER_MINUTE) {
    const unitArr = timeArr[arrIndex];
    if (timeInSeconds >= unitArr[0]) {
      const nbUnits = Math.floor(timeInSeconds / unitArr[0]);
      timeNotation += `${nbUnits}${unitArr[1]}`;
      timeInSeconds -= nbUnits * unitArr[0];
    }

    ++arrIndex;
  }

  if (timeInSeconds > 0)
    timeNotation += `${timeInSeconds}s`;

  return timeNotation;
}

function getTimeFactor(timeUnit) {
  switch (timeUnit) {
    case 'd':
      return NB_SECONDS_PER_DAY;
    case 'h':
      return NB_SECONDS_PER_HOUR;
    case 'm':
      return NB_SECONDS_PER_MINUTE;
    case 's':
      return 1;
    default:
      throw new Error("Invalid Time Unit");
  }
}