import { useState, useEffect } from 'react'
import '../App.css'
import Editor from './Editor'
import useLocalStorage from '../hooks/useLocalStorage';
import { faHtml5, faCss3, faJs } from "@fortawesome/free-brands-svg-icons";

function App() {
  const [html, setHtml] = useLocalStorage("html", "");
  const [css, setCss] = useLocalStorage("css", "");
  const [js, setJs] = useLocalStorage("js", "");
  const [srcDoc, setSrcDoc] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `);
    }, 250);

    return () => clearTimeout(timeout);
  }, [html, css, js]);

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
          icon={faHtml5}
        />

        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
          icon={faCss3}
        />

        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
          icon={faJs}
        />
      </div>

      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="0"
          width="100%"
          height="100%"
        />
      </div>
    </>
  )
}

export default App
