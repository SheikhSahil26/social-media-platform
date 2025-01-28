import React from 'react'
import { useLocation,useParams } from 'react-router-dom'

const SeeComments = () => {

    const { postId } = useParams(); // Access route parameters
    const location = useLocation(); // Access the current location

    const queryParams = new URLSearchParams(location.search);
    const QueryComments = queryParams.get('comments');
    
    const commentsArray=QueryComments?JSON.parse(decodeURIComponent(QueryComments)):[];

    console.log(commentsArray)



  return (
    <>
    <h1>Comments Page!!!!</h1>
    </>
  )
}

export default SeeComments
