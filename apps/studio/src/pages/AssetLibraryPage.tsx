import type { AssetKind } from "../entities/asset";
import { getReadyAssetsByKind, studioAssets } from "../entities/asset";
import { AssetGrid } from "../features/assets/AssetGrid";
import { Badge } from "../shared/ui/Badge";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";

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

export function AssetLibraryPage({ kind, title = "资产中心" }: AssetLibraryPageProps) {
  const assets = kind ? getReadyAssetsByKind(kind) : studioAssets.filter((asset) => asset.status === "ready");

  return (
    <div className="grid gap-5">
      <Card className="p-6">
        <Badge tone="primary">Asset Center</Badge>
        <h1 className="mt-4 text-2xl font-bold text-studio-text">{title}</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">
          托管数字形象、音色、背景、场景、知识库和脚本模板，让创作与实时对话都能复用资产。
        </p>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle subtitle={kind ? `当前展示已就绪的${kindLabel[kind]}。` : "当前展示所有已就绪资产。"}>
            {kind ? kindLabel[kind] : "全部资产"}
          </CardTitle>
        </CardHeader>
        <div className="p-5">
          <AssetGrid assets={assets} />
        </div>
      </Card>
    </div>
  );
}
