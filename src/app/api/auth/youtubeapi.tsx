import axios from "axios"

export async function GetChannnelData():Promise<YouTubeResponse | undefined>{
   
        try {
            const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=UC_x5XG1OV2P6uZZ5FSM9Ttw&key=${process.env.NEXT_APP_API_KEY}`)
            return response.data
        } catch (error) {
            console.log(error)
        }
    
}