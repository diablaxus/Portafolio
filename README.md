# 📄 Portafolio - Hoja de Vida Digital

Portafolio personal profesional con arquitectura Frontend-Backend separada.

## 👤 Autor
**Frank Esteban Berrío Forero**  
📧 frankbf2003@gmail.com | 📱 +57 3126899983

---

## 🚀 Stack Tecnológico

### Backend
- **Node.js** + **Express.js**
- **PostgreSQL**
- **dotenv** (variables de entorno)

### Frontend
- **HTML5**, **CSS3**, **JavaScript Vanilla**
- Sin frameworks ni build tools

---

## 📁 Estructura del Proyecto

```
Hoja de Vida/
│
├── frontend/              # 🎨 Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   ├── img/
│   └── package.json       # Dependencias frontend (opcional)
│
├── backend/               # ⚙️ Backend (Node.js/Express)
│   ├── server.js
│   ├── database.sql
│   ├── package.json       # Dependencias backend
│   ├── node_modules/
│   ├── config/
│   │   └── database.js
│   └── routes/
│       └── api.js
│
├── .env                   # Variables de entorno
├── .env.example
├── .gitignore
└── README.md
```

---

## 🔧 Instalación

### 1. Instalar Dependencias del Backend
```powershell
cd backend
npm install
```

### 2. Configurar PostgreSQL
```powershell
# Crear base de datos
psql -U postgres -c "CREATE DATABASE portafolio_db;"

# Ejecutar script SQL
psql -U postgres -d portafolio_db -f database.sql
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env` en la **carpeta backend/** con:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=portafolio_db
PORT=3000
```

---

## 🚀 Ejecución

### Modo Producción
```powershell
cd backend
npm start
```

### Modo Desarrollo (con auto-reload)
```powershell
cd backend
npm run dev
```

El servidor inicia en: **http://localhost:3000**

---

## 🌐 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Frontend (HTML) |
| GET | `/api/profile` | Información del perfil |
| GET | `/api/experiencia` | Experiencia laboral |
| GET | `/api/educacion` | Formación académica |
| GET | `/api/habilidades` | Habilidades técnicas |
| GET | `/api/proyectos` | Proyectos realizados |
| POST | `/api/contacto` | Enviar mensaje |

---

## 📝 Scripts Disponibles

### Backend (`cd backend`)
```powershell
npm start       # Iniciar servidor en producción
npm run dev     # Iniciar con nodemon (auto-reload)
```

---

## 🎨 Características

- ✅ **Arquitectura separada** - Frontend y Backend independientes
- ✅ **API REST** - Endpoints bien estructurados
- ✅ **Base de datos** - PostgreSQL con datos dinámicos
- ✅ **Variables de entorno** - Configuración segura con .env
- ✅ **JavaScript Vanilla** - Sin frameworks, rápido y ligero
- ✅ **Responsive** - Adaptable a todos los dispositivos
- ✅ **Modular** - Fácil de mantener y extender

---

## 🔄 Flujo de Datos

```
PostgreSQL → Backend API → Frontend JavaScript → DOM
```

1. PostgreSQL almacena los datos
2. Backend expone API REST en `/api/*`
3. Frontend hace `fetch()` a la API
4. JavaScript actualiza el DOM dinámicamente

---

## 📊 Actualizar Contenido

No necesitas editar el HTML. Actualiza directamente en PostgreSQL:

```sql
-- Actualizar perfil
UPDATE profile SET descripcion = 'Nueva descripción' WHERE id = 1;

-- Agregar experiencia
INSERT INTO experiencia (empresa, cargo, fecha_inicio, descripcion) 
VALUES ('Nueva Empresa', 'Senior Developer', '2024-01-01', 'Descripción...');

-- Agregar habilidad
INSERT INTO habilidades (nombre, nivel, categoria) 
VALUES ('React', 85, 'Frontend');
```

Recarga la página y los cambios aparecen automáticamente.

---

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```powershell
cd backend
npm install
```

### Error: "Port 3000 already in use"
Cambia el puerto en `.env`:
```env
PORT=3001
```

### Error de conexión a PostgreSQL
Verifica credenciales en `.env` y que PostgreSQL esté corriendo

---

## 📦 Deploy

### Backend
- **Render**: https://render.com
- **Railway**: https://railway.app
- **Heroku**: https://heroku.com

### Frontend
El frontend se sirve automáticamente desde el backend. No requiere deploy separado.

---

## 📄 Licencia

MIT License - Frank Esteban Berrío Forero

---

**Desarrollado con ❤️ | Diciembre 2024**
