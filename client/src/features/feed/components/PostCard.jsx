import React, { useState, memo } from 'react';
import { motion } from 'framer-motion';
import {
  MoreHorizontal, Bookmark, Flag, EyeOff, Link2, Trash2,
  Globe, Users as UsersIcon, ThumbsUp, MessageCircle, Clock
} from 'lucide-react';
import Avatar from '../../../components/ui/Avatar';
import ReactionBar from './ReactionBar';
import CommentSection from './CommentSection';
import useAuthStore from '../../../stores/authStore';
import { reactionService } from '../../../services/reactionService';
import { commentService } from '../../../services/commentService';
import toast from 'react-hot-toast';

const reactionEmojis = {
  like: '👍', celebrate: '👏', support: '❤️', insightful: '💡', curious: '🤔'
};

const PostCard = memo(({ post, onDelete, onRefresh }) => {
  const user = useAuthStore(s => s.user);
  const [showMenu, setShowMenu] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);
  const [userReaction, setUserReaction] = useState(post.userReaction || null);
  const [reactionsCount, setReactionsCount] = useState(post.likesCount || post.reactionsTotal || 0);
  const [commentsCount, setCommentsCount] = useState(post.commentsCount || 0);
  const [expanded, setExpanded] = useState(false);

  const author = post.author || {};
  const authorName = `${author.firstName || ''} ${author.lastName || ''}`.trim() || 'Unknown User';
  const timeAgo = getTimeAgo(post.createdAt);
  const isLong = post.content && post.content.length > 300;
  const displayContent = isLong && !expanded ? post.content.slice(0, 300) + '...' : post.content;

  const handleReact = async (type) => {
    try {
      if (type === null || type === userReaction) {
        await reactionService.removeReaction(post.id);
        setUserReaction(null);
        setReactionsCount(prev => Math.max(0, prev - 1));
      } else {
        await reactionService.addReaction(post.id, type);
        if (!userReaction) setReactionsCount(prev => prev + 1);
        setUserReaction(type);
      }
    } catch {
      toast.error('Failed to react');
    }
  };

  const toggleComments = async () => {
    if (!showComments && !commentsLoaded) {
      try {
        const res = await commentService.getComments(post.id);
        if (res.status === 'success') {
          setComments(res.data.comments || res.data || []);
          setCommentsLoaded(true);
        }
      } catch {
        console.error('Failed to load comments');
      }
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async ({ content, parentId }) => {
    try {
      const res = await commentService.createComment(post.id, { content, parentId });
      if (res.status === 'success') {
        const newComment = res.data.comment || res.data;
        newComment.author = { firstName: user.firstName, lastName: user.lastName, avatarUrl: user.avatarUrl };
        setComments(prev => [...prev, newComment]);
        setCommentsCount(prev => prev + 1);
      }
    } catch {
      toast.error('Failed to add comment');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
    toast.success('Link copied!');
    setShowMenu(false);
  };

  const mediaUrls = post.mediaUrls || (post.mediaUrl ? [post.mediaUrl] : []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="card overflow-hidden"
    >
      {/* Author Header */}
      <div className="p-4 pb-0 flex items-start gap-3">
        <Avatar
          src={author.avatarUrl}
          name={authorName}
          size="md"
          status={author.openToWork ? 'online' : undefined}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white truncate hover:underline cursor-pointer">
              {authorName}
            </h4>
            {author.openToWork && (
              <span className="text-[9px] font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-full">#OpenToWork</span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{author.headline || author.specialty || 'Medical Professional'}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Clock size={10} className="text-slate-400" />
            <span className="text-[11px] text-slate-400">{timeAgo}</span>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <Globe size={10} className="text-slate-400" />
          </div>
        </div>

        {/* Post Menu */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <MoreHorizontal size={18} />
          </button>
          {showMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
              <div className="absolute right-0 top-full mt-1 bg-white dark:bg-slate-900 rounded-xl shadow-dropdown border border-slate-200 dark:border-slate-700 w-56 z-50 overflow-hidden">
                <button onClick={handleCopyLink} className="dropdown-item w-full">
                  <Link2 size={16} className="text-slate-400" /> Copy link
                </button>
                <button className="dropdown-item w-full">
                  <Bookmark size={16} className="text-slate-400" /> Save post
                </button>
                <button className="dropdown-item w-full">
                  <EyeOff size={16} className="text-slate-400" /> Hide post
                </button>
                <button className="dropdown-item w-full">
                  <Flag size={16} className="text-slate-400" /> Report
                </button>
                {post.authorId === user?.id && (
                  <button onClick={() => { onDelete?.(post.id); setShowMenu(false); }} className="dropdown-item-danger w-full">
                    <Trash2 size={16} /> Delete post
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-3 pb-2">
        {post.type && post.type !== 'Regular' && (
          <span className="inline-block px-2.5 py-0.5 rounded-md bg-carehire-50 dark:bg-carehire-900/30 text-carehire-700 dark:text-carehire-400 text-[10px] font-bold uppercase tracking-wider mb-2">
            {post.type}
          </span>
        )}
        <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
          {displayContent}
        </p>
        {isLong && !expanded && (
          <button onClick={() => setExpanded(true)} className="text-sm font-medium text-slate-500 hover:text-carehire-600 mt-1">
            ...see more
          </button>
        )}
      </div>

      {/* Media */}
      {mediaUrls.length > 0 && (
        <div className={`${mediaUrls.length === 1 ? '' : 'grid grid-cols-2 gap-0.5'}`}>
          {mediaUrls.map((url, i) => (
            <div key={i} className="bg-slate-100 dark:bg-slate-800">
              <img src={url} alt="" className="w-full object-cover max-h-[500px]" loading="lazy" />
            </div>
          ))}
        </div>
      )}

      {/* Poll Display */}
      {post.mediaType === 'poll' && post.pollOptions && (
        <div className="px-4 py-3 space-y-2">
          {post.pollOptions.map((opt, i) => (
            <div key={i} className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <div className="bg-carehire-50 dark:bg-carehire-950/20 h-full absolute left-0 top-0" style={{ width: `${opt.percentage || 0}%` }} />
              <div className="relative px-4 py-2.5 flex justify-between items-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{opt.text}</span>
                <span className="text-xs font-bold text-slate-500">{opt.percentage || 0}%</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reactions & Comments Count */}
      {(reactionsCount > 0 || commentsCount > 0) && (
        <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1">
            {reactionsCount > 0 && (
              <>
                <div className="flex -space-x-1">
                  {userReaction && <span className="text-sm">{reactionEmojis[userReaction]}</span>}
                  {!userReaction && <ThumbsUp size={14} className="text-blue-500" />}
                </div>
                <span className="ml-1">{reactionsCount}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            {commentsCount > 0 && (
              <button onClick={toggleComments} className="hover:text-carehire-600 hover:underline">
                {commentsCount} comment{commentsCount !== 1 ? 's' : ''}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Divider */}
      <div className="mx-4 border-t border-slate-100 dark:border-slate-800" />

      {/* Reaction Bar */}
      <div className="px-2">
        <ReactionBar
          post={post}
          onReact={handleReact}
          onComment={toggleComments}
          onShare={() => {
            navigator.clipboard.writeText(`${window.location.origin}/post/${post.id}`);
            toast.success('Link copied to share!');
          }}
          userReaction={userReaction}
        />
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-800">
          <CommentSection
            comments={comments}
            postId={post.id}
            onAddComment={handleAddComment}
          />
        </div>
      )}
    </motion.div>
  );
});

PostCard.displayName = 'PostCard';

function getTimeAgo(dateStr) {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w`;
  return date.toLocaleDateString();
}

export default PostCard;
