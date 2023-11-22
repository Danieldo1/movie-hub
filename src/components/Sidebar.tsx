'use client'

import { BASE_URL } from '@/utils/routes'
import axios from 'axios'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface Genres {
    id: string
    name: string
}

const Sidebar = () => {
    const [genres, setGenres] = useState([])
    const [selectedGenre, setSelectedGenre] = useState('')

    const param = useParams()
    const searchParams = useSearchParams()

    useEffect(() => {
        axios.get(`${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then(({data})=>{
            setGenres(data.genres)
        }).catch((err)=>{
            console.log(err)
        })   
    },[])

    useEffect(() => {
       if(searchParams.get('genre')){
        setSelectedGenre(searchParams.get('genre')?.toString() || '')
        return
       }

       setSelectedGenre(param.id.toString());
    },[param.id])

  return (
    <div className='bg-primary px-10 max-h-[calc(100vh-72px)] overflow-y-scroll pb-6 scrollbar-hide  w-2/3 hidden sm:block '>
        <div className="flex flex-col gap-4 pt-4">
            <p className='text-2xl font-bold text-[#ead61c]'> Discover</p>
        </div>
        <Link className='w-fit py-4' href='/discover/now_playing'>
                    <p className={`text-textColor py-2 mt-2 ml-4 cursor-pointer hover:text-white transition w-fit ${selectedGenre === 'now_playing' ? 'text-white' : '' }`}>
                        Now Playing
                    </p>
        </Link>

        <Link className='w-fit py-4' href='/discover/top_rated'>
                    <p className={`text-textColor py-2 ml-4 cursor-pointer hover:text-white transition w-fit ${selectedGenre === 'top_rated' ? 'text-white' : '' }`}>
                        Top Rated
                    </p>
        </Link>

        <Link className='w-fit py-4' href='/discover/popular'>
                    <p className={`text-textColor py-2 ml-4 cursor-pointer hover:text-white transition w-fit ${selectedGenre === 'popular' ? 'text-white' : '' }`}>
                        Popular
                    </p>
        </Link>

        <Link className='w-fit' href='/discover/upcoming'>
                    <p className={`text-textColor py-2 ml-4 cursor-pointer hover:text-white transition w-fit ${selectedGenre === 'upcoming' ? 'text-white' : '' }`}>
                        Upcoming
                    </p>
        </Link>

        <div className="flex flex-col gap-4 pt-4">
            <p className='text-2xl font-bold text-[#ead61c]'> Genres</p>
            {genres.map((item: Genres) => (
                <Link 
                href={`/genres/${item.id}?genre=${item.name.toLowerCase()}`} 
                key={item.id} 
                
                >
                    <p className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${item.name.toLowerCase() === selectedGenre ? 'text-white' : '' }`}>
                        {item.name}
                    </p>
                </Link>
            ))}
        </div>


    </div>
  )
}

export default Sidebar