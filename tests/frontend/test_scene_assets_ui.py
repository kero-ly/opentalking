from __future__ import annotations

from pathlib import Path


def test_api_exposes_scene_asset_types_and_helpers() -> None:
    source = Path("apps/web/src/lib/api.ts").read_text(encoding="utf-8")

    assert "export type SceneBackgroundAsset" in source
    assert "export type SceneComposition" in source
    assert "uploadSceneBackground" in source
    assert 'apiPostForm<SceneBackgroundAsset>("/scene-assets/backgrounds", form)' in source
    assert 'apiPost<SceneComposition>("/scene-assets/compositions", input)' in source


def test_asset_library_has_scene_assets_tab() -> None:
    source = Path("apps/web/src/components/AssetLibraryWorkspace.tsx").read_text(encoding="utf-8")

    assert 'type AssetTab = "exports" | "knowledge" | "memory" | "scenes" | "voices"' in source
    assert '{ id: "scenes", label: "场景资产" }' in source
    assert "renderScenesTab" in source
    assert "背景资产" in source
    assert "场景组合" in source
    assert "uploadSceneBackground" in source
    assert "createSceneComposition" in source
