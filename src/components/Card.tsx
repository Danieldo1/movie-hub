import { BASE_IMAGE_URL } from '@/utils/routes'
import Link from 'next/link'
import React, { useState } from 'react'
interface Props {
    img: string
    title: string
    name: string
    release_date: string
    id: string
    vote_average: number
}

const Card = ({
    img,
    title,
    name,
    release_date,
    id,
    vote_average

}: Props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)



  return (
    <div className='bg-primary group h-[450px] md:h-[350px] w-full rounded-xl '>

        <Link 
        className={`${!loading && error && 'hidden'}`}
        href={`/movie/${id}`}
        >
            <div className='relative '>
                <div className=' '>
                <img
                className='object-cover h-[450px]  md:h-[350px]  rounded-xl w-full'
                src={`${BASE_IMAGE_URL}${img}`}
                alt={title}
                onLoad={() => setLoading(false)}
                onError={() => setError(true)}
                />
                </div>
                <div className='absolute top-0 w-full rounded-t-xl flex-1 flex justify-center items-center text-white  bg-primary px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100'>
                    {title}
                </div>
                <div className='absolute bottom-0 w-full rounded-b-xl flex-1 flex justify-between items-baseline text-white  bg-primary px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100'>
                {new Date(release_date).toLocaleDateString('en-GB')}
                 <div className='align-baseline justify-center items-baseline'>{vote_average.toFixed(1)} <span className='text-yellow-500'>★</span> </div>
                </div>
            </div>
        </Link>



    </div>
  )
}

export default Card