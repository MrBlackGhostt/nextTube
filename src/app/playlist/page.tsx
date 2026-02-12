import React from 'react';
import { getPlayListData } from '../api/auth/youtubeapi';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import PlaylistSection from '../component/PlaylistSection';
import { ListVideo } from 'lucide-react';

async function Playlist() {
  let playlist;
  const session = await getServerSession(authOptions);

  if (session) {
    const res = await getPlayListData(session.accessToken);

    if (res.type !== 'error') {
      playlist = res.items;
    }
  }

  if (!playlist?.length) {
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
            {session
              ? 'You don\'t have any playlists yet. Create playlists on YouTube and they will appear here.'
              : 'Sign in with your Google account to see your YouTube playlists.'}
          </p>
        </div>
      </div>
    );
  }

  return <PlaylistSection playlistData={playlist} />;
}

export default Playlist;
