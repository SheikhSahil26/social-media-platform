import React from 'react'
import { Heart } from 'lucide-react'

const LikeDislike = () => {

  const [liked,setLiked]=useState(false)

    


    const handleLikeClick=async(e)=>{
        
    }



  return (
    <div>
      <div className="flex items-center gap-2">
      <button
        onClick={handleLikeClick}
        className={`
          relative
          p-2
          rounded-full
          hover:bg-rose-100
          transition-all
          duration-300
          ${isAnimating ? 'scale-125' : 'scale-100'}
          ${isLiked ? 'bg-rose-50' : 'bg-transparent'}
        `}
        aria-label={isLiked ? 'Unlike' : 'Like'}
      >
        <Heart
          className={`
            w-6 
            h-6 
            transition-colors 
            duration-300
            ${isLiked ? 'fill-rose-500 stroke-rose-500' : 'stroke-gray-500'}
          `}
        />
      </button>
      <span className={`
        text-sm
        font-medium
        transition-colors
        duration-300
        ${isLiked ? 'text-rose-500' : 'text-gray-500'}
      `}>
        {likeCount}
      </span>
    </div>
    </div>
  )
}

export default LikeDislike
