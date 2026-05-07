import { describe, expect, it, vi } from "vitest";
import { ApiError, getJson } from "../api/client";

describe("getJson", () => {
  it("returns parsed JSON on 200", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: () => Promise.resolve({ id: 1, name: "Ada" }),
      }),
    );

    const out = await getJson<{ id: number; name: string }>("/users/1");
    expect(out).toEqual({ id: 1, name: "Ada" });
  });

  it("throws ApiError on non-2xx", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
        statusText: "Not Found",
      }),
    );

    await expect(getJson("/missing")).rejects.toBeInstanceOf(ApiError);
  });
});
