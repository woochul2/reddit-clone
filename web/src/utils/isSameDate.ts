export const isSameDate = (date: string) => {
  const localDate = new Date(parseInt(date)).toString();
  const now = new Date().toString();
  return now.slice(0, 15) === localDate.slice(0, 15);
};
