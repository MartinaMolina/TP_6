import { useMemo, useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ParticipanteCard from '../components/ParticipanteCard';
import Filtros from '../components/Filtros';
import { useParticipantes } from '../context/useParticipantes';
import { Participante } from '../models/Participante';

const normalizarTexto = (valor: string) =>
  valor
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const normalizarModalidad = (modalidad: string) => {
  const normalizada = normalizarTexto(modalidad);
  if (normalizada === 'hibrido') return 'Hibrido';
  if (normalizada === 'presencial') return 'Presencial';
  if (normalizada === 'virtual') return 'Virtual';
  return modalidad;
};

const normalizarParticipante = (p: Participante): Participante => ({
  ...p,
  modalidad: normalizarModalidad(p.modalidad)
});

function HomePage() {
  const { participantes, resetear } = useParticipantes();

  const [filtros, setFiltros] = useState({
    nombre: '',
    nivel: 'Todos',
    modalidad: 'Todas'
  });

  const [paginaActual, setPaginaActual] = useState(1);
  const itemsPorPagina = 12;

  useEffect(() => {
    setPaginaActual(1);
  }, [filtros]);

  const participantesFiltrados = useMemo(() => {
    return participantes.filter((p) => {
      const participanteNormalizado = normalizarParticipante(p);
      const matchNombre = normalizarTexto(participanteNormalizado.nombre).includes(
        normalizarTexto(filtros.nombre)
      );
      const matchNivel = filtros.nivel === 'Todos' || p.nivel === filtros.nivel;
      const matchMod =
        filtros.modalidad === 'Todas' || participanteNormalizado.modalidad === filtros.modalidad;
      return matchNombre && matchNivel && matchMod;
    });
  }, [participantes, filtros]);

  const totalPaginas = Math.ceil(participantesFiltrados.length / itemsPorPagina);
  const inicio = (paginaActual - 1) * itemsPorPagina;
  const participantesPaginados = participantesFiltrados.slice(inicio, inicio + itemsPorPagina);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h2 className="text-2xl font-bold text-blue-900">Participantes</h2>
        <Link
          to="/nuevo"
          className="inline-flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Nuevo participante
        </Link>
      </div>

      <Filtros
        filtros={filtros}
        setFiltros={setFiltros}
        onLimpiar={() => setFiltros({ nombre: '', nivel: 'Todos', modalidad: 'Todas' })}
        onReset={resetear}
        totalRegistrados={participantes.length}
        participantesAExportar={participantesFiltrados.map(normalizarParticipante)}
      />

      <div className="mb-6 px-2">
        <p className="text-sm font-bold text-gray-600">
          Mostrando <span className="text-blue-600">{participantesFiltrados.length}</span> de{' '}
          {participantes.length} participantes
        </p>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {participantesPaginados.length > 0 ? (
            participantesPaginados.map((p) => <ParticipanteCard key={p.id} p={p} />)
          ) : (
            <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-300 rounded-xl bg-white">
              <p className="text-gray-500 italic">
                No hay participantes que coincidan con la busqueda.
              </p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      {totalPaginas > 1 && (
        <div className="flex justify-center items-center mt-8 mb-4 gap-4">
          <button
            onClick={() => setPaginaActual((p) => Math.max(1, p - 1))}
            disabled={paginaActual === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition font-semibold"
          >
            Anterior
          </button>
          <span className="text-gray-600 font-medium">
            Página {paginaActual} de {totalPaginas}
          </span>
          <button
            onClick={() => setPaginaActual((p) => Math.min(totalPaginas, p + 1))}
            disabled={paginaActual === totalPaginas}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition font-semibold"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default HomePage;

