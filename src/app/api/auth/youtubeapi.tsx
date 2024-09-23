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

export async function GetSubscriptionData(
  accessToken: string | undefined
): Promise<YouTubeSubscriptionListResponse | undefined> {
  if (!accessToken) {
    throw new Error("Access token is missing");
  }

  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet,contentDetails&maxResults=25&mine=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Ensure the token is valid and not expired
        },
      }
    );
    return response.data.items; // Return the items directly
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Axios error occurred while fetching subscription data:",
        error.response?.data || error.message
      );
    } else {
      console.log("Unexpected error occurred:", error);
    }
    throw new Error("Failed to fetch subscription data.");
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
  

  export async function GetSearchData(searchTerm: string, videoId?: string): Promise<Video[] | null> {
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
  

