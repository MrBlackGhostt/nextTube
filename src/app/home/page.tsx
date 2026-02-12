'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { GetSearchData } from '../api/auth/youtubeapi';
import { SearchYoutubeData } from '../store/atoms';
import { useRecoilState } from 'recoil';
import VideoCard, { VideoCardSkeleton } from '../component/VideoCard';
import { Search } from 'lucide-react';

const Homepage: React.FC = () => {
  const [searchData, setSearchData] = useRecoilState<Video[]>(SearchYoutubeData);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || null;

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const youtubeSearchData = searchTerm
          ? await GetSearchData(searchTerm)
          : null;
        if (
          youtubeSearchData &&
          youtubeSearchData.items &&
          youtubeSearchData.items.length > 0
        ) {
          setSearchData((prev) =>
            youtubeSearchData?.items.length
              ? [...youtubeSearchData.items, ...(prev || [])]
              : []
          );
        }
      } catch (err) {
        console.error('Error fetching search data', err);
        setError('Failed to load search data');
      } finally {
        setLoading(false);
      }
    })();
  }, [searchTerm]);

  if (error) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8">
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-4 text-sm text-destructive">
          {error}
        </div>
      </div>
    );
  }

  if (!loading && searchData.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Discover your next favorite video
          </h1>
          <p className="max-w-md text-pretty text-sm text-muted-foreground">
            Use the search bar above to find videos. Results will appear here in
            a beautiful grid layout.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      {searchTerm && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-foreground">
            Results for{' '}
            <span className="text-primary">{`"${searchTerm}"`}</span>
          </h2>
        </div>
      )}
      {/* Video Grid */}
      <div className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading && searchData.length === 0 && Array.from({ length: 8 }).map((_, i) => (
          <VideoCardSkeleton key={i} />
        ))}
        {searchData.map((video, index) => (
          <VideoCard
            key={index}
            video={video}
            saveToHistory
            priority={index < 8}
          />
        ))}
      </div>
    </div>
  );
};

export default Homepage;