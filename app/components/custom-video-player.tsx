import { Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";
import { formatTime } from "~/utils/format-time";

interface CustomVideoPlayerProps {
  video_URL: string;
}

export default function CustomVideoPlayer({
  video_URL,
}: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showControls, setShowControls] = useState(true);
  const video = videoRef.current;
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = () => {
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
    handleVideoClick();
  };

  const handleTimeUpdate = () => {
    if (!video || video.duration === 0) return;

    const percentage = (video.currentTime / video.duration) * 100;
    setProgress(percentage);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!video || video.duration === 0) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    video.currentTime = percentage * video.duration;
  };

  const handleVideoClick = () => {
    setShowControls(true);

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    hideTimerRef.current = setTimeout(() => {
      setShowControls(false);
    }, 5000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto relative lg:max-w-4xl ">
      <video
        ref={videoRef}
        src={video_URL}
        onTimeUpdate={handleTimeUpdate}
        className="w-full mb-4 rounded-lg"
        onEnded={() => setIsPlaying(false)}
        onClick={handleVideoClick}
      />

      {showControls && (
        <>
          {/* Seek Bar */}
          <div className="absolute bottom-2 w-full px-2 flex flex-col lg:px-4 lg:py-1 z-10">
            <div
              className="h-0.75 bg-gray-300 rounded-full relative cursor-pointer"
              onClick={handleSeek}
            >
              <div
                className="h-0.75 bg-white rounded-full absolute top-0 left-0"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex justify-between px-1 text-[13px] text-white mt-1">
              <p>{formatTime(video?.currentTime || 0)}</p>
              <p>{formatTime(video?.duration || 0)}</p>
            </div>
          </div>

          {/* Play/Pause Toggle */}
          <div className="w-full h-full absolute top-0 grid place-items-center">
            <button
              onClick={togglePlay}
              className="backdrop-blur-sm grid place-items-center rounded-full p-2 text-white cursor-pointer lg:p-3"
            >
              {isPlaying ? (
                <Pause className="lg:size-10" />
              ) : (
                <Play className="lg:size-10" />
              )}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
