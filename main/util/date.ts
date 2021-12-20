const TIMEZONE_OFFSET_MILLISECONDS_KR =
  (new Date().getTimezoneOffset() + 540) * 60 * 1000;

export const getDateId = (date: Date): string => {
  // 한국 시간이 아닐 경우  한국 시간(GMT + 540분)으로 바꾸기
  const modifiedDate = getKoreanDate(date);
  const year = modifiedDate.getFullYear();
  const month = modifiedDate.getMonth() + 1;
  const day = modifiedDate.getDate();

  return `${year}${getTwoDigitString(month)}${getTwoDigitString(day)}`;
};

const getTwoDigitString = (num: number): string | number =>
  num >= 10 ? num : "0" + num;

export const returnIdToDate = (dateId: string): Date => {
  // dateId "20210430"

  const year = Number(dateId.substring(0, 4));
  const month = Number(dateId.substring(4, 6)) - 1;
  const day = Number(dateId.substring(6));
  // 서버 시간이 다를 경우 한국 시간으로 return 시켜야 한다.
  const date = getKoreanDate(new Date(year, month, day));

  return date;
};

export const parseDocumentToObject = (doc: Document | Document[]) =>
  JSON.parse(JSON.stringify(doc));

export const getKoreanDate = (originalDate: Date): Date => {
  return new Date(originalDate.getTime() + TIMEZONE_OFFSET_MILLISECONDS_KR); // 한국 서버일 경우 그대로 return
};
