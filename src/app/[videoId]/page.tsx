'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
  const params = useSearchParams();
  const [videoId, setVideoId] = useState<string>('');
  const [videoDetails, setVideoDetails] = useState<any | null>(null);

  const [showdescription, setShowdescription] = useState(false)

  useEffect(() => {
    if (params) {
      const id = params.get('id');
      if (id) {
        setVideoId(id);
        fetchVideoDetails(id);
      }
    }
  }, [params]);

  const fetchVideoDetails = async (id: string) => {
    const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Replace with your actual YouTube Data API key
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.items && response.data.items.length > 0) {
        setVideoDetails(response.data.items[0]);
      }
    } catch (error) {
      console.error('Error fetching video details:', error);
    }
  };

  return (

    <div className="flex flex-col lg:flex-row w-full h-full p-4 pr-10">
      <div className="w-full lg:w-[75%]">
        {videoDetails ? <div className=" aspect-video">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
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
            {showdescription ?<p className="mt-2 max-w-[1280px]">{videoDetails.snippet.description}</p> : ""}
            <button onClick={() => setShowdescription(!showdescription)}>{showdescription ? "Hide" : "See"} description</button>
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
