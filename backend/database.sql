-- =====================================================
-- BASE DE DATOS: PORTAFOLIO PERSONAL
-- Autor: Frank Esteban Berrío Forero
-- Fecha: Diciembre 2025
-- Motor: PostgreSQL
-- =====================================================

-- Eliminar tablas si existen (en orden por dependencias)
DROP TABLE IF EXISTS contactos CASCADE;
DROP TABLE IF EXISTS proyectos CASCADE;
DROP TABLE IF EXISTS habilidades CASCADE;
DROP TABLE IF EXISTS educacion CASCADE;
DROP TABLE IF EXISTS experiencia CASCADE;
DROP TABLE IF EXISTS certificaciones CASCADE;
DROP TABLE IF EXISTS idiomas CASCADE;
DROP TABLE IF EXISTS profile CASCADE;

-- =====================================================
-- TABLA: profile (Información Personal)
-- =====================================================
CREATE TABLE profile (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    email VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    ubicacion VARCHAR(150),
    linkedin VARCHAR(200),
    github VARCHAR(200),
    descripcion TEXT,
    foto_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: experiencia (Experiencia Laboral)
-- =====================================================
CREATE TABLE experiencia (
    id SERIAL PRIMARY KEY,
    cargo VARCHAR(150) NOT NULL,
    empresa VARCHAR(150) NOT NULL,
    ubicacion VARCHAR(100),
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    actual BOOLEAN DEFAULT FALSE,
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: educacion (Formación Académica)
-- =====================================================
CREATE TABLE educacion (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    institucion VARCHAR(150) NOT NULL,
    ubicacion VARCHAR(100),
    fecha_inicio DATE,
    fecha_fin DATE,
    actual BOOLEAN DEFAULT FALSE,
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: habilidades (Habilidades Técnicas)
-- =====================================================
CREATE TABLE habilidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    categoria VARCHAR(50),
    nivel INTEGER CHECK (nivel >= 0 AND nivel <= 100),
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: proyectos (Proyectos Destacados)
-- =====================================================
CREATE TABLE proyectos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    tecnologias VARCHAR(255),
    url_demo VARCHAR(255),
    url_repositorio VARCHAR(255),
    imagen_url VARCHAR(255),
    fecha_inicio DATE,
    fecha_fin DATE,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: contactos (Mensajes de Contacto)
-- =====================================================
CREATE TABLE contactos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    asunto VARCHAR(200),
    mensaje TEXT NOT NULL,
    leido BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: certificaciones (Certificaciones y Cursos)
-- =====================================================
CREATE TABLE certificaciones (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    institucion VARCHAR(200) NOT NULL,
    fecha_obtencion DATE,
    url_credencial VARCHAR(500),
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TABLA: idiomas (Idiomas)
-- =====================================================
CREATE TABLE idiomas (
    id SERIAL PRIMARY KEY,
    idioma VARCHAR(100) NOT NULL,
    nivel VARCHAR(50) NOT NULL,
    porcentaje INTEGER DEFAULT 0 CHECK (porcentaje >= 0 AND porcentaje <= 100),
    descripcion TEXT,
    orden INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- TRIGGERS: Actualizar timestamp automáticamente
-- =====================================================

-- Función para actualizar updated_at
CREATE OR REPLACE FUNCTION actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para cada tabla
CREATE TRIGGER trigger_profile_updated_at
    BEFORE UPDATE ON profile
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_experiencia_updated_at
    BEFORE UPDATE ON experiencia
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_educacion_updated_at
    BEFORE UPDATE ON educacion
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_habilidades_updated_at
    BEFORE UPDATE ON habilidades
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_proyectos_updated_at
    BEFORE UPDATE ON proyectos
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_certificaciones_updated_at
    BEFORE UPDATE ON certificaciones
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_idiomas_updated_at
    BEFORE UPDATE ON idiomas
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

-- =====================================================
-- DATOS DE EJEMPLO: Información Personal
-- =====================================================
INSERT INTO profile (nombre, titulo, email, telefono, ubicacion, linkedin, github, descripcion, foto_url) VALUES
(
    'Frank Esteban Berrío Forero',
    'Desarrollador de Software',
    'frank.berrio@email.com',
    '+57 300 123 4567',
    'Bogotá, Colombia',
    'https://linkedin.com/in/frankberrio',
    'https://github.com/frankberrio',
    'Desarrollador de software con experiencia en desarrollo full-stack, apasionado por crear soluciones tecnológicas innovadoras. Especializado en JavaScript, Node.js, React y bases de datos relacionales. Comprometido con las mejores prácticas de programación y el aprendizaje continuo.',
    'img/foto.jpeg'
);

-- =====================================================
-- DATOS DE EJEMPLO: Experiencia Laboral
-- =====================================================
INSERT INTO experiencia (cargo, empresa, ubicacion, fecha_inicio, fecha_fin, actual, descripcion, orden) VALUES
(
    'Desarrollador Full Stack',
    'Tech Solutions SAS',
    'Bogotá, Colombia',
    '2023-01-15',
    NULL,
    TRUE,
    'Desarrollo de aplicaciones web utilizando React, Node.js y PostgreSQL. Implementación de APIs RESTful y arquitecturas escalables. Participación en code reviews y mentoría a desarrolladores junior.',
    1
),
(
    'Desarrollador Backend',
    'Innovación Digital LTDA',
    'Medellín, Colombia',
    '2021-06-01',
    '2022-12-31',
    FALSE,
    'Desarrollo y mantenimiento de microservicios con Node.js y Express. Diseño e implementación de bases de datos PostgreSQL y MySQL. Optimización de consultas y mejora del rendimiento de aplicaciones.',
    2
),
(
    'Desarrollador Junior',
    'StartUp Colombia',
    'Bogotá, Colombia',
    '2020-03-01',
    '2021-05-31',
    FALSE,
    'Desarrollo de interfaces de usuario con HTML, CSS y JavaScript. Colaboración en proyectos utilizando metodologías ágiles (Scrum). Integración de APIs de terceros y debugging de aplicaciones web.',
    3
);

-- =====================================================
-- DATOS DE EJEMPLO: Formación Académica
-- =====================================================
INSERT INTO educacion (titulo, institucion, ubicacion, fecha_inicio, fecha_fin, actual, descripcion, orden) VALUES
(
    'Ingeniería de Sistemas',
    'Universidad Nacional de Colombia',
    'Bogotá, Colombia',
    '2016-02-01',
    '2020-12-15',
    FALSE,
    'Énfasis en desarrollo de software, bases de datos y arquitectura de sistemas. Proyecto de grado: Sistema de gestión académica con React y Node.js.',
    1
),
(
    'Especialización en Desarrollo Web',
    'Platzi',
    'Online',
    '2021-01-01',
    '2021-06-30',
    FALSE,
    'Programa intensivo de desarrollo web full-stack. Tecnologías: JavaScript, React, Node.js, Express, PostgreSQL, MongoDB, Git.',
    2
),
(
    'Técnico en Programación',
    'SENA',
    'Bogotá, Colombia',
    '2014-02-01',
    '2015-12-15',
    FALSE,
    'Fundamentos de programación, algoritmos y estructuras de datos. Desarrollo de aplicaciones de consola y web básicas.',
    3
);

-- =====================================================
-- DATOS DE EJEMPLO: Habilidades Técnicas
-- =====================================================
INSERT INTO habilidades (nombre, categoria, nivel, orden) VALUES
-- Lenguajes de Programación
('JavaScript', 'Lenguajes', 90, 1),
('TypeScript', 'Lenguajes', 80, 2),
('Python', 'Lenguajes', 70, 3),
('Java', 'Lenguajes', 65, 4),
('SQL', 'Lenguajes', 85, 5),

-- Frontend
('React', 'Frontend', 88, 6),
('HTML5', 'Frontend', 95, 7),
('CSS3', 'Frontend', 92, 8),
('Vue.js', 'Frontend', 70, 9),
('Bootstrap', 'Frontend', 85, 10),

-- Backend
('Node.js', 'Backend', 90, 11),
('Express.js', 'Backend', 88, 12),
('Django', 'Backend', 65, 13),
('REST APIs', 'Backend', 90, 14),
('GraphQL', 'Backend', 60, 15),

-- Bases de Datos
('PostgreSQL', 'Bases de Datos', 85, 16),
('MySQL', 'Bases de Datos', 80, 17),
('MongoDB', 'Bases de Datos', 75, 18),
('Redis', 'Bases de Datos', 60, 19),

-- DevOps y Herramientas
('Git', 'DevOps', 90, 20),
('Docker', 'DevOps', 70, 21),
('AWS', 'DevOps', 60, 22),
('Linux', 'DevOps', 75, 23),
('CI/CD', 'DevOps', 65, 24);

-- =====================================================
-- DATOS DE EJEMPLO: Proyectos Destacados
-- =====================================================
INSERT INTO proyectos (nombre, descripcion, tecnologias, url_demo, url_repositorio, fecha_inicio, fecha_fin, orden) VALUES
(
    'Sistema de Gestión Empresarial',
    'Plataforma web para gestión de inventarios, ventas y clientes. Incluye dashboard interactivo con gráficos en tiempo real, sistema de autenticación y roles de usuario, y generación de reportes PDF.',
    'React, Node.js, Express, PostgreSQL, Chart.js',
    'https://demo-gestion.herokuapp.com',
    'https://github.com/frankberrio/sistema-gestion',
    '2023-03-01',
    '2023-08-15',
    1
),
(
    'E-commerce Multivendor',
    'Marketplace online que permite a múltiples vendedores publicar y vender productos. Sistema de pagos integrado con Stripe, carrito de compras, búsqueda avanzada y panel de administración.',
    'React, Node.js, Express, MongoDB, Stripe API',
    'https://ecommerce-demo.netlify.app',
    'https://github.com/frankberrio/ecommerce-multivendor',
    '2022-06-01',
    '2022-12-20',
    2
),
(
    'Portfolio Personal Dinámico',
    'Portafolio web profesional con backend y base de datos para gestión dinámica de contenido. Incluye formulario de contacto, carga de proyectos desde BD y diseño responsive.',
    'JavaScript, Node.js, Express, PostgreSQL, HTML5, CSS3',
    'https://frankberrio-portfolio.netlify.app',
    'https://github.com/frankberrio/portfolio',
    '2024-11-01',
    '2024-12-02',
    3
),
(
    'App de Tareas con React',
    'Aplicación de gestión de tareas con funcionalidad CRUD, filtros por categoría y estado, almacenamiento local y sincronización con backend.',
    'React, Context API, Local Storage, CSS Modules',
    'https://tasks-app-react.netlify.app',
    'https://github.com/frankberrio/tasks-app',
    '2021-09-01',
    '2021-10-15',
    4
),
(
    'API REST de Biblioteca',
    'API completa para gestión de biblioteca con autenticación JWT, CRUD de libros y usuarios, búsqueda avanzada y documentación con Swagger.',
    'Node.js, Express, PostgreSQL, JWT, Swagger',
    NULL,
    'https://github.com/frankberrio/biblioteca-api',
    '2022-01-10',
    '2022-03-25',
    5
);

-- =====================================================
-- DATOS DE EJEMPLO: Certificaciones
-- =====================================================
INSERT INTO certificaciones (nombre, institucion, fecha_obtencion, url_credencial, descripcion, orden) VALUES
(
    'Desarrollo Web Full Stack',
    'Platzi',
    '2022-06-15',
    'https://platzi.com/p/frankberrio/curso/2008-course/',
    'Certificación completa en desarrollo web con HTML, CSS, JavaScript, Node.js, Express y bases de datos relacionales.',
    1
),
(
    'Fundamentos de Bases de Datos',
    'Coursera',
    '2021-08-20',
    'https://coursera.org/verify/ABC123XYZ',
    'Diseño de bases de datos relacionales, SQL avanzado, normalización y optimización de consultas.',
    2
),
(
    'Introducción a la Inteligencia Artificial',
    'edX',
    '2023-03-10',
    'https://courses.edx.org/certificates/abc123',
    'Fundamentos de Machine Learning, algoritmos de clasificación y regresión, redes neuronales básicas.',
    3
),
(
    'Git y GitHub Profesional',
    'Platzi',
    '2022-02-01',
    'https://platzi.com/p/frankberrio/curso/1557-course/',
    'Control de versiones, branching strategies, pull requests, code reviews y GitHub Actions.',
    4
),
(
    'JavaScript Avanzado',
    'Udemy',
    '2023-07-18',
    'https://udemy.com/certificate/UC-abc123',
    'Programación funcional, async/await, Promises, closures, prototypes y ES6+.',
    5
);

-- =====================================================
-- DATOS DE EJEMPLO: Idiomas
-- =====================================================
INSERT INTO idiomas (idioma, nivel, porcentaje, descripcion, orden) VALUES
(
    'Español',
    'Nativo',
    100,
    'Lengua materna. Dominio completo en comunicación oral y escrita.',
    1
),
(
    'Inglés',
    'Intermedio (B2)',
    75,
    'Lectura fluida de documentación técnica. Comunicación escrita profesional. Conversación básica-intermedia.',
    2
),
(
    'Francés',
    'Básico (A2)',
    30,
    'Conocimientos básicos de conversación y comprensión lectora.',
    3
);

-- =====================================================
-- ÍNDICES para mejorar el rendimiento
-- =====================================================
CREATE INDEX idx_experiencia_fecha ON experiencia(fecha_inicio DESC);
CREATE INDEX idx_educacion_fecha ON educacion(fecha_inicio DESC);
CREATE INDEX idx_habilidades_categoria ON habilidades(categoria);
CREATE INDEX idx_proyectos_fecha ON proyectos(fecha_inicio DESC);
CREATE INDEX idx_contactos_fecha ON contactos(created_at DESC);
CREATE INDEX idx_contactos_leido ON contactos(leido);
CREATE INDEX idx_certificaciones_fecha ON certificaciones(fecha_obtencion DESC);
CREATE INDEX idx_idiomas_orden ON idiomas(orden ASC);

-- =====================================================
-- VISTAS ÚTILES
-- =====================================================

-- Vista de experiencia actual
CREATE VIEW v_experiencia_actual AS
SELECT * FROM experiencia WHERE actual = TRUE ORDER BY fecha_inicio DESC;

-- Vista de habilidades por categoría
CREATE VIEW v_habilidades_por_categoria AS
SELECT categoria, COUNT(*) as total, ROUND(AVG(nivel), 2) as nivel_promedio
FROM habilidades
GROUP BY categoria
ORDER BY nivel_promedio DESC;

-- =====================================================
-- CONSULTAS DE VERIFICACIÓN
-- =====================================================

-- Verificar datos insertados
SELECT 'Profile' as tabla, COUNT(*) as registros FROM profile
UNION ALL
SELECT 'Experiencia', COUNT(*) FROM experiencia
UNION ALL
SELECT 'Educación', COUNT(*) FROM educacion
UNION ALL
SELECT 'Habilidades', COUNT(*) FROM habilidades
UNION ALL
SELECT 'Proyectos', COUNT(*) FROM proyectos
UNION ALL
SELECT 'Contactos', COUNT(*) FROM contactos
UNION ALL
SELECT 'Certificaciones', COUNT(*) FROM certificaciones
UNION ALL
SELECT 'Idiomas', COUNT(*) FROM idiomas;

-- =====================================================
-- FIN DEL SCRIPT
-- =====================================================
-- Para ejecutar este script:
-- psql -U postgres -d portafolio_db -f database.sql
-- =====================================================
