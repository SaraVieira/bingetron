

export function EpisodeCurrent({show, season, episode, info}) {
  return (
    <div id={`e-${episode}`}className="w-[90%] max-w-lg mb-2 min-h-[60px] grow bg-yellow relative p-8">
        <div className=" bg-blue absolute left-0 rounded-full h-4 w-4 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
        <div className=" bg-blue w-4 absolute left-full rounded-full h-4 -translate-x-1/2 top-1/2 -translate-y-1/2"></div>
<h3 className="text-2xl mb-0 font-bold">{info.name}</h3>
<p className="text-xl font-medium">{info.overview}</p>
        <div className="text-blue flex justify-between items-center h-full mt-5 pt-5 border-t border-blue border-dashed">

            <span className="font-bold">S{season}E{episode}</span>
            <span>{show.name}</span>
        </div>
    </div>
  );
}

