import './App.css';
import Profile from './components/Profile';
import Experiencia from './components/Experiencia';
import Educacion from './components/Educacion';
import Habilidades from './components/Habilidades';
import Proyectos from './components/Proyectos';
import Certificaciones from './components/Certificaciones';
import Idiomas from './components/Idiomas';
import Contacto from './components/Contacto';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <nav>
          <a href="#profile">Perfil</a>
          <a href="#experiencia">Experiencia</a>
          <a href="#educacion">Educación</a>
          <a href="#habilidades">Habilidades</a>
          <a href="#proyectos">Proyectos</a>
          <a href="#certificaciones">Certificaciones</a>
          <a href="#idiomas">Idiomas</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>

      <main className="app-main">
        <div id="profile"><Profile /></div>
        <div id="experiencia"><Experiencia /></div>
        <div id="educacion"><Educacion /></div>
        <div id="habilidades"><Habilidades /></div>
        <div id="proyectos"><Proyectos /></div>
        <div id="certificaciones"><Certificaciones /></div>
        <div id="idiomas"><Idiomas /></div>
        <div id="contacto"><Contacto /></div>
      </main>

      <footer className="app-footer">
        <p>© 2025 Portafolio Personal - Desarrollado con React + Vite + Supabase</p>
      </footer>
    </div>
  );
}

export default App;
