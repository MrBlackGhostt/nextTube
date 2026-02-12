import React from 'react';
import { ListVideo } from 'lucide-react';

async function Playlist() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-secondary">
        <ListVideo className="h-8 w-8 text-muted-foreground" />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-xl font-semibold text-foreground">
          No playlists found
        </h1>
        <p className="max-w-sm text-sm text-muted-foreground">
          Playlists feature is currently unavailable.
        </p>
      </div>
    </div>
  );
}

export default Playlist;
