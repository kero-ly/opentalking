import { useEffect, useState, type RefObject } from "react";
import type { TtsProviderExtended } from "../constants/ttsBailian";
import type { SceneBackgroundAsset, SceneComposition } from "../lib/api";
import type { ConnectionStatus } from "../types";
import { ChatInput } from "./ChatInput";
import { SceneStage } from "./SceneStage";

type ImmersiveConversationProps = {
  videoRef: RefObject<HTMLVideoElement>;
  scene: SceneComposition | null;
  backgrounds: SceneBackgroundAsset[];
  connection: ConnectionStatus;
  sessionId: string | null;
  subtitle: string | null;
  currentAvatarName: string;
  modelLabel: string;
  isSpeaking: boolean;
  ttsProvider: TtsProviderExtended;
  sttProvider: string;
  edgeVoice: string;
  qwenModel: string;
  qwenVoice: string;
  onExit: () => void;
  onSend: (text: string) => void;
  onSpeakAudio: (blob: Blob) => void | Promise<void>;
  onSpeakFlashtalkAudioFile?: (file: File) => void | Promise<void>;
  onSpeakAudioStreamResult: (result: { text: string }) => void | Promise<void>;
  onSpeakAudioStreamError: (message: string) => void;
  onInterrupt: () => void;
  onNotify?: (message: string, tone?: "info" | "success" | "error") => void;
};

export function ImmersiveConversation({
  videoRef,
  scene,
  backgrounds,
  connection,
  sessionId,
  subtitle,
  currentAvatarName,
  modelLabel,
  isSpeaking,
  ttsProvider,
  sttProvider,
  edgeVoice,
  qwenModel,
  qwenVoice,
  onExit,
  onSend,
  onSpeakAudio,
  onSpeakFlashtalkAudioFile,
  onSpeakAudioStreamResult,
  onSpeakAudioStreamError,
  onInterrupt,
  onNotify,
}: ImmersiveConversationProps) {
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onExit();
      if (event.key.toLowerCase() === "h") setDemoMode((value) => !value);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onExit]);

  const live = connection === "live" || connection === "expiring";

  return (
    <main className="relative h-[calc(100dvh-3.5rem)] min-h-0 overflow-hidden bg-slate-950 text-white">
      <SceneStage
        videoRef={videoRef}
        scene={scene}
        backgrounds={backgrounds}
        subtitle={subtitle}
        className="h-full w-full"
      >
        {!demoMode ? (
          <div className="immersive-controls absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 p-4">
            <div className="min-w-0 rounded-lg border border-white/15 bg-slate-950/55 px-3 py-2 shadow-lg backdrop-blur">
              <p className="truncate text-sm font-semibold">{currentAvatarName}</p>
              <p className="mt-0.5 truncate text-xs text-white/70">
                {modelLabel} · {live ? "已连接" : "待连接"}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setDemoMode(true)}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                演示模式
              </button>
              <button
                type="button"
                onClick={onExit}
                className="rounded-lg border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white/20"
              >
                返回工作台
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setDemoMode(false)}
            className="absolute right-4 top-4 z-30 rounded-lg border border-white/15 bg-slate-950/45 px-3 py-2 text-xs font-semibold text-white opacity-0 transition hover:opacity-100 focus:opacity-100"
          >
            显示控件
          </button>
        )}

        {!demoMode && live ? (
          <div className="absolute inset-x-3 bottom-3 z-30 mx-auto max-w-4xl sm:bottom-5">
            <ChatInput
              onSend={onSend}
              onSpeakAudio={onSpeakAudio}
              onSpeakFlashtalkAudioFile={onSpeakFlashtalkAudioFile}
              streamingAsrSessionId={sessionId}
              onSpeakAudioStreamResult={onSpeakAudioStreamResult}
              onSpeakAudioStreamError={onSpeakAudioStreamError}
              onInterrupt={onInterrupt}
              isSpeaking={isSpeaking}
              disabled={!live}
              onNotify={onNotify}
              ttsProvider={ttsProvider}
              sttProvider={sttProvider}
              edgeVoice={edgeVoice}
              qwenModel={qwenModel}
              qwenVoice={qwenVoice}
            />
          </div>
        ) : null}
      </SceneStage>
    </main>
  );
}
