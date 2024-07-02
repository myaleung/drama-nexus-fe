import genres from '../assets/data/genres.json' with { type: "json" };

// const parsedGenres = JSON.parse(genres);

export const getGenres = (genreIds) => {
  const genreList = genres.genres;
  const genreNames = genreList.filter((genre) => genreIds?.includes(genre.id));
  return genreNames.map((genre) => genre.name);
}