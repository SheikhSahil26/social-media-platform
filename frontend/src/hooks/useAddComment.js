import React from 'react'

const useAddComment = () => {

  let response

  const addComment=async ({commentBody,postId})=>{
    const res=await fetch(`/api/post/comment/${postId}`,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({commentBody}),
    })
    console.log(res)
    const data=await res.json();

    console.log(data);

  }

  return {addComment};
}

export default useAddComment
