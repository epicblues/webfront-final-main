export const getDateId = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}${getTwoDigitString(month)}${getTwoDigitString(day)}`;
};

const getTwoDigitString = (num: number): string | number =>
  num >= 10 ? num : "0" + num;

export const returnIdToDate = (dateId: string): Date => {
  // dateId "20210430"

  const year = Number(dateId.substr(0, 4));
  const month = Number(dateId.substr(4, 2)) - 1;
  const day = Number(dateId.substr(6, 2));
  const date = new Date(year, month, day);

  return date;
};
