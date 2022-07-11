import format from "date-fns/format";
import subDays from "date-fns/subDays";

export let datesMap = {
  week: () => format(subDays(new Date(), 7), "yyyy-MM-dd"),
  month: () => format(subDays(new Date(), 30), "yyyy-MM-dd"),
  year: () => format(subDays(new Date(), 365), "yyyy-MM-dd"),
};
