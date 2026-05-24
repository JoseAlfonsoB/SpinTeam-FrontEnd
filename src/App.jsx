import React from 'react';
// Importación de todos nuestros átomos
import Title from './components/atoms/Title';
import Label from './components/atoms/Label';
import Input from './components/atoms/Input';
import Button from './components/atoms/Button';
import Badge from './components/atoms/Badge';

// Importación de los iconos de lucide-react para las pruebas
import {
  User,
  Key,
  Plus,
  LogOut,
  Users,
  CheckCircle,
  Info
} from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-Neutral-50 p-6 md:p-12 space-y-12">

      {/* Encabezado del catálogo */}
      <header className="border-b border-GrayBlue-200 pb-6">
        <Title level={1}>Catálogo de Átomos (UI Kit)</Title>
        <p className="text-GrayBlue-500 text-sm md:text-base mt-2">
          Guía visual de los componentes base del proyecto utilizando la paleta de colores oficial.
        </p>
      </header>

      {/* Sección 1: Títulos (Title) */}
      <section className="space-y-4">
        <Title level={3} className="text-BlueDark-600 uppercase tracking-wider text-xs font-bold">
          1. Componente: Title
        </Title>
        <div className="bg-white p-6 rounded-xl border border-GrayBlue-200 space-y-3">
          <Title level={1}>Título Nivel 1 (H1)</Title>
          <Title level={2}>Título Nivel 2 (H2)</Title>
          <Title level={3}>Título Nivel 3 (H3)</Title>
          <Title level={4}>Título Nivel 4 (H4)</Title>
        </div>
      </section>

      {/* Sección 2: Etiquetas (Label) */}
      <section className="space-y-4">
        <Title level={3} className="text-BlueDark-600 uppercase tracking-wider text-xs font-bold">
          2. Componente: Label
        </Title>
        <div className="bg-white p-6 rounded-xl border border-GrayBlue-200 flex flex-col md:flex-row gap-6">
          <div>
            <span className="text-xs text-GrayBlue-400 block mb-1">Campo normal:</span>
            <Label htmlFor="input-ejemplo">Nombre del Alumno</Label>
          </div>
          <div>
            <span className="text-xs text-GrayBlue-400 block mb-1">Campo obligatorio (`required`):</span>
            <Label htmlFor="input-ejemplo-2" required>Código de la Sala</Label>
          </div>
        </div>
      </section>

      {/* Sección 3: Campos de Entrada (Input) */}
      <section className="space-y-4">
        <Title level={3} className="text-BlueDark-600 uppercase tracking-wider text-xs font-bold">
          3. Componente: Input
        </Title>
        <div className="bg-white p-6 rounded-xl border border-GrayBlue-200 space-y-4 max-w-md">
          <div>
            <Label>Input simple:</Label>
            <Input placeholder="Escribe algo aquí..." />
          </div>
          <div>
            <Label>Input con icono a la izquierda (`icon`):</Label>
            <Input placeholder="Nombre de usuario" icon={User} />
          </div>
          <div>
            <Label>Input con estado de error (`error`):</Label>
            <Input placeholder="Código incorrecto" icon={Key} error />
          </div>
        </div>
      </section>

      {/* Sección 4: Botones (Button) */}
      <section className="space-y-4">
        <Title level={3} className="text-BlueDark-600 uppercase tracking-wider text-xs font-bold">
          4. Componente: Button
        </Title>
        <div className="bg-white p-6 rounded-xl border border-GrayBlue-200 space-y-6">
          {/* Variantes por defecto */}
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Botón Primario</Button>
            <Button variant="secondary">Botón Secundario</Button>
            <Button variant="danger">Botón Peligro</Button>
          </div>

          {/* Con iconos */}
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" icon={Plus}>
              Crear Nueva Sala
            </Button>
            <Button variant="secondary" iconRight={Users}>
              Ver Integrantes
            </Button>
            <Button variant="danger" icon={LogOut}>
              Salir de la fila
            </Button>
          </div>

          {/* Estados especiales */}
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" loading>
              Procesando fila...
            </Button>
            <Button variant="primary" disabled>
              Acción Deshabilitada
            </Button>
          </div>
        </div>
      </section>

      {/* Sección 5: Etiquetas de Estado (Badge) */}
      <section className="space-y-4">
        <Title level={3} className="text-BlueDark-600 uppercase tracking-wider text-xs font-bold">
          5. Componente: Badge
        </Title>
        <div className="bg-white p-6 rounded-xl border border-GrayBlue-200 flex flex-wrap gap-4">
          <Badge variant="default" icon={Users}>
            45 Alumnos en espera
          </Badge>
          <Badge variant="success" icon={CheckCircle}>
            Fila FIFO Activa
          </Badge>
          <Badge variant="info" icon={Info}>
            Rol: Docente
          </Badge>
        </div>
      </section>

    </div>
  );
}