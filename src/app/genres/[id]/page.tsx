'use client'

import { Movie } from '@/app/discover/[id]/page'
import Card from '@/components/Card'
import Loading from '@/components/Loading'
import { BASE_URL } from '@/utils/routes'
import axios from 'axios'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

const Genres = () => {
const  [title, setTitle] = useState('')
const [movies, setMovies] = useState([])
const [currentPage, setCurrentPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)

const ref = useRef<HTMLDivElement>(null)
const router = useRouter()
const params = useParams()
const searchParams = useSearchParams()

useEffect(() => {
    ref?.current?.scrollTo({ top: 0, behavior: 'smooth' })
    const id = params.id
const genre = searchParams.get('genre')
const page = searchParams.get('page')

if (genre) {
    setTitle(`${genre.charAt(0).toUpperCase()}${genre.slice(1)} Movies`);
  
    axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_API_KEY,
        with_genres: id,
        page: page
      }
    }).then(res => {
      setMovies(res.data.results)
      setTotalPages(res.data.total_pages)
  setCurrentPage(res.data.page)
}).catch(err => {
  console.log(err)
})

}
},[params.id, searchParams.get('page')])

const changePage = (btn: string) => {
  let page = ""
  if(btn === "next"){
    page = `${currentPage + 1}`
  }else{
    page = `${currentPage - 1}`
  }
  router.push(`/genres/${params.id}?genre=${searchParams.get('genre')}&page=${page}`)
}


  return (
    <main
    className='bg-secondary max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8 overflow-y-scroll overflow-hidden scrollbar-hide  ' 
    ref={ref}
    >
        <h2 className='text-3xl font-bold text-white '>{title}</h2>
        <div className='align-center flex mt-6 items-center justify-center flex-1'>
        {movies.length===0 && <Loading />}
        </div>
        <div className='grid gap-8 moviesGrid place-items-center mt-6'>
            {movies.map((movie: Movie)=>(
                <Card 
                key={movie.id}
                id={movie.id}
                img={movie.poster_path}
                title={movie.title}
                name={movie.name}
                release_date={movie.release_date}
                vote_average={movie.vote_average}
                />
            ))}
        </div>
        {movies.length > 0 && (
       <div className='flex justify-center mt-8 py-6 pt-16'>
       <button
         onClick={()=>changePage("prev")}
         className="mr-5 h-fit border-none bg-none outline-none text-black text-6xl cursor-pointer font-light opacity-50 transition-opacity duration-100 ease-in text-shadow-black hover:opacity-100 hover:text-shadow-white hover:transform hover:scale-105"
       >
         <p className="text-[#ead61c] font-light opacity-50 transition-opacity duration-100 ease-in text-shadow-black hover:opacity-100 hover:text-shadow-white">
           {'<'}
         </p>
       </button>

       <button onClick={() => changePage("prev")} className="text-[#ead61c] opacity-50 text-3xl mt-1 mr-2">{currentPage-1}</button>
       <p className="text-[#ead61c] text-5xl mt-2">{currentPage}</p>
       <button onClick={() => changePage("next")} className="text-[#ead61c] opacity-50 text-3xl mt-1 ml-2">{currentPage + 1}</button>

       <button
         onClick={()=>changePage("next")}
         className="ml-5 h-fit border-none bg-none outline-none text-black text-6xl cursor-pointer font-light opacity-50 transition-opacity duration-100 ease-in text-shadow-black hover:opacity-100 hover:text-shadow-white hover:transform hover:scale-125"
       >
         <p className="text-[#ead61c] font-light opacity-50 transition-opacity duration-100 ease-in text-shadow-black hover:opacity-100 hover:text-shadow-white">
           {'>'}
         </p>
       </button>
     </div>
)}
    </main>
  )
}

export default Genres