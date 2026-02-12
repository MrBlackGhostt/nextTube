'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
  VideoDetails,
  RelatedVideos,
  WatchHistory,
  SearchYoutubeData,
} from '../store/atoms';

function timeago(publishedAt: string | number | Date): string {
  const publishedDate = new Date(publishedAt);
  const currentDate = new Date();
  const differenceInSeconds = Math.floor(
    (currentDate.getTime() - publishedDate.getTime()) / 1000
  );

  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(differenceInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
}

export function VideoCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="aspect-video w-full animate-pulse-subtle rounded-xl bg-muted" />
      <div className="flex flex-col gap-2 px-1">
        <div className="h-4 w-3/4 animate-pulse-subtle rounded-md bg-muted" />
        <div className="flex items-center gap-2">
          <div className="h-3 w-1/3 animate-pulse-subtle rounded-md bg-muted" />
          <div className="h-3 w-1/4 animate-pulse-subtle rounded-md bg-muted" />
        </div>
      </div>
    </div>
  );
}

export default function VideoCard({
  video,
  saveToHistory = false,
  priority = false,
}: {
  video: Video;
  saveToHistory?: boolean;
  priority?: boolean;
}) {
  const setVideoData = useSetRecoilState(VideoDetails);
  const setRelatedVideos = useSetRecoilState(RelatedVideos);
  const setWatchHistory = useSetRecoilState(WatchHistory);
  const searchData = useRecoilValue(SearchYoutubeData);
  const watchHistoryData = useRecoilValue(WatchHistory);

  const handleClick = () => {
    setVideoData({
      snippet: {
        title: video.snippet.title || '',
        description: video.snippet.description || '',
      },
    });
    setRelatedVideos((prev) => [...searchData, ...prev]);

    if (saveToHistory) {
      setWatchHistory((prev) => [video, ...prev]);
      const videoString = JSON.stringify(watchHistoryData);
      localStorage.setItem('watch-history', videoString);
    }
  };

  return (
    <Link
      href={`${video.id.videoId}/?id=${video.id.videoId}`}
      onClick={handleClick}
      className="group flex w-full flex-col gap-3"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        {video.snippet.thumbnails?.medium?.url && (
          <Image
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.title}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
      </div>

      {/* Video Info */}
      <div className="flex flex-col gap-1 px-1">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
          {video.snippet.title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="truncate">{video.snippet.channelTitle}</span>
          <span className="shrink-0">{'·'}</span>
          <span className="shrink-0">
            {timeago(video.snippet.publishedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
