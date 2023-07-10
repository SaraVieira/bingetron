import axios from "axios";

const imgUrl = "https://image.tmdb.org/t/p/original/";

export default async function handler(req, res) {
  const { season, episode, id } = req.query;
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

  const e = (
    await axios.get(
      `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode}?language=en-US`,
      opts
    )
  ).data;

  res.json({
    episode: {
      ...e,
      still_path: imgUrl + e.still_path,
    },
    show: {
      ...show,
      backdrop_path: imgUrl + show.backdrop_path,
      poster_path: imgUrl + show.poster_path,
    },
  });
}
