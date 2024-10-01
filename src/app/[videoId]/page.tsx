'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

import Image from 'next/image';

import { useRecoilValue } from 'recoil';
import { RelatedVideos, VideoDetails } from '../store/atoms';
import Link from 'next/link';

const Page = () => {
  const params = useSearchParams();
  const videoDetails = useRecoilValue(VideoDetails);
  const [showdescription, setShowdescription] = useState(false);
  const relatedData = useRecoilValue(RelatedVideos);

  const id = params.get('id');

  return (
    <div className="flex flex-col lg:flex-row gap-2 w-full h-screen  pr-10 ">
      <div className="w-full lg:w-[75%] ">
        {id ? (
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
              allowFullScreen
              title={videoDetails?.snippet.title || 'Embedded YouTube Video'}
              color='blue'
              className="w-full h-full rounded-3xl aspect-video"
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
            {/* <div>Posted by- {videoDetails.snippet.channelTitle}</div> */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm mb-4">
              {/* <p>
                {new Date(
                  videoDetails.snippet.publishedAt
                ).toLocaleDateString()}
              </p> */}
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
      {/* Related Videos */}
      <div className="pt-6 pl-1 lg:pt-0 h-full w-full lg:w-1/4 overflow-hidden overflow-y-auto">
        <div className="mt-4 ">
          <div className="grid justify-start grid-cols-1 sm:grid-cols-2 lg:grid-cols-1  gap-3  ">
            {relatedData.map((video) => (
              <Link
              href={`${video.id.videoId}/?id=${video.id.videoId}`}
                key={video.id.videoId}
                className="flex  gap-2 w-full h-32 lg:h-24   overflow-hidden items-start cursor-pointer"
              >
                <div className="relative w-1/2 h-32 lg:h-24 aspect-16/2 lg:aspect-video">
                  <Image
                    src={video.snippet.thumbnails.high.url}
                    alt={video.snippet.title}
                    fill
                    className=" rounded-lg object-cover"
                  />
                </div>
                <div className="flex flex-col h-20">
                  <p
                    className="text-sm font-light text-gray-900 dark:text-white hover:underline"
                  >
                    {video.snippet.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {video.snippet.channelTitle}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
