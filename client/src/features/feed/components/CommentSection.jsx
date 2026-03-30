import React, { useState } from 'react';
import { Send, Heart, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import useAuthStore from '../../../stores/authStore';

const CommentSection = ({ comments = [], postId, onAddComment, maxVisible = 3 }) => {
  const user = useAuthStore(s => s.user);
  const [text, setText] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment({ content: text.trim(), parentId: null });
    setText('');
  };

  const handleReply = (parentId) => {
    if (!replyText.trim()) return;
    onAddComment({ content: replyText.trim(), parentId });
    setReplyText('');
    setReplyingTo(null);
  };

  const topLevelComments = comments.filter(c => !c.parentId);
  const visibleComments = showAll ? topLevelComments : topLevelComments.slice(0, maxVisible);
  const getReplies = (parentId) => comments.filter(c => c.parentId === parentId);

  return (
    <div className="pt-3">
      {/* Comment Input */}
      <div className="flex items-start gap-2 mb-4">
        <Avatar src={user?.avatarUrl} name={`${user?.firstName} ${user?.lastName}`} size="sm" />
        <div className="flex-1 flex items-center gap-2 bg-slate-50 dark:bg-slate-800 rounded-full px-4 py-2">
          <input
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            placeholder="Add a comment..."
            className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className={`p-1 rounded-full transition-colors ${text.trim() ? 'text-carehire-600 hover:bg-carehire-50' : 'text-slate-300'}`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Comment List */}
      <AnimatePresence>
        <div className="space-y-3">
          {visibleComments.map(comment => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="group"
            >
              <div className="flex gap-2">
                <Avatar src={comment.author?.avatarUrl} name={`${comment.author?.firstName} ${comment.author?.lastName}`} size="sm" />
                <div className="flex-1">
                  <div className="bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">{comment.author?.firstName} {comment.author?.lastName}</span>
                      <span className="text-[10px] text-slate-400">{comment.author?.headline || comment.author?.specialty || ''}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-0.5">{comment.content}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-1 px-1">
                    <button className="text-[11px] font-medium text-slate-500 hover:text-slate-700">Like{comment.likesCount > 0 && ` \u00B7 ${comment.likesCount}`}</button>
                    <button
                      className="text-[11px] font-medium text-slate-500 hover:text-slate-700"
                      onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    >
                      Reply
                    </button>
                    <span className="text-[10px] text-slate-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                  </div>

                  {/* Replies */}
                  {getReplies(comment.id).length > 0 && (
                    <div className="ml-2 mt-2 space-y-2 border-l-2 border-slate-100 dark:border-slate-700 pl-3">
                      {getReplies(comment.id).map(reply => (
                        <div key={reply.id} className="flex gap-2">
                          <Avatar src={reply.author?.avatarUrl} name={`${reply.author?.firstName} ${reply.author?.lastName}`} size="xs" />
                          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl px-3 py-2 flex-1">
                            <span className="font-semibold text-xs text-slate-900 dark:text-white">{reply.author?.firstName} {reply.author?.lastName}</span>
                            <p className="text-xs text-slate-700 dark:text-slate-300 mt-0.5">{reply.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Reply Input */}
                  <AnimatePresence>
                    {replyingTo === comment.id && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 ml-2 flex items-center gap-2">
                        <CornerDownRight size={14} className="text-slate-300 shrink-0" />
                        <Avatar src={user?.avatarUrl} name={`${user?.firstName} ${user?.lastName}`} size="xs" />
                        <div className="flex-1 flex items-center gap-1 bg-slate-50 dark:bg-slate-800 rounded-full px-3 py-1.5">
                          <input
                            value={replyText}
                            onChange={e => setReplyText(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && handleReply(comment.id)}
                            placeholder="Reply..."
                            className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none text-xs"
                            autoFocus
                          />
                          <button onClick={() => handleReply(comment.id)} disabled={!replyText.trim()} className="text-carehire-600 disabled:text-slate-300">
                            <Send size={12} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </AnimatePresence>

      {/* Show More */}
      {topLevelComments.length > maxVisible && !showAll && (
        <button onClick={() => setShowAll(true)} className="text-sm font-medium text-slate-500 hover:text-carehire-600 mt-3">
          View all {topLevelComments.length} comments
        </button>
      )}
    </div>
  );
};

export default CommentSection;
