import { useState, useEffect } from 'react';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/profile')
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error cargando perfil:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Cargando perfil...</div>;
  if (!profile) return <div className="error">No se pudo cargar el perfil</div>;

  return (
    <section className="profile-section">
      <h2>👤 Perfil Profesional</h2>
      <div className="profile-header">
        {profile.foto_url ? (
          <img src={profile.foto_url} alt={profile.nombre} className="profile-photo" />
        ) : (
          <div className="profile-photo" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
            fontSize: '4rem',
            color: 'white'
          }}>
            👤
          </div>
        )}
        <h1>{profile.nombre}</h1>
        {profile.titulo && <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '1rem' }}>{profile.titulo}</p>}
        <div className="contact-info">
          {profile.email && <p>📧 {profile.email}</p>}
          {profile.telefono && <p>📱 {profile.telefono}</p>}
          {profile.ubicacion && <p>📍 {profile.ubicacion}</p>}
        </div>
        {(profile.linkedin || profile.github) && (
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" 
                style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', fontWeight: 600 }}>
                LinkedIn
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noopener noreferrer"
                style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.2)', borderRadius: '8px', fontWeight: 600 }}>
                GitHub
              </a>
            )}
          </div>
        )}
      </div>
      {profile.descripcion && (
        <div className="profile-description">
          <p>{profile.descripcion}</p>
        </div>
      )}
    </section>
  );
}

export default Profile;
