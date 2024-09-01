'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useSession } from 'next-auth/react';
import { GetSubscriptionData, GetVideoById } from '../api/auth/youtubeapi';

const Page = () => {
  const params = useSearchParams();
  const [videoId, setVideoId] = useState<string>('');
  const [videoDetails, setVideoDetails] = useState<VideoDetail | null>(null);
  const [showdescription, setShowdescription] = useState(false)
  const [channelId, setChannelId] = useState([])
  const userSession = useSession()
  const access_token = userSession.data?.accessToken
  const id = params.get('id');
  useEffect(() => {
    if (params) {
      if (id) {
    
        fetchVideoDetails(id);
        if(access_token) getSubscribeChannel(access_token)
      }
    }
  }, [params]);

  const fetchVideoDetails = async (id: string) => {
    const data = await GetVideoById(id)
    // console.log(Video data id)
    setVideoDetails(data ? data?.items[0] : null)
  };

  console.log('ACXCESS TOKEN', userSession.data?.accessToken)
const getSubscribeChannel = async (access_token: string)=>{
const data = await GetSubscriptionData(access_token)
console.log('GOT SUBSCRIBE DATA', data?.items)
}

  return (
    <div className="flex flex-col lg:flex-row w-full h-full p-4 pr-10 border-2 border-blue-500">
      <div className="w-full lg:w-[75%]">
        {id ? <div className=" aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
            allowFullScreen
            title={videoDetails?.snippet?.title || 'Embedded YouTube Video'}
            className="w-full h-full rounded-3xl"
          ></iframe>
        </div> : <div className="flex items-center justify-center aspect-video bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
        </div>}
        {videoDetails ? (
          <div className="bg-gray-300 dark:bg-gray-800 dark:text-gray-100 p-4 mt-4 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold">{videoDetails.snippet.title}</h2>
            <div>
              Posted by- {videoDetails.snippet.channelTitle}
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm mb-4">
              <p>{new Date(videoDetails.snippet.publishedAt).toLocaleDateString()}</p>
              <div className="flex space-x-4">
                <p><strong>Views:</strong> {parseInt(videoDetails.statistics.viewCount).toLocaleString()}</p>
                <p><strong>Likes:</strong> {parseInt(videoDetails.statistics.likeCount).toLocaleString()}</p>
                <p><strong>Comments:</strong> {parseInt(videoDetails.statistics.commentCount).toLocaleString()}</p>
              </div>
            </div>
            { showdescription ?<p className="mt-2 max-w-[1280px]">{videoDetails.snippet.description}</p> : ""}
           {videoDetails.snippet.description &&  <button onClick={() => setShowdescription(!showdescription)}>{showdescription ? "Hide" : "See"} description</button>}
          </div>
        ) : <div className="flex items-center mt-6 aspect-16/2 justify-center bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
        </div>
        }
      </div>
      <div className='lg:pl-10 pt-6 lg:pt-0'>
        <h2 className='text-4xl text-gray-900 dark:text-gray-100'>Recommendations</h2>
      </div>
    </div>
  );
};

export default Page;
