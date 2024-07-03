export const shuffleArray = (dramaList) => {
  for (let i = dramaList.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dramaList[i], dramaList[j]] = [dramaList[j], dramaList[i]];
  }
  return dramaList;
};