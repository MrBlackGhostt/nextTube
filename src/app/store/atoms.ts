import { atom } from 'recoil';

export const SearchYoutubeData = atom<Video[]>({
  key: 'youtubeSearch',
  default: [],
});

export const RelatedVideos = atom<Video[]>({
  key: 'relatedVideo',
  default: [],
});

export const VideoDetails = atom({
  key: 'videoData',
  default: {
    snippet: {
      title: '',
      description: '',
    },
  },
});
