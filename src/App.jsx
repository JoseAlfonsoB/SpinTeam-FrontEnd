import React, { useState } from 'react';
// Importamos las moléculas
import FormField from './components/molecules/FormField';
import RoomCodeDisplay from './components/molecules/RoomCodeDisplay';
import StudentRow from './components/molecules/StudentRow';
import EmptyState from './components/molecules/EmptyState';

// Importamos un par de átomos e iconos para complementar la vista de pruebas
import Title from './components/atoms/Title';
import Button from './components/atoms/Button';
import { User, Key, Users, Play } from 'lucide-react';

export default function App() {
  // Estados temporales solo para hacer interactivos los inputs en esta prueba
  const [roomName, setRoomName] = useState('');
  const [studentName, setStudentName] = useState('');

  return (
    <div className="min-h-screen bg-Neutral-50 p-6 md:p-12 space-y-10">

      {/* Encabezado */}
      <header className="border-b border-GrayBlue-200 pb-4">
        <Title level={1}>Laboratorio de Moléculas</Title>
        <p className="text-GrayBlue-500 text-sm">
          Visualización de componentes de segundo nivel (combinaciones de átomos).
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* COLUMNA IZQUIERDA: FORMULARIOS Y ACCESOS */}
        <div className="space-y-6">

          {/* Caso de Uso 1: FormField (Inputs con etiquetas y errores integrados) */}
          <section className="bg-white p-6 rounded-xl border border-GrayBlue-200 space-y-4 shadow-sm">
            <Title level={3} className="text-BlueDark-600 text-xs uppercase tracking-wider font-bold">
              1. Molécula: FormField
            </Title>

            <FormField
              label="Nombre de la Clase / Actividad"
              id="room-name"
              placeholder="Ej. Taller de Redes - Equipo A"
              icon={Users}
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              required
            />

            <FormField
              label="Código de Acceso (Simulación de Error)"
              id="room-code-error"
              placeholder="Introduce las 4 letras"
              icon={Key}
              value="AB12"
              onChange={() => { }}
              error="El código de la sala ya no es válido o expiró."
            />
          </section>

          {/* Caso de Uso 2: RoomCodeDisplay (Visualizador con botón de copiado) */}
          <section className="bg-white p-6 rounded-xl border border-GrayBlue-200 space-y-4 shadow-sm">
            <Title level={3} className="text-BlueDark-600 text-xs uppercase tracking-wider font-bold">
              2. Molécula: RoomCodeDisplay
            </Title>
            <p className="text-sm text-GrayBlue-500">Así lo verá el docente al iniciar una sesión:</p>

            <RoomCodeDisplay code="FIFO-953" />
          </section>
        </div>

        {/* COLUMNA DERECHA: LISTAS Y ESTADOS DE ESPERA */}
        <div className="space-y-6">

          {/* Caso de Uso 3: StudentRow (Fila individual en orden de llegada) */}
          <section className="bg-white p-6 rounded-xl border border-GrayBlue-200 space-y-4 shadow-sm">
            <Title level={3} className="text-BlueDark-600 text-xs uppercase tracking-wider font-bold">
              3. Molécula: StudentRow
            </Title>
            <p className="text-sm text-GrayBlue-500">Lista simulada por orden de llegada (Estructura FIFO):</p>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              <StudentRow name="Jose Alfonso" index={0} status="assigned" />
              <StudentRow name="María Fernanda" index={1} status="waiting" />
              <StudentRow name="Carlos Eduardo" index={2} status="waiting" />
            </div>
          </section>

          {/* Caso de Uso 4: EmptyState (Pantalla de espera inicial) */}
          <section className="bg-white p-6 rounded-xl border border-GrayBlue-200 space-y-4 shadow-sm">
            <Title level={3} className="text-BlueDark-600 text-xs uppercase tracking-wider font-bold">
              4. Molécula: EmptyState
            </Title>

            <EmptyState
              title="Sala de espera vacía"
              description="Los alumnos que ingresen el código aparecerán aquí en tiempo real bajo la fila FIFO."
            />
          </section>

        </div>
      </div>
    </div>
  );
}