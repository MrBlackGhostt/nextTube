import React from 'react'
import PlaylistCard from './PlaylistCard'
function PlaylistSection({playlistData}: {playlistData: {}[]}) {
    
  return (
    <div className='w-full h-full grid grid-cols-5 gap-6 pt-5'>
        {playlistData.map((element:any) => (
            <PlaylistCard key={element.id} data={element}/>
        ))}
    </div>
  )
}

export default PlaylistSection