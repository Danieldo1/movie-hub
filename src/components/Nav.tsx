'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import MobileNav from './MobileNav'

const Nav = () => {
    const router=useRouter()
    const [input, setInput] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setInput('') 
        router.push(`/search/${input}?page=1`)
    }

  return (
    <nav className="bg-primary">
        <div className='flex justify-between items-center py-2 md:py-4 px-2 md:px-10'>
            <Link className='hidden md:block' href='/discover/now_playing'>
                <h2 className='text-3xl font-bold text-white'>Movie<span className='text-3xl font-bold text-black bg-[#ead61c] rounded-lg px-1'>Hub</span></h2>
            </Link>
        <form className='hidden md:block space-x-4' onSubmit={handleSubmit} 
        autoComplete='off'>
            <input
            className='bg-secondary text-white px-4 p-2 outline-none placeholder:text-textColor rounded-lg'
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Search for a movie'
            />
            <button
            className='bg-secondary text-white px-4 p-2 outline-none rounded-lg hover:bg-textColor'
            >
                Search
            </button>
        </form>
        </div>

        <MobileNav input={input} setInput={setInput} handleSubmit={handleSubmit} />
    </nav>

  )
}

export default Nav