export const updateLocalWatchlist = async (dramaId) => {
  let userInfo = JSON.parse(localStorage.getItem("userProfile"));
  if (userInfo !== null) {
    let watchlist = userInfo.userProfile.watchlist;
    if (watchlist.includes(dramaId)) {
      watchlist = watchlist.filter((id) => id !== dramaId);
    } else {
      watchlist.push(dramaId);
    }
    userInfo.userProfile.watchlist = watchlist;
    localStorage.setItem("userProfile", JSON.stringify(userInfo));
  }
};