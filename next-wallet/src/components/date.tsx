/*
 * @Author: lee
 * @Date: 2023-05-29 16:28:42
 * @LastEditTime: 2023-05-29 16:30:05
 */
import { parseISO, format } from "date-fns";

export default function Date({ dateString }: any) {
  const date = parseISO(dateString);
  return <time dateTime={dateString}>{format(date, "LLLL d, yyyy")}</time>;
}
