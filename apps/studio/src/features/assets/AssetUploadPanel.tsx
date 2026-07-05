import { CloudUpload, FileAudio2, ImagePlus, LibraryBig, Loader2 } from "lucide-react";
import { useMemo, useState } from "react";
import type { AssetKind } from "../../entities/asset";
import { createUploadIntent, type UploadIntent } from "../../shared/api/studioApiClient";
import { Button } from "../../shared/ui/Button";

const uploadPresets: Array<{
  kind: AssetKind;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  label: string;
}> = [
  { kind: "avatar", fileName: "demo-avatar.mp4", contentType: "video/mp4", sizeBytes: 24576000, label: "上传形象视频" },
  { kind: "voice", fileName: "brand-voice.wav", contentType: "audio/wav", sizeBytes: 524288, label: "上传品牌音色" },
  { kind: "background", fileName: "studio-bg.png", contentType: "image/png", sizeBytes: 1642000, label: "上传背景图" },
  { kind: "knowledge", fileName: "faq-guide.pdf", contentType: "application/pdf", sizeBytes: 921600, label: "上传知识文档" },
];

const iconByKind: Partial<Record<AssetKind, typeof ImagePlus>> = {
  avatar: ImagePlus,
  voice: FileAudio2,
  background: ImagePlus,
  knowledge: LibraryBig,
};

export function AssetUploadPanel() {
  const [intent, setIntent] = useState<UploadIntent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedKind, setSelectedKind] = useState<AssetKind>("voice");
  const preset = useMemo(() => uploadPresets.find((item) => item.kind === selectedKind) ?? uploadPresets[0], [selectedKind]);

  async function handleCreateIntent() {
    setIsCreating(true);
    const nextIntent = await createUploadIntent(preset);
    setIntent(nextIntent);
    setIsCreating(false);
  }

  return (
    <section className="rounded-xl border border-studio-border bg-white/90 p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-studio-text">模拟上传</h2>
          <p className="mt-1 text-sm leading-6 text-studio-muted">本地版本只创建上传意图，字段按未来云存储接入预留。</p>
        </div>
        <CloudUpload className="h-5 w-5 text-studio-primary" aria-hidden />
      </div>

      <div className="mt-4 grid gap-2">
        {uploadPresets.map((item) => {
          const Icon = iconByKind[item.kind] ?? ImagePlus;
          const active = item.kind === selectedKind;
          return (
            <button
              key={item.kind}
              type="button"
              onClick={() => setSelectedKind(item.kind)}
              className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left transition-colors ${
                active ? "border-studio-primary bg-studio-primarySoft/70" : "border-studio-border bg-white hover:border-studio-primary/40"
              }`}
            >
              <Icon className="h-4 w-4 text-studio-primary" aria-hidden />
              <span>
                <span className="block text-sm font-bold text-studio-text">{item.label}</span>
                <span className="block text-xs font-semibold text-studio-muted">{item.fileName}</span>
              </span>
            </button>
          );
        })}
      </div>

      <Button className="mt-4 w-full" variant="primary" icon={isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <CloudUpload className="h-4 w-4" />} onClick={handleCreateIntent}>
        生成上传意图
      </Button>

      {intent ? (
        <div className="mt-4 rounded-lg border border-studio-borderSoft bg-studio-mint p-3 text-sm">
          <p className="font-bold text-studio-text">{intent.id}</p>
          <p className="mt-2 break-all text-xs font-semibold leading-5 text-studio-muted">targetPrefix: {intent.targetPrefix}</p>
          <p className="break-all text-xs font-semibold leading-5 text-studio-muted">uploadUrl: {intent.uploadUrl}</p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
            <div className="h-full rounded-full bg-gradient-to-r from-studio-primary to-studio-actionEnd" style={{ width: `${Math.max(intent.progress, 8)}%` }} />
          </div>
        </div>
      ) : null}
    </section>
  );
}
