import React from 'react'
import { CiImageOff } from "react-icons/ci"

const CardSkeleton = ({error}: {error?: boolean}) => {
  return (
    <div className={`h-[450px] md:h-[350px] w-[100%] grid place-items-center bg-primary ${!error  && "cardSkeleton"} `}>
        {error && <CiImageOff size={40} />}
    </div>
  )
}

export default CardSkeleton