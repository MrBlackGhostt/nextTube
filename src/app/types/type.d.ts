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
  
  interface YouTubeResponse {
    items: Channel[];
  }
  