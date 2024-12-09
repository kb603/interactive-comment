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
    <div className="mb-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex flex-col items-start space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        {/* Voting Section */}
        <div className="flex flex-row items-center gap-2 rounded-lg bg-gray-100 p-2 sm:flex-col">
          <button
            onClick={() => onUpvote(comment.id)}
            className="mb-2 text-gray-500 hover:text-blue-600"
          >
            <ThumbsUp size={20} />
          </button>
          <span className="font-semibold text-blue-600">{comment.score}</span>
          <button
            onClick={() => onDownvote(comment.id)}
            className="mt-2 text-gray-500 hover:text-red-600"
          >
            <ThumbsDown size={20} />
          </button>
        </div>

        {/* Comment Content */}
        <div className="flex-grow">
          <div className="mb-3 flex flex-col items-start justify-between sm:flex-row sm:items-center">
            <div className="flex items-center space-x-3">
              <img
                src={comment.user.image.png}
                alt={comment.user.username}
                className="h-8 w-8 rounded-full"
              />
              <span className="font-semibold">{comment.user.username}</span>
              {comment.user.username === currentUser.username && (
                <span className="rounded bg-blue-600 px-2 py-1 text-xs text-white">
                  you
                </span>
              )}
              <span className="text-gray-500">{comment.createdAt}</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex items-center space-x-2 sm:mt-0">
              {comment.user.username === currentUser.username ? (
                <>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => onDelete(comment.id)}
                    className="flex items-center text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsReplying(!isReplying)}
                  className="flex items-center text-blue-600 hover:text-blue-800"
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
                className="w-full rounded border p-2"
                rows={3}
              />
              <button
                onClick={handleEdit}
                className="self-end rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
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
        <div className="mt-4 flex items-start space-x-4 pl-4 sm:pl-16">
          <img
            src={currentUser.image.png}
            alt={currentUser.username}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex-grow">
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Add a reply..."
              className="mb-2 w-full rounded border p-2"
              rows={3}
            />
            <button
              onClick={handleReply}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {/* Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 border-l-2 border-gray-200 pl-4 sm:pl-16">
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
        JSON.stringify(initialData.currentUser),
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
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-center text-2xl font-bold">
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
      <div className="mt-4 flex flex-col space-y-4 rounded-lg bg-white p-4 shadow-sm sm:space-y-0">
        <textarea
          value={newCommentText}
          onChange={(e) => setNewCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="w-full rounded border p-2"
          rows={3}
        />
        <div className="flex items-center justify-between">
          <img
            src={currentUser.image?.png}
            alt={currentUser.username}
            className="h-10 w-10 rounded-full"
          />
          <button
            onClick={addComment}
            className="flex items-center rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Send size={16} className="mr-2" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
