/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from './styles.module.css'

import { useEffect, useRef, useState } from "react"

// eslint-disable-next-line no-var
declare var Autodesk: any

export interface ForgeViewerProps {
    urn: string
    accessToken: string
    registerExtensionsCallback?: CallableFunction,
    loadAutodeskExtensions?: string[],
    loadCustomExtensions?: string[],
    customExtensionsCallbacks?: any
}

export function ForgeViewer(props: ForgeViewerProps) {
    const { urn, accessToken, registerExtensionsCallback, loadAutodeskExtensions, loadCustomExtensions, customExtensionsCallbacks: customExtensionsCallbacks } = props

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
                extensions: loadAutodeskExtensions || ['Autodesk.DocumentBrowser', 'Autodesk.VisualClusters']
            };
            const viewer = new Autodesk.Viewing.GuiViewer3D(viewerRef.current, config);
            viewer.start();
            viewer.setTheme('light-theme');
            // viewer
            viewer.resize();


            // Load Document
            const onDocumentLoadSuccess = async (doc: any) => {
                await viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry());

                // load custom extensions
                const loadExtensionsPromises = (loadCustomExtensions || []).map(element => {
                    return viewer.loadExtension(element);
                });

                // Wait for all extensions to be loaded
                await Promise.all(loadExtensionsPromises);


                //save the callback for later use inside the click events
                viewer.customCallbacks = customExtensionsCallbacks
            }

            const onDocumentLoadFailure = (code: any, message: any, errors: any) => {
                console.error({ code, message, errors });
            }

            viewer.setLightPreset(0);
            if (registerExtensionsCallback) registerExtensionsCallback(viewer);

            setViewer(viewer);

            Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);



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


