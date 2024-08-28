'use client'
import React, { useEffect, useState } from 'react';
import { fetchYouTubeData } from '../component/youtubedata';


interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

const HomePage: React.FC = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await fetchYouTubeData(
        //     'search', {
        //   part: 'snippet',
        //   q: 'Next.js tutorial',
        //   type: 'video',
        //   maxResults: 5,
        // }
    );
        console.log('DATA', data)
        setVideos(data.items);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
       
    };

    fetchVideos();
  }, []);

  return (
    <div>
      <h1>Next.js YouTube Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <h3>{video.snippet.title}</h3>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
