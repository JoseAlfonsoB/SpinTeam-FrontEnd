import React, { useState } from 'react';
// Importamos los organismos que acabamos de crear
import CreateRoomForm from './components/organisms/CreateRoomForm';
import StudentJoinForm from './components/organisms/StudentJoinForm';
import LiveStudentList from './components/organisms/LiveStudentList';
import TeamGrid from './components/organisms/TeamGrid';

// Importamos algunos átomos básicos para la estructura de la página de pruebas
import Title from './components/atoms/Title';
import Button from './components/atoms/Button';
import Badge from './components/atoms/Badge';
import { Sparkles, RefreshCw, Trash2 } from 'lucide-react';

export default function App() {
  // --- ESTADOS PARA SIMULAR LA LÓGICA DE NEGOCIO ---
  const [roomConfig, setRoomConfig] = useState(null);
  const [students, setStudents] = useState([
    { id: '1', name: 'Jose Alfonso', status: 'waiting' },
    { id: '2', name: 'María Fernanda', status: 'waiting' },
    { id: '3', name: 'Carlos Eduardo', status: 'waiting' }
  ]);
  const [teams, setTeams] = useState([]);

  // 1. Simulación al crear una sala (Docente)
  const handleCreateRoom = (config) => {
    setRoomConfig(config);
    // Limpiamos equipos previos al crear una nueva sala configurada
    setTeams([]);
    setStudents(students.map(s => ({ ...s, status: 'waiting' })));
  };

  // 2. Simulación al unirse un alumno a la fila (Alumno)
  const handleJoinStudent = (newStudentData) => {
    const newStudent = {
      id: Date.now().toString(),
      name: newStudentData.studentName,
      status: 'waiting'
    };
    setStudents([...students, newStudent]);
  };

  // 3. Simulación del Algoritmo (Divide la lista de alumnos en N equipos)
  const handleGenerateTeams = () => {
    if (students.length === 0) return;

    const numTeams = roomConfig ? roomConfig.teamCount : 2;
    
    // Clonamos la lista para no mutar el estado original directamente
    let listToProcess = [...students];

    // Si el algoritmo configurado es Aleatorio (RANDOM), mezclamos la lista primero
    if (roomConfig?.algorithm === 'RANDOM') {
      listToProcess.sort(() => Math.random() - 0.5);
    } 
    // Si es FIFO, se procesa exactamente en el orden en que están en el array

    // Inicializamos la estructura de los equipos vacíos
    const generatedTeams = Array.from({ length: numTeams }, (_, i) => ({
      id: `team-${i}`,
      name: `Equipo ${i + 1}`,
      members: []
    }));

    // Distribución equitativa de los alumnos en los equipos libres
    listToProcess.forEach((student, index) => {
      const teamIndex = index % numTeams;
      generatedTeams[teamIndex].members.push(student);
    });

    // Marcamos a todos los alumnos como asignados en la lista de espera
    setStudents(students.map(s => ({ ...s, status: 'assigned' })));
    setTeams(generatedTeams);
  };

  // 4. Resetear el laboratorio de pruebas
  const handleReset = () => {
    setRoomConfig(null);
    setStudents([
      { id: '1', name: 'Jose Alfonso', status: 'waiting' },
      { id: '2', name: 'María Fernanda', status: 'waiting' },
      { id: '3', name: 'Carlos Eduardo', status: 'waiting' }
    ]);
    setTeams([]);
  };

  return (
    <div className="min-h-screen bg-Neutral-50 p-4 md:p-10 space-y-8">
      
      {/* HEADER PRINCIPAL */}
      <header className="bg-BlueDark-950 p-6 rounded-2xl text-Neutral-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="text-Neutral-300" size={24} />
            <Title level={1} className="text-white">Panel de Simulación de Organismos</Title>
          </div>
          <p className="text-GrayBlue-300 text-sm mt-1">
            Prueba cómo interactúa la interfaz con los algoritmos de ordenamiento.
          </p>
        </div>
        
        <Button variant="secondary" icon={RefreshCw} onClick={handleReset} className="text-xs md:text-sm">
          Reiniciar Demo
        </Button>
      </header>

      {/* RECUADRO INFORMATIVO DE LA SALA ACTUAL */}
      {roomConfig && (
        <div className="bg-white p-4 rounded-xl border border-GrayBlue-200 flex flex-wrap gap-4 items-center justify-between shadow-sm">
          <div className="space-y-1">
            <span className="text-xs font-bold text-GrayBlue-400 uppercase tracking-wide">Sala Activa</span>
            <Title level={3}>{roomConfig.roomName}</Title>
          </div>
          <div className="flex gap-2">
            <Badge variant="info">MÁX: {roomConfig.teamCount} Equipos</Badge>
            <Badge variant="success">Modo: {roomConfig.algorithm}</Badge>
          </div>
        </div>
      )}

      {/* ÁREA DE TRABAJO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA 1: FORMULARIOS DE REGISTRO */}
        <div className="flex flex-col gap-6 items-center lg:items-stretch">
          <Title level={4} className="text-BlueDark-700 font-bold tracking-wider uppercase text-xs">
            Vistas de Entrada (Inputs)
          </Title>
          
          {/* Organismo 1: Formulario Docente */}
          <CreateRoomForm onCreateRoom={handleCreateRoom} />
          
          {/* Organismo 2: Formulario Alumno */}
          <StudentJoinForm onJoin={handleJoinStudent} />
        </div>

        {/* COLUMNA 2: MONITOR DE ALUMNOS EN TIEMPO REAL */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <Title level={4} className="text-BlueDark-700 font-bold tracking-wider uppercase text-xs">
              Monitores de Salida (Output en vivo)
            </Title>
            
            {/* Botón de acción para el Profesor para detonar el algoritmo */}
            <Button 
              variant="primary" 
              onClick={handleGenerateTeams} 
              disabled={students.length === 0}
              className="w-full sm:w-auto shadow-sm"
            >
              Procesar y Generar Equipos
            </Button>
          </div>

          <div className="space-y-6">
            {/* Organismo 3: Lista interactiva de alumnos */}
            <LiveStudentList students={students} />
            
            {/* Organismo 4: Grid de resultados del Algoritmo */}
            <div className="bg-white p-5 rounded-2xl border border-GrayBlue-200 shadow-sm">
              <TeamGrid teams={teams} />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}