/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Send, ThumbsUp, ThumbsDown, Edit, Trash2, Reply } from "lucide-react";

// Initial data (similar to the data.json structure)
const initialData = {
  currentUser: {
    image: {
      png: "/images/avatars/image-amyrobson.png",
      webp: "/images/avatars/image-amyrobson.webp",
    },
    username: "amyrobson",
  },
  comments: [
    {
      id: 1,
      content:
        "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints looks great. Nice work!",
      createdAt: "1 month ago",
      score: 12,
      user: {
        image: {
          png: "/images/avatars/image-amyrobson.png",
          webp: "/api/placeholder/40/40",
        },
        username: "amyrobson",
      },
      replies: [],
    },
    {
      id: 2,
      content:
        "Thanks for your feedback! I'm glad you found the design impressive.",
      createdAt: "2 weeks ago",
      score: 5,
      user: {
        image: {
          png: "/images/avatars/image-maxblagun.png",
          webp: "/api/placeholder/40/40",
        },
        username: "maxblagun",
      },
      replies: [
        {
          id: 3,
          content:
            "Absolutely! I'm looking forward to seeing how the drag feature evolves.",
          createdAt: "1 week ago",
          score: 3,
          user: {
            image: {
              png: "/images/avatars/image-juliusomo.png",
              webp: "/api/placeholder/40/40",
            },
            username: "juliusomo",
          },
        },
        {
          id: 4,
          content:
            "I agree, the drag feature has so much potential. Great work so far!",
          createdAt: "5 days ago",
          score: 2,
          user: {
            image: {
              png: "/images/avatars/image-ramsesmiron.png",
              webp: "/api/placeholder/40/40",
            },
            username: "ramsesmiron",
          },
        },
      ],
    },
  ],
};

// Comment Component
const Comment = ({
  comment,
  currentUser,
  onUpvote,
  onDownvote,
  onReply,
  onEdit,
  onDelete,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText("");
      setIsReplying(false);
    }
  };

  const handleEdit = () => {
    if (editText.trim()) {
      onEdit(comment.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
      <div className="flex items-start space-x-4">
        {/* Voting Section */}
        <div className="flex flex-col items-center bg-gray-100 rounded-lg p-2">
          <button
            onClick={() => onUpvote(comment.id)}
            className="text-gray-500 hover:text-blue-600 mb-2"
          >
            <ThumbsUp size={20} />
          </button>
          <span className="text-blue-600 font-semibold">{comment.score}</span>
          <button
            onClick={() => onDownvote(comment.id)}
            className="text-gray-500 hover:text-red-600 mt-2"
          >
            <ThumbsDown size={20} />
          </button>
        </div>

        {/* Comment Content */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <img
                src={comment.user.image.png}
                alt={comment.user.username}
                className="w-8 h-8 rounded-full"
              />
              <span className="font-semibold">{comment.user.username}</span>
              {comment.user.username === currentUser.username && (
                <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded">
                  you
                </span>
              )}
              <span className="text-gray-500">{comment.createdAt}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {comment.user.username === currentUser.username ? (
                <>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                  >
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(comment.id)}
                    className="text-red-600 hover:text-red-800 flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Reply size={16} className="mr-1" /> Reply
                </button>
              )}
            </div>
          </div>

          {/* Comment Text */}
          {isEditing ? (
            <div className="flex flex-col space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="w-full p-2 border rounded"
                rows={3}
              />
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 self-end"
              >
                Update
              </button>
            </div>
          ) : (
            <p className="text-gray-700">{comment.content}</p>
          )}
        </div>
      </div>

      {/* Reply Input */}
      {isReplying && (
        <div className="mt-4 pl-16 flex items-start space-x-4">
          <img
            src={currentUser.image.png}
            alt={currentUser.username}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-grow">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Add a reply..."
              className="w-full p-2 border rounded mb-2"
              rows={3}
            />
            <button
              onClick={handleReply}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 pl-16 border-l-2 border-gray-200">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Main Comments Section Component
const CommentsSection = () => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [newCommentText, setNewCommentText] = useState("");

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedComments = localStorage.getItem("comments");
    const storedCurrentUser = localStorage.getItem("currentUser");

    // If no stored comments, use initial data
    if (!storedComments) {
      setComments(initialData.comments);
      localStorage.setItem("comments", JSON.stringify(initialData.comments));
    } else {
      // Parse and set stored comments
      setComments(JSON.parse(storedComments));
    }

    // If no stored current user, use initial data
    if (!storedCurrentUser) {
      setCurrentUser(initialData.currentUser);
      localStorage.setItem(
        "currentUser",
        JSON.stringify(initialData.currentUser)
      );
    } else {
      // Parse and set stored current user
      setCurrentUser(JSON.parse(storedCurrentUser));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Save comments to localStorage whenever they change
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem("comments", JSON.stringify(comments));
    }
  }, [comments]);

  // Add new comment
  const addComment = () => {
    if (newCommentText.trim()) {
      const newComment = {
        id: Date.now(),
        content: newCommentText,
        createdAt: "Just now",
        score: 0,
        user: currentUser,
        replies: [],
      };

      setComments((prevComments) => [...prevComments, newComment]);
      setNewCommentText("");
    }
  };

  // Add reply to a comment
  const addReply = (parentId, replyText) => {
    const addReplyRecursive = (commentList) => {
      return commentList.map((comment) => {
        if (comment.id === parentId) {
          const newReply = {
            id: Date.now(),
            content: replyText,
            createdAt: "Just now",
            score: 0,
            user: currentUser,
            replies: [],
          };

          return {
            ...comment,
            replies: [...(comment.replies || []), newReply],
          };
        }

        if (comment.replies) {
          return {
            ...comment,
            replies: addReplyRecursive(comment.replies),
          };
        }

        return comment;
      });
    };

    const updatedComments = addReplyRecursive(comments);
    setComments(updatedComments);
  };

  // Edit comment
  const editComment = (commentId, newContent) => {
    const editCommentRecursive = (commentList) => {
      return commentList.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, content: newContent };
        }

        if (comment.replies) {
          return {
            ...comment,
            replies: editCommentRecursive(comment.replies),
          };
        }

        return comment;
      });
    };

    const updatedComments = editCommentRecursive(comments);
    setComments(updatedComments);
  };

  // Delete comment
  const deleteComment = (commentId) => {
    const deleteCommentRecursive = (commentList) => {
      return commentList.filter((comment) => {
        if (comment.id === commentId) {
          return false;
        }

        if (comment.replies) {
          comment.replies = deleteCommentRecursive(comment.replies);
        }

        return true;
      });
    };

    const updatedComments = deleteCommentRecursive(comments);
    setComments(updatedComments);
  };

  // Upvote comment
  const upvoteComment = (commentId) => {
    const upvoteCommentRecursive = (commentList) => {
      return commentList.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, score: comment.score + 1 };
        }

        if (comment.replies) {
          return {
            ...comment,
            replies: upvoteCommentRecursive(comment.replies),
          };
        }

        return comment;
      });
    };

    const updatedComments = upvoteCommentRecursive(comments);
    setComments(updatedComments);
  };

  // Downvote comment
  const downvoteComment = (commentId) => {
    const downvoteCommentRecursive = (commentList) => {
      return commentList.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, score: Math.max(0, comment.score - 1) };
        }

        if (comment.replies) {
          return {
            ...comment,
            replies: downvoteCommentRecursive(comment.replies),
          };
        }

        return comment;
      });
    };

    const updatedComments = downvoteCommentRecursive(comments);
    setComments(updatedComments);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Interactive Comments Section
      </h1>

      {/* Comments List */}
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          currentUser={currentUser}
          onUpvote={upvoteComment}
          onDownvote={downvoteComment}
          onReply={addReply}
          onEdit={editComment}
          onDelete={deleteComment}
        />
      ))}

      {/* New Comment Input */}
      <div className="bg-white rounded-lg p-4 shadow-sm mt-4 flex items-start space-x-4">
        <img
          src={currentUser.image?.png}
          alt={currentUser.username}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-grow">
          <textarea
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-2 border rounded mb-2"
            rows={3}
          />
          <button
            onClick={addComment}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center"
          >
            <Send size={16} className="mr-2" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
