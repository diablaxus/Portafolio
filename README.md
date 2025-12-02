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

## 🌐 Deploy en Render

Este proyecto está configurado para desplegarse en **Render** con:
- ✅ Backend + Frontend en un solo servicio
- ✅ PostgreSQL incluido (gratis)
- ✅ Deploy automático desde GitHub

### URL en Producción
🌍 **https://portafolio-frank-berrio.onrender.com**

---

## 📁 Estructura del Proyecto

```
Hoja de Vida/
│
├── frontend/              # 🎨 Frontend (HTML/CSS/JS)
│   ├── index.html
│   ├── styles.css
│   ├── app.js
│   └── img/
│
├── backend/               # ⚙️ Backend (Node.js/Express)
│   ├── server.js
│   ├── database.sql
│   ├── package.json
│   ├── .env              # Variables locales
│   ├── config/
│   │   └── database.js
│   └── routes/
│       └── api.js
│
├── render.yaml           # 🚀 Configuración de Render
├── .gitignore
└── README.md
```

---

## 🔧 Instalación Local

### 1. Clonar Repositorio
```powershell
git clone https://github.com/TU_USUARIO/portafolio.git
cd portafolio
```

### 2. Instalar Dependencias
```powershell
cd backend
npm install
```

### 3. Configurar PostgreSQL
```powershell
# Crear base de datos
psql -U postgres -c "CREATE DATABASE portafolio_db;"

# Ejecutar script SQL
psql -U postgres -d portafolio_db -f database.sql
```

### 4. Configurar Variables de Entorno
Crea `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_contraseña
DB_NAME=portafolio_db
PORT=3000
NODE_ENV=development
```

### 5. Ejecutar
```powershell
npm start         # Producción
npm run dev       # Desarrollo (auto-reload)
```

Abre: **http://localhost:3000**

---

## 🚀 Deploy en Render

### Opción A: Desde GitHub (Automático)

1. **Sube tu código a GitHub**
```powershell
git add .
git commit -m "Deploy inicial"
git push origin main
```

2. **Conecta en Render**
   - Ve a https://render.com
   - Click "New +" → "Blueprint"
   - Conecta tu repositorio
   - Render detecta `render.yaml` automáticamente
   - Click "Apply"

3. **Ejecutar SQL**
   - Ve a tu base de datos en Render
   - Click "Connect" → "PSQL Command"
   - Ejecuta: `\i backend/database.sql`

### Opción B: Manual

1. **Crear PostgreSQL**
   - New + → PostgreSQL
   - Name: `portafolio-db`

2. **Crear Web Service**
   - New + → Web Service
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`

3. **Configurar Variables**
   - Conecta las variables de la base de datos

---

## 🌐 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/` | Frontend (HTML) |
| GET | `/health` | Health check |
| GET | `/api/profile` | Información del perfil |
| GET | `/api/experiencia` | Experiencia laboral |
| GET | `/api/educacion` | Formación académica |
| GET | `/api/habilidades` | Habilidades técnicas |
| GET | `/api/proyectos` | Proyectos realizados |
| GET | `/api/certificaciones` | Certificaciones |
| GET | `/api/idiomas` | Idiomas |
| POST | `/api/contacto` | Enviar mensaje |

---

## 🔄 Flujo de Datos

```
PostgreSQL → Backend API → Frontend JavaScript → DOM
```

El backend sirve el frontend automáticamente. Todo en una sola URL.

---

## 📊 Actualizar Contenido

Modifica directamente en PostgreSQL:

```sql
-- Actualizar perfil
UPDATE profile SET descripcion = 'Nueva descripción' WHERE id = 1;

-- Agregar experiencia
INSERT INTO experiencia (empresa, cargo, fecha_inicio, descripcion) 
VALUES ('Nueva Empresa', 'Senior Developer', '2024-01-01', 'Descripción...');
```

Recarga la página → cambios automáticos.

---

## 🐛 Troubleshooting

### En Render:
- Verifica logs en Dashboard
- Asegúrate de que la BD esté conectada
- Revisa las variables de entorno

### Localmente:
```powershell
# Error "Cannot find module"
cd backend && npm install

# Error "Port already in use"
# Cambia PORT en .env

# Error PostgreSQL
# Verifica credenciales en .env
```

---

## 📄 Licencia

MIT License - Frank Esteban Berrío Forero

---

**Desarrollado con ❤️ | Diciembre 2024**