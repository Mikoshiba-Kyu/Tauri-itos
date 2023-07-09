/**
 * ---------------------- Dev Settings ----------------------
 */
const isLogging = true
const moduleName = 'App.tsx'

/**
* ---------------------- Import ----------------------
*/
// React
import { RecoilRoot } from "recoil"

// Components
import MainWindow from "./components/MainWindow"

// Other
import "./App.css"

/**
* ---------------------- Contents ----------------------
*/
function App() {
  isLogging && console.log(`[App] [${moduleName}] Render.`)

  return (
    <RecoilRoot>
      <div className="App">
        <MainWindow />
      </div>
    </RecoilRoot>
  )
}

export default App