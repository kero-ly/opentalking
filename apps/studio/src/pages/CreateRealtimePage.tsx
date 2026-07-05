import { Brain, Library, Radio, Share2, Video } from "lucide-react";
import { getReadyAssetsByKind } from "../entities/asset";
import { Button } from "../shared/ui/Button";
import { Card, CardHeader, CardTitle } from "../shared/ui/Card";

const setupSteps = [
  { title: "选择数字形象", desc: "从系统形象或自定义克隆形象开始。", icon: Video },
  { title: "绑定音色与人设", desc: "控制说话风格、语气和服务边界。", icon: Radio },
  { title: "接入知识库", desc: "让数字人回答业务资料相关问题。", icon: Brain },
  { title: "发布与集成", desc: "生成分享链接、嵌入组件或 API 接入。", icon: Share2 },
];

export function CreateRealtimePage() {
  const avatars = getReadyAssetsByKind("avatar");
  const voices = getReadyAssetsByKind("voice");
  const knowledge = getReadyAssetsByKind("knowledge");

  return (
    <div className="grid gap-5">
      <Card className="grid gap-5 bg-gradient-to-br from-studio-sidebar via-white to-blue-50 p-6 xl:grid-cols-[1fr_360px]">
        <div>
          <h1 className="text-2xl font-bold text-studio-text">创建实时对话数字人</h1>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-studio-muted">
            面向真实业务入口的可交互数字人，支持形象、音色、人设、知识库和发布方式组合。
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button variant="primary">开始配置</Button>
            <Button>运行测试会话</Button>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-gradient-to-br from-studio-primarySoft via-blue-100 to-studio-actionSoft p-4">
          <div className="rounded-lg bg-white/85 p-4 text-sm font-bold text-studio-primaryStrong">WebRTC · 低延迟测试台</div>
          <div className="mt-4 h-40 rounded-xl bg-white/50" />
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {setupSteps.map((step) => {
          const Icon = step.icon;
          return (
            <Card key={step.title} className="p-5">
              <Icon className="h-6 w-6 text-studio-primary" />
              <h2 className="mt-4 text-base font-bold text-studio-text">{step.title}</h2>
              <p className="mt-2 text-sm leading-6 text-studio-muted">{step.desc}</p>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle subtitle="当前页面先展示可绑定资产，后续接入现有实时会话链路。">配置资产概览</CardTitle>
        </CardHeader>
        <div className="grid gap-4 p-5 md:grid-cols-3">
          <Summary title="可用形象" value={avatars.length} />
          <Summary title="可用音色" value={voices.length} />
          <Summary title="知识库" value={knowledge.length} icon={<Library className="h-4 w-4" />} />
        </div>
      </Card>
    </div>
  );
}

function Summary({ icon, title, value }: { icon?: React.ReactNode; title: string; value: number }) {
  return (
    <div className="rounded-xl border border-studio-border bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-bold text-studio-muted">{title}</p>
        {icon}
      </div>
      <p className="mt-3 text-2xl font-bold text-studio-text">{value}</p>
    </div>
  );
}
