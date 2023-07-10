import axios from "axios";

const imgUrl = "https://image.tmdb.org/t/p/original/";
const randomIntFromInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export default async function handler(req, res) {
  const { id } = req.query;
  const opts = {
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_KEY}`,
    },
  };

  const show = (
    await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`,
      opts
    )
  ).data;
  const seasons = show.seasons.filter((s) => s.air_date);
  const randomSeason = randomIntFromInterval(0, seasons.length - 1);

  const episode = (
    await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${randomSeason}/episode/${randomIntFromInterval(
        1,
        seasons[randomSeason].episode_count
      )}?language=en-US`,
      opts
    )
  ).data;
  res.status(200).json({
    episode: {
      ...episode,
      still_path: imgUrl + episode.still_path,
    },
    show: {
      ...show,
      backdrop_path: imgUrl + show.backdrop_path,
      poster_path: imgUrl + show.poster_path,
    },
  });
}
