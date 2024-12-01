"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import VideoCard from "@/components/VideoCard";

// Sample video data (replace with your API call)
const generateMockVideos = (start: number, end: number) => {
  return Array.from({ length: end - start }, (_, i) => ({
    id: `video-${start + i}`,
    thumbnail: `https://picsum.photos/seed/${start + i}/640/360`,
    title: `Sample Video ${start + i} - Amazing Royalty Free Content`,
    channelName: `Channel ${Math.floor(Math.random() * 100)}`,
    channelImage: `https://picsum.photos/seed/channel${Math.floor(
      Math.random() * 100
    )}/100/100`,
    views: Math.floor(Math.random() * 1000000),
    uploadedAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)),
    duration: `${Math.floor(Math.random() * 10)}:${Math.floor(
      Math.random() * 60
    )
      .toString()
      .padStart(2, "0")}`,
  }));
};

export default function Home() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const loadMoreVideos = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newVideos = generateMockVideos(videos.length, videos.length + 12);
      setVideos((prev) => [...prev, ...newVideos]);

      // Stop loading more after certain amount (for demo purposes)
      if (videos.length >= 100) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const lastVideoRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreVideos();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  // Load initial videos
  useEffect(() => {
    loadMoreVideos();
    
    // Cleanup observer on unmount
    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="max-w-[2000px] mx-auto">
      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {videos.map((video, index) => (
          <div
            key={video.id}
            ref={index === videos.length - 1 ? lastVideoRef : undefined}>
            <VideoCard {...video} />
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center p-4">
          <div className="w-6 h-6 border-2 border-blue-600 rounded-full animate-spin border-t-transparent" />
        </div>
      )}

      {/* End of content message */}
      {!hasMore && (
        <div className="text-center text-gray-600 p-4">
          No more videos to load
        </div>
      )}
    </div>
  );
}
