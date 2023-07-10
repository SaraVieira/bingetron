import Link from "next/link";


export function EpisodeOther({show, season, episode}) {
  return (
    <Link href={`/show/${show.id}/${season}/${episode}#e-${episode}`} className=" w-[90%] max-w-lg flex items-center justify-center">
    <div id={`e-${episode}`}className=" mb-2 h-[60px] grow bg-card relative px-8">
        <div className=" bg-blue absolute left-0 rounded-full h-4 w-4 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
        <div className=" bg-blue w-4 absolute left-full rounded-full h-4 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>

        <div className="text-yellow flex justify-between items-center h-full">

            <span className="font-bold">S{season}E{episode}</span>
            <span>{show.name}</span>
        </div>
    </div></Link>
  );
}

