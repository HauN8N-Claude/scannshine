import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildWriteReviewUrl,
  resolvePlaceId,
  validateManualPlaceId,
} from "@/lib/place-id";

const PLACE_ID = "ChIJN1t_tDeuEmsRUsoyG83frY4";

const mockFetchSequence = (
  responses: { status: number; location?: string; body?: string }[],
) => {
  const fetchMock = vi.fn();
  for (const response of responses) {
    fetchMock.mockResolvedValueOnce(
      new Response(response.body ?? "", {
        status: response.status,
        headers: response.location ? { location: response.location } : {},
      }),
    );
  }
  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
};

describe("validateManualPlaceId", () => {
  it("accepts a standard ChIJ place id", () => {
    expect(validateManualPlaceId(PLACE_ID)).toBe(true);
  });

  it("rejects random strings and URLs", () => {
    expect(validateManualPlaceId("hello")).toBe(false);
    expect(validateManualPlaceId("https://maps.app.goo.gl/abc")).toBe(false);
    expect(validateManualPlaceId("")).toBe(false);
  });
});

describe("buildWriteReviewUrl", () => {
  it("builds the Google write review URL", () => {
    expect(buildWriteReviewUrl(PLACE_ID)).toBe(
      `https://search.google.com/local/writereview?placeid=${PLACE_ID}`,
    );
  });
});

describe("resolvePlaceId", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("returns the place id directly when the input is a place id", async () => {
    const result = await resolvePlaceId(`  ${PLACE_ID}  `);
    expect(result).toEqual({ placeId: PLACE_ID });
  });

  it("extracts placeid from an explicit query param without network", async () => {
    const result = await resolvePlaceId(
      `https://www.google.com/maps/place/?placeid=${PLACE_ID}`,
    );
    expect(result).toMatchObject({ placeId: PLACE_ID });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("extracts the place id and name from a long desktop URL", async () => {
    const url = `https://www.google.com/maps/place/Snack+Chez+Maeva/@-17.53,-149.56,17z/data=!3m1!4b1!4m6!3m5!1s0x769b2:0x4cd5!8m2!3d-17.53!4d-149.56!19s${PLACE_ID}`;
    const result = await resolvePlaceId(url);
    expect(result).toMatchObject({
      placeId: PLACE_ID,
      businessName: "Snack Chez Maeva",
    });
  });

  it("follows short-link redirects to the long URL", async () => {
    mockFetchSequence([
      {
        status: 302,
        location: `https://www.google.com/maps/place/Roulotte+Tahiti/data=!19s${PLACE_ID}`,
      },
    ]);

    const result = await resolvePlaceId("https://maps.app.goo.gl/AbCdEf123");
    expect(result).toMatchObject({
      placeId: PLACE_ID,
      businessName: "Roulotte Tahiti",
    });
  });

  it("follows multiple redirect hops", async () => {
    mockFetchSequence([
      { status: 301, location: "https://maps.google.com/xyz" },
      {
        status: 302,
        location: `https://www.google.com/maps/place/Garage+Heiva/?placeid=${PLACE_ID}`,
      },
    ]);

    const result = await resolvePlaceId("https://g.co/kgs/short");
    expect(result).toMatchObject({ placeId: PLACE_ID });
  });

  it("extracts a canonical maps URL embedded in an HTML body", async () => {
    mockFetchSequence([
      {
        status: 200,
        body: `<html><script>var u = "https://www.google.com/maps/place/Pension+Moana/data=!19s${PLACE_ID}";</script></html>`,
      },
    ]);

    const result = await resolvePlaceId("https://maps.app.goo.gl/htmlcase");
    expect(result).toMatchObject({ placeId: PLACE_ID });
  });

  it("returns UNRESOLVED for non-Google hosts without network call", async () => {
    const result = await resolvePlaceId("https://example.com/maps");
    expect(result).toEqual({ error: "UNRESOLVED" });
    expect(fetch).not.toHaveBeenCalled();
  });

  it("returns UNRESOLVED when redirects never expose a place id", async () => {
    mockFetchSequence([{ status: 200, body: "<html>rien ici</html>" }]);
    const result = await resolvePlaceId("https://maps.app.goo.gl/nothing");
    expect(result).toEqual({ error: "UNRESOLVED" });
  });

  it("returns UNRESOLVED when the network fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network down"));
    vi.stubGlobal("fetch", fetchMock);
    const result = await resolvePlaceId("https://maps.app.goo.gl/failure");
    expect(result).toEqual({ error: "UNRESOLVED" });
  });
});
