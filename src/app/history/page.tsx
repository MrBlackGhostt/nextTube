'use client';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { VideoDetails, WatchHistory } from '../store/atoms';
import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const page = () => {
  const setWatchHistory = useSetRecoilState(WatchHistory);
  const setVideoData = useSetRecoilState(VideoDetails);
  const WatchHistorylocal = localStorage.getItem('watch-history');
  let filterTheWatchData : Video[] = []

  const watchdata = WatchHistorylocal ?  JSON.parse(WatchHistorylocal) : [];
   if(watchdata){

     filterTheWatchData = watchdata.filter(
       (value : Video, index : any, self : any) =>
         index ===
         self.findIndex(
           (t:Video) =>
             t.snippet.title === value.snippet.title &&
             t.id.videoId === value.id.videoId
         )
     );
     setWatchHistory(filterTheWatchData);
 }
  if (watchdata?.length === 0)
    return <div className="text-red-400 font-bold"> No History to see</div>;

  return (
    <div className="p-4 w-full">
      {/* Video Grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 xl:grid-cols-4 justify-center">
        {filterTheWatchData?.map((video, index) => (
          <Link
            href={`${video.id.videoId}/?id=${video.id.videoId}`}
            onClick={() => {
              setVideoData({
                snippet: {
                  title: video.snippet.title || '',
                  description: video.snippet.description || '',
                },
              });
            }}
            key={index}
            className="w-full overflow-hidden rounded-lg"
          >
            <div className="flex flex-col gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[full] h-60 md:h-72">
              {/* Thumbnail */}
              <div className="relative w-full h-full">
                {video.snippet.thumbnails?.medium?.url && (
                  <Image
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    fill
                    sizes="h-full"
                    className="rounded-lg"
                  />
                )}
              </div>

              {/* Video Info */}
              <div className="">
                <h3 className="font-semibold text-md truncate">
                  {video.snippet.title}
                </h3>
                <div className="flex justify-between text-[14px]">
                  <p className="">{video.snippet.channelTitle}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default page;
