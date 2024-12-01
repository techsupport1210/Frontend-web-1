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
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
        <Link href={`/watch/${id}`}>
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 px-1 rounded text-xs text-white">
            {duration}
          </div>
        </Link>
      </div>

      {/* Video Info */}
      <div className="flex gap-3">
        <Link href={`/channel/${channelName}`} className="flex-shrink-0">
          <Image
            src={channelImage}
            alt={channelName}
            width={36}
            height={36}
            className="rounded-full"
          />
        </Link>
        <div className="flex flex-col">
          <Link href={`/watch/${id}`} className="line-clamp-2 font-medium">
            {title}
          </Link>
          <Link
            href={`/channel/${channelName}`}
            className="text-sm text-gray-600 hover:text-gray-900">
            {channelName}
          </Link>
          <div className="text-sm text-gray-600">
            {formatViews(views)} • {formatDistanceToNow(uploadedAt, { addSuffix: true })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard; 