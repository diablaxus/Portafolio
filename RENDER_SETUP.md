# 🚀 Configuración de Render con Supabase

## ✅ Pasos para Deploy

### 1. Subir Cambios a GitHub

```powershell
git add .
git commit -m "Config: Configurado para Supabase en Render"
git push origin master
```

### 2. Configurar Variable de Entorno en Render

1. Ve a **Render Dashboard**: https://dashboard.render.com
2. Click en **"portafolio-frank-berrio"**
3. Ve a la pestaña **"Environment"**
4. Click en **"Add Environment Variable"**
5. Agrega:

```
Key: DATABASE_URL
Value: postgresql://postgres:solomayoresde18@db.dwqsatksemonzjewfplh.supabase.co:5432/postgres
```

6. Click **"Save Changes"**

### 3. Variables que Ya Están en render.yaml

Estas se configuran automáticamente:
- ✅ `NODE_ENV` = production
- ✅ `PORT` = 10000

### 4. Re-Desplegar

Render automáticamente re-desplegará después de agregar la variable.

O manualmente:
1. Ve a **"Manual Deploy"**
2. Click en **"Deploy latest commit"**

### 5. Verificar

Una vez desplegado:

1. Ve a **"Logs"**
2. Deberías ver:
   ```
   ✅ Conectado a Supabase
   📊 Base de datos configurada correctamente
   ```

3. Abre tu app:
   ```
   https://portafolio-frank-berrio.onrender.com
   ```

---

## 🔧 Para Desarrollo Local

Si quieres probar localmente con PostgreSQL local:

1. Edita `backend/.env`:

```env
# Comenta DATABASE_URL
# DATABASE_URL=postgresql://...

# Descomenta estas:
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=solomayoresde18
DB_NAME=portafolio_db
PORT=3000
NODE_ENV=development
```

2. Ejecuta:
```powershell
cd backend
npm run dev
```

3. Abre: http://localhost:3000

---

## ⚠️ Importante

- El archivo `.env` NO se sube a GitHub (está en `.gitignore`)
- Render usa las variables configuradas en el Dashboard
- Supabase funciona tanto para desarrollo como producción
