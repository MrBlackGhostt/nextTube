'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { GetSearchData } from '../api/auth/youtubeapi';
import { useSession } from 'next-auth/react';
import { RelatedVideos, SearchYoutubeData, VideoDetails } from '../store/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

function timeago(publishedAt: string | number | Date): string {
  const publishedDate = new Date(publishedAt);
  const currentDate = new Date();
  const differenceInSeconds = Math.floor((currentDate.getTime() - publishedDate.getTime()) / 1000);

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(differenceInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

const Homepage: React.FC = () => {
  const [searchData, setSearchData] = useRecoilState<Video[]>(SearchYoutubeData);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || null;
  
  const videoDetails = useRecoilValue(VideoDetails);
  const setVideoData = useSetRecoilState(VideoDetails);
  const setRelatedVideos = useSetRecoilState(RelatedVideos)




useEffect(()=>{
 

    (async () => {
      try {
        const youtubeSearchData =  searchTerm ? await GetSearchData(searchTerm) : null;
        if (youtubeSearchData && youtubeSearchData.items && youtubeSearchData.items.length > 0) {
        setSearchData(prev => youtubeSearchData ? [...youtubeSearchData?.items , ...(prev || [])]  : []);
        }
      } catch (err) {
        console.error('Error fetching search data', err);
        setError('Failed to load search data');
      }
  console.log('UPDATE SEARCH DATA', searchData)
    })();
  
console.log('New Seach Data', searchData)
},[searchTerm])

if (error) return <h1>{error}</h1>;
  if (searchData.length === 0) return <h1>Search Anything</h1>;

  return (
    <div className="p-4 w-full">  
    {/* Video Grid */}
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 xl:grid-cols-4 justify-center">
      { searchData.map((video, index) => (
 <Link
 href={`${video.id.videoId}/?id=${video.id.videoId}`}
 onClick={() => {
   setVideoData({
    snippet: {
      title: video.snippet.title || '',
      description: video.snippet.description || '',
      publishTime: video.snippet.publishTime || '',
      publishAt: video.snippet.publishAt || '',
      channelTitle: video.snippet.channelTitle || '',
      publishedAt: video.snippet.publishedAt || '',
    },
    statistics: {
      viewCount: video.statistics.viewCount || '',
      likeCount: video.statistics.likeCount || '',
      commentCount: video.statistics.commentCount || '',
    },
   });
   setRelatedVideos(searchData)
   setTimeout(() => {
    console.log('Current VideoDetails:', videoDetails); // Ensure that the atom is updated
  }, 100);
 }}
 key={index}
 className="w-full overflow-hidden rounded-lg"
>
          <div className="flex flex-col gap-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[full] h-60 md:h-72">
            {/* Thumbnail */}
            <div className='relative w-full h-full'>
              {video.snippet.thumbnails?.medium?.url && (
                <Image
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  fill
                  sizes='h-full'
                  className="rounded-lg"
                />
              )}
            </div>

            {/* Video Info */}
            <div className="">
              <h3 className="font-semibold text-md truncate">{video.snippet.title}</h3>
              <div className='flex justify-between text-[14px]'>
                <p className="">{video.snippet.channelTitle}</p>
                <p className="">
                  {timeago(video.snippet.publishedAt)}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  );
};

export default Homepage;
