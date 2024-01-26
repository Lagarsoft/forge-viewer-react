import './App.css'
import { ForgeViewer } from '../'
import { useState } from 'react'
import { CustomExtension } from './CustomExtension';

function App() {

  const [urn, setUrn] = useState<string>(import.meta.env.VITE_URN);
  const [accessToken, setAccessToken] = useState<string>(import.meta.env.VITE_TOKEN);

  const [value, setValue] = useState<number>(0);


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const registerExtensionsCallback = (viewer: any, options: any) => {
    console.log("Init Extension callback", viewer, options);
    const extension = new CustomExtension(viewer, {});
    extension.register();
  }

  const customCallback1 = () => {
    setValue(value => value + 1)
  };


  return (
    <>
      <div style={{ marginBottom: '10px' }}>
        <label >URN:</label><br />
        <input type="text" id="urn" name="urn" value={urn} placeholder="Paste URN" onChange={e => setUrn(e.target.value)} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label >Access Token:</label><br />
        <input type="text" id="token" name="token" value={accessToken} placeholder="Paste Access Token" onChange={e => setAccessToken(e.target.value)} />
      </div>

      <div style={{ marginBottom: '10px' }}>
        <label >Example State Value:</label><br />
        <input type="text" id="value" name="value" value={value} />
      </div>

      <div style={{ width: '900px', height: '500px', position: 'relative', border: '1px black solid' }}>
        <ForgeViewer
          urn={urn}
          accessToken={accessToken}
          registerExtensionsCallback={registerExtensionsCallback}
          loadAutodeskExtensions={['Autodesk.DocumentBrowser', 'Autodesk.VisualClusters']}
          loadCustomExtensions={["Lagarsoft-Extension"]}
          customExtensionsCallbacks={{ customCallback1: customCallback1 }}
        />
      </div>
    </>
  )
}

export default App
