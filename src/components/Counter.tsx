import { useCallback, useState } from "react";

export interface CounterProps {
  initial?: number;
  step?: number;
  min?: number;
  max?: number;
}

export function Counter({ initial = 0, step = 1, min, max }: CounterProps) {
  const [count, setCount] = useState(initial);

  const decrement = useCallback(() => {
    setCount((c) => (min !== undefined ? Math.max(min, c - step) : c - step));
  }, [step, min]);

  const increment = useCallback(() => {
    setCount((c) => (max !== undefined ? Math.min(max, c + step) : c + step));
  }, [step, max]);

  const reset = useCallback(() => setCount(initial), [initial]);

  return (
    <section aria-labelledby="counter-heading">
      <h2 id="counter-heading">Counter</h2>
      <p>
        Value: <strong data-testid="count">{count}</strong>
      </p>
      <div role="group" aria-label="counter controls">
        <button onClick={decrement} disabled={min !== undefined && count <= min}>
          −
        </button>{" "}
        <button onClick={increment} disabled={max !== undefined && count >= max}>
          +
        </button>{" "}
        <button onClick={reset}>reset</button>
      </div>
    </section>
  );
}
