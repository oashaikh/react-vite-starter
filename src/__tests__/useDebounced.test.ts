import { renderHook, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounced } from "../hooks/useDebounced";

describe("useDebounced", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  it("returns the initial value immediately", () => {
    const { result } = renderHook(() => useDebounced("hello", 200));
    expect(result.current).toBe("hello");
  });

  it("debounces rapid updates", () => {
    const { result, rerender } = renderHook(({ v }) => useDebounced(v, 200), {
      initialProps: { v: "a" },
    });

    rerender({ v: "ab" });
    rerender({ v: "abc" });
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(199);
    });
    expect(result.current).toBe("a");

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("abc");
  });
});
