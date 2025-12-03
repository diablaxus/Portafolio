import { useState, useEffect } from 'react';

function Experiencia() {
  const [experiencias, setExperiencias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/experiencia')
      .then(res => res.json())
      .then(data => {
        setExperiencias(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando experiencias:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando experiencia...</div>;

  return (
    <section className="experiencia-section">
      <h2>💼 Experiencia Laboral</h2>
      <div className="experiencia-list">
        {experiencias.map((exp) => (
          <div key={exp.id} className="experiencia-item">
            <h3>{exp.cargo}</h3>
            <h4>{exp.empresa}</h4>
            <p className="fecha">
              {new Date(exp.fecha_inicio).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })}
              {' - '}
              {exp.fecha_fin ? new Date(exp.fecha_fin).toLocaleDateString('es-ES', { month: 'short', year: 'numeric' }) : 'Presente'}
            </p>
            <p className="descripcion">{exp.descripcion}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experiencia;
