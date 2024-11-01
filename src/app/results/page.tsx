'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { RelatedVideos, SearchYoutubeData, VideoDetails, WatchHistory } from '../store/atoms'
import { useSearchParams } from 'next/navigation'
import { GetSearchData } from '../api/auth/youtubeapi'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { IoGrid } from 'react-icons/io5'
import { GoRows } from 'react-icons/go'

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

type ThumbnailSize = 'default' | 'medium' | 'high';

const Page = () => {
  const [thumbnailsSize, setThumbnailsSize] = useState<ThumbnailSize>('medium');
  const [searchData, setSearchData] = useRecoilState<Video[]>(SearchYoutubeData);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || null;

  const setVideoData = useSetRecoilState(VideoDetails);
  const setRelatedVideos = useSetRecoilState(RelatedVideos);
  const setWatchHistory = useSetRecoilState(WatchHistory);
  const WatchVideoHistory = useRecoilValue(WatchHistory);

  useEffect(() => {
    (async () => {
      try {
        const youtubeSearchData = searchTerm
          ? await GetSearchData(searchTerm)
          : null;
        if (
          youtubeSearchData &&
          youtubeSearchData.items &&
          youtubeSearchData.items.length > 0
        ) {
          setSearchData((prev) =>
            youtubeSearchData
              ? [...youtubeSearchData.items, ...(prev || [])]
              : []
          );
        }
      } catch (err) {
        console.error('Error fetching search data', err);
        setError('Failed to load search data');
      }
    })();
    
    const updateThumbnailQuality = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) {
        setThumbnailsSize('default');
      } else if (screenWidth < 1024) {
        setThumbnailsSize('medium');
      } else {
        setThumbnailsSize('high');
      }
    };

    updateThumbnailQuality(); // Initial setting based on current screen width
    window.addEventListener('resize', updateThumbnailQuality); // Listen for resize events

    return () => {
      window.removeEventListener('resize', updateThumbnailQuality); // Cleanup on unmount
    };
  }, [searchTerm]);

  return (
    <div className="flex flex-col items-center w-full px-2 sm:px-4">
      {/* Commented out the layout buttons
      <div className="hidden md:flex justify-start h-fit m-1">
        <Button 
          onClick={() => setLayout('column')}
          className="bg-gray-900 dark:bg-slate-400 rounded-none rounded-l-md"
        >
          <IoGrid />
        </Button>
        <Button 
          onClick={() => setLayout('row')}
          className="bg-gray-900 dark:bg-slate-400 rounded-none rounded-r-md"
        >
          <GoRows />
        </Button>
      </div>
      */}

      {/* Video layout flex container */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {searchData.map((video, index) => (
          <Link
            href={`${video.id.videoId}/?id=${video.id.videoId}`}
            onClick={() => {
              setVideoData({
                snippet: {
                  title: video.snippet.title || '',
                  description: video.snippet.description || '',
                },
              });
              setRelatedVideos((prev) => [...searchData, ...prev]);
              setWatchHistory((prev) => [video, ...prev]);
            }}
            key={index}
            className="flex flex-col  bg-white dark:bg-gray-800 rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg p-4"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-40 sm:h-48 lg:h-56">
              <Image
                src={video.snippet.thumbnails?.[thumbnailsSize]?.url}
                alt={video.snippet.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="rounded-lg object-cover" 
              />
            </div>

            {/* Video Info */}
            <div className="flex flex-col mt-2">
              <h3 className="font-semibold text-sm md:text-md lg:text-lg truncate">
                {video.snippet.title}
              </h3>
              <div className="flex justify-start gap-2 font-light text-xs text-gray-600 dark:text-gray-300">
                <p className="truncate">{video.snippet.channelTitle}</p>
                <span>•</span>
                <p>{timeago(video.snippet.publishedAt)}</p>
              </div>
              <p className="hidden md:block text-xs font-light mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
                {video.snippet.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page;
