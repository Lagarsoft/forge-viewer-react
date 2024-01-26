/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const Autodesk = (globalThis as any).Autodesk;

declare global {
    interface Window {
        buttonCallback?: any;
    }
}

export class CustomExtension extends Autodesk.Viewing.Extension {
    subToolbar: any;

    constructor(viewer: any, options: any) {
        super(viewer, options);
    }

    register() {
        Autodesk.Viewing.theExtensionManager.registerExtension('Lagarsoft-Extension', CustomExtension);
    }

    load() {
        console.log('Lagarsoft-Extension  has been loaded');

        const createUI = () => {
            const viewer = this.viewer;

            // Button 1 - Add main unit
            const button1 = new Autodesk.Viewing.UI.Button('custom-action-one');
            button1.onClick = function (e: any) {
                console.log(viewer)
                viewer.customCallbacks.customCallback1();
            };

            button1.addClass('my-view-custom-button1');
            button1.setToolTip('Custom Action 1');

            // SubToolbar
            this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('lagarsoft-extension-toolbar');
            this.subToolbar.addControl(button1);

            viewer.toolbar.addControl(this.subToolbar);
        };

        if (this.viewer.toolbar) {
            // Toolbar is already available, create the UI
            createUI();
        } else {
            alert("only support dynamic loading");
            // Toolbar hasn't been created yet, wait until we get notification of its creation
            // this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
            // this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
        }

        return true;
    }

    unload() {
        console.log('Lagarsoft-Extension has been unloaded');
        this.viewer.toolbar.removeControl(this.subToolbar);
        return true;
    }
}
