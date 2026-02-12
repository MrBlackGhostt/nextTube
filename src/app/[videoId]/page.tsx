'use client';

import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { RelatedVideos, VideoDetails, WatchHistory } from '../store/atoms';
import Link from 'next/link';
import { ChevronDown, ChevronUp } from 'lucide-react';

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
  const params = useSearchParams();
  const videoDetails = useRecoilValue(VideoDetails);
  const [showDescription, setShowDescription] = useState(false);
  const relatedData = useRecoilValue(RelatedVideos);
  const watchHistoryData = useRecoilValue(WatchHistory);
  const setWatchHistory = useSetRecoilState(WatchHistory);
  const setVideoDetails = useSetRecoilState(VideoDetails);

  const id = params.get('id');

  return (
    <div className="flex flex-col gap-6 p-4 lg:flex-row lg:p-6">
      {/* Main video section */}
      <div className="flex flex-1 flex-col gap-4">
        {/* Video Player */}
        {id ? (
          <div className="aspect-video w-full overflow-hidden rounded-2xl bg-muted">
            <iframe
              src={`https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1&rel=0`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              title={videoDetails?.snippet.title || 'Embedded YouTube Video'}
              className="h-full w-full"
            />
          </div>
        ) : (
          <div className="flex aspect-video w-full items-center justify-center rounded-2xl bg-muted animate-pulse-subtle" />
        )}

        {/* Video Details */}
        {videoDetails?.snippet.title ? (
          <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 md:p-5">
            <h1 className="text-lg font-semibold leading-snug text-card-foreground md:text-xl">
              {videoDetails.snippet.title}
            </h1>
            {videoDetails.snippet.description && (
              <>
                {showDescription && (
                  <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                    {videoDetails.snippet.description}
                  </p>
                )}
                <button
                  onClick={() => setShowDescription(!showDescription)}
                  className="flex items-center gap-1 self-start text-sm font-medium text-primary transition-colors hover:text-primary/80"
                >
                  {showDescription ? (
                    <>
                      Hide description <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Show description <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="h-24 animate-pulse-subtle rounded-xl bg-muted" />
        )}
      </div>

      {/* Related Videos Sidebar */}
      <div className="flex w-full flex-col gap-3 lg:w-80 xl:w-96">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Related Videos
        </h2>
        <div className="flex flex-col gap-3">
          {relatedData.map((video, index) => (
            <Link
              href={`${video.id.videoId}/?id=${video.id.videoId}`}
              key={video.id.videoId}
              onClick={() => {
                setVideoDetails({
                  snippet: {
                    title: video.snippet.title || '',
                    description: video.snippet.description || '',
                  },
                });
                setWatchHistory((prev) => [video, ...prev]);
                const videoString = JSON.stringify(watchHistoryData);
                localStorage.setItem('watch-history', videoString);
              }}
              className="group flex gap-3 rounded-lg p-1.5 transition-colors hover:bg-secondary"
            >
              <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg bg-muted">
                <Image
                  src={video.snippet.thumbnails.high.url}
                  alt={video.snippet.title}
                  fill
                  priority={index < 4}
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-1 py-0.5">
                <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground group-hover:text-primary">
                  {video.snippet.title}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {video.snippet.channelTitle}
                </p>
                <p className="text-xs text-muted-foreground">
                  {timeago(video.snippet.publishedAt)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
