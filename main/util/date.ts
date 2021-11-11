export const getDateId = (date: Date): string => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return `${year}${getTwoDigitString(month)}${getTwoDigitString(day)}`;
};

const getTwoDigitString = (num: number): string | number =>
  num >= 10 ? num : "0" + num;
