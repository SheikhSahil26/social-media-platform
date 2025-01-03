import React from 'react'
import { useAuthContext } from '../context/authContext'
import { MoreHorizontal } from 'lucide-react'
import LikeDislike from './LikeDislike'


const Post = (props) => {

    const {authUser}=useAuthContext()

  return (
    <div className="post-card">
    <div className="post-header">
      <div className="post-author">
        <img src={`/api/placeholder/40/40`} alt="User avatar" className="avatar" />
        <div>
          <h3>{props.username}</h3>
          <span>2 hours ago</span>
        </div>
      </div>
      <button className="more-btn">
        <MoreHorizontal size={20} />
      </button>
    </div>
    <p className="post-content">
      {props.post.postCaption}
    </p>
    <img src={`/api/placeholder/600/400`} alt="Post" className="post-image" />
    <div className="post-actions">
      <button>❤️ {props.post.postLikes.length}</button>
      <button>💬 {props.post.postComments.length}</button>
      <button>🔄 ?</button>    
    </div>
  </div>
  )
}

export default Post
