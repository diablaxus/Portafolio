import { useState, useEffect } from 'react';

function Educacion() {
  const [educacion, setEducacion] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/educacion')
      .then(res => res.json())
      .then(data => {
        setEducacion(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando educación:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando educación...</div>;

  return (
    <section className="educacion-section">
      <h2>🎓 Educación</h2>
      <div className="educacion-list">
        {educacion.map((edu) => (
          <div key={edu.id} className="educacion-item">
            <h3>{edu.titulo}</h3>
            <h4>{edu.institucion}</h4>
            <p className="fecha">
              {new Date(edu.fecha_inicio).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
              {' - '}
              {edu.fecha_fin ? new Date(edu.fecha_fin).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) : 'En curso'}
            </p>
            {edu.descripcion && <p className="descripcion">{edu.descripcion}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Educacion;
