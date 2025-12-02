// ==========================================
// CONFIGURACIÓN DE LA API
// ==========================================

// Detectar entorno automáticamente
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : '/api';

console.log('🌍 Entorno:', window.location.hostname === 'localhost' ? 'Desarrollo' : 'Producción');
console.log('🔗 API URL:', window.location.hostname === 'localhost' ? 'http://localhost:3000/api' : window.location.origin + '/api');


// ==========================================
// FUNCIÓN: Cargar perfil desde la API
// ==========================================
async function cargarPerfil() {
    try {
        const response = await fetch(`${API_URL}/profile`);
        if (response.ok) {
            const profile = await response.json();
            
            // Actualizar nombre
            document.getElementById('profile-name').textContent = profile.nombre || 'Nombre no disponible';
            
            // Actualizar descripción
            document.getElementById('profile-description').textContent = profile.descripcion || 'Descripción no disponible';
            
            // Actualizar foto
            if (profile.foto_url) {
                document.getElementById('profile-photo').src = profile.foto_url;
            }
            
            // Actualizar información de contacto
            const contactInfo = document.getElementById('contact-info');
            contactInfo.innerHTML = '';
            
            if (profile.telefono) {
                contactInfo.innerHTML += `
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <span>${profile.telefono}</span>
                    </div>
                `;
            }
            
            if (profile.email) {
                contactInfo.innerHTML += `
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${profile.email}</span>
                    </div>
                `;
            }
            
            if (profile.ubicacion) {
                contactInfo.innerHTML += `
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${profile.ubicacion}</span>
                    </div>
                `;
            }
            
            if (profile.linkedin) {
                contactInfo.innerHTML += `
                    <div class="contact-item">
                        <i class="fab fa-linkedin"></i>
                        <span>${profile.linkedin}</span>
                    </div>
                `;
            }
            
            if (profile.github) {
                contactInfo.innerHTML += `
                    <div class="contact-item">
                        <i class="fab fa-github"></i>
                        <span>${profile.github}</span>
                    </div>
                `;
            }
            
            console.log('✅ Perfil cargado correctamente');
        }
    } catch (error) {
        console.error('❌ Error cargando perfil:', error);
    }
}

// ==========================================
// FUNCIÓN: Cargar experiencia laboral
// ==========================================
async function cargarExperiencia() {
    try {
        const response = await fetch(`${API_URL}/experiencia`);
        if (response.ok) {
            const experiencias = await response.json();
            const container = document.getElementById('experience-container');
            container.innerHTML = '';
            
            if (experiencias.length === 0) {
                container.innerHTML = '<p>No hay experiencia laboral registrada.</p>';
                return;
            }
            
            experiencias.forEach(exp => {
                const fechaInicio = new Date(exp.fecha_inicio).getFullYear();
                const fechaFin = exp.fecha_fin ? new Date(exp.fecha_fin).getFullYear() : 'Presente';
                
                const expHTML = `
                    <div class="experience-item">
                        <div class="experience-header">
                            <h3>${exp.cargo}</h3>
                            <span class="company">${exp.empresa}</span>
                            <span class="period">${fechaInicio} - ${fechaFin}</span>
                        </div>
                        ${exp.descripcion ? `<p>${exp.descripcion}</p>` : ''}
                        ${exp.tecnologias ? `<p><strong>Tecnologías:</strong> ${exp.tecnologias}</p>` : ''}
                    </div>
                `;
                container.innerHTML += expHTML;
            });
            
            console.log('✅ Experiencia cargada:', experiencias.length);
        }
    } catch (error) {
        console.error('❌ Error cargando experiencia:', error);
    }
}

// ==========================================
// FUNCIÓN: Cargar educación
// ==========================================
async function cargarEducacion() {
    try {
        const response = await fetch(`${API_URL}/educacion`);
        if (response.ok) {
            const educacion = await response.json();
            const container = document.getElementById('education-container');
            container.innerHTML = '';
            
            if (educacion.length === 0) {
                container.innerHTML = '<p>No hay formación académica registrada.</p>';
                return;
            }
            
            educacion.forEach(edu => {
                const fechaInicio = new Date(edu.fecha_inicio).getFullYear();
                const fechaFin = edu.fecha_fin ? new Date(edu.fecha_fin).getFullYear() : 'En curso';
                
                const eduHTML = `
                    <div class="education-item">
                        <h3>${edu.titulo}</h3>
                        <span class="institution">${edu.institucion}</span>
                        <span class="period">${fechaInicio} - ${fechaFin}</span>
                        ${edu.descripcion ? `<p>${edu.descripcion}</p>` : ''}
                    </div>
                `;
                container.innerHTML += eduHTML;
            });
            
            console.log('✅ Educación cargada:', educacion.length);
        }
    } catch (error) {
        console.error('❌ Error cargando educación:', error);
    }
}

// ==========================================
// FUNCIÓN: Cargar habilidades
// ==========================================
async function cargarHabilidades() {
    try {
        const response = await fetch(`${API_URL}/habilidades`);
        if (response.ok) {
            const habilidades = await response.json();
            const container = document.getElementById('skills-container');
            container.innerHTML = '';
            
            if (habilidades.length === 0) {
                container.innerHTML = '<p>No hay habilidades registradas.</p>';
                return;
            }
            
            // Agrupar por categoría
            const categorias = {};
            habilidades.forEach(hab => {
                const cat = hab.categoria || 'General';
                if (!categorias[cat]) {
                    categorias[cat] = [];
                }
                categorias[cat].push(hab);
            });
            
            let skillsHTML = '<div class="skills-grid">';
            
            Object.keys(categorias).forEach(categoria => {
                skillsHTML += `
                    <div class="skills-category">
                        <h3>${categoria}</h3>
                        <div class="skills-list">
                `;
                
                categorias[categoria].forEach(hab => {
                    const nivelClass = hab.nivel >= 80 ? 'advanced' : hab.nivel >= 50 ? 'intermediate' : 'beginner';
                    skillsHTML += `
                        <div class="skill-item">
                            <span class="skill-name">${hab.nombre}</span>
                            <div class="skill-bar">
                                <div class="skill-progress ${nivelClass}" style="width: ${hab.nivel}%"></div>
                            </div>
                            <span class="skill-percentage">${hab.nivel}%</span>
                        </div>
                    `;
                });
                
                skillsHTML += `
                        </div>
                    </div>
                `;
            });
            
            skillsHTML += '</div>';
            container.innerHTML = skillsHTML;
            
            console.log('✅ Habilidades cargadas:', habilidades.length);
        }
    } catch (error) {
        console.error('❌ Error cargando habilidades:', error);
    }
}

// ==========================================
// FUNCIÓN: Cargar proyectos
// ==========================================
async function cargarProyectos() {
    try {
        const response = await fetch(`${API_URL}/proyectos`);
        if (response.ok) {
            const proyectos = await response.json();
            const container = document.getElementById('projects-container');
            container.innerHTML = '';
            
            if (proyectos.length === 0) {
                container.innerHTML = '<p>No hay proyectos registrados.</p>';
                return;
            }
            
            proyectos.forEach(proyecto => {
                const proyectoHTML = `
                    <div class="project-item">
                        <h3>${proyecto.nombre}</h3>
                        ${proyecto.descripcion ? `<p>${proyecto.descripcion}</p>` : ''}
                        ${proyecto.tecnologias ? `<p><strong>Tecnologías:</strong> ${proyecto.tecnologias}</p>` : ''}
                        <div class="project-links">
                            ${proyecto.url_demo ? `<a href="${proyecto.url_demo}" target="_blank"><i class="fas fa-external-link-alt"></i> Ver Demo</a>` : ''}
                            ${proyecto.url_repositorio ? `<a href="${proyecto.url_repositorio}" target="_blank"><i class="fab fa-github"></i> Repositorio</a>` : ''}
                        </div>
                    </div>
                `;
                container.innerHTML += proyectoHTML;
            });
            
            console.log('✅ Proyectos cargados:', proyectos.length);
        }
    } catch (error) {
        console.error('❌ Error cargando proyectos:', error);
    }
}

// ==========================================
// FUNCIÓN: Cargar certificaciones
// ==========================================
async function cargarCertificaciones() {
    try {
        const response = await fetch(`${API_URL}/certificaciones`);
        if (response.ok) {
            const certificaciones = await response.json();
            const container = document.getElementById('certifications-container');
            container.innerHTML = '';
            
            if (certificaciones.length === 0) {
                container.innerHTML = '<p>No hay certificaciones registradas.</p>';
                return;
            }
            
            certificaciones.forEach(cert => {
                const fecha = cert.fecha_obtencion ? new Date(cert.fecha_obtencion).getFullYear() : '';
                
                const certHTML = `
                    <div class="certification-item">
                        <h3>${cert.nombre}</h3>
                        <span class="institution">${cert.institucion}</span>
                        ${fecha ? `<span class="period">${fecha}</span>` : ''}
                        ${cert.descripcion ? `<p class="cert-description">${cert.descripcion}</p>` : ''}
                        ${cert.url_credencial ? `<a href="${cert.url_credencial}" target="_blank" class="credential-link"><i class="fas fa-external-link-alt"></i> Ver Credencial</a>` : ''}
                    </div>
                `;
                container.innerHTML += certHTML;
            });
            
            console.log('✅ Certificaciones cargadas:', certificaciones.length);
        }
    } catch (error) {
        console.error('❌ Error cargando certificaciones:', error);
    }
}

// ==========================================
// FUNCIÓN: Cargar idiomas
// ==========================================
async function cargarIdiomas() {
    try {
        const response = await fetch(`${API_URL}/idiomas`);
        if (response.ok) {
            const idiomas = await response.json();
            const container = document.getElementById('languages-container');
            container.innerHTML = '';
            
            if (idiomas.length === 0) {
                container.innerHTML = '<p>No hay idiomas registrados.</p>';
                return;
            }
            
            idiomas.forEach(idioma => {
                const nivelClass = idioma.porcentaje >= 80 ? 'advanced' : idioma.porcentaje >= 50 ? 'intermediate' : 'beginner';
                
                const idiomaHTML = `
                    <div class="language-item">
                        <div class="language-header">
                            <span class="language-name">${idioma.idioma}</span>
                            <span class="language-level">${idioma.nivel}</span>
                        </div>
                        <div class="skill-bar">
                            <div class="skill-progress ${nivelClass}" style="width: ${idioma.porcentaje}%"></div>
                        </div>
                        <span class="skill-percentage">${idioma.porcentaje}%</span>
                        ${idioma.descripcion ? `<p class="language-description">${idioma.descripcion}</p>` : ''}
                    </div>
                `;
                container.innerHTML += idiomaHTML;
            });
            
            console.log('✅ Idiomas cargados:', idiomas.length);
        }
    } catch (error) {
        console.error('❌ Error cargando idiomas:', error);
    }
}

// ==========================================
// FUNCIÓN: Enviar formulario de contacto
// ==========================================
async function enviarFormularioContacto(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = {
        nombre: form.nombre.value.trim(),
        email: form.email.value.trim(),
        mensaje: form.mensaje.value.trim()
    };

    // Validación básica
    if (!formData.nombre || !formData.email || !formData.mensaje) {
        mostrarMensaje('Por favor completa todos los campos', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/contacto`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok && result.success) {
            mostrarMensaje('¡Mensaje enviado exitosamente! Gracias por contactarme.', 'success');
            form.reset();
        } else {
            mostrarMensaje('Error al enviar el mensaje. Por favor intenta de nuevo.', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('Error de conexión. Asegúrate de que el servidor esté corriendo.', 'error');
    }
}

// ==========================================
// FUNCIÓN: Mostrar mensajes al usuario
// ==========================================
function mostrarMensaje(mensaje, tipo) {
    // Crear elemento de mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.className = `mensaje-notificacion ${tipo}`;
    mensajeDiv.textContent = mensaje;
    
    // Estilos del mensaje
    mensajeDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 300px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    
    if (tipo === 'success') {
        mensajeDiv.style.backgroundColor = '#27ae60';
    } else if (tipo === 'error') {
        mensajeDiv.style.backgroundColor = '#e74c3c';
    }
    
    document.body.appendChild(mensajeDiv);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        mensajeDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(mensajeDiv);
        }, 300);
    }, 5000);
}

// ==========================================
// FUNCIÓN: Animación de barras de habilidades
// ==========================================
function animarBarrasHabilidades() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const barra = entry.target;
                const nivel = barra.getAttribute('data-nivel');
                barra.style.width = nivel + '%';
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.skill-bar').forEach(barra => {
        observer.observe(barra);
    });
}

// ==========================================
// FUNCIÓN: Scroll suave para navegación
// ==========================================
function inicializarScrollSuave() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// FUNCIÓN: Botón volver arriba
// ==========================================
function inicializarBotonVolverArriba() {
    const boton = document.createElement('button');
    boton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    boton.className = 'boton-arriba';
    boton.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #2c3e50, #3498db);
        color: white;
        border: none;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 999;
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(boton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            boton.style.display = 'flex';
        } else {
            boton.style.display = 'none';
        }
    });
    
    boton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// FUNCIÓN: Imprimir currículum
// ==========================================
function imprimirCV() {
    window.print();
}

// ==========================================
// FUNCIÓN: Descargar CV como PDF
// ==========================================
function descargarPDF() {
    mostrarMensaje('Función de descarga en desarrollo. Usa Ctrl+P para imprimir.', 'success');
}

// ==========================================
// INICIALIZACIÓN AL CARGAR LA PÁGINA
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🚀 Aplicación inicializada');
    
    // Cargar todos los datos desde la API
    await Promise.all([
        cargarPerfil(),
        cargarExperiencia(),
        cargarEducacion(),
        cargarHabilidades(),
        cargarProyectos(),
        cargarCertificaciones(),
        cargarIdiomas()
    ]);
    
    // Inicializar funciones
    inicializarScrollSuave();
    inicializarBotonVolverArriba();
    
    // Agregar event listener al formulario de contacto si existe
    const formContacto = document.querySelector('#form-contacto');
    if (formContacto) {
        formContacto.addEventListener('submit', enviarFormularioContacto);
    }
    
    console.log('✅ Todas las funciones inicializadas correctamente');
});

// ==========================================
// ANIMACIONES CSS
// ==========================================
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .boton-arriba:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 12px rgba(0,0,0,0.2);
    }
    
    @media print {
        .boton-arriba,
        .mensaje-notificacion {
            display: none !important;
        }
    }
`;
document.head.appendChild(style);
