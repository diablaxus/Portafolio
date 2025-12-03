import { useState, useEffect } from 'react';

function Proyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/proyectos')
      .then(res => res.json())
      .then(data => {
        setProyectos(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando proyectos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando proyectos...</div>;

  return (
    <section className="proyectos-section">
      <h2>🚀 Proyectos</h2>
      <div className="proyectos-grid">
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} className="proyecto-card">
            <h3>{proyecto.nombre}</h3>
            <p className="descripcion">{proyecto.descripcion}</p>
            <div className="proyecto-tech">
              {proyecto.tecnologias && proyecto.tecnologias.split(',').map((tech, idx) => (
                <span key={idx} className="tech-tag">{tech.trim()}</span>
              ))}
            </div>
            {proyecto.url && (
              <a href={proyecto.url} target="_blank" rel="noopener noreferrer" className="proyecto-link">
                Ver proyecto →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Proyectos;
