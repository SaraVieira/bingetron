import axios from "axios";



export default async function handler(req, res) {
  const { query } = req.query;
  const data = (await axios.get( `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=true&language=en-US&page=1`, {
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${process.env.API_KEY}`,
    },
  })).data.results;


  res.status(200).json(data.sort((a,b) => b.popularity - a.popularity).map(t => ({name: t.name, id: t.id, year: new Date(t.first_air_date).getFullYear()})).slice(0, 5));
}
