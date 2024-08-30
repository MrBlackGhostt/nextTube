
import axios from 'axios';
import { useEffect, useState } from 'react';
import { GetChannnelData } from '../api/auth/youtubeapi';

export default async function YouTubeAuth() {

  const data = await GetChannnelData()
  console.log('DATA', data)
  // const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(
  //         'https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=AIzaSyCLMTXPB5IJJWnyiAqjABdZ2qMvFUU5fDY'
  //       );
  //       setData(response.data.items);
  //       console.log(response.data.items);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>YouTube Channel Data</h1>
      {data && data.items.map((channel) => (
        <div key={channel.id}>
          <h2>{channel.snippet.title}</h2>
          <p>{channel.snippet.description}</p>
          <p>Subscribers: {channel.statistics.subscriberCount}</p>
          <p>Views: {channel.statistics.viewCount}</p>
          <p>Videos: {channel.statistics.videoCount}</p>
          <p>Country: {channel.snippet.country}</p>
          <img
            src={channel.snippet.thumbnails.default.url}
            alt={channel.snippet.title}
          />
        </div>
      ))}
 
    </div>
  );
}
