import React, { useState, useEffect, useCallback } from 'react';
import PostCard from './components/PostCard';
import CreatePostWidget from './components/CreatePostWidget';
import CreatePostModal from './components/CreatePostModal';
import ProfileWidget from './ProfileWidget';
import TrendingWidget from './TrendingWidget';
import JobsWidget from './JobsWidget';
import { postService } from '../../services/postService';
import useAuthStore from '../../stores/authStore';

const FeedContainer = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await postService.getAllPosts();
      const postsData = response?.data?.posts || response?.data || [];
      setPosts(Array.isArray(postsData) ? postsData : []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handlePostCreated = (newPost) => {
    if (newPost) {
      newPost.author = newPost.author || {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        avatarUrl: user?.avatarUrl,
        headline: user?.headline,
        specialty: user?.specialty,
      };
      setPosts(prev => [newPost, ...prev]);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await postService.deletePost?.(postId);
      setPosts(prev => prev.filter(p => p.id !== postId));
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  if (!user) return null;

  return (
    <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto pb-24 lg:pb-8">
      {/* Main Feed */}
      <div className="flex-1 min-w-0 space-y-4">
        <CreatePostWidget user={user} onCreatePost={() => setShowCreateModal(true)} />

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="card p-6 space-y-4 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="space-y-2 flex-1">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-32" />
                    <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded w-48" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="card p-12 text-center">
            <div className="text-4xl mb-4">📝</div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No posts yet</h3>
            <p className="text-sm text-slate-500 mb-4">Be the first to share something with the community!</p>
            <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
              Create a post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onDelete={handleDeletePost}
                onRefresh={fetchPosts}
              />
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-80 space-y-4 shrink-0">
        <ProfileWidget user={user} />
        <TrendingWidget />
        <JobsWidget />
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onPostCreated={handlePostCreated}
      />
    </div>
  );
};

export default FeedContainer;
