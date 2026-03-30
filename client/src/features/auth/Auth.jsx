import React, { useState, useEffect } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2, ArrowLeft, Stethoscope, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { authService } from '../../services/authService';

const Auth = ({ onLogin, onBack, defaultTab }) => {
  const [isLogin, setIsLogin] = useState(defaultTab !== 'register');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: '',
  });

  useEffect(() => {
    if (defaultTab === 'register') setIsLogin(false);
  }, [defaultTab]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      let response;
      if (isLogin) {
        response = await authService.login({
          email: formData.email,
          password: formData.password,
        });
      } else {
        response = await authService.register({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          passwordConfirm: formData.confirmPassword,
          specialty: formData.specialty,
        });
      }

      const token = response.token;
      const user = response.data.user;
      onLogin(user, token);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-carehire-50/30 to-teal-50/20 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-carehire-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-11 w-11 bg-gradient-to-br from-carehire-600 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-carehire-600/30 text-base">
              CH
            </div>
            <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Care<span className="text-carehire-600">Hire</span>
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            The professional network for medical students
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl dark:shadow-slate-900/50 border border-slate-200/60 dark:border-slate-800 overflow-hidden"
        >
          {onBack && (
            <button
              onClick={onBack}
              className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors z-10"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          {/* Tab Switcher */}
          <div className="flex border-b border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                isLogin ? 'text-carehire-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Sign In
              {isLogin && (
                <motion.div
                  layoutId="authTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-carehire-600"
                />
              )}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                !isLogin ? 'text-carehire-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              Create Account
              {!isLogin && (
                <motion.div
                  layoutId="authTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-carehire-600"
                />
              )}
            </button>
          </div>

          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/30 flex items-center gap-2"
                >
                  <span className="shrink-0">!</span>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-4">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">First Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            name="firstName"
                            required={!isLogin}
                            className="input pl-10 py-2.5"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Last Name</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                          <input
                            type="text"
                            name="lastName"
                            required={!isLogin}
                            className="input pl-10 py-2.5"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Specialty</label>
                      <div className="relative">
                        <Stethoscope className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <select
                          name="specialty"
                          className="input pl-10 py-2.5 appearance-none"
                          value={formData.specialty}
                          onChange={handleChange}
                        >
                          <option value="">Select specialty (optional)</option>
                          <option value="General Medicine">General Medicine</option>
                          <option value="Surgery">Surgery</option>
                          <option value="Cardiology">Cardiology</option>
                          <option value="Neurology">Neurology</option>
                          <option value="Pediatrics">Pediatrics</option>
                          <option value="Oncology">Oncology</option>
                          <option value="Emergency Medicine">Emergency Medicine</option>
                          <option value="Psychiatry">Psychiatry</option>
                          <option value="Radiology">Radiology</option>
                          <option value="Orthopedics">Orthopedics</option>
                          <option value="Nursing">Nursing</option>
                          <option value="Pharmacy">Pharmacy</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    name="email"
                    required
                    className="input pl-10 py-2.5"
                    placeholder="you@medical.edu"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    minLength="8"
                    className="input pl-10 pr-10 py-2.5"
                    placeholder="Min. 8 characters"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {!isLogin && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5 block">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="password"
                        name="confirmPassword"
                        required={!isLogin}
                        minLength="8"
                        className="input pl-10 py-2.5"
                        placeholder="Re-enter password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {isLogin && (
                <div className="text-right">
                  <button type="button" className="text-xs font-medium text-carehire-600 hover:underline">
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn btn-gradient py-3 rounded-xl text-base mt-2 group"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
              <span className="text-xs text-slate-400 font-medium">or</span>
              <div className="flex-1 border-t border-slate-200 dark:border-slate-700" />
            </div>

            {/* Social Login */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-400">
          <p>
            By continuing, you agree to CareHire's{' '}
            <button className="text-carehire-600 hover:underline font-medium">Terms</button>
            {' '}and{' '}
            <button className="text-carehire-600 hover:underline font-medium">Privacy Policy</button>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
