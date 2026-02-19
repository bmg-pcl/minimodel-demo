# XR Digital Constructability

Interactive 3D model viewers with multiple AR/XR deployment options for industrial cable-routing constructability reviews. View models in a browser, place them on a surface with AR, or project them on a HoloLens — all from static HTML with no build step.

## Quick start

The project is hosted on GitHub Pages. Open the landing page and choose a viewer:

```
https://bmg-pcl.github.io/minimodel-demo/
```

Or serve locally — any static file server will work:

```bash
npx serve .          # Node
python -m http.server # Python
```

> **HTTPS is required** for WebXR and device-orientation features. When developing locally, use `localhost` (browsers treat it as a secure context) or add a TLS certificate.

## Viewers

| Viewer | File | What it does | Requirements |
|--------|------|--------------|--------------|
| **Model Viewer + AR** | `index2.html` | Google Model Viewer with property sidebar, greyscale toggle, and gyroscope navigation. Tap the AR button to place the model on a real-world surface. | iOS or Android, modern browser |
| **WebXR AR** | `ar-viewer.html` | Full immersive AR session via the WebXR Device API with surface hit-test, model nudge controls, camera feed overlay, and a splash screen. | Android + Chrome + ARCore, HTTPS |
| **Marker AR** | `ar.html` | A-Frame + AR.js marker-based viewer. Point the camera at the printed marker pattern to anchor the model. | Printed `custom-marker.patt` |
| **HoloLens** | `hololens/holoviewer.html` | Three.js scene rendered through the HoloJS runtime for holographic display. | Microsoft HoloLens + HoloJS |

### Other pages

| Page | File | Purpose |
|------|------|---------|
| Landing page | `index.html` | Menu hub linking to every viewer |
| Pull card | `pull_card.html` | Printable 11 x 17 in. installation card with model images, cable specs, QR codes, and a pilot-install feedback form |
| Revision check | `revcheck.html` | Quick document-revision verification (linked from the pull-card QR) |
| Minimortifier | `minimortifier.html` | Browser-based PDF text and comment extraction tool with regex filtering |
| Static viewer | `spa-static-minimodel.html` | CRT-themed model viewer with collapsible property sections |
| Geo viewer | `xr-headset.html` | Experimental geolocation-based model placement |

## Features

### Property sidebar
`index2.html` and `ar-viewer.html` load `cable_information.json` at runtime and display cable routing properties (source/destination tags, cable type, route, pull length, etc.) in a collapsible right-hand sidebar.

### Device orientation (gyroscope)
Both `index2.html` and `ar-viewer.html` have a **Device Orientation (gyro)** checkbox. When enabled the viewer maps your phone's gyroscope to the camera so you can look around by physically rotating the device. On iOS 13+ the required permission prompt is triggered automatically by the checkbox tap.

### Greyscale / display options
Toggle greyscale rendering from the sidebar in `index2.html` (CSS filter on the model viewer) or `ar-viewer.html` (CSS filter on the camera feed). The WebXR viewer also supports hiding the camera feed and switching between dark/light mode.

### Pull card & QR codes
`pull_card.html` is a print-ready 11 x 17 in. landscape document designed for installation crews. It includes:

- A main model render and top-down view with compass overlay
- A cable specification table
- A pilot-install feedback form with quality rating scales
- QR codes linking to the mini-model viewer, revision check, and feedback form

## Project structure

```
minimodel-demo/
├── index.html                          Landing page (viewer menu)
├── index2.html                         Model Viewer + AR (recommended)
├── ar-viewer.html                      WebXR immersive AR viewer
├── ar.html                             Marker-based AR (A-Frame + AR.js)
├── arj2.html                           Marker-based AR (alternate)
├── pull_card.html                      Printable installation pull card
├── revcheck.html                       Document revision check
├── minimortifier.html                  PDF text/comment extraction tool
├── spa-static-minimodel.html           CRT-themed static model viewer
├── xr-headset.html                     Geolocation-based viewer (experimental)
├── hololens/
│   ├── holoviewer.html                 HoloLens viewer
│   └── app.js                          HoloLens Three.js application
├── cable_information.json              Cable routing properties
├── Mini-Model-2-7213-74-3500-S02.glb  Primary model (19 MB)
├── mini_model.glb                      Alternative model (12 MB)
├── compressed.glb                      Lightweight model (981 KB)
├── custom-marker.patt                  AR.js marker pattern
├── model_shot_main.png                 Main model render
├── model_shot_top.png                  Top-down view
├── Compass.png                         Compass overlay
├── qr-code_mini.png                    QR → mini-model viewer
├── qr-code_rev.png                     QR → revision check
└── qr-code_feedback.png                QR → feedback form
```

## 3D models

Three versions of the model are included at different fidelity levels:

| File | Size | Used by |
|------|------|---------|
| `Mini-Model-2-7213-74-3500-S02.glb` | 19 MB | `index2.html`, `spa-static-minimodel.html` |
| `mini_model.glb` | 12 MB | `ar-viewer.html` |
| `compressed.glb` | 981 KB | `ar.html`, `arj2.html`, `hololens/holoviewer.html` |

## Technologies

- **Google Model Viewer** — `<model-viewer>` web component with built-in AR (Scene Viewer / WebXR / Quick Look)
- **Three.js r150** — WebGL rendering and WebXR session management
- **A-Frame 1.2 + AR.js 3.3** — marker-based AR
- **HoloJS** — Microsoft HoloLens holographic runtime
- **Milligram CSS** — lightweight CSS framework
- **PDF.js** — client-side PDF text extraction (minimortifier)
- **PapaParse** — CSV pattern file parsing (minimortifier)

No build tools, bundlers, or package managers are required. All dependencies are loaded from CDNs at runtime.

## Deployment

The site is deployed as a static site on **GitHub Pages** from the default branch. Push to `main` and the site updates automatically — no CI pipeline needed.

## Browser support

| Feature | Chrome (Android) | Safari (iOS) | Chrome (Desktop) | Edge (HoloLens) |
|---------|:-:|:-:|:-:|:-:|
| 3D model viewing | Yes | Yes | Yes | Yes |
| AR placement | Yes (WebXR + Scene Viewer) | Yes (Quick Look) | — | Holographic |
| Device orientation | Yes | Yes (permission prompt) | — | — |
| Marker AR | Yes | Yes | Yes | — |

## License

Internal project — BMG / PCL Construction.
