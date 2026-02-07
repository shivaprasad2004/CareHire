import { useState, useCallback, useRef } from 'react';

const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const execute = useCallback(async (apiFunction, ...args) => {
    try {
      setLoading(true);
      setError(null);
      
      // Create new abort controller for this request
      abortControllerRef.current = new AbortController();
      
      // Add signal to last argument if it's an options object
      const lastArg = args[args.length - 1];
      if (typeof lastArg === 'object' && !lastArg.signal) {
        args[args.length - 1] = { ...lastArg, signal: abortControllerRef.current.signal };
      } else if (typeof lastArg !== 'object') {
        args.push({ signal: abortControllerRef.current.signal });
      }
      
      const result = await apiFunction(...args);
      return result;
    } catch (err) {
      if (err.name === 'AbortError') {
        console.log('Request was aborted');
        return null;
      }
      
      setError(err.message || 'An error occurred');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  return {
    execute,
    cancel,
    loading,
    error
  };
};

export default useApi;