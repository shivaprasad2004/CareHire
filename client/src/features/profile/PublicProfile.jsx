import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Building2, GraduationCap, Award, BookOpen, Heart, Globe, Mail, Phone, MessageSquare, UserPlus, UserCheck, MoreHorizontal, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { userService } from '../../services/userService';
import Card from '../../components/ui/Card';
import Avatar from '../../components/ui/Avatar';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import useAuthStore from '../../stores/authStore';

const PublicProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const currentUser = useAuthStore(s => s.user);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  const isOwnProfile = userId === 'me' || userId === currentUser?.id;

  useEffect(() => {
    loadProfile();
  }, [userId]);

  const loadProfile = async () => {
    try {
      setLoading(true);
      let res;
      if (isOwnProfile) {
        res = await userService.getCurrentUser();
      } else {
        res = await userService.getUserById(userId);
      }
      if (res.status === 'success') {
        setProfile(res.data.user);
      }
    } catch (err) {
      console.error('Error loading profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const safeParseJSON = (str, fallback = []) => {
    if (!str) return fallback;
    if (Array.isArray(str)) return str;
    try { return JSON.parse(str); } catch { return fallback; }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="skeleton h-48 rounded-2xl" />
        <div className="skeleton h-32 rounded-2xl" />
        <div className="skeleton h-64 rounded-2xl" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <h2 className="text-xl font-bold mb-2">Profile not found</h2>
        <Button onClick={() => navigate('/network')}>Browse Network</Button>
      </div>
    );
  }

  const experience = safeParseJSON(profile.experience);
  const education = safeParseJSON(profile.education);
  const skills = safeParseJSON(profile.skills);
  const certifications = safeParseJSON(profile.certifications);
  const publications = safeParseJSON(profile.publications);
  const profileStrength = [profile.avatarUrl, profile.bio, profile.skills, profile.experience, profile.education].filter(Boolean).length * 20;

  return (
    <div className="max-w-4xl mx-auto pb-8">
      {/* Profile Header */}
      <Card padding="p-0" className="overflow-hidden mb-4">
        {/* Cover */}
        <div className="h-32 md:h-48 bg-gradient-to-r from-carehire-600 via-teal-500 to-emerald-400 relative">
          {profile.coverUrl && <img src={profile.coverUrl} alt="Cover" className="w-full h-full object-cover" />}
        </div>

        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12 md:-mt-16">
            <div className={`relative ${profile.openToWork ? 'open-to-work-ring rounded-full' : ''}`}>
              <Avatar src={profile.avatarUrl} name={`${profile.firstName} ${profile.lastName}`} size="2xl" />
              {profile.openToWork && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                  Open to Work
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0 pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl md:text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
                {profile.isVerified && <Badge variant="verified">Verified</Badge>}
                {profile.pronouns && <span className="text-sm text-slate-500">({profile.pronouns})</span>}
              </div>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-1">{profile.headline || profile.title || profile.specialty || 'Medical Professional'}</p>
              <div className="flex items-center gap-3 mt-2 text-sm text-slate-500 flex-wrap">
                {profile.location && <span className="flex items-center gap-1"><MapPin size={14} /> {profile.location}</span>}
                {profile.organization && <span className="flex items-center gap-1"><Building2 size={14} /> {profile.organization}</span>}
                <span className="text-carehire-600 font-medium cursor-pointer hover:underline">{profile.connectionsCount || 0} connections</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              {isOwnProfile ? (
                <Button variant="outline" onClick={() => navigate('/in/me')}>Edit Profile</Button>
              ) : (
                <>
                  <Button variant="primary" icon={isConnected ? <UserCheck size={16} /> : <UserPlus size={16} />}>
                    {isConnected ? 'Connected' : 'Connect'}
                  </Button>
                  <Button variant="secondary" icon={<MessageSquare size={16} />} onClick={() => navigate('/messaging')}>
                    Message
                  </Button>
                  <Button variant="ghost" className="!px-2"><MoreHorizontal size={20} /></Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {/* About */}
          {profile.bio && (
            <Card>
              <h2 className="text-lg font-bold mb-3">About</h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line">{profile.bio}</p>
            </Card>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Experience</h2>
              <div className="space-y-4">
                {experience.map((exp, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <Building2 size={20} className="text-slate-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 dark:text-white">{exp.role || exp.title}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{exp.company || exp.organization}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{exp.period || `${exp.startDate || ''} - ${exp.endDate || 'Present'}`}</p>
                      {exp.description && <p className="text-sm text-slate-500 mt-2">{exp.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Education */}
          {education.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Education</h2>
              <div className="space-y-4">
                {education.map((edu, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                      <GraduationCap size={20} className="text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-white">{edu.school}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{edu.degree}</p>
                      {edu.year && <p className="text-xs text-slate-400">{edu.year}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <Card>
              <h2 className="text-lg font-bold mb-4">Licenses & Certifications</h2>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Award size={20} className="text-amber-500 shrink-0" />
                    <div>
                      <h3 className="font-medium text-sm">{cert.name || cert}</h3>
                      {cert.issuer && <p className="text-xs text-slate-500">{cert.issuer}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Profile Strength (own profile only) */}
          {isOwnProfile && (
            <Card>
              <h3 className="font-bold text-sm mb-3">Profile Strength</h3>
              <ProgressBar value={profileStrength} color={profileStrength >= 80 ? 'green' : profileStrength >= 50 ? 'amber' : 'red'} />
              <p className="text-xs text-slate-500 mt-2">
                {profileStrength < 60 ? 'Add more details to strengthen your profile' : profileStrength < 100 ? 'Almost there! Complete your profile' : 'Your profile is complete!'}
              </p>
            </Card>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <Card>
              <h2 className="font-bold mb-3">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, i) => (
                  <span key={i} className="tag-primary">{skill}</span>
                ))}
              </div>
            </Card>
          )}

          {/* Contact Info */}
          <Card>
            <h3 className="font-bold text-sm mb-3">Contact</h3>
            <div className="space-y-2 text-sm">
              {profile.email && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail size={14} className="text-slate-400" /> {profile.email}
                </div>
              )}
              {profile.phone && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone size={14} className="text-slate-400" /> {profile.phone}
                </div>
              )}
              {profile.website && (
                <a href={profile.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-carehire-600 hover:underline">
                  <Globe size={14} /> Website
                </a>
              )}
            </div>
          </Card>

          {/* Profile Views (own profile) */}
          {isOwnProfile && (
            <Card>
              <div className="flex items-center gap-3">
                <Eye size={18} className="text-slate-400" />
                <div>
                  <div className="font-bold text-lg">{profile.profileViews || 0}</div>
                  <div className="text-xs text-slate-500">Profile views</div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
