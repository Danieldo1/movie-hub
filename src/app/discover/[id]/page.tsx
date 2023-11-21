'use client'

import Card from '@/components/Card'
import Footer from '@/components/Footer'
import Loading from '@/components/Loading'
import { BASE_URL } from '@/utils/routes'
import axios from 'axios'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react' 

export interface Movie {
  id: string
  poster_path: string
  title: string
  name: string
  release_date: string

}

const Discover = () => {

const [title, setTitle] = useState('')
const [movies, setMovies] = useState<Movie[]>([])
const [currentPage, setCurrentPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)
const [discover, setDiscover] = useState('')

const searchParams = useSearchParams()
const params = useParams()
const router = useRouter()
const ref = useRef<HTMLDivElement>(null)

useEffect(() => {
  const id = params.id.toString()
  const page = searchParams.get('page')
  ref?.current?.scrollIntoView({ behavior: 'smooth' })
  setDiscover(id)

  switch (id) {
    case 'now_playing':
      setTitle('Now Playing Movies')
      break
    case 'top_rated':
      setTitle('Top Rated Movies')
      break
    case 'popular':
      setTitle('Popular Movies')
      break
    case 'upcoming':
      setTitle('Upcoming Movies')
      break
    
    default:
      setTitle('')
      break
  }

  axios.get(`${BASE_URL}/movie/${id}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_API_KEY,
      language: 'en-US',
      page: page
    }
  }).then((res)=>{
    console.log(res.data)
    setMovies(res.data.results)
    setCurrentPage(res.data.page)
    setTotalPages(res.data.total_page)

  }).catch((err)=>{
    console.log(err)
  })

  
},[params.id, searchParams.get('page')])

const changePage = (btn: string) => {
  let page = ""
  if(btn === "next"){
    page = `${currentPage + 1}`
  }else{
    page = `${currentPage - 1}`
  }
  router.push(`/discover/${discover}?page=${page}`)
  ref?.current?.scrollTo({ top: 0, behavior: 'smooth' })
}

  return (
    <main ref={ref}
    className='bg-secondary px-10 max-h-[calc(100vh-72px)] overflow-y-scroll overflow-x-hidden pb-6 mt-2 scrollbar-hide relative'
    >
<div className="flex flex-col gap-4 pt-4 ">
        <p className='text-2xl font-bold'>{title}</p>
</div>
      
        <div className='align-center flex mt-6 items-center justify-center flex-1'>
        { movies.length === 0 && <Loading />}
        </div>

        <div className='grid gap-8 place-items-center mt-8 moviesGrid '>
          {movies.map((movie: Movie)=>(
          <Card 
          key={movie.id}
          id={movie.id}
          img={movie.poster_path}
          title={movie.title}
          name={movie.name}
          release_date={movie.release_date}
          />
          ))}

        </div>

            <div className='flex justify-center mt-8 py-6 pt-16'>
              <button
              onClick={()=>changePage("prev")}
              className="mr-5 h-fit border-none bg-none outline-none text-black text-6xl cursor-pointer font-light opacity-50 transition-opacity duration-100 ease-in text-shadow-black hover:opacity-100 hover:text-shadow-white hover:transform hover:scale-125">
                <p className="text-white font-light opacity-50 transition-opacity duration-100 ease-in text-shadow-black hover:opacity-100 hover:text-shadow-white">
                  {'<'}
                </p>
              </button>
              <button
              onClick={()=>changePage("next")}
              className="ml-5 h-fit border-none bg-none outline-none text-black text-6xl cursor-pointer font-light opacity-50 transition-opacity duration-100 ease-in text-shadow-black hover:opacity-100 hover:text-shadow-white hover:transform hover:scale-125">
                <p className="text-white font-light opacity-50 transition-opacity duration-100 ease-in text-shadow-black hover:opacity-100 hover:text-shadow-white">
                  {'>'}
                </p>
              </button>
            </div>
            {/* <div className="pb-20">
              <Footer />
            </div> */}
    </main>
  )
}

export default Discover