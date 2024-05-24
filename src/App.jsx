import { MantineProvider, createTheme } from '@mantine/core';
import './styles/global.css';
import '@mantine/core/styles.css';
import AppRouter from './components/Router/AppRouter';
import AuthProvider from './hooks/auth';
import { BrowserRouter } from 'react-router-dom';
import { TrackProvider } from './hooks/track';

const myColor = [
  '#f5f5f5',
  '#e7e7e7',
  '#cdcdcd',
  '#b1b1b1',
  '#9a9a9a',
  '#8b8b8b',
  '#838383',
  '#717171',
  '#646464',
  '#555658',
];

const theme = createTheme({
  primaryColor: 'myColor',
  colors: {
    myColor,
  },
});

function App() {
  return (
    <MantineProvider forceColorScheme='dark' theme={theme}>
      <TrackProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProvider>
      </TrackProvider>
    </MantineProvider>
  );
}

export default App;
