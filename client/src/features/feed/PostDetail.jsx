import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, Send } from 'lucide-react';
import { postService } from '../../services/postService';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Button from '../../components/ui/Button';
import EmptyState from '../../components/ui/EmptyState';
import useAuthStore from '../../stores/authStore';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore(s => s.user);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');

  useEffect(() => {
    loadPost();
  }, [postId]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const res = await postService.getPostById(postId);
      if (res.status === 'success') setPost(res.data?.post || res.data);
    } catch (err) {
      console.error('Error loading post:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="skeleton h-8 w-32 rounded-lg" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  if (!post) return <EmptyState title="Post not found" />;

  return (
    <div className="max-w-3xl mx-auto pb-8">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 mb-4">
        <ArrowLeft size={16} /> Back
      </button>

      <Card>
        {/* Author */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar src={post.author?.avatarUrl} name={`${post.author?.firstName || ''} ${post.author?.lastName || ''}`} size="md" />
          <div className="flex-1">
            <h3 className="font-semibold text-slate-900 dark:text-white cursor-pointer hover:text-carehire-600 hover:underline" onClick={() => navigate(`/in/${post.author?.id}`)}>
              {post.author?.firstName} {post.author?.lastName}
            </h3>
            <p className="text-xs text-slate-500">{post.author?.headline || post.author?.specialty || 'Medical Professional'}</p>
            <p className="text-xs text-slate-400">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Content */}
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line mb-4">{post.content}</div>

        {/* Media */}
        {post.mediaUrl && (
          <div className="rounded-xl overflow-hidden mb-4">
            <img src={post.mediaUrl} alt="" className="w-full max-h-[500px] object-cover" />
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between py-3 border-y border-slate-100 dark:border-slate-800 text-sm text-slate-500">
          <span>{post.likesCount || 0} reactions</span>
          <div className="flex gap-4">
            <span>{post.commentsCount || 0} comments</span>
            <span>{post.sharesCount || 0} shares</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-around py-2 border-b border-slate-100 dark:border-slate-800">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Heart size={20} /> Like
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <MessageCircle size={20} /> Comment
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <Share2 size={20} /> Share
          </button>
        </div>

        {/* Comments */}
        <div className="mt-4">
          <div className="flex items-start gap-3 mb-4">
            <Avatar src={user?.avatarUrl} name={`${user?.firstName} ${user?.lastName}`} size="sm" />
            <div className="flex-1 flex gap-2">
              <input
                className="input-sm flex-1"
                value={comment}
                onChange={e => setComment(e.target.value)}
                placeholder="Add a comment..."
              />
              <Button size="sm" variant="primary" disabled={!comment.trim()} icon={<Send size={14} />} />
            </div>
          </div>

          {/* Comment List */}
          {post.comments && post.comments.length > 0 && (
            <div className="space-y-3">
              {post.comments.map(c => (
                <div key={c.id} className="flex gap-3">
                  <Avatar src={c.author?.avatarUrl} name={`${c.author?.firstName} ${c.author?.lastName}`} size="sm" />
                  <div className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{c.author?.firstName} {c.author?.lastName}</span>
                      <span className="text-xs text-slate-400">{new Date(c.createdAt).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{c.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default PostDetail;
