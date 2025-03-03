export const seconds = (howMany: number) => howMany * 1000;
export const minutes = (howMany: number) => seconds(howMany) * 60;
export const hours = (howMany: number) => minutes(howMany) * 60;
export const days = (howMany: number) => hours(howMany) * 24;

export const getYearNumber = (date = new Date()) => date.getFullYear();
export const getWeekNumber = (date = new Date()) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0);
  const timeDiff = date.getTime() - firstDayOfYear.getTime();

  return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 7));
};
