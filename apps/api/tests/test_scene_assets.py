from __future__ import annotations

from pathlib import Path

import pytest

from opentalking.scene_assets import SceneAssetStore


PNG_BYTES = (
    b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR"
    b"\x00\x00\x00\x01\x00\x00\x00\x01\x08\x06\x00\x00\x00\x1f\x15\xc4\x89"
    b"\x00\x00\x00\rIDATx\x9cc\xf8\xff\xff?\x00\x05\xfe\x02\xfeA\xe2!\xbc"
    b"\x00\x00\x00\x00IEND\xaeB`\x82"
)


def test_scene_asset_store_creates_lists_and_deletes_background(tmp_path: Path) -> None:
    store = SceneAssetStore(tmp_path)

    created = store.create_background(
        content=PNG_BYTES,
        filename="studio.png",
        mime_type="image/png",
        name="Studio",
    )

    assert created["id"].startswith("bg-")
    assert created["name"] == "Studio"
    assert created["kind"] == "image"
    assert created["mime_type"] == "image/png"
    assert created["url"] == f"/scene-assets/backgrounds/{created['id']}/file"
    assert store.background_file_path(str(created["id"])).is_file()
    assert store.list_backgrounds()[0]["id"] == created["id"]
    assert store.delete_background(str(created["id"])) is True
    assert store.list_backgrounds() == []


def test_scene_asset_store_rejects_unsupported_background_type(tmp_path: Path) -> None:
    store = SceneAssetStore(tmp_path)

    with pytest.raises(ValueError, match="unsupported background media type"):
        store.create_background(
            content=b"not media",
            filename="notes.txt",
            mime_type="text/plain",
            name="Notes",
        )


def test_scene_asset_store_creates_and_updates_composition(tmp_path: Path) -> None:
    store = SceneAssetStore(tmp_path)
    background = store.create_background(
        content=PNG_BYTES,
        filename="studio.png",
        mime_type="image/png",
        name="Studio",
    )

    created = store.create_composition(
        {
            "name": "Demo Scene",
            "avatar_id": "anchor",
            "background_id": background["id"],
            "avatar_fit": "contain",
            "avatar_scale": 1.0,
            "avatar_anchor": "center",
            "matting_required": True,
            "subtitle_style": "lower-third",
        }
    )

    assert created["id"].startswith("scene-")
    assert created["background_id"] == background["id"]
    assert created["matting_required"] is True
    assert store.list_compositions()[0]["id"] == created["id"]

    updated = store.update_composition(str(created["id"]), {"name": "Updated", "avatar_scale": 1.25})
    assert updated is not None
    assert updated["name"] == "Updated"
    assert updated["avatar_scale"] == 1.25
    assert updated["avatar_id"] == "anchor"

    assert store.delete_composition(str(created["id"])) is True
    assert store.list_compositions() == []
