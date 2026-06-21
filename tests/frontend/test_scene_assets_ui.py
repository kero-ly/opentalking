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


def test_app_passes_avatars_to_asset_library_workspace() -> None:
    source = Path("apps/web/src/App.tsx").read_text(encoding="utf-8")

    asset_library_mount = source.split('workflow === "assetLibrary" ? (', 1)[1].split(
        ') : workflow === "videoCreation" ? (',
        1,
    )[0]
    assert "<AssetLibraryWorkspace" in asset_library_mount
    assert "avatars={avatars}" in asset_library_mount


def test_app_wires_scene_selection_and_background_updates_to_asset_library_workspace() -> None:
    source = Path("apps/web/src/App.tsx").read_text(encoding="utf-8")

    asset_library_mount = source.split('workflow === "assetLibrary" ? (', 1)[1].split(
        ') : workflow === "videoCreation" ? (',
        1,
    )[0]
    assert "selectedSceneId={selectedSceneId}" in asset_library_mount
    assert "onSceneSelect={setSelectedSceneId}" in asset_library_mount
    assert "onSceneBackgroundsChange={setSceneBackgrounds}" in asset_library_mount


def test_asset_library_scene_cards_can_select_created_scene_and_sync_backgrounds() -> None:
    source = Path("apps/web/src/components/AssetLibraryWorkspace.tsx").read_text(encoding="utf-8")

    assert "selectedSceneId?: string | null;" in source
    assert "onSceneSelect?: (sceneId: string) => void;" in source
    assert "onSceneBackgroundsChange?: (backgrounds: SceneBackgroundAsset[]) => void;" in source
    assert "onSceneSelect?.(created.id)" in source
    assert "onSceneBackgroundsChange?.(nextBackgrounds)" in source
    assert "onClick={() => onSceneSelect?.(scene.id)}" in source
    assert "aria-pressed={selectedSceneId === scene.id}" in source


def test_scene_delete_actions_use_error_handled_handlers() -> None:
    source = Path("apps/web/src/components/AssetLibraryWorkspace.tsx").read_text(encoding="utf-8")

    assert "const handleDeleteSceneBackground = useCallback(async (background: SceneBackgroundAsset)" in source
    assert "const handleDeleteSceneComposition = useCallback(async (scene: SceneComposition)" in source
    assert "delete scene background failed" in source
    assert "delete scene composition failed" in source
    assert "err instanceof ApiError ? err.detail : null" in source
    assert "onNotify?.(detail ? `删除失败：${detail}` : \"删除失败，请稍后重试。\", \"error\")" in source
    assert "await loadScenes()" in source
    assert ".then(loadScenes)" not in source


def test_scene_ui_surfaces_matting_readiness_copy() -> None:
    asset_source = Path("apps/web/src/components/AssetLibraryWorkspace.tsx").read_text(encoding="utf-8")
    avatar_source = Path("apps/web/src/components/AvatarSelectionStage.tsx").read_text(encoding="utf-8")
    api_source = Path("apps/web/src/lib/api.ts").read_text(encoding="utf-8")

    assert 'matting_status: "unknown" | "opaque" | "transparent_ready";' in api_source
    assert "已抠像/透明数字人" in asset_source
    assert "未抠像" in asset_source
    assert "matting_status" in avatar_source
