import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (WrappedComponent, options = {}) => {
  const { requireAuth = true, redirectTo = '/login', fallback = null } = options;
  
  const WithAuthComponent = (props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (token && storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    }, []);

    useEffect(() => {
      if (!loading && requireAuth && !user) {
        navigate(redirectTo);
      } else if (!loading && !requireAuth && user) {
        navigate('/dashboard');
      }
    }, [user, loading, navigate, requireAuth, redirectTo]);

    if (loading) {
      return fallback || <div className="auth-loading">Loading...</div>;
    }

    if (requireAuth && !user) {
      return null;
    }

    if (!requireAuth && user) {
      return null;
    }

    return <WrappedComponent user={user} {...props} />;
  };

  WithAuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  
  return WithAuthComponent;
};

export default withAuth;