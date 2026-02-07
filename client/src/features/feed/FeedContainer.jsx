import React, { useState, useEffect, useCallback } from 'react';
import PostCard from './components/PostCard';
import FeedHeader from './components/FeedHeader';
import CreatePostWidget from './components/CreatePostWidget';
import SmartRounds from './SmartRounds';
import UrgentCases from './UrgentCases';
import ProfileWidget from './ProfileWidget';
import TrendingWidget from './TrendingWidget';
import JobsWidget from './JobsWidget';
import { postService } from '../../services/postService';
import withAuth from '../../hoc/withAuth.jsx';
import withLoading from '../../hoc/withLoading.jsx';
import Feed from './Feed';

const FeedContainer = ({ user }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await postService.getAllPosts();
      
      const data = response;
      
      // Map API data to UI format
      const mappedPosts = data.data.posts.map(post => ({
        id: post.id,
        author: `${post.author.firstName} ${post.author.lastName}`,
        role: post.author.specialty || 'Healthcare Professional',
        org: 'Medical Center',
        time: new Date(post.createdAt).toLocaleDateString(),
        title: post.type === 'UrgentCase' ? 'Urgent Case' : (post.type === 'SmartRound' ? 'Smart Round' : 'Medical Update'),
        content: post.content,
        category: post.type || 'General',
        image: post.mediaUrl,
        stats: { 
          likes: post.likesCount || 0, 
          comments: post.commentsCount || 0, 
          consults: 0 
        },
        verified: false
      }));

      setPosts(mappedPosts);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleLike = useCallback(async (postId) => {
    try {
      await postService.likePost(postId);
      
      setPosts(currentPosts => 
        currentPosts.map(post => 
          post.id === postId 
            ? { ...post, stats: { ...post.stats, likes: post.stats.likes + 1 } }
            : post
        )
      );
    } catch (err) {
      console.error("Error liking post:", err);
    }
  }, []);

  const handleCreatePost = useCallback(() => {
    // Implement create post logic
    console.log('Create post clicked');
  }, []);

  const handleShare = useCallback((postId) => {
    // Implement share logic
    console.log('Share post:', postId);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto py-6 px-4 lg:px-8 pb-24 lg:pb-8">
      
      {/* Main Feed Column */}
      <div className="flex-1 min-w-0">
        
        {/* Mobile Profile Header (Visible only on small screens) */}
        <FeedHeader user={user} />

        {/* Urgent Cases (Stories) - NEW FEATURE */}
        <UrgentCases />

        {/* Smart Rounds Triage - "Something New" */}
        <SmartRounds />

        {/* Spacer */}
        <div className="h-6"></div>

        {/* Create Post Widget - Redesigned */}
        <CreatePostWidget user={user} onCreatePost={handleCreatePost} />

        {/* Posts - "Medical Case Cards" */}
        <div className="space-y-6">
          {posts.map(post => (
            <PostCard 
              key={post.id}
              post={post}
              onLike={handleLike}
              onShare={handleShare}
            />
          ))}
        </div>

        {/* Mobile Widgets (Visible on small screens) */}
        <div className="lg:hidden mt-8 space-y-6">
          <ProfileWidget user={user} />
          <TrendingWidget />
          <JobsWidget />
        </div>

      </div>

      {/* Right Sidebar (Widgets) - Refined */}
      <div className="hidden lg:block w-80 space-y-6">
        <ProfileWidget user={user} />
        <TrendingWidget />
        <JobsWidget />
      </div>
    </div>
  );
};

export default withAuth(
  withLoading(FeedContainer, {
    loadingDelay: 300,
    loadingMessage: 'Loading your feed...',
    errorMessage: 'Failed to load feed',
    retryButton: true
  })
);