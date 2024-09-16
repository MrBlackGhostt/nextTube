import { Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function PlaylistCard({data}: {data: {[key: string]:any}}) {
  return (
    
    <Link href={"/"} className='relative aspect-video rounded-xl text-white group'>
        <Image
            src={data.snippet.thumbnails.medium.url}
            alt={data.snippet.title}
            fill
            sizes='100%'
            className=" rounded-xl"
        />
        <div className='absolute bottom-0 w-full h-12 group-hover:h-full transition-all bg-black rounded-b-lg bg-opacity-80 pl-2'>
            <div className='font-semibold'>{data.snippet.title}</div>
            <div className='text-sm'>{data.snippet.channelTitle}</div>
            <div className='hidden group-hover:flex flex-col items-center justify-center absolute left-[45%] bottom-[40%]' >
                <Play/>
                <div>Play</div>
            </div>
        </div>
    </Link>
  )
}

export default PlaylistCard