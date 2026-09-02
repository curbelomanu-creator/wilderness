# Wilderness World Editor — Research & Roadmap

Updated: 2026-09-02

## Goal

Build a visual world editor for Wilderness where the world can be sculpted and painted manually, while reusing proven algorithms and open-source/community techniques whenever licensing permits.

The current Wilderness web build uses Three.js. Therefore PlayCanvas examples are treated as a library of algorithms, interaction patterns and future migration targets; code is adapted rather than blindly pasted into the current runtime.

## Current World Editor 0.1

Implemented in the repository:

- `editor.html` — visual editor entry point.
- `worldEditor01.js` — editor controls and topographic preview.
- `worldEditorRuntime01.js` — non-destructive edit layer applied to the running game.
- `riversVisual48.js` — existing Wilderness 3D river ribbons / banks / bridge visuals now connected to manually drawn editor rivers.

Current tools:

- Pan and zoom (mouse, wheel, touch/pinch).
- Raise terrain.
- Lower terrain.
- Smooth terrain.
- Flatten terrain.
- Paint biome/surface class.
- Draw roads as point paths.
- Draw rivers as point paths.
- Path width control.
- Undo / redo.
- Autosave per world seed.
- Explicit save.
- JSON export/import.
- Test edited world in the game.
- Existing terrain remains the base; manual edits are stored as a non-destructive overlay.

## Source library / research inventory

### 1. Terrain mesh and heightmaps — official PlayCanvas

Source:
- https://developer.playcanvas.com/tutorials/terrain-generation/

Useful ideas/code:
- Build terrain meshes from a heightmap.
- Vertex positions from pixel height.
- Normal calculation.
- UV generation.
- Terrain collision mesh.

Planned use:
- Reference implementation for a later continuous mesh terrain instead of box-tile terrain.
- Import/export heightmaps.

### 2. PlayCanvas open-source engine and examples

Sources:
- https://github.com/playcanvas/engine
- https://github.com/playcanvas/engine/tree/main/examples

Useful ideas/code:
- Mesh generation.
- Ray/pointer interaction.
- Materials and shaders.
- Rendering and instancing patterns.
- Camera/orbit control patterns.

License:
- PlayCanvas Engine repository: MIT. Verify individual external assets/examples before copying assets.

### 3. PlayCanvas Editor source

Source:
- https://github.com/playcanvas/editor

Useful ideas/code:
- Tool architecture.
- History/undo patterns.
- Panels and inspector UX.
- Selection and gizmo interaction patterns.

Important:
- The PlayCanvas Editor itself is open source. We can study its architecture, but Wilderness does not need to fork the entire editor.

### 4. PCUI — PlayCanvas UI library

Source:
- https://github.com/playcanvas/pcui

Useful for:
- Professional editor panels.
- Buttons, sliders, tree views and forms.
- Two-way data binding.

License:
- MIT.

Planned use:
- Candidate for replacing the first custom HTML UI once the editor toolset stabilizes.

### 5. Editor API / custom tools

Source:
- https://developer.playcanvas.com/user-manual/editor/

Useful idea:
- PlayCanvas explicitly supports custom tools through its Editor API.

Planned use:
- If/when Wilderness is migrated into a native PlayCanvas project, editor functions can be exposed inside the PlayCanvas Editor itself.

### 6. Picking / ray casting — official PlayCanvas

Source:
- https://developer.playcanvas.com/user-manual/physics/ray-casting/

Useful for:
- Convert mouse/touch into a point on terrain.
- Object selection.
- Placement of cities, vegetation, props and control points.

Current implementation:
- Wilderness 0.1 uses a 2D map coordinate conversion. A later 3D editing mode will use ray picking.

### 7. Community heightmap-in-editor script

Source:
- https://gist.github.com/ertugrulcetin/1402396c998e661c367d1f1a57bf7976

Useful idea:
- Generate/update heightmap terrain while inside the PlayCanvas editing workflow.

Status:
- Older community technique; use as reference, not as a dependency.

### 8. AlexAPPi / Wagner PlayCanvas Terrain System

Source:
- https://github.com/AlexAPPi/playcanvas-terrain-system
- https://forum.playcanvas.com/t/terrain-component-for-editor/36052

Public repository includes core systems for:
- Height maps.
- Heightfields.
- Grid/patch construction.
- LOD management.
- Terrain patch instancing.
- Terrain objects.

Recent community/editor work demonstrates:
- Interactive landscape editing.
- Road editing.
- Catmull-Rom spline roads.
- Road ribbon meshes.
- Junctions.
- Height and splat baking.
- Undo/redo.
- JSON road network persistence.
- MultiDraw / hierarchical instancing.
- Grass and object systems.

License of public repository:
- Apache 2.0.

Planned use:
- Study and selectively port algorithms compatible with Wilderness.
- Strong candidate if/when the project is moved onto PlayCanvas Engine.

### 9. Splatmaps / terrain material blending

Community references:
- https://forum.playcanvas.com/
- Search topics: splatmap terrain, texture blending, Athena Terrain Creator.

Useful technique:
- RGBA splatmap channels control blend weights for multiple terrain materials.

Planned editor tool:
- True texture painter with soft blending between grass, soil, sand and rock.
- First version currently stores categorical biome paint; next material version will store continuous weights.

### 10. Vegetation painting and GPU instancing

Community references:
- PlayCanvas forum terrain / grass / instancing discussions.
- AlexAPPi terrain system object instancing.

Useful technique:
- Paint point distributions rather than create thousands of unique objects.
- Persist placements as compact JSON.
- Render with instancing and LOD.

Planned editor tools:
- Tree brush.
- Grass brush.
- Rock brush.
- Shrub brush.
- Density, random scale and random rotation controls.
- Eraser.

### 11. Water

Official/community references:
- PlayCanvas examples and forum water shaders.

Planned editor tools:
- River path tool (started).
- Lake polygon tool.
- Sea/water-level tool.
- River width/depth controls.
- Shore/bank generation.
- Water material/shader.

### 12. Roads and splines

Current Wilderness 0.1:
- Polyline control points.
- Width.
- Road classification applied by distance-to-segment.

Planned upgrade based on community terrain road systems:
- Catmull-Rom smoothing.
- Tangent handles / control point editing.
- Automatic flattening underneath roads.
- Junctions.
- Bridge detection.
- Road material painting.

### 13. Procedural textures

PlayCanvas tutorials/examples include procedural texture techniques.

Planned use:
- Generate variation masks so large surfaces do not visibly repeat.
- Dirt/grass/rock breakup.

## Roadmap

### Phase 1 — Functional world editor (in progress)

- [x] Separate editor entry point.
- [x] Pan / zoom.
- [x] Raise / lower.
- [x] Smooth.
- [x] Flatten.
- [x] Biome paint.
- [x] Road paths.
- [x] River paths.
- [x] Undo / redo.
- [x] Save per seed.
- [x] JSON import/export.
- [x] Test edited world.
- [x] Connect manual rivers to existing 3D river visual system.
- [ ] Select/edit/delete individual road and river control points.
- [ ] Erase terrain paint.
- [ ] Named save slots.

### Phase 2 — Surface painter

- [ ] Continuous splat/material weights.
- [ ] Grass texture.
- [ ] Soil texture.
- [ ] Sand texture.
- [ ] Rock texture.
- [ ] Dry earth texture.
- [ ] Brush opacity/falloff.
- [ ] Automatic material by slope/elevation.

### Phase 3 — Vegetation/object painter

- [ ] Trees.
- [ ] Shrubs.
- [ ] Grass.
- [ ] Rocks.
- [ ] Palms.
- [ ] Density / scale / rotation.
- [ ] GPU instancing.
- [ ] LOD.

### Phase 4 — Water and routes

- [ ] Smoothed river splines.
- [ ] River depth.
- [ ] Lakes.
- [ ] Sea/coast editing.
- [ ] Road smoothing.
- [ ] Road intersections.
- [ ] Automatic bridges / fords.

### Phase 5 — Historical world placement

- [ ] City tool.
- [ ] Village tool.
- [ ] Fortress tool.
- [ ] Historical landmark tool.
- [ ] Labels.
- [ ] Kingdom/region borders.
- [ ] Import Wilderness master coordinates.
- [ ] Toggle historical/geographic reference overlay.

### Phase 6 — 3D editor mode

- [ ] Switch between map/top-down and 3D perspective edit mode.
- [ ] Raycast brush directly onto 3D terrain.
- [ ] 3D placement gizmos.
- [ ] Fly/orbit camera.
- [ ] Real-time preview of terrain materials, water and vegetation.

### Phase 7 — World-scale optimization

- [ ] Chunked edit data.
- [ ] Continuous terrain mesh / heightfield upgrade.
- [ ] Terrain LOD.
- [ ] Streaming edit layers.
- [ ] Compact binary/texture storage if JSON becomes too large.

## Licensing rule

Do not copy random forum or third-party code into the commercial game without checking its license/author terms. Prefer, in order:

1. Official PlayCanvas code under its published open-source license.
2. MIT / Apache-2.0 repositories.
3. Algorithms reimplemented from documented concepts.
4. Community snippets only when permission/license is clear.

Every substantial imported implementation should receive a source note in this document or a dedicated `THIRD_PARTY_NOTICES` file.
