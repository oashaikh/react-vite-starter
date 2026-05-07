import { useEffect, useState } from "react";

/**
 * Returns a debounced copy of `value` that updates after `delay` ms of
 * inactivity. Useful for search-on-type without hammering the API.
 */
export function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
