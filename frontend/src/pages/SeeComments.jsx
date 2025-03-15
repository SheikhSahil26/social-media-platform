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
     {commentsArray.map((comment) => (
              <div key={comment._id} className="p-4 border-b last:border-0">
                <div className="flex gap-3">
                  {/* <Avatar>
                    <img src={comment.user.avatar} alt={comment.user.name} className="w-8 h-8 rounded-full" />
                  </Avatar> */}z
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm"></span>
                      <span className="text-gray-500 text-sm">{comment.commentBody}</span>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-gray-400 text-xs">{comment.createdAt}</span>
                    </div>
                    {/* <p className="text-sm mt-1">{comment.text}</p> */}
                    <div className="flex items-center gap-4 mt-2">
                      <button style={{margin:10}}className="text-xs text-gray-500 hover:text-blue-600">Like</button>
                      <button className="text-xs text-gray-500 hover:text-blue-600">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
    </>
  )
}

export default SeeComments
