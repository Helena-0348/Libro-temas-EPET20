import React from 'react';
import { UserProvider } from './context/useUser.jsx';
import AppRouter from './components/AppRouter';
import './css/App.css';

function App() {
  return (
    <UserProvider>
      <div >
        <div >
          <AppRouter />
        </div>
      </div>
    </UserProvider>
  );
}

export default App;