import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

export const dateFormat = (originalDate: Date) => {
  const date = new Date(originalDate);
  const formattedDate = dayjs(date).tz("Asia/Seoul").format("YYYY-MM-DD");

  return formattedDate;
};
