export const dateConvertor = (isoString: string): string => {
  const date = new Date(isoString);
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });

  const getDaySuffix = (d: number): string => {
    if (d >= 11 && d <= 13) return "th";
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const dayWithSuffix = `${day}${getDaySuffix(day)}`;
  return `${dayWithSuffix} ${month} ${year}`;
};
