/**
 * Servicios de Ordenamiento para la creación de equipos.
 * Estas funciones son puramente JS, lo que facilita su mantenimiento y pruebas.
 */

/**
 * Distribuye de manera equitativa a los estudiantes en un número determinado de equipos.
 * @param {Array} students - Lista de estudiantes [{id, name, status}]
 * @param {number} teamCount - Cantidad de equipos a generar
 * @param {string} mode - 'FIFO' o 'RANDOM'
 * @returns {Array} Lista de objetos de equipos con sus miembros
 */
export function generateTeamsAlgorithm(students, teamCount, mode = 'FIFO') {
    if (!students || students.length === 0 || teamCount < 2) return [];

    // 1. Clonamos la lista para no mutar el array original
    let listToProcess = [...students];

    // 2. Aplicamos la regla según el modo seleccionado
    if (mode === 'RANDOM') {
        // Mezcla aleatoria usando el algoritmo Fisher-Yates
        for (let i = listToProcess.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [listToProcess[i], listToProcess[j]] = [listToProcess[j], listToProcess[i]];
        }
    } else {
        // Si es FIFO (First In, First Out), se respeta estrictamente el orden en que llegaron.
        // Como los IDs o el orden del array ya reflejan el tiempo de registro, lo dejamos intacto.
    }

    // 3. Inicializamos los equipos vacíos con la estructura requerida
    const teams = Array.from({ length: teamCount }, (_, i) => ({
        id: `team-${i + 1}`,
        name: `Equipo ${i + 1}`,
        members: []
    }));

    // 4. Distribución "serpiente" o equitativa (Round-Robin)
    // Va metiendo un alumno al Equipo 1, luego al Equipo 2... cuando llega al límite, vuelve al Equipo 1.
    listToProcess.forEach((student, index) => {
        const teamIndex = index % teamCount;
        teams[teamIndex].members.push({
            ...student,
            status: 'assigned' // Actualizamos su estado internamente
        });
    });

    return teams;
}