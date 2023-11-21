import { BASE_IMAGE_URL } from '@/utils/routes'
import Link from 'next/link'
import React, { useState } from 'react'
import CardSkeleton from './CardSkeleton'

interface Props {
    img: string
    title: string
    name: string
    release_date: string
    id: string
}

const Card = ({
    img,
    title,
    name,
    release_date,
    id
}: Props) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)



  return (
    <div className='bg-primary group h-[450px] md:h-[350px] w-full rounded-xl '>
        {/* {!loading && !error &&  <CardSkeleton />}
        {error && <CardSkeleton  />} */}

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
                <div className='absolute bottom-0  bg-primary px-4 py-2 text-center transition-all duration-500 opacity-0 group-hover:opacity-100'>
                    {title}
                    <p>{release_date}</p>
                </div>
            </div>
        </Link>



    </div>
  )
}

export default Card