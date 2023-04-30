import {createRoot} from 'react-dom/client'
import { App } from './src/components/appComponent/App'
const root = createRoot(document.getElementById('app'))
root.render(<App/>)