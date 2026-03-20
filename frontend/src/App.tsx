import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Router from "./Router";
import Theme from "./Theme";
import { ThemeProvider } from '@mui/material';

function App() {
  return (
    <>
      <ThemeProvider theme={Theme}>
        <Router />
      </ThemeProvider>
    </>
  )
}

export default App;