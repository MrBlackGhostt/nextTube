import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function PlaylistCard({ data }: { data: { [key: string]: any } }) {
  return (
    <Link
      href={'/'}
      className="group flex flex-col gap-3 overflow-hidden"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
        <Image
          src={data.snippet.thumbnails.medium.url}
          alt={data.snippet.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover overlay with play button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/0 opacity-0 transition-all duration-300 group-hover:bg-foreground/40 group-hover:opacity-100">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-background/90 text-foreground backdrop-blur-sm">
            <Play className="h-5 w-5" />
          </div>
        </div>
        {/* Bottom gradient overlay - always visible */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/60 to-transparent p-3 pt-8">
          <span className="text-xs font-medium text-background">
            {data.contentDetails?.itemCount || 0} videos
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-1">
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
          {data.snippet.title}
        </h3>
        <p className="text-xs text-muted-foreground">
          {data.snippet.channelTitle}
        </p>
      </div>
    </Link>
  );
}

export default PlaylistCard;
