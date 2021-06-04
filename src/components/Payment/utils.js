export const nextDaydelivery = () => {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  return date.toLocaleString();
};

export const scrolltoTop = () => {
  return new Promise((resolve) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    resolve();
  });
};
