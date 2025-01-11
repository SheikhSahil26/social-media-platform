import React from 'react'
import { Heart } from 'lucide-react'
import { useState,useEffect } from 'react'

const LikeDislike = (props) => {


  const [likeCount,setLikeCount]=useState(props.post.postLikes.length)
  const [isLiked,setIsLiked]=useState(false)
  const [isAnimating,setIsAnimating]=useState(false);

  const handleLikeClick=async(e)=>{
      e.preventDefault();
      setIsLiked((prev)=>!prev)
      setIsAnimating(true)
     
  }

  console.log(isAnimating)
  console.log(isLiked)

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300); // Reset animation after 300ms
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [isAnimating]);

  useEffect(()=>{
    
    const fetchLike=async ()=>{
      const res=await fetch(`/api/post/like/${props.postId}`,{
        method:"POST",
      })
      const data=await res.json();
      console.log(data)
    }

    fetchLike()

  },[isLiked])



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
