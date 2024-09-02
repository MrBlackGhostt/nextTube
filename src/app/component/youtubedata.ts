import axios from 'axios';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

interface YouTubeSearchParams {
  part: string;
  q: string;
  type: string;
  maxResults?: number;
}

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

interface YouTubeResponse {
  items: YouTubeVideo[];
}

export const fetchYouTubeData = async (

): Promise<YouTubeResponse> => {
    try {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${API_KEY}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data || error.message);
        } else {
            console.error('Error fetching YouTube data:', error);
        }
        throw error;
    }
    
};
