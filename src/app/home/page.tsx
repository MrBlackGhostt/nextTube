'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { GetSearchData } from '../api/auth/youtubeapi';
import {
  RelatedVideos,
  SearchYoutubeData,
  VideoDetails,
  WatchHistory,
} from '../store/atoms';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

function timeago(publishedAt: string | number | Date): string {
  const publishedDate = new Date(publishedAt);
  const currentDate = new Date();
  const differenceInSeconds = Math.floor(
    (currentDate.getTime() - publishedDate.getTime()) / 1000
  );

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
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
  const [searchData, setSearchData] =
    useRecoilState<Video[]>(SearchYoutubeData);


    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center transition-transform duration-500 ease-in-out transform hover:scale-105">
          Search What You Want to Search
        </h1>
        {/* <div className='grid'>

        {searchData && searchData.map((video,index)=>{
          return  <div className="relative w-full h-full">
            <h1>{video.snippet.title}</h1>
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
        })}
        </div> */}
      </div>
    );
};

export default Homepage;
