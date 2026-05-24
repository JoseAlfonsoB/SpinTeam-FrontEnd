import React from 'react';
import Title from '../atoms/Title';
import Badge from '../atoms/Badge';
import StudentRow from '../molecules/StudentRow';
import EmptyState from '../molecules/EmptyState';
import { Users } from 'lucide-react';

export default function LiveStudentList({ students = [] }) {
    const totalStudents = students.length;

    return (
        <div className="bg-white p-5 rounded-2xl border border-GrayBlue-200 shadow-sm w-full space-y-4">
            {/* Cabecera con contador integrado mediante Badge */}
            <div className="flex items-center justify-between border-b border-GrayBlue-100 pb-3">
                <div className="flex items-center gap-2">
                    <Users size={20} className="text-BlueDark-800" />
                    <Title level={3}>Alumnos Conectados</Title>
                </div>
                <Badge variant="default" icon={Users}>
                    {totalStudents} {totalStudents === 1 ? 'alumno' : 'alumnos'}
                </Badge>
            </div>

            {/* Renderizado condicional */}
            {totalStudents === 0 ? (
                <EmptyState />
            ) : (
                <div className="space-y-2.5 max-h-[400px] overflow-y-auto pr-1">
                    {students.map((student, index) => (
                        <StudentRow
                            key={student.id || index}
                            name={student.name}
                            index={index}
                            status={student.status} // 'waiting' o 'assigned'
                        />
                    ))}
                </div>
            )}
        </div>
    );
}