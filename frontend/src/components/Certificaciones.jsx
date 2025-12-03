import { useState, useEffect } from 'react';

function Certificaciones() {
  const [certificaciones, setCertificaciones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/certificaciones')
      .then(res => res.json())
      .then(data => {
        setCertificaciones(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando certificaciones:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando certificaciones...</div>;

  return (
    <section className="certificaciones-section">
      <h2>🏆 Certificaciones</h2>
      <div className="certificaciones-list">
        {certificaciones.map((cert) => (
          <div key={cert.id} className="certificacion-item">
            <h3>{cert.nombre}</h3>
            <p className="emisor">{cert.emisor}</p>
            <p className="fecha">
              {new Date(cert.fecha_obtencion).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
            </p>
            {cert.url && (
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="cert-link">
                Ver certificado →
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificaciones;
