import './App.css'
import { ForgeViewer } from '../'
import { useState } from 'react'

function App() {
  const [urn, setUrn] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");

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

      <div style={{ width: '500px', height: '800px', position: 'relative', border: '1px black solid' }}>
        <ForgeViewer urn={urn} accessToken={accessToken} />
      </div>
    </>
  )
}

export default App
