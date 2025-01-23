import React,{useState} from 'react'
import { useAuthContext } from '../context/authContext'
import { MoreHorizontal } from 'lucide-react'
import LikeDislike from './LikeDislike'
import { extractTime } from '../utils/extractTime'
import { Link } from 'react-router-dom'
import Comment from './Comment'


const Post = (props) => {

    const {authUser}=useAuthContext()

    const [isSetComment,setComment]=useState(false);

    const handleCommentClick=()=>{
      setComment((prev)=>!prev);
      console.log("clicked")
    }

    
    console.log(props.post.postImageUrl);
    



  return (
    <div className="post-card">
    <div className="post-header">
      <div className="post-author">
        <img src={`/api/placeholder/40/40`} alt="User avatar" className="avatar" />
        <div>
          <Link style={{textDecoration:'none'}} to={`/profile/${props.username}`}><h3 style={{textDecoration:'none'}}>{props.username}</h3></Link>
          <span>{extractTime(props.post.createdAt)}</span>
        </div>
      </div>
      <button className="more-btn">
        <MoreHorizontal size={20} />
      </button>
    </div>
    <img src={`/api/placeholder/600/400`} alt="Post" className="post-image" />
    
    <div className="post-actions">
    <LikeDislike postId={props.post._id} post={props.post}/>
      <button onClick={handleCommentClick}>💬 {props.post.postComments.length}</button>
      
      <button>🔄 ?</button>    
    </div>
    <p className="post-content">
      {props.post.postCaption}
    </p>
    {isSetComment==true?<Comment forPost={props.post._id}/>:<span></span>}
  </div>
  )
}

export default Post
