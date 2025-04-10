import React, { useState, useEffect, useRef } from 'react';
import './stories.css';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import useGetStories from '../hooks/useGetStories';

const Stories = () => {
  // Sample data - in a real app, you would fetch this from your API
  const [users, setUsers] = useState({});


  useEffect(()=>{
    const getAllUsersWhoPostedStories=async()=>{
      try{
        const res=await fetch('/api/post/story/getuserswhopostedstories', {
          method: "GET",
        })
        const data=await res.json();

        // console.log(data);

        // console.log(data.stories)
        console.log(data.users)
        
        if(data.error) throw new Error(data.error);

        setUsers(data.users);

        console.log(typeof(users))

        console.log("fetched stories successfully")
        

      }catch(error){
        toast.error(error.message)
      }
    }

    getAllUsersWhoPostedStories();
  },[])


  const {stories,fetchUserStories}=useGetStories();



  const [storyAuthor,setStoryAuthor]=useState(null)
  const [activeStory, setActiveStory] = useState(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const storyContainerRef = useRef(null);
  const timerRef = useRef(null);

  // Function to scroll the stories container
  const scroll = (direction) => {
    if (storyContainerRef.current) {
      const { current } = storyContainerRef;
      const scrollAmount = direction === 'left' ? -200 : 200;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Function to open story modal
  const openStory = async (username) => {
    setStoryAuthor(username);

    await fetchUserStories(username)

    setActiveStory(stories);

    console.log(activeStory)
    
    setActiveStoryIndex(0);
    
    setIsModalOpen(true);
  };

  // Function to close story modal
  const closeStory = () => {
    setActiveStory(null);
    setIsModalOpen(false);
    clearInterval(timerRef.current);
  };

  // Function to navigate to the next story
  const nextStory = () => {
    if (!activeStory) return;
    
    if (activeStoryIndex < activeStory.stories.length - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      // Find the index of the current user
      const currentUserIndex = stories.findIndex(user => user.id === activeStory.id);
      
      // If there's a next user, show their story
      if (currentUserIndex < stories.length - 1) {
        setActiveStory(stories[currentUserIndex + 1]);
        setActiveStoryIndex(0);
      } else {
        // If we're at the last user, close the modal
        closeStory();
      }
    }
  };

  // Function to navigate to the previous story
  const prevStory = () => {
    if (!activeStory) return;
    
    if (activeStoryIndex > 0) {
      setActiveStoryIndex(activeStoryIndex - 1);
    } else {
      // Find the index of the current user
      const currentUserIndex = stories.findIndex(user => user.id === activeStory.id);
      
      // If there's a previous user, show their last story
      if (currentUserIndex > 0) {
        const prevUser = stories[currentUserIndex - 1];
        setActiveStory(prevUser);
        setActiveStoryIndex(prevUser.stories.length - 1);
      }
    }
  };

  // Auto-advance stories
  useEffect(() => {
    if (isModalOpen && activeStory) {
      // Clear any existing timer
      clearInterval(timerRef.current);
      
      // Mark the current story as seen
      setStories(prevStories => {
        return prevStories.map(user => {
          if (user.id === activeStory.id) {
            const updatedStories = [...user.stories];
            updatedStories[activeStoryIndex].seen = true;
            return { ...user, stories: updatedStories };
          }
          return user;
        });
      });
      
      // Set a new timer to advance to the next story after 5 seconds
      timerRef.current = setTimeout(nextStory, 5000);
    }
    
    // Clean up the timer when component unmounts or dependencies change
    return () => clearTimeout(timerRef.current);
  }, [isModalOpen, activeStory, activeStoryIndex]);

  return (
    <div className="stories-container">
      <button 
        className="scroll-button scroll-left"
        onClick={() => scroll('left')}
      >
        &#10094;
      </button>
      
      <div ref={storyContainerRef} className="stories-scrollable">
        {/* Add Story Button */}
        <Link to="/addstory" className="story-item create-story">
          <div className="story-avatar-wrapper no-story">
            <div className="story-avatar-inner">
              <div className="story-add-icon">+</div>
            </div>
          </div>
          <span className="story-username">Add Story</span>
        </Link>
        
        {/* User Stories */}
        {Array.isArray(users) && users.length > 0 ? (
            users.map((username) =>(
      
      <div 
        key={username} 
        className="story-item"
        onClick={() => openStory(username)}
      >
        <div className="story-avatar-wrapper new-story">
          <div className="story-avatar-inner">
            <img 
              // src={story.profilePicture} 
              // alt={story.username} 
              className="story-avatar"
            />
          </div>
        </div>
        <span className="story-username">{username}</span>
      </div>
    )
  )
): (
  <p>No stories to show</p>
)}

</div>
      
      <button 
        className="scroll-button scroll-right"
        onClick={() => scroll('right')}
      >
        &#10095;
      </button>
      
      {/* Story Modal */}
      {isModalOpen && activeStory && (
        <div className="story-modal">
          <div className="story-modal-content">
            {/* Header */}
            <div className="story-header">
              <img 
                src={activeStory.profilePicture} 
                alt={activeStory.username} 
                className="story-header-avatar"
              />
              <div className="story-header-details">
                <div className="story-header-username">{activeStory.username}</div>
                <div className="story-header-time">
                  {activeStory.stories[activeStoryIndex].time} ago
                </div>
              </div>
              <button onClick={closeStory} className="story-close-btn">
                &times;
              </button>
            </div>
            
            {/* Progress Bars */}
            <div className="story-progress-container">
              {activeStory.stories.map((story, index) => (
                <div key={story.id} className="story-progress-bg">
                  <div 
                    className={`story-progress-fill ${index === activeStoryIndex ? 'active' : index < activeStoryIndex ? 'completed' : ''}`}
                  ></div>
                </div>
              ))}
            </div>
            
            {/* Story Content */}
            <div className="story-content">
              <img 
                src={activeStory.stories[activeStoryIndex].imageUrl} 
                alt="Story" 
                className="story-image"
              />
              
              {/* Navigation */}
              <div className="story-navigation">
                <div className="story-nav-left" onClick={prevStory}></div>
                <div className="story-nav-right" onClick={nextStory}></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stories;