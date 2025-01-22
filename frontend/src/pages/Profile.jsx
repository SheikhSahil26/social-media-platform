import React, { useEffect, useState } from 'react'
import './profile.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../context/authContext'
import { MoreHorizontal } from 'lucide-react'
import useGetPost from '../hooks/useGetPost'
import Post from '../components/Post'
import useGetProfile from '../hooks/useGetProfile'
import { useLocation, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useProfileContext } from '../context/profileContext'


const Profile = () => {

    const location = useLocation()

    const [userData, setUserData] = useState({});

    const [followed,setFollowed]=useState()//baad mai karunga its implementation 

    const { username } = useParams()

    const { fetchUserProfile } = useGetProfile(username);

    let data = {}

    const handleFollow = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/user/followuser/${profileUser.username}`, {
            method: "POST",
        })
        console.log(res)

        data = await res.json()

        console.log(data)

    }


    const { authUser, loading } = useAuthContext();

    const { profileUser, setProfileUser } = useProfileContext();




    useEffect(() => {
        fetchUserProfile()
    }, [username]);





    // console.log(authUser)

    console.log(profileUser.profilePicUrl)

    const { posts } = useGetPost(username);



    const navigate = useNavigate()

    if (loading) {
        return <h3>loading....</h3>
    }






    return (

        <>
            <button onClick={() => navigate(-1)}>Back</button>
            <div className="container">
                <div className="profile-card">
                    {/* <!-- Cover Photo --> */}
                    <div className="cover-photo"></div>

                    {/* <!-- Profile Info Section --> */}
                    <div className="profile-info">
                        <div className="profile-photo">
                            <img src={profileUser.profilePicUrl} alt="Profile Photo" />
                        </div>

                        <div className="profile-header">
                            <h1>{profileUser.username}</h1>
                            <p className="role">{profileUser.bio}</p>
                            {
                                authUser.username === profileUser.username ?
                                    (<Link to={'/editprofile'}>
                                        <button style={{margin:20}}>Edit Profile</button>
                                        <Link to={'/addpost'}><button>Add Post</button></Link>
                                    </Link>) : ((profileUser.followers.length > 0) && (profileUser.followers.some(id => id.toString() === authUser._id.toString())) ? <button onClick={handleFollow}>Unfollow</button> :
                                        <button onClick={handleFollow}>follow</button>)


                            }

                        </div>

                        {/* <!-- Stats Section --> */}
                        <div className="stats-section">
                            <div className="stat-item">
                                <span className="stat-number">{profileUser.totalPosts}</span>
                                <span className="stat-label">Posts</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{profileUser.followers.length}</span>
                                <span className="stat-label">Followers</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">{profileUser.followings.length}</span>
                                <span className="stat-label">Following</span>
                            </div>
                        </div>

                        {/* <!-- Bio Section --> */}
                        <div className="bio-section">
                            <h2>About</h2>
                            <p>Passionate frontend developer with 5+ years of experience building beautiful and functional web applications. Love working with React and exploring new technologies.</p>
                        </div>

                        {Array.isArray(posts) && posts.length > 0 ? (
                            posts.map((post) => (
                                <Post key={post._id} post={post} username={username} />
                            ))
                        ) : (
                            <h1>No posts to show</h1>
                        )}


                        {/* <!-- Contact Info --> */}
                        <div className="contact-info">
                            <div className="info-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>San Francisco, CA</span>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-envelope"></i>
                                <span>john.doe@example.com</span>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-globe"></i>
                                <a href="https://johndoe.dev">johndoe.dev</a>
                            </div>
                        </div>

                        {/* <!-- Social Links --> */}
                        <div className="social-links">
                            <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile
