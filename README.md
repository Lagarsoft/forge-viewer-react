# Forge Viewer React Component

Enable using Autodesk Forge Viewer v7 as a Typed React component

## Objective

- Use 2D or 3D Forge Viewer as declarative component.
- Leverage typescript usage to Improve Developers Experience.
- Seamless Integration of 3rd party UI components inside the viewer Canvas.

## Usage

1. include Autodesk Forge Viewer JS and CSS from Autodesk CDN in your index.html file. [Here is the official documentation](https://forge.autodesk.com/en/docs/viewer/v7/developers_guide/viewer_basics/starting-html/)

- CSS

        <link rel="stylesheet" href="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/style.min.css"
        type="text/css" />

- JS
-
  	    <script src="https://developer.api.autodesk.com/modelderivative/v2/viewers/7.*/viewer3D.min.js"></script>

2.  Install the wrapper component

         npm install @lagarsoft/forge-viewer-react

3.  Import the component

         import { ForgeViewer } from "@lagarsoft/forge-viewer-react"

4.  Use the component

         <ForgeViewer urn={urn} accessToken={accessToken} />

https://user-images.githubusercontent.com/1298917/192904913-56bc061a-4da4-44e9-9c79-81e0871043f5.mp4

- Model by Pau from [/slantis](https://www.slantis.com/)

## How to contribute

PRs are welcome, also feel free to reach us Martin Daguerre (<martin.daguerre@lagarsoft.com>) and Pablo Gancharov (<pablo.gancharov@lagarsoft.com>)

## Development:


To work on the library:
 
```
npm run dev-lib
```

To start the demo app:
 
```
npm run dev
```

## Q&A:

    Failed to resolve import "../" from "src/App.tsx". Does the file exist?
> you need to compile the library at least once to start the demo app: `npm run build`

