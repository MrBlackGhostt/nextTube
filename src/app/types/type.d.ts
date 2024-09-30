
interface YouTubeSubscriptionListResponse {
  kind: string;
  etag: string;
  nextPageToken?: string;
  pageInfo: PageInfo;
  items: SubscriptionItem[]; 
}

interface SubscriptionItem {
  kind: string;
  etag: string;
  id: string;
  snippet: Snippet; 
  contentDetails: ContentDetails;
}

interface Thumbnail {
    url: string;
    width: number;
    height: number;
  }
  
  interface Snippet {
    publishedAt: string;
    title: string;
    description: string;
    resourceId: {
      kind: string;
      channelId: string;
    };
    channelId: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
    };
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

  interface YouTubeSearchResponse {
    kind: string;
    etag: string;
    nextPageToken: string;
    regionCode: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    };
    items: Video[];
}

  
  interface Video {
    statistics: any;
    id: {
      videoId: string;
    };
    snippet: {
      thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
      };
      title: string;
      description: string,
      publishTime: string,
      publishAt: string,
      channelTitle: string;
      publishedAt: string;

    };
    statistics: {
      viewCount: string;
      likeCount: string;
      commentCount: string;
    };
  }
  interface VideoDetail {
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      categoryId: string
      thumbnails: {
        default: Thumbnail;
        medium: Thumbnail;
        high: Thumbnail;
      };
      channelTitle: string;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      commentCount: string;
    };
  }

  interface YouTubeApiResponse {
    kind: string;
    etag: string;
    id:string
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
  