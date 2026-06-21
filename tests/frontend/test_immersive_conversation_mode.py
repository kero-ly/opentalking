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


def test_app_uses_scene_stage_for_realtime_stage() -> None:
    source = Path("apps/web/src/App.tsx").read_text(encoding="utf-8")

    assert 'import { SceneStage } from "./components/SceneStage";' in source
    assert "selectedScene" in source
    assert "sceneBackgrounds" in source
    assert "<SceneStage" in source
