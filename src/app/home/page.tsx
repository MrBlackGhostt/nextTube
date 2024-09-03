'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'
import { GetSearchData } from '../api/auth/youtubeapi';


const Homepage: React.FC = () => {
  const [searchData, setSearchData] = useState<Video[]>([]);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data= await GetSearchData(searchTerm);
        setSearchData(data|| []);
      } catch (error) {
        console.error('Error fetching the search data:', error);
        setSearchData([]); 
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="p-4 border-2 border-green-400">  
      {/* Video Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {searchData.map((video) => (
          <Link href={`${video.id.videoId}/?id=${video.id.videoId}`}
          key={video.id.videoId}
          >
          <div
            key={video.id.videoId}
           
            className="relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-80 h-48"
          >
            {/* Thumbnail */}
            <Image
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              fill
              className="w-full h-auto rounded-lg"
              
            />

            {/* Video Info */}
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate">{video.snippet.title}</h3>
              <p className="text-gray-600 text-xs">{video.snippet.channelTitle}</p>
              <p className="text-gray-600 text-xs">
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Homepage;

