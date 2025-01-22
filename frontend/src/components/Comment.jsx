import React,{useState,useEffect} from 'react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Avatar } from "@/components/ui/avatar";
import { MessageCircle, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Comment = (props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [allComments, setAllComments] = useState([]);

    let comments=[]
    useEffect(()=>{
      const fetchComments=async()=>{
        const res=await fetch(`/api/post/getpostcomments/${props.forPost}`,{
          method:"GET",
        })
        const data=await res.json();

        console.log(data.comments,data.noOfComments);

        setAllComments(data.comments)//this is all comments of the post

        comments=[allComments[0],allComments[1],allComments[2]] //this are the comments which will be shown in homepage of with the post and remaining willl be in other separate page


         console.log(comments)

      }
      fetchComments()
    },[]) 




  
    const handleAddComment = (e) => {

    };




  return (
    <div>
      {/* Comment Button */}
      {/* <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
      > */}
        {/* <MessageCircle size={24} />
        <span>{comments.length} Comments</span>
      </button> */}

      {/* Comment Dialog */}
      {/* <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageCircle size={20} className="text-blue-600" />
              Comments ({comments.length})
            </DialogTitle>
          </DialogHeader> */}

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} className="flex gap-2 p-4 border-b">
            {/* <Avatar>
              <img src="/api/placeholder/32/32" alt="Current user" className="w-8 h-8 rounded-full" />
            </Avatar> */}
            <div className="flex-1 flex gap-2">
              <input
                type="text"
                // value={}
                // onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                // disabled={!newComment.trim()}
                style={{margin:10}}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={25} />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="max-h-96 overflow-y-auto">
            {comments.map((comment) => (
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
                    <p className="text-sm mt-1">{comment.text}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <button style={{margin:10}}className="text-xs text-gray-500 hover:text-blue-600">Like</button>
                      <button className="text-xs text-gray-500 hover:text-blue-600">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <Link to={`/seecomments`}><button>see all comments</button></Link>
          </div>
        {/* </DialogContent>
      </Dialog> */}
    </div>
  )
}

export default Comment
