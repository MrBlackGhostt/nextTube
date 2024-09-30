import { selector } from "recoil";
import { SearchYoutubeData } from "./atoms";

export const RecommendVideos = selector({
    key:'recommendVideo',
    get:({get}) => {
        const VideoData = get(SearchYoutubeData)
        return VideoData
    }
})