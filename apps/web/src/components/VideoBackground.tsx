import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

type VideoBackgroundProps = {
  className?: string;
  stream?: MediaStream | null;
};

export const VideoBackground = forwardRef<HTMLVideoElement, VideoBackgroundProps>(
  ({ className, stream }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    useImperativeHandle(ref, () => videoRef.current as HTMLVideoElement);

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;
      if (video.srcObject !== stream) {
        video.srcObject = stream ?? null;
      }
      if (stream) {
        void video.play().catch(() => {});
      }
    }, [stream]);

    return (
      <video
        ref={videoRef}
        className={className ?? "absolute inset-0 h-full w-full object-contain"}
        autoPlay
        playsInline
        muted
      />
    );
  },
);

VideoBackground.displayName = "VideoBackground";
