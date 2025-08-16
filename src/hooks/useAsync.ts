import { useState, useCallback, useRef } from "react";

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useAsync<T = any>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const mountedRef = useRef(true);

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const result = await asyncFunction();

      if (mountedRef.current) {
        setState((prev) => ({ ...prev, data: result, loading: false }));
      }

      return result;
    } catch (error) {
      if (mountedRef.current) {
        setState((prev) => ({
          ...prev,
          error:
            error instanceof Error ? error : new Error("An error occurred"),
          loading: false,
        }));
      }
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  const setData = useCallback((data: T) => {
    setState((prev) => ({ ...prev, data }));
  }, []);

  const setError = useCallback((error: Error) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState((prev) => ({ ...prev, loading }));
  }, []);

  // Cleanup on unmount
  const mountedRef2 = useRef(true);
  mountedRef2.current = true;

  return {
    ...state,
    execute,
    reset,
    setData,
    setError,
    setLoading,
  };
}
