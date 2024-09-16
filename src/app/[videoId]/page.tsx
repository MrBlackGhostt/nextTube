'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { GetSearchData, GetVideoById } from '../api/auth/youtubeapi';
import Image from 'next/image';
import Link from 'next/link';

const Page = () => {
  const params = useSearchParams();
  const [videoId, setVideoId] = useState<string>('');
  const [videoDetails, setVideoDetails] = useState<VideoDetail | null>(null);
  const [showdescription, setShowdescription] = useState(false);
  const [relatedData, setRelatedData] = useState<Video[]>([]);
  const userSession = useSession();
  const access_token = userSession.data?.accessToken;
  console.log('access token', access_token);
  const id = params.get('id');

  useEffect(() => {
    if (params) {
      if (id) {
        fetchVideoDetails(id);
        getWatchRelatedVideo(videoDetails?.snippet.categoryId);
      }
    }
  }, [params,videoDetails?.snippet.categoryId]);

  const fetchVideoDetails = async (id: string) => {
    const data = await GetVideoById(id);
    setVideoDetails(data ? data?.items[0] : null);
  };

  const getWatchRelatedVideo = async (categoryId: string | undefined) => {
  
    const data = await GetSearchData(
      videoDetails?.snippet.title ? videoDetails?.snippet.title : '',
      categoryId
    );
    console.log('REALEATED DATA', data);
    setRelatedData(data || []);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-4 pr-10 ">
      <div className="w-full lg:w-[75%]">
        {id ? (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
              allowFullScreen
              title={videoDetails?.snippet?.title || 'Embedded YouTube Video'}
              className="w-full h-full rounded-3xl"
            ></iframe>
          </div>
        ) : (
          <div className="flex items-center justify-center aspect-video bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"></div>
        )}
        {videoDetails ? (
          <div className="bg-gray-300 dark:bg-gray-800 dark:text-gray-100 p-4 mt-4 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold">
              {videoDetails.snippet.title}
            </h2>
            <div>Posted by- {videoDetails.snippet.channelTitle}</div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm mb-4">
              <p>
                {new Date(
                  videoDetails.snippet.publishedAt
                ).toLocaleDateString()}
              </p>
              <div className="flex space-x-4">
                <p>
                  <strong>Views:</strong>{' '}
                  {parseInt(videoDetails.statistics.viewCount).toLocaleString()}
                </p>
                <p>
                  <strong>Likes:</strong>{' '}
                  {parseInt(videoDetails.statistics.likeCount).toLocaleString()}
                </p>
                <p>
                  <strong>Comments:</strong>{' '}
                  {parseInt(
                    videoDetails.statistics.commentCount
                  ).toLocaleString()}
                </p>
              </div>
            </div>
            {showdescription ? (
              <p className="mt-2 max-w-[1280px]">
                {videoDetails.snippet.description}
              </p>
            ) : (
              ''
            )}
            {videoDetails.snippet.description && (
              <button onClick={() => setShowdescription(!showdescription)}>
                {showdescription ? 'Hide' : 'See'} description
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center mt-6 aspect-16/2 justify-center bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700"></div>
        )}
      </div>

      <div className="lg:pl-10 pt-6 lg:pt-0 h-screen w-1/4 overflow-hidden overflow-y-auto">
        <div className="mt-4 space-y-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  gap-4">
            {relatedData.map((video) => (
              <div
                key={video.id.videoId}
                className="flex justify-between gap-4 w-5/6 items-start"
              >
                <div className="relative w-14 h-24 aspect-16/2 ">
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    fill
                    className=" rounded-lg object-cover   w-full h-full"
                  />
                </div>
                <div className="flex flex-col">
                  <a
                    href={`${video.id.videoId}/?id=${video.id.videoId}`}
                    target="_blank"
                    className="text-sm font-bold text-gray-900 dark:text-white hover:underline"
                  >
                    {video.snippet.title}
                  </a>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {video.snippet.channelTitle}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </p>
                 
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
