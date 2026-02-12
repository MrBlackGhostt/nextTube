'use server'
import axios from "axios"

export interface YouTubeSearchParams {
  part: string;
  q: string;
  type: string;
  maxResults?: number;
}

export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
      medium: {
        url: string;
      };
      high: {
        url: string;
      };
    };
    channelTitle: string;
    publishedAt: string;
  };
}

export interface YouTubeResponse {
  items: YouTubeVideo[];
}

export const fetchYouTubeData = async (): Promise<YouTubeResponse> => {
    try {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US&key=${process.env.NEXT_PUBLIC_API_KEY}`);
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

export async function GetSearchData(searchTerm: string, videoId?: string): Promise<YouTubeResponse | null> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY; 
      const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(
        searchTerm
      )}&type=video${videoId ? `&videoCategoryId=${videoId}` : ''}&videoDuration=medium&key=${apiKey}`;
  
      const response = await axios.get(apiUrl);

      return response.data;
    } catch (error) {
      console.log('Error in Getting the Search Data:', error);
      throw error;
    }
}

export async function getPlayListData(token: any):Promise<YouTubeResponse | undefined | any>{
  
  try {
    
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/playlists?part=snippet,contentDetails&mine=true&maxResults=50`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    return response.data
  } catch (error) {
      return error;
  }

}
