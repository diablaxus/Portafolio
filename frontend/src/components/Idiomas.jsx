import { useState, useEffect } from 'react';

function Idiomas() {
  const [idiomas, setIdiomas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/idiomas')
      .then(res => res.json())
      .then(data => {
        setIdiomas(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando idiomas:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando idiomas...</div>;

  return (
    <section className="idiomas-section">
      <h2>🌍 Idiomas</h2>
      <div className="idiomas-grid">
        {idiomas.map((idioma) => (
          <div key={idioma.id} className="idioma-item">
            <h3>{idioma.nombre}</h3>
            <div className="idioma-level">
              <span className="nivel-texto">{idioma.nivel}</span>
              <div className="idioma-bar">
                <div 
                  className="idioma-progress" 
                  style={{ width: `${idioma.porcentaje}%` }}
                ></div>
              </div>
              <span className="porcentaje">{idioma.porcentaje}%</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Idiomas;
