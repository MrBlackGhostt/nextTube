import axios from "axios"

export async function GetChannnelData():Promise<YouTubeResponse | undefined>{
   
        try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=${process.env.NEXT_APP_API_KEY}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    
}

export async function GetVideoById(): Promise<YouTubeApiResponse | null> {
    try {
      const response = await axios.get<YouTubeApiResponse>(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${process.env.NEXT_APP_API_KEY}`
      );
    
      return response.data;
    } catch (error) {
      console.error('Error fetching video data:', error);
      throw error; 
    }
  }
  

export async function GetSearchData(searchTerm: string):Promise<Video[] | null >{
try {
  const apiKey =process.env.NEXT_PUBLIC_API_KEY; // Replace with your actual API key
  const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(
    searchTerm
  )}&type=video&key=${apiKey}`;
  const response = await axios.get(apiUrl)
  return response.data.items
} catch (error) {
  console.log('Error in Getting the Search Data:', error)
  throw error
}
}