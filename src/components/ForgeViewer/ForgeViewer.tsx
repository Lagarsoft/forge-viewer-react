import React, { useEffect, useRef, useState } from "react"

declare var Autodesk: any

interface ForgeViewerProps {
  urn: string
  accessToken: string
}

const ForgeViewer = (props: ForgeViewerProps) => {
  const { urn, accessToken } = props
  const [viewer3D, setViewer3D] = useState<any>(null)
  const [viewer2D, setViewer2D] = useState<any>(null)

  const viewer3DRef = useRef(null)
  const viewer2DRef = useRef(null)

  useEffect(() => {
    if (!urn || !accessToken || !viewer3DRef || !viewer2DRef) return
    console.log(accessToken, urn)
    var options = {
      env: "AutodeskProduction2",
      api: "streamingV2", // for models uploaded to EMEA change this option to 'streamingV2_EU'
      getAccessToken: (onTokenReady: any) => {
        var timeInSeconds = 3600 // Use value provided by Forge Authentication (OAuth) API
        onTokenReady(accessToken, timeInSeconds)
      },
    }

    Autodesk.Viewing.Initializer(options, function () {
      const v3D = new Autodesk.Viewing.Private.GuiViewer3D(viewer3DRef.current)
      const v2D = new Autodesk.Viewing.Private.GuiViewer3D(viewer2DRef.current)

      var startedCode1 = v3D.start()
      var startedCode2 = v2D.start()

      if (startedCode1 > 0 || startedCode2 > 0) {
        console.error("Failed to create a Viewer: WebGL not supported.")
        return
      }

      const onDocumentLoadSuccess = (viewerDocument: any) => {
        // load the first 3d view
        v3D.loadDocumentNode(
          viewerDocument,
          viewerDocument.getRoot().search({
            type: "geometry",
            role: "3d",
          })[0]
        )

        // load the first 2d view
        v2D.loadDocumentNode(
          viewerDocument,
          viewerDocument.getRoot().search({
            type: "geometry",
            role: "2d",
          })[0]
        )
      }

      console.log("Initialization complete, loading a model next...")
      Autodesk.Viewing.Document.load(
        urn,
        onDocumentLoadSuccess,
        onDocumentLoadFailure
      )

      setViewer3D(v3D)
      setViewer2D(v2D)
    })
    return () => {
      if (!viewer3D) return
      viewer3D.finish()
      setViewer3D(null)

      if (!viewer2D) return
      viewer2D.finish()
      setViewer2D(null)

      Autodesk.Viewing.shutdown()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urn, accessToken])

  const onDocumentLoadFailure = (e: any) => {
    console.error("Failed fetching Forge manifest", e)
  }

  return <div ref={viewer3DRef} className="forgeViewer"></div>
  // <Col span={12}><div ref={viewer2DRef} className="forgeViewer"></div></Col>
}

export default ForgeViewer
