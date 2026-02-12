'use client';

import { useSetRecoilState } from 'recoil';
import { VideoDetails, WatchHistory } from '../store/atoms';
import Image from 'next/image';
import Link from 'next/link';
import { History } from 'lucide-react';

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

const Page = () => {
  const setWatchHistory = useSetRecoilState(WatchHistory);
  const setVideoData = useSetRecoilState(VideoDetails);

  let filterTheWatchData: Video[] = [];

  if (typeof window !== 'undefined') {
    const WatchHistorylocal = localStorage.getItem('watch-history');
    const watchdata: Video[] = WatchHistorylocal
      ? JSON.parse(WatchHistorylocal)
      : [];

    if (watchdata) {
      filterTheWatchData = watchdata.filter(
        (value: Video, index: number, self: Video[]) =>
          index ===
          self.findIndex(
            (t: Video) =>
              t.snippet.title === value.snippet.title &&
              t.id.videoId === value.id.videoId
          )
      );
      setWatchHistory(filterTheWatchData);
    }
  }

  if (filterTheWatchData.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
          <History className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-xl font-semibold text-foreground">
            No watch history yet
          </h1>
          <p className="max-w-sm text-sm text-muted-foreground">
            Videos you watch will appear here. Start searching and watching to
            build your history.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Watch History</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filterTheWatchData.length} video
          {filterTheWatchData.length !== 1 ? 's' : ''} watched
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filterTheWatchData.map((video, index) => (
          <Link
            href={`${video.id.videoId}/?id=${video.id.videoId}`}
            onClick={() => {
              setVideoData({
                snippet: {
                  title: video.snippet.title || '',
                  description: video.snippet.description || '',
                },
              });
            }}
            key={index}
            className="group flex w-full flex-col gap-3"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
              {video.snippet.thumbnails?.medium?.url && (
                <Image
                  src={video.snippet.thumbnails.medium.url}
                  alt={video.snippet.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              )}
              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/5" />
            </div>
            <div className="flex flex-col gap-1 px-1">
              <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
                {video.snippet.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="truncate">{video.snippet.channelTitle}</span>
                {video.snippet.publishedAt && (
                  <>
                    <span className="shrink-0">{'·'}</span>
                    <span className="shrink-0">
                      {timeago(video.snippet.publishedAt)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Page;
