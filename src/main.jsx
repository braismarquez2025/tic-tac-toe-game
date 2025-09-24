import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import { PlayerProvider } from './context/PlayerContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <PlayerProvider>
      <App />  
    </PlayerProvider>
  </BrowserRouter>,
)
