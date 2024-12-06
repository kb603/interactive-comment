import { useState } from "react";

export function SubComment() {
  const [score, setScore] = useState(0);
  const username = "User";
  const replyingTo = "AnotherUser";
  const content = "This is a sample comment.";

  const onUpvote = () => {
    // handle upvote logic here
  };

  const onDownvote = () => {
    // handle downvote logic here
  };

  const onReply = () => {
    // handle reply logic here
  };
  return (
    <div className="ml-4 border-l-2 border-slate-200 pl-4 md:ml-12">
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="flex gap-4">
          {/* Vote Counter */}
          <div className="hidden flex-col items-center gap-1 rounded-lg bg-slate-50 p-3 md:flex">
            <button
              className="text-slate-400 hover:text-indigo-600 focus:outline-none"
              onClick={onUpvote}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <span className="font-medium text-indigo-600">{score}</span>
            <button
              className="text-slate-400 hover:text-indigo-600 focus:outline-none"
              onClick={onDownvote}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            {/* Comment Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200">
                  <span className="font-medium text-slate-600">
                    {username[0]}
                  </span>
                </div>
                <span className="font-medium">{username}</span>
                <span className="text-slate-500">6 Hours</span>
              </div>
              <button
                className="hidden font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none md:block"
                onClick={onReply}
              >
                Reply
              </button>
            </div>

            {/* Comment Content */}
            <p className="leading-relaxed text-slate-600">
              <span className="font-medium text-indigo-600">@{replyingTo}</span>{" "}
              {content}
            </p>

            {/* Mobile Vote Counter and Reply */}
            <div className="mt-4 flex items-center gap-4 md:hidden">
              <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-2">
                <button
                  className="text-slate-400 hover:text-indigo-600 focus:outline-none"
                  onClick={onUpvote}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="font-medium text-indigo-600">{score}</span>
                <button
                  className="text-slate-400 hover:text-indigo-600 focus:outline-none"
                  onClick={onDownvote}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <button
                className="font-medium text-indigo-600 hover:text-indigo-800 focus:outline-none md:hidden"
                onClick={onReply}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
