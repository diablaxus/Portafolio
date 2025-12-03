import { useState } from 'react';

function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: ''
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ nombre: '', email: '', mensaje: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error enviando mensaje:', error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contacto-section">
      <h2>📬 Contacto</h2>
      <form onSubmit={handleSubmit} className="contacto-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Tu nombre"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="tu@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="mensaje">Mensaje</label>
          <textarea
            id="mensaje"
            name="mensaje"
            value={formData.mensaje}
            onChange={handleChange}
            required
            rows="5"
            placeholder="Escribe tu mensaje aquí..."
          />
        </div>
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Enviando...' : 'Enviar mensaje'}
        </button>
        {status === 'success' && (
          <p className="success-message">✅ Mensaje enviado exitosamente</p>
        )}
        {status === 'error' && (
          <p className="error-message">❌ Error al enviar el mensaje. Intenta nuevamente.</p>
        )}
      </form>
    </section>
  );
}

export default Contacto;
