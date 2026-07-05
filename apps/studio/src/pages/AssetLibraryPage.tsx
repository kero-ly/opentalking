import { Boxes, CheckCircle2, Clock3, Database, Filter } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import type { AssetKind } from "../entities/asset";
import { getReadyAssetsByKind, studioAssets, type AssetWorkflow, type StudioAsset } from "../entities/asset";
import { AssetDetailPanel } from "../features/assets/AssetDetailPanel";
import { AssetGrid } from "../features/assets/AssetGrid";
import { AssetUploadPanel } from "../features/assets/AssetUploadPanel";
import { listAssets } from "../shared/api/studioApiClient";
import { Badge } from "../shared/ui/Badge";
import { Button } from "../shared/ui/Button";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";
import { MetricCard } from "../shared/ui/MetricCard";

type AssetLibraryPageProps = {
  kind?: AssetKind;
  title?: string;
};

const kindLabel: Record<AssetKind, string> = {
  avatar: "数字形象",
  background: "背景资产",
  export_video: "导出视频",
  knowledge: "知识库",
  persona: "人设",
  runtime_preset: "运行预设",
  scene: "场景资产",
  script_template: "脚本模板",
  voice: "声音资产",
};

const allKinds: AssetKind[] = ["avatar", "voice", "scene", "background", "knowledge", "persona", "script_template", "runtime_preset", "export_video"];
const workflowOptions: Array<{ value: AssetWorkflow | "all"; label: string }> = [
  { value: "all", label: "全部" },
  { value: "video", label: "视频创作" },
  { value: "realtime", label: "实时数字人" },
  { value: "solution_kit", label: "方案包" },
];

export function AssetLibraryPage({ kind, title = "资产中心" }: AssetLibraryPageProps) {
  const [selectedKind, setSelectedKind] = useState<AssetKind | "all">(kind ?? "all");
  const [workflow, setWorkflow] = useState<AssetWorkflow | "all">("all");
  const [selectedAssetId, setSelectedAssetId] = useState<string | undefined>();
  const [loadedAssets, setLoadedAssets] = useState<StudioAsset[]>(() => (kind ? getReadyAssetsByKind(kind) : studioAssets));

  useEffect(() => {
    let cancelled = false;
    void listAssets(kind ? { kind } : {}).then((items) => {
      if (!cancelled) setLoadedAssets(items);
    });
    return () => {
      cancelled = true;
    };
  }, [kind]);

  const baseAssets = useMemo(() => loadedAssets, [loadedAssets]);
  const assets = useMemo(() => {
    return baseAssets.filter((asset) => {
      if (selectedKind !== "all" && asset.kind !== selectedKind) return false;
      if (workflow !== "all" && !asset.workflows.includes(workflow)) return false;
      return true;
    });
  }, [baseAssets, selectedKind, workflow]);

  const selectedAsset = assets.find((asset) => asset.id === selectedAssetId) ?? assets[0];
  const readyCount = studioAssets.filter((asset) => asset.status === "ready").length;
  const processingCount = studioAssets.filter((asset) => asset.status === "processing").length;
  const cloudReadyCount = studioAssets.filter((asset) => asset.storage.provider === "local" && asset.storage.bucket).length;

  function handleSelectAsset(asset: StudioAsset) {
    setSelectedAssetId(asset.id);
  }

  return (
    <div className="grid gap-5">
      <section className="rounded-xl border border-studio-border bg-gradient-to-br from-white via-studio-primarySoft/70 to-studio-actionSoft p-6 shadow-sm">
        <Badge tone="primary">Asset Center</Badge>
        <div className="mt-4 flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-studio-text">{title}</h1>
            <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">
              托管数字形象、音色、背景、场景、知识库和脚本模板，让视频创作与实时对话都能直接引用组合。
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">上传资产</Button>
            <Button>创建方案包</Button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="已就绪资产" value={String(readyCount)} hint="可直接用于视频、实时会话和方案包" icon={<CheckCircle2 className="h-5 w-5" />} />
        <MetricCard label="处理中任务" value={String(processingCount)} hint="模拟上传、训练或解析中的资产" icon={<Clock3 className="h-5 w-5" />} />
        <MetricCard label="云字段覆盖" value={`${cloudReadyCount}/${studioAssets.length}`} hint="本地存储已按对象存储字段建模" icon={<Database className="h-5 w-5" />} />
      </div>

      <Card>
        <CardHeader
          action={
            <div className="hidden items-center gap-2 rounded-lg border border-studio-border bg-white px-3 py-2 text-xs font-bold text-studio-muted md:flex">
              <Filter className="h-4 w-4" aria-hidden />
              {assets.length} 个匹配资产
            </div>
          }
        >
          <CardTitle subtitle={kind ? `当前展示已就绪的${kindLabel[kind]}。` : "可按类型和使用场景快速筛选本地资产。"}>
            {kind ? kindLabel[kind] : "全部资产"}
          </CardTitle>
        </CardHeader>

        <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0">
            {!kind ? (
              <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
                <FilterButton active={selectedKind === "all"} onClick={() => setSelectedKind("all")}>
                  全部
                </FilterButton>
                {allKinds.map((item) => (
                  <FilterButton key={item} active={selectedKind === item} onClick={() => setSelectedKind(item)}>
                    {kindLabel[item]}
                  </FilterButton>
                ))}
              </div>
            ) : null}

            <div className="mb-5 flex flex-wrap gap-2">
              {workflowOptions.map((option) => (
                <FilterButton key={option.value} active={workflow === option.value} onClick={() => setWorkflow(option.value)}>
                  {option.label}
                </FilterButton>
              ))}
            </div>

            {assets.length > 0 ? (
              <AssetGrid assets={assets} selectedAssetId={selectedAsset?.id} onSelectAsset={handleSelectAsset} />
            ) : (
              <div className="grid min-h-64 place-items-center rounded-xl border border-dashed border-studio-border bg-white/70 text-center">
                <div>
                  <Boxes className="mx-auto h-8 w-8 text-studio-primary" aria-hidden />
                  <p className="mt-3 text-sm font-bold text-studio-text">没有匹配资产</p>
                  <p className="mt-1 text-sm text-studio-muted">换一个类型或工作流筛选试试。</p>
                </div>
              </div>
            )}
          </div>

          <div className="grid content-start gap-4">
            {selectedAsset ? <AssetDetailPanel asset={selectedAsset} /> : null}
            <AssetUploadPanel />
          </div>
        </div>
      </Card>
    </div>
  );
}

function FilterButton({ active, children, onClick }: { active: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`whitespace-nowrap rounded-lg border px-3 py-2 text-sm font-bold transition-colors ${
        active ? "border-studio-primary bg-studio-primarySoft text-studio-primaryStrong" : "border-studio-border bg-white text-studio-muted hover:border-studio-primary/40"
      }`}
    >
      {children}
    </button>
  );
}
