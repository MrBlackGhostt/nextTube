import axios from "axios"


const getApiKey = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem("userApiKey") || process.env.NEXT_PUBLIC_API_KEY;
  }
  return process.env.NEXT_PUBLIC_API_KEY;
}


export async function GetChannnelData(): Promise<YouTubeResponse | undefined> {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      console.error('API Key is missing.');
      return undefined;
    }
    const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=${apiKey}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.status, error.response?.data);
    } else {
      console.error('Unknown Error:', error);
    }
  }
}


export async function GetSubscribtionData(access_token: string | undefined): Promise<YouTubeResponse | undefined> {
  const apiKey = getApiKey(); // Reuse utility
  if (!access_token) {
    console.error('No access token provided.');
    return undefined;
  }

  try {
    const response = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&maxResults=25&mine=true&key=${apiKey}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    return response.data.items;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error: Error fetching Subscription data:', error.response?.status, error.response?.data);
    } else {
      console.error('Unknown Error:', error);
    }
    return undefined;
  }
}


export async function GetVideoById(): Promise<YouTubeApiResponse | null> {
  const apiKey = getApiKey(); // Use utility function for cleaner code
  if (!apiKey) {
    console.error('API Key is missing.');
    return null;
  }

  try {
    const response = await axios.get<YouTubeApiResponse>(
      `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${apiKey}`
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error: Error fetching video data', error.response?.status, error.response?.data);
    } else {
      console.error('Unknown Error:', error);
    }

    return null;
  }
}




export async function GetSearchData(searchTerm: string): Promise<Video[] | null> {
  const apiKey = getApiKey();
  if (!apiKey) {
    console.error('API Key is missing.');
    return null;
  }

  try {
    const apiUrl = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${encodeURIComponent(searchTerm)}&type=video&key=${apiKey}`;
    const response = await axios.get(apiUrl);
    return response.data.items || null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error: Error in Searching the Data', error.response?.status, error.message, error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
}

  

