'use server'
import axios from "axios"



const fetcher = (url: string) => axios.get(url).then(res => res.data)

export async function GetChannnelData():Promise<YouTubeResponse | undefined>{
   
        try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=${process.env.NEXT_APP_API_KEY}`)
            return response.data
        } catch (error) {
            console.log(error)
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

export async function GetVideoById(id: string): Promise<YouTubeApiResponse | null> {
    try {
      const apiUrl =`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${process.env.NEXT_PUBLIC_API_KEY}`
      const response = await axios.get(apiUrl);
    
      return response.data;
    } catch (error) {
      console.error('Error fetching video data:', error);
      throw error; 
    }
  }
  

  export async function GetSearchData(searchTerm: string, videoId?: string): Promise<YouTubeSearchResponse | null> {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY; // Ensure you have the correct API key setup
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
  

