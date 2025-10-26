import { useState, useEffect, useRef } from "react";

export default function useJikanImages(animeTitles) {
  const [images, setImages] = useState({});
  const cacheRef = useRef({});

  useEffect(() => {
    if (!animeTitles || animeTitles.length === 0) return;

    // Load cache from localStorage
    const cachedRaw = localStorage.getItem("jikanCache");
    cacheRef.current = cachedRaw ? JSON.parse(cachedRaw) : {};
    setImages(cacheRef.current);

    const uniqueTitles = [...new Set(animeTitles.filter(Boolean))];
    const toFetch = uniqueTitles.filter(t => !(t in cacheRef.current));

    async function fetchImage(title) {
      try {
        const res = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(title)}&limit=1`
        );
        const data = await res.json();
        const image =
          data.data?.[0]?.images?.jpg?.large_image_url ||
          data.data?.[0]?.images?.jpg?.image_url ||
          null;

        if (image) {
          cacheRef.current[title] = image;
          setImages(prev => ({ ...prev, [title]: image }));
          localStorage.setItem("jikanCache", JSON.stringify(cacheRef.current));
        }
      } catch (err) {
        console.warn(`⚠️ Jikan fetch failed for "${title}"`, err);
      }
    }

    async function loadAll() {
      console.log(`🎌 Fetching ${toFetch.length} anime from Jikan...`);
      for (let i = 0; i < toFetch.length; i++) {
        const title = toFetch[i];
        await fetchImage(title);
        await new Promise(r => setTimeout(r, 500)); // wait 0.5s per call to be nice
      }
    }

    loadAll();
  }, [JSON.stringify(animeTitles)]);

  return images;
}
