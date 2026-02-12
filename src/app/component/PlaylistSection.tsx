import React from 'react';
import PlaylistCard from './PlaylistCard';

function PlaylistSection({ playlistData }: { playlistData: {}[] }) {
  return (
    <div className="p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-foreground">Your Playlists</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {playlistData.length} playlist{playlistData.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {playlistData.map((element: any) => (
          <PlaylistCard key={element.id} data={element} />
        ))}
      </div>
    </div>
  );
}

export default PlaylistSection;
