interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  interface Snippet {
    title: string;
    description: string;
    customUrl: string;
    publishedAt: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
    country: string;
  }
  
  interface Statistics {
    viewCount: string;
    subscriberCount: string;
    hiddenSubscriberCount: boolean;
    videoCount: string;
  }
  
  interface Channel {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
    contentDetails: {
      relatedPlaylists: {
        uploads: string;
      };
    };
    statistics: Statistics;
  }
  
  interface Video {
    id: {
      videoId: string;
    };
    snippet: {
      thumbnails: {
        medium: { url: string };
      };
      title: string;
      channelTitle: string;
      publishedAt: string;
    };
  }

  interface YouTubeApiResponse {
    kind: string;
    etag: string;
    items: YouTubeVideoItem[];
    pageInfo: PageInfo;
  }
  

  interface YouTubeResponse {
    items: Channel[];
  }
  
  interface YouTubeVideo {
    kind: string;
    etag: string;
    items: YouTubeVideoItem[];
    pageInfo: PageInfo;
  }
  
  interface YouTubeVideoItem {
    kind: string;
    etag: string;
    id: string;
    snippet: Snippet;
    contentDetails: ContentDetails;
    statistics: Statistics;
  }
  
  interface Snippet {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: Thumbnails;
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage: string;
    localized: Localized;
    defaultAudioLanguage: string;
  }
  
  

  
  interface Localized {
    title: string;
    description: string;
  }
  
  interface ContentDetails {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    contentRating: Record<string, unknown>;
    projection: string;
  }
  
  interface Statistics {
    viewCount: string;
    likeCount: string;
    favoriteCount: string;
    commentCount: string;
  }
  
  interface PageInfo {
    totalResults: number;
    resultsPerPage: number;
  }
  