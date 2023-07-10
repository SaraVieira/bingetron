import { EpisodeCurrent } from "@/components/episode-current";
import { EpisodeOther } from "@/components/episode-other";
import { getProtocol } from "@/utils/url";
import axios from "axios";
import { useRouter } from "next/router";

export default function Episode({ show, episode }) {
  const router = useRouter();
  const currentSeason =
    show.seasons.find((s) => s.season_number == router.query.season)
      .episode_count - 1;

  return (
    <main
      className={`bg-blue min-h-screen  py-5 flex flex-col items-center max-w-full overflow-auto`}
    >
      {Array.from(Array(currentSeason).keys()).map((i) =>
        i + 1 == router.query.episode ? (
            <EpisodeCurrent
            key={i}
            season={router.query.season}
            episode={i + 1}
            show={show}
            info={episode}
          />
        ) : (
          <EpisodeOther
            key={i}
            season={router.query.season}
            episode={i + 1}
            show={show}
          />
        )
      )}
    </main>
  );
}

export async function getServerSideProps({ params, req }) {
  const absoluteUrl = `${getProtocol()}${req.headers.host}`;
  const data = await axios.get(
    `${absoluteUrl}/api/${params.id}/${params.season}/${params.episode}`
  );
  return {
    props: data.data,
  };
}
