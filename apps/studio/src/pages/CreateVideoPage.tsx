import { FileAudio, FileText, Mic2, MonitorPlay } from "lucide-react";
import { getReadyAssetsByKind } from "../entities/asset";
import { AssetGrid } from "../features/assets/AssetGrid";
import { Button } from "../shared/ui/Button";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";

const modes = [
  { title: "文本生成视频", desc: "输入脚本，选择数字形象和音色生成口播视频。", icon: FileText },
  { title: "上传音频驱动", desc: "上传旁白或录音，驱动指定数字形象。", icon: FileAudio },
  { title: "PPT/PDF 转视频", desc: "适合课程、培训和方案解读。", icon: MonitorPlay },
  { title: "复刻音色生成", desc: "使用授权音色完成品牌化口播。", icon: Mic2 },
];

export function CreateVideoPage() {
  return (
    <div className="grid gap-5">
      <Card className="bg-gradient-to-br from-white via-studio-mint to-studio-actionSoft/70 p-6">
        <h1 className="text-2xl font-bold text-studio-text">创建数字人视频</h1>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">
          第一版先搭好正式创作入口，后续接入现有视频生成任务、音色复刻和 PPT/PDF 工作流。
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="primary">开始创建</Button>
          <Button>从方案包开始</Button>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <Card key={mode.title} className="p-5">
              <Icon className="h-6 w-6 text-studio-primary" />
              <h2 className="mt-4 text-base font-bold text-studio-text">{mode.title}</h2>
              <p className="mt-2 text-sm leading-6 text-studio-muted">{mode.desc}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle subtitle="优先选择已就绪形象，后续可绑定音色、背景和脚本。">可用数字形象</CardTitle>
        </CardHeader>
        <div className="p-5">
          <AssetGrid assets={getReadyAssetsByKind("avatar")} />
        </div>
      </Card>
    </div>
  );
}
