import type { ReactNode, RefObject } from "react";
import type { SceneBackgroundAsset, SceneComposition } from "../lib/api";
import { buildApiUrl } from "../lib/api";
import { VideoBackground } from "./VideoBackground";

type SceneStageProps = {
  videoRef: RefObject<HTMLVideoElement>;
  scene: SceneComposition | null;
  backgrounds: SceneBackgroundAsset[];
  subtitle?: string | null;
  children?: ReactNode;
  className?: string;
  compactSquareStage?: boolean;
};

function backgroundUrl(background: SceneBackgroundAsset): string {
  return buildApiUrl(background.url);
}

const AVATAR_ANCHOR_CLASSES = {
  center: "items-center justify-center",
  bottom: "items-end justify-center",
  left: "items-center justify-start",
  right: "items-center justify-end",
} as const;

export function SceneStage({
  videoRef,
  scene,
  backgrounds,
  subtitle,
  children,
  className = "",
  compactSquareStage = false,
}: SceneStageProps) {
  const background = scene?.background_id
    ? backgrounds.find((item) => item.id === scene.background_id) ?? null
    : null;
  const subtitleStyle = scene?.subtitle_style ?? "lower-third";
  const avatarFit = scene?.avatar_fit === "cover" ? "object-cover" : "object-contain";
  const avatarAnchor = scene?.avatar_anchor ?? "center";
  const avatarAnchorClass = AVATAR_ANCHOR_CLASSES[avatarAnchor as keyof typeof AVATAR_ANCHOR_CLASSES] ?? AVATAR_ANCHOR_CLASSES.center;
  const backgroundColor = scene?.background_color || "#0f172a";

  return (
    <div className={`relative min-h-0 overflow-hidden bg-slate-950 ${className}`}>
      <div className="scene-background-layer absolute inset-0" style={{ backgroundColor }}>
        {background?.kind === "image" ? (
          <img src={backgroundUrl(background)} alt={background.name} className="h-full w-full object-cover" />
        ) : null}
        {background?.kind === "video" ? (
          <video src={backgroundUrl(background)} className="h-full w-full object-cover" autoPlay muted loop playsInline />
        ) : null}
        <div className="absolute inset-0 bg-slate-950/10" />
      </div>

      <div className={`absolute inset-0 flex p-4 sm:p-6 lg:p-8 ${avatarAnchorClass}`}>
        <div
          className={
            compactSquareStage
              ? "relative aspect-square w-full max-w-[42rem] max-h-full"
              : "relative h-full w-full"
          }
          style={{ transform: `scale(${scene?.avatar_scale ?? 1})`, transformOrigin: "center" }}
        >
          <VideoBackground ref={videoRef} className={`absolute inset-0 h-full w-full ${avatarFit}`} />
        </div>
      </div>

      {scene?.matting_required ? (
        <div className="pointer-events-none absolute left-4 top-4 z-20 rounded-lg border border-amber-200 bg-amber-50/90 px-2.5 py-1 text-[11px] font-medium text-amber-800 shadow-sm">
          当前场景建议使用已抠像数字人
        </div>
      ) : null}

      {subtitle && subtitleStyle !== "none" ? (
        <div
          className={
            subtitleStyle === "compact"
              ? "absolute inset-x-4 bottom-4 z-20 mx-auto max-w-lg rounded-lg bg-slate-950/72 px-4 py-2 text-center text-sm font-medium leading-relaxed text-white shadow-lg backdrop-blur"
              : "absolute inset-x-4 bottom-6 z-20 mx-auto max-w-2xl rounded-lg border border-white/15 bg-slate-950/75 px-5 py-3 text-center text-base font-semibold leading-relaxed text-white shadow-xl backdrop-blur"
          }
        >
          {subtitle}
        </div>
      ) : null}

      {children}
    </div>
  );
}
