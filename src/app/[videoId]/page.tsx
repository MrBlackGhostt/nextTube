'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Page = () => {
  const params = useSearchParams();
  const [videoId, setVideoId] = useState<string>('');
  const [videoDetails, setVideoDetails] = useState<any | null>(null);

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
    <div className="flex flex-col items-center w-full bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; "
            allowFullScreen
            title={videoDetails?.snippet?.title || 'Embedded YouTube Video'}
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
          ></iframe>
        </div>
        {videoDetails && (
          <div className="bg-white p-4 mt-4 rounded-lg shadow-md">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{videoDetails.snippet.title}</h2>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-gray-600 text-sm mb-4">
              <p>{new Date(videoDetails.snippet.publishedAt).toLocaleDateString()}</p>
              <div className="flex space-x-4">
                <p><strong>Views:</strong> {parseInt(videoDetails.statistics.viewCount).toLocaleString()}</p>
                <p><strong>Likes:</strong> {parseInt(videoDetails.statistics.likeCount).toLocaleString()}</p>
                <p><strong>Comments:</strong> {parseInt(videoDetails.statistics.commentCount).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-gray-600 mt-2">{videoDetails.snippet.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
