/* eslint-disable prettier/prettier */
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { useMemo } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '@/scenes/dashboard';
import Navbar from '@/scenes/navbar';
import { themeSettings } from './theme';

function App() {
  const theme = useMemo(() => createTheme(themeSettings), []);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" height="100%" padding="1rem 2rem 4rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route
                path="/ANOTHER PAGE"
                element={<div>predictions page</div>}
              />
            </Routes>
          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}
export default App;
