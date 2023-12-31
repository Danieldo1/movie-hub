import { BASE_URL } from '@/utils/routes'
import axios from 'axios'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import React, { Dispatch,useEffect,useState } from 'react'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'

interface Props {
    input: string
    setInput: Dispatch<React.SetStateAction<string>>
    handleSubmit: (e: React.FormEvent) => void
}

interface Genre {
    id: string
    name: string
}

const MobileNav = ({
    input,
    setInput,
    handleSubmit
}: Props) => {
const [isOpen, setIsOpen] = useState(false)
const [genre, setGenre] = useState([])
const [selectedGenre, setSelectedGenre] = useState('')

const searchParams = useSearchParams()
const params = useParams()

useEffect(() => {
    axios.get(`${BASE_URL}/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`).then(({data})=>{
        setGenre(data.genres)
    }).catch((err)=>{
        console.log(err)
    })
},[])

useEffect(() => {
   if(searchParams.get('genre')){
    setSelectedGenre(searchParams.get('genre')!)
    return
   }

   setSelectedGenre(params.id.toString());
},[searchParams.get('genre'),params.id])

  return (
    <>
    <form className='md:hidden flex items-center justify-between w-full mb-5'
    onSubmit={handleSubmit}
    >

        <div onClick={() => setIsOpen(true)} className='cursor-pointer ml-4'>
            <AiOutlineMenu size={30} />
        </div>      
        <div className="space-x-4 mr-4">
            <input
            className='bg-secondary text-white px-4 p-2 outline-none placeholder:text-textColor rounded-lg'
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search for a movie'
            />
            <button
            className='bg-secondary text-white px-4 py-2  outline-none rounded-lg hover:bg-textColor'
            >
                Search
            </button>
        </div>
    </form>

    <div
    className={`min-h-[100vh] max-h-[100vh] w-full bg-primary fixed left-0 top-0 z-10 overflow-scroll
    ${isOpen ? 'block' : 'hidden'}`}
  
    >
        <div className='sticky top-0 bg-primary py-2 w-full '>
            <AiOutlineClose size={26} 
              onClick={() => setIsOpen(false)}
              className='absolute top-0 right-0 m-2 mt-10 cursor-pointer'
            />
            <Link
            className='w-fit'
            href={`/discover/now_playing`}
            onClick={() => setIsOpen(false)}
            >
                <div className='font-semibold text-2xl text-center'>
                        Movie
                <span className='text-2xl font-bold text-black bg-[#ead61c] rounded-lg px-1'>Hub</span>
                </div>
            </Link>
        </div>

        <div className='px-4 pb-16'>
            <div className="flex flex-col gap-4 pt-4">
                <p className='text-[#ead61c] ml-4 w-fit text-xl font-bold '>Discover</p>
                <Link className='w-fit' href='/discover/now_playing'
                    onClick={() => setIsOpen(false)}
                >
                    <p className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${selectedGenre === 'now_playing' ? 'text-white' : '' }`}>
                        Now Playing
                    </p>
                </Link>

                <Link className='w-fit' href='/discover/top_rated'
                    onClick={() => setIsOpen(false)}
                >
                    <p className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${selectedGenre === 'top_rated' ? 'text-white' : '' }`}>
                        Top Rated
                    </p>
                </Link>

                <Link className='w-fit' href='/discover/popular'
                    onClick={() => setIsOpen(false)}
                >
                    <p className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${selectedGenre === 'popular' ? 'text-white' : '' }`}>
                        Popular
                    </p>
                </Link>

                <Link className='w-fit' href='/discover/upcoming'
                    onClick={() => setIsOpen(false)}
                >
                    <p className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${selectedGenre === 'upcoming' ? 'text-white' : '' }`}>
                        Upcoming
                    </p>
                </Link>



            </div>

            <div className="flex flex-col gap-4 pt-4">
                <p className='text-[#ead61c] ml-4 w-fit text-xl font-bold'>Genres</p>
                {genre.map((item: Genre) => (
                    <Link 
                     href={`/genres/${item.id}?genre=${item.name.toLocaleLowerCase()}`} 
                     key={item.id} 
                     onClick={() => setIsOpen(false)}
                     className='w-fit'
                     >
                        <p className={`text-textColor ml-4 cursor-pointer hover:text-white transition w-fit ${item.name.toLocaleLowerCase() === selectedGenre ? 'text-white' : '' }`}>
                            {item.name}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    </div>

    </>
  )
}

export default MobileNav