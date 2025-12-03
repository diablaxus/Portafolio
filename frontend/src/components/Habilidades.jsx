import { useState, useEffect } from 'react';

function Habilidades() {
  const [habilidades, setHabilidades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/habilidades')
      .then(res => res.json())
      .then(data => {
        setHabilidades(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando habilidades:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando habilidades...</div>;

  return (
    <section className="habilidades-section">
      <h2>⚡ Habilidades</h2>
      <div className="habilidades-grid">
        {habilidades.map((hab) => (
          <div key={hab.id} className="habilidad-item">
            <div className="habilidad-header">
              <span className="habilidad-nombre">{hab.nombre}</span>
              <span className="habilidad-nivel">{hab.nivel}%</span>
            </div>
            <div className="habilidad-bar">
              <div 
                className="habilidad-progress" 
                style={{ width: `${hab.nivel}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Habilidades;
