import { useState, useEffect } from "react";

const useImagePreloader = (movies, isLoading) => {
  const [areImagesLoaded, setAreImagesLoaded] = useState(false);

  useEffect(() => {
    if (isLoading) setAreImagesLoaded(false);
  }, [isLoading]);

  useEffect(() => {
    let cancelled = false;

    if (isLoading) {
      return () => {};
    }

    if (!movies?.length) {
      setAreImagesLoaded(true);

      return () => {};
    }

    const posters = movies
      .map(movie => movie.posterUrl)
      .filter(poster => !!poster);

    // All posters are missing — unblock immediately
    if (!posters.length) {
      setAreImagesLoaded(true);

      return () => {};
    }

    let remaining = posters.length;

    posters.forEach(src => {
      const img = new Image();

      img.onload = img.onerror = () => {
        if (cancelled) return;

        remaining -= 1;

        if (remaining === 0) setAreImagesLoaded(true);
      };

      img.src = src;
    });

    return () => {
      cancelled = true;
    };
  }, [movies, isLoading]);

  return areImagesLoaded;
};

export default useImagePreloader;
