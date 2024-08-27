import React from 'react';

const videos = [
  {
    id: 1,
    thumbnail: 'https://via.placeholder.com/300x170', // Replace with actual image URL
    title: 'Sample Video Title 1',
    channel: 'Channel Name 1',
    views: '1M views',
    uploaded: '1 day ago'
  },
  {
    id: 2,
    thumbnail: 'https://via.placeholder.com/300x170', // Replace with actual image URL
    title: 'Sample Video Title 2',
    channel: 'Channel Name 2',
    views: '500K views',
    uploaded: '2 days ago'
  },
  // Add more video objects as needed
];

const Homepage = () => {
  return (
    <div className="p-4 border-2 border-green-400">
      {/* Video Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            {/* Thumbnail */}
            <img src={video.thumbnail} alt={video.title} className="w-full h-auto rounded-t-lg" />

            {/* Video Info */}
            <div className="p-3">
              <h3 className="font-semibold text-sm truncate">{video.title}</h3>
              <p className="text-gray-600 text-xs">{video.channel}</p>
              <p className="text-gray-600 text-xs">{video.views} • {video.uploaded}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
