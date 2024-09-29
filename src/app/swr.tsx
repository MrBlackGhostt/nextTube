// import { GetSearchData, GetVideoById } from "./api/auth/youtubeapi";


// // Fetcher for video details
// export const fetchVideoDetails = async (id: string | null) => {
//     const cacheKey = `videoDetails_${id}`;
//     const cachedData = localStorage.getItem(cacheKey);
  
//     // Return cached data if available
//     if (cachedData) {
//       return JSON.parse(cachedData);
//     }
  
//     // Fetch new data from the API
//     if (id) {
//       const data = await GetVideoById(id);
//       localStorage.setItem(cacheKey, JSON.stringify(data));
//       return data?.items[0];
//     }
  
//     return null;
//   };


//   // Fetcher for related videos
// export const fetchRelatedVideos = async (title: string | undefined, categoryId: string | undefined) => {
//     const cacheKey = `relatedVideos_${categoryId}`;
//     const cachedData = localStorage.getItem(cacheKey);
  
//     // Return cached data if available
//     if (cachedData) {
//       return JSON.parse(cachedData);
//     }
  
//     // Fetch new data from the API
//     if (title && categoryId) {
//       const data = await GetSearchData(title, categoryId);
//       localStorage.setItem(cacheKey, JSON.stringify(data));
//       return data;
//     }
  
//     return [];
//   };