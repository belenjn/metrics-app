export const scrollToHeight = (proportion) => {
  const screenHeight = window.innerHeight;
  const scrollAmount = screenHeight * proportion;
  window.scrollBy(0, scrollAmount);
};
