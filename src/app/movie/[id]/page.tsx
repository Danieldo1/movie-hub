'use client'

import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Loading from '@/components/Loading'
import {IoMdClose} from 'react-icons/io'
import {BsPlayFill} from 'react-icons/bs'
import dynamic from 'next/dynamic'
import { BASE_IMAGE_URL, BASE_URL } from '@/utils/routes'
import Genres from '@/components/Genres'


const ReactPlayer = dynamic(() => import('react-player/lazy'))

export interface Mov {
    adult: boolean
    backdrop_path: string
    belongs_to_collection: BelongsToCollection;
    budget: number
    genres: Genre[]
    homepage: string
    id: number
    imdb_id: string
    original_language: string
    original_title: string
    overview: string
    popularity: number
    poster_path: string
    production_companies: ProductionCompany[]
    production_countries: ProductionCountry[]
    release_date: string
    revenue: number
    runtime: number
    spoken_languages: SpokenLanguage[]
    status: string
    tagline: string
    title: string
    video: boolean
    vote_average: number
    vote_count: number
    videos: Videos

}

interface BelongsToCollection {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
}

interface Genre {
    id: number
    name: string
}

interface ProductionCompany {
    id: number
    logo_path: string
    name: string
    origin_country: string
}

interface ProductionCountry {
    iso_3166_1: string
    name: string
}

interface SpokenLanguage {
    english_name: string
    iso_639_1: string
    name: string
}

interface Videos {
    results: Result[]
}

export interface Result {
    iso_639_1: string
    iso_3166_1: string
    name: string
    key: string
    site: string
    size: number
    type: string
    official: boolean
    published_at: string
    id: string
    vote_average: number
}

const Movie = () => {

    const [movie, setMovie] = useState<Mov>()
    const [showPlayer, setShowPlayer] = useState(false)
    const [trailer, setTrailer] = useState('')

    const router = useRouter()
    const params = useParams()
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&append_to_response=videos`)
        .then(res => {
            setMovie(res.data)
        })
    },[params.id])

    useEffect(() => {
        const trailerIndex = movie?.videos?.results?.findIndex((element)=> element.type === 'Trailer')
        const trailerUrl = `https://www.youtube.com/watch?v=${
            movie?.videos?.results[trailerIndex!]?.key
        }`
        setTrailer(trailerUrl)
    },[movie])

    const startPlayer = () => {
        ref?.current?.scrollIntoView({ behavior: 'smooth' })
        setShowPlayer(true)
    }

  return (
    <main className='bg-secondary p-8 relative max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] overflow-y-scroll overflow-hidden scrollbar-hide  '
    ref={ref}
    >
    {movie === null && <Loading />}
    
    <div 
    className='text-textColor hover:text-white absolute right-0 top-0 m-2 cursor-pointer'
    onClick={()=>router.back()}
    >
        <IoMdClose size={20} />
    </div>

    <div className='flex justify-center pt-4 md:pt-0 '>
        <div className='grid md:grid-cols-[300px,1fr]  max-w-[1280px] gap-12 '>
            <div className='w-full flex justify-center relative'>
                <img 
                src={`${BASE_IMAGE_URL}${movie?.poster_path}`}
                alt={movie?.title}
                className='w-full h-full object-cover rounded-lg '
                />
            </div>

            <div className='space-y-6 md:space-y-3 text-textColor'>
                <div className='text-2xl uppercase md:text-xl font-medium pr-4 text-white'>
                    {movie?.title}
                </div>
                <div className='flex flex-wrap gap-4'>
                {movie?.genres?.map((genre, index)=>(
                    <Genres 
                    key={genre.id}
                    index={index}
                    name={genre.name}
                    id={genre.id}
                    length={movie.genres.length}
                    vote_average={movie.vote_average}
                    />
                ))}
                </div>

                <div className='flex flex-col md:flex-row gap-2 md:gap-6'>
                    <div>Language: {movie?.original_language?.toLocaleUpperCase()}</div>
                    <div>Release Date: {movie?.release_date}</div>
                    <div>Runtime: {movie?.runtime} min</div>
                    <div>Status: {movie?.status}</div>
                    <div>Rating: {movie?.vote_average} / 10</div>
                </div>

                <div className='pt-14 space-y-2 pr-4'>
                    <div>Storyline</div>
                    <div>{movie?.overview}</div>
                </div>

                <div className='inline-block pt-6 cursor-pointer'
                onClick={startPlayer}
                >
                    <div className='flex gap-2 items-center bg-white text-black px-4 py-2 mb-6 hover:bg-black/30'>
                        <BsPlayFill size={20} />
                        <div>Play Trailer</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div
    className={`absolute top-3 inset-x-[10%] md:inset-x-[20%] rounded overflow-hidden transition duration-1000 ease-in ${showPlayer ? 'opacity-100 z-50' : 'opacity-0 -z-10'}`} 
    >
        <div className='flex items-center justify-between bg-black text-white p-3'>
            <span className='text-xl font-bold'>Trailer {movie?.title}</span>
            <div onClick={()=>setShowPlayer(false)} className='cursor-pointer w-8 h-8 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-black/80'>
                <IoMdClose className='h-5' />
            </div>
        </div>
            <div className='relative pt-[50%] w-full'>
                <ReactPlayer 
                url={trailer}
                width={'100%'}
                height={'100%'}
                style={{position: 'absolute', top: 0, left: 0}}
                controls={true}
                playing={showPlayer}
                />
            </div>
    </div>

    </main>
  )
}

export default Movie