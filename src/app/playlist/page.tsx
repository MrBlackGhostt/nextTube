import React from 'react'
import { getPlayListData, GetSubscribtionData } from '../api/auth/youtubeapi'
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/authOptions';
import PlaylistSection from '../component/PlaylistSection';

async function Playlist() {
    let playlist;
    const session = await getServerSession(authOptions);
    
    if(session) {
        const res = await getPlayListData(session.accessToken);
        
        if(res.type !== 'error') {
            playlist = res.items;
        }
    }
    
  if (!playlist?.length) {
    return (
        <div>
            You don't have any playlist.
        </div>
    )
  };  
  return (
    <PlaylistSection playlistData ={playlist} />
  )
}

export default Playlist