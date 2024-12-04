"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

interface VideoCardProps {
  id: string;
  thumbnail: string;
  title: string;
  channelName: string;
  channelImage: string;
  views: number;
  uploadedAt: Date;
  duration: string;
}

const VideoCard = ({
  id,
  thumbnail,
  title,
  channelName,
  channelImage,
  views,
  uploadedAt,
  duration,
}: VideoCardProps) => {
  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
  };

  return (
    <div className="group cursor-pointer">
      {/* Thumbnail - Added red border */}
      <div className="relative aspect-video overflow-hidden mb-6 border-2 border-[#EE2B2E]">
        <Link href={`/watch/${id}`}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-sm text-white">
            {duration}
          </div>
        </Link>
      </div>

      {/* Video Info - Added red border to diamond */}
      <div className="flex gap-6">
        <Link href={`/channel/${channelName}`} className="flex-shrink-0">
          <div className="rotate-45 overflow-hidden bg-white border-2 border-[#EE2B2E]">
            <Image
              src={channelImage}
              alt={channelName}
              width={48}
              height={48}
              className="-rotate-45 scale-[1.4] rounded-none"
            />
          </div>
        </Link>
        <div className="flex flex-col gap-2">
          <Link
            href={`/watch/${id}`}
            className="line-clamp-2 text-lg font-medium text-gray-900 dark:text-white hover:text-[#008751] dark:hover:text-[#008751]">
            {title}
          </Link>
          <Link
            href={`/channel/${channelName}`}
            className="text-base text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
            {channelName}
          </Link>
          <div className="text-base text-gray-600 dark:text-gray-400">
            {formatViews(views)} •{" "}
            {formatDistanceToNow(uploadedAt, { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
