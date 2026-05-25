import React, { useState } from 'react';
import { RoomProvider, useRoom } from './context/RoomContext';
import Home from './pages/Home';
import LiveRoom from './pages/LiveRoom';

function NavigationController() {
  const [screen, setScreen] = useState('home'); // home | docente | alumno
  const { resetRoom } = useRoom();

  const handleLeave = () => {
    resetRoom();
    setScreen('home');
  };

  if (screen === 'home') {
    return <Home onSelectRole={setScreen} />;
  }

  return <LiveRoom role={screen} onLeave={handleLeave} />;
}

export default function App() {
  return (
    // Inyectamos el estado global a todo el árbol atómico de componentes
    <RoomProvider>
      <NavigationController />
    </RoomProvider>
  );
}