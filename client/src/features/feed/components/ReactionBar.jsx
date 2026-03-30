import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Repeat2, Send, ThumbsUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const reactions = [
  { type: 'like', emoji: '\u{1F44D}', label: 'Like', color: 'text-blue-600' },
  { type: 'celebrate', emoji: '\u{1F44F}', label: 'Celebrate', color: 'text-green-600' },
  { type: 'support', emoji: '\u2764\uFE0F', label: 'Support', color: 'text-red-500' },
  { type: 'insightful', emoji: '\u{1F4A1}', label: 'Insightful', color: 'text-amber-500' },
  { type: 'curious', emoji: '\u{1F914}', label: 'Curious', color: 'text-purple-500' },
];

const ReactionBar = ({ post, onReact, onComment, onShare, userReaction }) => {
  const [showReactions, setShowReactions] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowReactions(true), 500);
  };

  const handleMouseLeave = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowReactions(false), 300);
  };

  const handleReact = (type) => {
    setShowReactions(false);
    onReact(type);
  };

  const activeReaction = userReaction ? reactions.find(r => r.type === userReaction) : null;

  return (
    <div className="flex items-center justify-between py-1">
      {/* Like / React */}
      <div
        className="relative flex-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          onClick={() => handleReact(userReaction ? null : 'like')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg w-full justify-center transition-colors ${
            activeReaction
              ? `${activeReaction.color} font-semibold hover:bg-slate-50 dark:hover:bg-slate-800`
              : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800'
          }`}
        >
          {activeReaction ? (
            <span className="text-lg">{activeReaction.emoji}</span>
          ) : (
            <ThumbsUp size={18} />
          )}
          <span className="text-sm">{activeReaction?.label || 'Like'}</span>
        </button>

        {/* Reaction Picker */}
        <AnimatePresence>
          {showReactions && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              className="absolute bottom-full left-0 mb-2 flex items-center gap-1 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 px-2 py-1.5 z-50"
              onMouseEnter={() => clearTimeout(timeoutRef.current)}
              onMouseLeave={handleMouseLeave}
            >
              {reactions.map((r, i) => (
                <motion.button
                  key={r.type}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleReact(r.type)}
                  className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-125 transition-all group relative"
                  title={r.label}
                >
                  <span className="text-2xl">{r.emoji}</span>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-medium bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 px-2 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {r.label}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Comment */}
      <button
        onClick={onComment}
        className="flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <MessageCircle size={18} />
        <span className="text-sm">Comment</span>
      </button>

      {/* Share */}
      <button
        onClick={onShare}
        className="flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
      >
        <Repeat2 size={18} />
        <span className="text-sm">Repost</span>
      </button>

      {/* Send */}
      <button className="flex items-center gap-2 px-4 py-2 rounded-lg flex-1 justify-center text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
        <Send size={18} />
        <span className="text-sm">Send</span>
      </button>
    </div>
  );
};

export default ReactionBar;
