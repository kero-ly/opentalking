from __future__ import annotations

from pathlib import Path


def test_scene_stage_component_exists_and_handles_background_layers() -> None:
    source = Path("apps/web/src/components/SceneStage.tsx").read_text(encoding="utf-8")

    assert "export function SceneStage" in source
    assert "SceneBackgroundAsset" in source
    assert "SceneComposition" in source
    assert "scene-background-layer" in source
    assert "VideoBackground" in source
    assert "subtitle_style" in source


def test_scene_stage_applies_avatar_anchor_positioning() -> None:
    source = Path("apps/web/src/components/SceneStage.tsx").read_text(encoding="utf-8")

    assert "scene?.avatar_anchor" in source
    assert "AVATAR_ANCHOR_OBJECT_POSITIONS" in source
    assert 'bottom: "object-[center_bottom]"' in source
    assert 'left: "object-[left_center]"' in source
    assert 'right: "object-[right_center]"' in source
    assert "${avatarFit} ${avatarObjectPosition}" in source
    assert "AVATAR_ANCHOR_TRANSFORM_ORIGINS" in source
    assert "transformOrigin: avatarTransformOrigin" in source
    assert 'bottom: "items-end justify-center"' in source
    assert 'left: "items-center justify-start"' in source
    assert 'right: "items-center justify-end"' in source


def test_app_uses_scene_stage_for_realtime_stage() -> None:
    source = Path("apps/web/src/App.tsx").read_text(encoding="utf-8")

    assert 'import { SceneStage } from "./components/SceneStage";' in source
    assert "selectedScene" in source
    assert "sceneBackgrounds" in source
    assert "<SceneStage" in source


def test_immersive_conversation_component_focuses_stage_and_input() -> None:
    source = Path("apps/web/src/components/ImmersiveConversation.tsx").read_text(encoding="utf-8")

    assert "export function ImmersiveConversation" in source
    assert "SceneStage" in source
    assert "ChatInput" in source
    assert "onExit" in source
    assert "immersive-controls" in source
    assert "演示模式" in source


def test_topbar_exposes_realtime_view_mode_toggle() -> None:
    source = Path("apps/web/src/components/TopBar.tsx").read_text(encoding="utf-8")

    assert 'export type ConversationViewMode = "studio" | "immersive";' in source
    assert "onConversationViewModeChange" in source
    assert "沉浸" in source


def test_app_switches_between_studio_and_immersive_realtime_views() -> None:
    source = Path("apps/web/src/App.tsx").read_text(encoding="utf-8")

    assert "conversationViewMode" in source
    assert "ImmersiveConversation" in source
    assert 'conversationViewMode === "immersive"' in source


def test_app_gates_persisted_immersive_mode_while_start_is_visible() -> None:
    source = Path("apps/web/src/App.tsx").read_text(encoding="utf-8")

    assert 'const effectiveConversationViewMode = showStart ? "studio" : conversationViewMode;' in source
    assert 'effectiveConversationViewMode === "immersive"' in source
