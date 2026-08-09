# Coldop Static Asset Fix Guide

Use this document to recreate branding assets yourself. When the hand-back package is ready, return to the agent for integration into the Next.js App Router. Do **not** edit `layout.tsx`, metadata, or component code until then.

**Site:** https://coldop.in  
**Stack:** Next.js App Router (`src/app/` file-based metadata)

---

## 1. Purpose and scope

**Your job**

1. Create (or regenerate) the assets listed below from a clean master.
2. Verify each file against the acceptance criteria.
3. Drop them in the hand-back folder and tell the agent they are ready.

**Out of scope for this pass**

- Editing [`src/app/layout.tsx`](../src/app/layout.tsx)
- Editing [`src/components/landing/BrandMark.tsx`](../src/components/landing/BrandMark.tsx)
- Adding a PWA manifest
- Blind Image Trace / auto-vectorize of PNGs
- Committing or deploying

**Locked decisions (do not re-litigate while exporting)**

| Decision | Choice |
|----------|--------|
| Favicon artwork | Simplified mark (barn + enough brand signal; **no** arc tagline / ESTD) |
| Favicon SVG background | Transparent |
| Favicon ICO background | Opaque white |
| UI mark | Clean **full-seal** SVG preferred |
| Schema logo URL | Keep `/logo.png` |
| Apple / OG | Refresh only if master artwork changes |
| OG canvas | `1200×630` on `#1a7a4c` |
| PWA | Not required |

---

## 2. Current problems (why this work exists)

| Issue | Detail |
|-------|--------|
| Auto-traced favicon SVG | [`src/app/icon.svg`](../src/app/icon.svg) is ~120KB, 105 paths, Illustrator Image Trace quality, black corners |
| Misnamed UI asset | [`public/icon-192x192.webp`](../public/icon-192x192.webp) is **2289×2289**, not 192×192, used at 40×40 in the navbar |
| Background inconsistency | SVG = black corners · ICO/Apple = white · logo/WebP = transparent · OG = brand green |
| Seal-as-favicon | Full seal with curved text is illegible at 16×16 / 32×32 |
| Duplicate quality tiers | Same seal exists at different resolutions/qualities with no single clean master |

What is already in good shape:

- [`src/app/apple-icon.png`](../src/app/apple-icon.png) — 180×180 opaque (refresh only if seal changes)
- [`src/app/opengraph-image.png`](../src/app/opengraph-image.png) — 1200×630, green `#1a7a4c` matches `themeColor`
- [`src/app/opengraph-image.alt.txt`](../src/app/opengraph-image.alt.txt) — keep as-is
- App Router conventions (no manual `<link rel="icon">` needed)

---

## 3. Target end state

```text
public/
  logo.png                 # Schema.org Organization.logo (512×512+, transparent)
  brand-mark.svg           # Navbar/footer UI mark (clean full seal)
  # REMOVE after integration: icon-192x192.webp

src/app/
  icon.svg                 # Simplified favicon mark (clean vector, transparent)
  favicon.ico              # 16 + 32 + 48, matching simplified mark, white bg
  apple-icon.png           # 180×180 opaque full seal (optional refresh)
  opengraph-image.png      # 1200×630 (optional refresh)
  opengraph-image.alt.txt  # unchanged
```

Do **not** add `manifest.webmanifest` unless you later decide this marketing site should be installable as a PWA.

---

## 4. Master artwork first

Before exporting derivatives, produce one **clean full-seal vector** in Illustrator or Figma.

### Master requirements

- Circular Coldop seal: gold barn, charcoal “COLDOP”, arc text, “ESTD. 2023”, rings
- True vector shapes (or outlined text) — **not** Image Trace of a PNG
- Flat brand colors; avoid near-duplicate greys from tracing
- Square artboard; seal centered and nearly edge-to-edge (~0–5% padding is fine for the master)
- Transparent outside the circle

### Brand colors (from live assets)

| Role | Value |
|------|--------|
| Brand green (theme / OG) | `#1a7a4c` |
| Seal gold (barn) | ~`#C3AC64` (match master exactly once locked) |
| Charcoal (type / rings) | Match existing seal (~`#5C5B5B` family — pick **one** charcoal and stick to it) |
| Seal fill | Off-white / light grey inside the circle |

Name the master something like `coldop-seal-master.svg` and keep it outside the app (or in the hand-back folder) as the source of truth. Derivatives below are **exports**, not independent redesigns.

---

## 5. Ordered asset checklist

Work top to bottom. Check each box only when acceptance criteria pass.

### Step A — Simplified favicon SVG → `icon.svg`

**Filename for hand-back:** `icon.svg`  
**Final app path:** `src/app/icon.svg`

| Spec | Requirement |
|------|-------------|
| Format | SVG |
| Aspect | 1:1 |
| viewBox | Square, e.g. `0 0 32 32` or `0 0 512 512` |
| Background | **Transparent** outside the mark |
| Artwork | Simplified mark: gold barn ± compact “COLDOP”. **Omit** “OPTIMIZING YOUR STORAGE” and “ESTD. 2023” |
| Vector | Designer paths only — no Image Trace, no embedded PNG/base64 |
| Padding | ~8–12% safe area inside the viewBox |
| File size | Ideally **under ~10KB** (hard fail if still ~100KB+ traced junk) |

**Acceptance**

- [ ] Recognizable when viewed at **16×16** and **32×32**
- [ ] No black/white full-bleed square behind the mark (transparency)
- [ ] Opens cleanly in browser; no Illustrator-only cruft required for rendering
- [ ] Same silhouette you will use for `favicon.ico`

---

### Step B — Matching ICO → `favicon.ico`

**Filename for hand-back:** `favicon.ico`  
**Final app path:** `src/app/favicon.ico`

| Spec | Requirement |
|------|-------------|
| Format | ICO |
| Sizes inside file | **16×16**, **32×32**, and **48×48** (48 matters for Google’s size guidance) |
| Artwork | Same simplified mark as `icon.svg` |
| Background | **Opaque white** |
| Aspect | 1:1 each frame |

**Why keep ICO if SVG exists?** Legacy clients and `/favicon.ico` requests; Next.js also treats it as a first-class fallback. SVG + ICO is intentional, not redundant — they must **look the same**.

**Acceptance**

- [ ] ICO contains at least the 48×48 frame (ideally 16 + 32 + 48)
- [ ] White corners, not black, not transparent-only mismatch vs SVG mark
- [ ] Visually matches `icon.svg` at small sizes

**Tools (examples):** [RealFaviconGenerator](https://realfavicongenerator.net/), ImageMagick `convert`, or Figma/Illustrator → PNG frames → ICO packer. Export PNGs from the simplified SVG, then pack.

---

### Step C — UI brand mark → `brand-mark.svg`

**Filename for hand-back:** `brand-mark.svg`  
**Final app path:** `public/brand-mark.svg` (agent will wire `BrandMark`)

| Spec | Requirement |
|------|-------------|
| Format | SVG (preferred) |
| Aspect | 1:1 |
| Artwork | **Full seal** (arcs + ESTD OK — displayed at ~40×40) |
| Background | Transparent outside the circle |
| Vector | Clean master export, not Image Trace |
| File size | Prefer well under 50KB |

**Raster fallback (only if you cannot ship SVG)**

| Spec | Requirement |
|------|-------------|
| Filename | `brand-mark.webp` or `brand-mark.png` |
| Dimensions | **Exactly 192×192** (real pixels) |
| Transparency | Yes |
| Note | Do **not** name it `icon-192x192.webp` unless it is truly 192×192 |

**Acceptance**

- [ ] Looks sharp at 40×40 (navbar size)
- [ ] Transparent corners
- [ ] Colors match master / `logo.png`

This replaces the role of today’s oversized `public/icon-192x192.webp`.

---

### Step D — Schema logo → `logo.png`

**Filename for hand-back:** `logo.png`  
**Final app path:** `public/logo.png` (URL stays `https://coldop.in/logo.png`)

| Spec | Requirement |
|------|-------------|
| Format | PNG |
| Dimensions | **512×512** (or 1024×1024 if you want headroom) |
| Aspect | 1:1 |
| Transparency | Yes (RGBA) |
| Artwork | Full seal from clean master |
| Use | JSON-LD `Organization.logo` only (not the favicon) |

**Acceptance**

- [ ] Square, ≥512px
- [ ] Transparent outside circle
- [ ] Visually matches UI seal

---

### Step E — Optional: Apple touch icon → `apple-icon.png`

Refresh **only if** the full-seal master changed.

| Spec | Requirement |
|------|-------------|
| Format | PNG |
| Dimensions | **180×180** |
| Color mode | RGB, **no alpha** (opaque) |
| Background | Opaque **white** (locked default) |
| Artwork | Full seal |
| Final path | `src/app/apple-icon.png` |

**Acceptance**

- [ ] Exactly 180×180
- [ ] No transparency
- [ ] Seal readable on a simulated home-screen size

---

### Step F — Optional: Open Graph → `opengraph-image.png`

Refresh **only if** branding/colors change.

| Spec | Requirement |
|------|-------------|
| Format | PNG |
| Dimensions | **1200×630** |
| Aspect | ~1.91:1 |
| Background | Solid `#1a7a4c` (matches `themeColor`) |
| Artwork | Full seal centered (~40–70% of the short side is fine; current ~420px diameter works) |
| Margins | Keep seal away from edges (safe for platform crops) |
| Alt text | Keep existing [`opengraph-image.alt.txt`](../src/app/opengraph-image.alt.txt) unless copy changes |
| Final path | `src/app/opengraph-image.png` |

**Acceptance**

- [ ] Exactly 1200×630
- [ ] Background is `#1a7a4c`
- [ ] Brand name readable in a Twitter/LinkedIn-sized preview
- [ ] File size roughly in the 50–200KB range (quality over extreme compression)

---

## 6. Export recipes

### Do

- Build the seal from shapes/text in Figma or Illustrator, then export SVG
- Outline text if you need pixel-identical rendering everywhere
- Use a **square** frame for all icon/logo exports
- Export favicon derivatives from the **simplified** artboard, not by shrinking the full seal
- For ICO: export crisp PNGs at 16 / 32 / 48 from the simplified SVG, then pack into one `.ico`
- For Apple: flatten onto white; export PNG without alpha
- For OG: place seal on a `#1a7a4c` rectangle 1200×630; export PNG

### Do not

- Run **Image Trace** / “Vectorize” on a PNG and ship that as `icon.svg`
- Embed PNG/base64 inside SVG
- Leave Adobe-only baggage as the only structure (`enable-background`, hundreds of near-duplicate fills)
- Use the full seal (with arc microcopy) as the 16px favicon
- Ship a “192” file that is actually 2000×2000
- Convert the OG social card to SVG for production serving
- Add a PWA manifest “just because”

### Figma quick path

1. One page: `Master / Full seal`
2. One page: `Favicon / Simplified` (duplicate, delete arc text + ESTD, simplify barn if needed)
3. Export simplified → SVG (`icon.svg`) and PNG 16/32/48 → pack ICO
4. Export full seal → SVG (`brand-mark.svg`) and PNG 512 (`logo.png`)
5. Optional: frame 180×180 white + seal → `apple-icon.png`
6. Optional: frame 1200×630 `#1a7a4c` + centered seal → `opengraph-image.png`

### Illustrator quick path

1. Clean master file with named layers (`seal`, `barn`, `wordmark`, `arcs`)
2. Save a copy `favicon-simplified.ai`; delete arcs/ESTD; simplify
3. Export SVG with “Presentation Attributes”, decimal precision ~1–2, no Illustrator editing capabilities bloating the file
4. Open SVG in a text editor: if it is still >50KB with dozens of near-identical greys, redo — do not ship a trace

---

## 7. Local verification checklist

Run through this before hand-back.

### Dimensions and format

```bash
# From repo root (macOS)
file public/logo.png src/app/apple-icon.png src/app/opengraph-image.png src/app/favicon.ico
sips -g pixelWidth -g pixelHeight public/logo.png
sips -g pixelWidth -g pixelHeight src/app/apple-icon.png
sips -g pixelWidth -g pixelHeight src/app/opengraph-image.png
sips -g pixelWidth -g pixelHeight src/app/favicon.ico

# SVG sanity
head -n 5 src/app/icon.svg
wc -c src/app/icon.svg public/brand-mark.svg
```

| File | Expect |
|------|--------|
| `icon.svg` | Square viewBox; preferably &lt; 10–20KB |
| `favicon.ico` | Includes 48×48 (and ideally 16 + 32) |
| `brand-mark.svg` | Valid SVG; transparent outside circle |
| `logo.png` | ≥512×512, RGBA |
| `apple-icon.png` | 180×180, opaque |
| `opengraph-image.png` | 1200×630, green field |

### Visual checks

- [ ] `icon.svg` at 16px and 32px: still reads as Coldop (not a muddy blob)
- [ ] `favicon.ico` matches the SVG mark (same silhouette)
- [ ] `brand-mark.svg` at 40px: seal looks intentional next to the “Coldop” wordmark
- [ ] `logo.png` corners are transparent (not black or white mats)
- [ ] No asset uses black outside-circle mats unless that is a deliberate OG-style field (OG uses green, not black)

### Performance sanity

- [ ] Favicon SVG is not ~120KB
- [ ] UI mark is not a multi‑thousand‑pixel raster for a 40px display
- [ ] OG image is not multi‑megabyte

---

## 8. Hand-back package

### Folder to use

Create this folder in the repo (or drop files here when ready):

```text
docs/asset-handback/
  icon.svg
  favicon.ico
  brand-mark.svg          # or brand-mark.webp / brand-mark.png
  logo.png
  apple-icon.png          # optional
  opengraph-image.png     # optional
  NOTES.md                # optional: anything the agent should know
```

### Required vs optional

| File | Required? |
|------|-----------|
| `icon.svg` | **Yes** |
| `favicon.ico` | **Yes** |
| `brand-mark.svg` (or 192×192 raster) | **Yes** |
| `logo.png` | Strongly recommended |
| `apple-icon.png` | Only if seal changed |
| `opengraph-image.png` | Only if branding/OG layout changed |

### Message to send when ready

> Asset hand-back is in `docs/asset-handback/`. Please integrate into App Router + BrandMark, remove `public/icon-192x192.webp`, and verify favicon/OG metadata. Do not redesign artwork.

---

## 9. What happens after hand-back (agent)

The agent will:

1. Replace `src/app/icon.svg` and `src/app/favicon.ico`
2. Place `public/brand-mark.svg` (or raster) and update [`BrandMark.tsx`](../src/components/landing/BrandMark.tsx) to use it
3. Replace `public/logo.png` if provided (keep schema URL stable)
4. Replace Apple / OG files only if provided
5. Delete `public/icon-192x192.webp` after the UI mark is wired
6. Leave App Router file conventions in place (no manual icon `<link>` tags unless something is broken)
7. Not add a PWA manifest

You do **not** need to edit `layout.tsx` for icons/OG if files use the standard names above.

---

## 10. Quick priority reminder

| Priority | Action |
|----------|--------|
| P0 | Simplified `icon.svg` + matching `favicon.ico` + correctly sized UI mark |
| P1 | Clean `logo.png` from master; consistent colors/backgrounds |
| P2 | Apple / OG refresh; alt/`aria` polish in code (agent) |

Google Search may take days/weeks to refresh a favicon and **does not guarantee** display even with a correct setup. Fix correctness and legibility first; do not treat Google caching as a blocker for shipping.

---

## Checklist summary

- [ ] Clean full-seal master (vector)
- [ ] `icon.svg` — simplified, transparent, small file
- [ ] `favicon.ico` — 16 / 32 / 48, white bg, matches SVG
- [ ] `brand-mark.svg` (or 192×192 raster) — full seal for UI
- [ ] `logo.png` — ≥512, transparent, full seal
- [ ] Optional `apple-icon.png` / `opengraph-image.png`
- [ ] Files in `docs/asset-handback/`
- [ ] Ping agent with the hand-back message
