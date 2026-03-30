import React, { useState, useRef } from 'react';
import { Image, Video, FileText, BarChart3, Globe, Users, Lock, X, Smile, Hash, AtSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../../../components/ui/Modal';
import Avatar from '../../../components/ui/Avatar';
import Button from '../../../components/ui/Button';
import { postService } from '../../../services/postService';
import { uploadService } from '../../../services/uploadService';
import useAuthStore from '../../../stores/authStore';
import toast from 'react-hot-toast';

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const user = useAuthStore(s => s.user);
  const [content, setContent] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [visibility, setVisibility] = useState('public');
  const [posting, setPosting] = useState(false);
  const [showPoll, setShowPoll] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']);
  const fileInputRef = useRef(null);

  const visibilityOptions = [
    { value: 'public', icon: Globe, label: 'Anyone' },
    { value: 'connections', icon: Users, label: 'Connections only' },
    { value: 'private', icon: Lock, label: 'Only me' },
  ];

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + mediaFiles.length > 4) {
      toast.error('Maximum 4 files allowed');
      return;
    }
    setMediaFiles(prev => [...prev, ...files]);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setMediaPreviews(prev => [...prev, { url: ev.target.result, type: file.type }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = (index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
    setMediaPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!content.trim() && mediaFiles.length === 0 && !showPoll) {
      toast.error('Please write something or add media');
      return;
    }
    try {
      setPosting(true);
      let mediaUrl = null;
      let mediaUrls = [];

      if (mediaFiles.length > 0) {
        for (const file of mediaFiles) {
          try {
            const uploadRes = await uploadService.uploadImage(file);
            if (uploadRes.status === 'success') {
              mediaUrls.push(uploadRes.data.url);
              if (!mediaUrl) mediaUrl = uploadRes.data.url;
            }
          } catch (err) {
            console.error('Upload failed:', err);
          }
        }
      }

      const postData = {
        content: content.trim(),
        mediaUrl,
        mediaUrls,
        visibility,
        type: 'Regular',
        mediaType: mediaFiles.length > 0 ? 'image' : showPoll ? 'poll' : 'none',
      };

      if (showPoll) {
        postData.pollOptions = pollOptions.filter(o => o.trim()).map(text => ({ text, votes: 0 }));
      }

      const res = await postService.createPost(postData);
      if (res.status === 'success') {
        toast.success('Post published!');
        if (onPostCreated) onPostCreated(res.data.post || res.data);
        handleClose();
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create post');
    } finally {
      setPosting(false);
    }
  };

  const handleClose = () => {
    setContent('');
    setMediaFiles([]);
    setMediaPreviews([]);
    setShowPoll(false);
    setPollOptions(['', '']);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create a post" size="lg">
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar src={user?.avatarUrl} name={`${user?.firstName} ${user?.lastName}`} size="md" />
          <div>
            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{user?.firstName} {user?.lastName}</h4>
            <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-carehire-600 mt-0.5">
              {visibilityOptions.find(v => v.value === visibility)?.icon && (
                React.createElement(visibilityOptions.find(v => v.value === visibility).icon, { size: 12 })
              )}
              <span>{visibilityOptions.find(v => v.value === visibility)?.label}</span>
            </button>
          </div>
        </div>

        {/* Editor */}
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          placeholder="What do you want to talk about?"
          className="w-full min-h-[160px] resize-none border-0 focus:ring-0 focus:outline-none text-base text-slate-900 dark:text-white placeholder:text-slate-400 bg-transparent"
          autoFocus
        />

        {/* Media Previews */}
        {mediaPreviews.length > 0 && (
          <div className={`grid gap-2 mb-4 ${mediaPreviews.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
            {mediaPreviews.map((media, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                {media.type.startsWith('image') ? (
                  <img src={media.url} alt="" className="w-full h-48 object-cover" />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center">
                    <FileText size={40} className="text-slate-400" />
                  </div>
                )}
                <button
                  onClick={() => removeMedia(i)}
                  className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-black/70 rounded-full text-white"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Poll Options */}
        <AnimatePresence>
          {showPoll && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-4">
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
                <h4 className="text-sm font-semibold mb-2">Poll Options</h4>
                {pollOptions.map((opt, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className="input-sm flex-1"
                      value={opt}
                      onChange={e => {
                        const newOpts = [...pollOptions];
                        newOpts[i] = e.target.value;
                        setPollOptions(newOpts);
                      }}
                      placeholder={`Option ${i + 1}`}
                    />
                    {pollOptions.length > 2 && (
                      <button onClick={() => setPollOptions(prev => prev.filter((_, idx) => idx !== i))} className="text-slate-400 hover:text-red-500">
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 4 && (
                  <button onClick={() => setPollOptions(prev => [...prev, ''])} className="text-sm text-carehire-600 font-medium hover:underline">
                    + Add option
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hashtag suggestions */}
        <div className="flex items-center gap-2 mb-4 text-xs text-slate-400">
          <Hash size={14} />
          <span>Add relevant hashtags to increase visibility</span>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-1">
            <input ref={fileInputRef} type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleFileSelect} />
            <button onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-500 hover:text-carehire-600 hover:bg-carehire-50 dark:hover:bg-carehire-950 rounded-lg transition-colors" title="Add photo">
              <Image size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:text-carehire-600 hover:bg-carehire-50 dark:hover:bg-carehire-950 rounded-lg transition-colors" title="Add video">
              <Video size={20} />
            </button>
            <button className="p-2 text-slate-500 hover:text-carehire-600 hover:bg-carehire-50 dark:hover:bg-carehire-950 rounded-lg transition-colors" title="Add document">
              <FileText size={20} />
            </button>
            <button
              onClick={() => setShowPoll(!showPoll)}
              className={`p-2 rounded-lg transition-colors ${showPoll ? 'text-carehire-600 bg-carehire-50' : 'text-slate-500 hover:text-carehire-600 hover:bg-carehire-50 dark:hover:bg-carehire-950'}`}
              title="Create poll"
            >
              <BarChart3 size={20} />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs ${content.length > 2800 ? 'text-red-500' : 'text-slate-400'}`}>
              {content.length}/3000
            </span>
            <Button
              variant="gradient"
              onClick={handlePost}
              loading={posting}
              disabled={!content.trim() && mediaFiles.length === 0}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;
