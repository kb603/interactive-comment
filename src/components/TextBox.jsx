/* eslint-disable react/prop-types */
import { useState } from "react";

export function TextBox({ onSubmit, placeholder }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content);
      setContent("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start gap-4">
        <div className="h-10 w-10 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center">
          <span className="text-slate-600 font-medium">U</span>
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-h-[100px] p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          SEND
        </button>
      </div>
    </form>
  );
}
