export const getTimeIntervals = (start: string, end: string, interval: number) => {
  const startHour = parseInt(start.split(':')[0]);
  const startMinute = parseInt(start.split(':')[1]);
  const endHour = parseInt(end.split(':')[0]);
  const endMinute = parseInt(end.split(':')[1]);

  const intervals = [];
  let currentHour = startHour;
  let currentMinute = startMinute;

  while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
    const nextMinute = (currentMinute + interval) % 60;
    const nextHour = currentHour + Math.floor((currentMinute + interval) / 60);

    intervals.push({
      start: `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`,
      end: `${String(nextHour).padStart(2, '0')}:${String(nextMinute).padStart(2, '0')}`
    });

    currentHour = nextHour;
    currentMinute = nextMinute;
  }

  return intervals;
};