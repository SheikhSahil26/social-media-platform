import React,{useState,useEffect} from 'react'
import './home.css'
import { Link } from 'react-router-dom';
import LogOut from '../components/LogOut'
import { Bell, MessageCircle, Search, Home, Bookmark, Users, Settings, TrendingUp, MoreHorizontal } from 'lucide-react';
import { useAuthContext } from '../context/authContext';
import toast from 'react-hot-toast';
import Post from '../components/Post';


const HomePage = () => {

  const {authUser}=useAuthContext()

  const [posts,setPosts]=useState([])

  const [users,setUsers]=useState([]);

  useEffect(()=>{

    const getAllPosts=async()=>{
        try{
            const res=await fetch("/api/post/getallposts",{
                method:"GET",
            })

            const data=await res.json()

            if(data.error)throw new Error(data.error)

            setPosts(data.posts || []);

            setUsers(data.users || []);


        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    getAllPosts()

},[])

  

  return (
    <>
      <div className="social-container"> 
      {/* Left Sidebar */}
      <nav className="left-sidebar">
        <div className="brand">
          <h2>Connect</h2>
        </div>
        
        <div className="nav-links">
          <a href="#" className="nav-item active">
            <Home size={20} />
            <span>Home</span>
          </a>
          <a href="#" className="nav-item">
            <Users size={20} />
            <span>Friends</span>
          </a>
          <a href="#" className="nav-item">
            <MessageCircle size={20} />
            <span>Messages</span>
          </a>
          <a href="#" className="nav-item">
            <Bookmark size={20} />
            <span>Bookmarks</span>  
          </a>
          <a href="#" className="nav-item">
            <Settings size={20} />
            <span>Settings</span>
          </a>
        </div>

        <button className="create-post-btn">Create Post</button>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <div className="search-container">
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn">
              <Bell size={20} />
              <span className="notification-badge">3</span>
            </button>
            <div className="user-menu">
              <Link to={`/profile/${authUser.username}`} style={{textDecoration:'none'}}>
              <img src="/api/placeholder/32/32" alt="" className="avatar" />
              <span style={{textDecoration:'none'}}>{authUser.username}</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="content-wrapper">
          <div className="stories-container">
            <div className="story create-story">
              <div className="story-avatar">+</div>
              <span>Add Story</span>
            </div>
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="story">
                <img src={`/api/placeholder/56/56`} alt={`Story ${i}`} className="story-avatar" />
                <span>User {i}</span>
              </div>
            ))}
          </div>

          <div className="feed">
            <div className="post-composer">
              <img src="/api/placeholder/40/40" alt="Your avatar" className="avatar" />
              <input type="text" placeholder="What's on your mind?" />
              <button className="post-btn">Post</button>
            </div>

            {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map((post,users) => (
                                <Post key={post._id} post={post} username={users.username} />
                            ))
                        ) : (
                            <h1>No posts to show</h1>
                        )}

            
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        <div className="trending-section">
          <div className="section-header">
            <h3>Trending</h3>
            <TrendingUp size={20} />
          </div>
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="trending-item">
              <span className="trending-tag">#Trending{i}</span>
              <span className="trending-count">{i}0K posts</span>
            </div>
          ))}
        </div>

        <div className="suggestions-section">
          <div className="section-header">
            <h3>Suggested for you</h3>
          </div>
          {[1, 2, 3].map(i => (
            <div key={i} className="suggestion-item">
              <img src={`/api/placeholder/40/40`} alt="Suggested user" className="avatar" />
              <div className="suggestion-info">
                <h4>User Name</h4>
                <span>Followed by User {i}</span>
              </div>
              <button className="follow-btn">Follow</button>
            </div>
          ))}
        </div>
      </aside>
    </div>
      <LogOut/>
    </>
  )
}

export default HomePage