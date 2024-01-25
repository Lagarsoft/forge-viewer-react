/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css'

import { useEffect, useRef, useState } from "react"

// eslint-disable-next-line no-var
declare var Autodesk: any

export interface ForgeViewerProps {
    urn: string
    accessToken: string
}

export function ForgeViewer(props: ForgeViewerProps) {
    const { urn, accessToken } = props

    const [viewer, setViewer] = useState<any>(null)

    const viewerRef = useRef(null)

    useEffect(() => {
        if (!urn || !accessToken || !viewerRef || !Autodesk)
            return

        console.log("accessToken is Present:", (accessToken != null));
        console.log("urn is Present:", (urn != null));
        console.log("urn:", urn);

        // Init viewer
        const options = {
            env: "AutodeskProduction",
            getAccessToken: (onTokenReady: any) => {
                const timeInSeconds = 3600 // Use value provided by Forge Authentication (OAuth) API
                onTokenReady(accessToken, timeInSeconds)
            },
        }

        Autodesk.Viewing.Initializer(options, () => {
            const config = {
                extensions: ['Autodesk.DocumentBrowser', 'Autodesk.VisualClusters']
            };
            const viewer = new Autodesk.Viewing.GuiViewer3D(viewerRef.current, config);
            viewer.start();
            viewer.setTheme('light-theme');
            // viewer
            viewer.resize();


            // Load Document
            const onDocumentLoadSuccess = (doc: any) => {
                viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry());
            }
            const onDocumentLoadFailure = (code: any, message: any, errors: any) => {
                console.error({ code, message, errors });
            }
            viewer.setLightPreset(0);
            console.log(viewer)
            // viewer.resize();
            // window.addEventListener('resize', function () {
            //     viewer.resize();
            // });
            Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);

            setViewer(viewer);
        });


        return () => {
            if (!viewer) return
            viewer.finish()
            setViewer(null)

            Autodesk.Viewing.shutdown()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urn, accessToken])


    return (typeof Autodesk !== 'undefined') ? (

        <div
            ref={viewerRef}
            className={`forgeViewer ${styles.forgeViewer}`}
        ></div>
    ) : (
        <div> Plese include viewer3D.min.js to the index.html</div>
    )
}


