# 🗄️ Documentación de Base de Datos - Universidad Exponencial

## Tecnología
**SQLite 3** - Base de datos embebida relacional

## Diagrama de Relaciones

```
┌─────────────────────────┐
│       programas         │
├─────────────────────────┤
│ id (PK)        INTEGER  │
│ nombre         TEXT     │
│ descripcion    TEXT     │
│ imagen_url     TEXT     │
└──────────┬──────────────┘
           │
           │ 1:N
           │
┌──────────▼──────────────┐
│      admisiones         │
├─────────────────────────┤
│ id (PK)        INTEGER  │
│ nombre         TEXT     │
│ email          TEXT     │
│ telefono       TEXT     │
│ programa_id (FK)INTEGER │
│ fecha          DATETIME │
└─────────────────────────┘
```

## Esquema Completo

### Tabla: `programas`

Almacena los programas académicos ofrecidos por la universidad.

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Identificador único del programa |
| nombre | TEXT | NOT NULL | Nombre del programa académico |
| descripcion | TEXT | NULL | Descripción detallada del programa |
| imagen_url | TEXT | NULL | URL de la imagen representativa |

**Índices**:
- PRIMARY KEY en `id`

**Ejemplo de registro**:
```sql
{
  "id": 1,
  "nombre": "Ingeniería de Software",
  "descripcion": "Programa de 4 años enfocado en desarrollo de software",
  "imagen_url": "https://example.com/images/ing-software.jpg"
}
```

### Tabla: `admisiones`

Registra las solicitudes de admisión de estudiantes a programas.

| Columna | Tipo | Restricciones | Descripción |
|---------|------|---------------|-------------|
| id | INTEGER | PRIMARY KEY, AUTOINCREMENT | Identificador único de la admisión |
| nombre | TEXT | NOT NULL | Nombre completo del estudiante |
| email | TEXT | NOT NULL | Email de contacto |
| telefono | TEXT | NULL | Teléfono de contacto |
| programa_id | INTEGER | FOREIGN KEY (programas.id) | ID del programa al que aplica |
| fecha | DATETIME | DEFAULT CURRENT_TIMESTAMP | Fecha y hora de la solicitud |

**Índices**:
- PRIMARY KEY en `id`
- FOREIGN KEY en `programa_id` → `programas.id`

**Ejemplo de registro**:
```sql
{
  "id": 1,
  "nombre": "María González",
  "email": "maria@example.com",
  "telefono": "+57 300 123 4567",
  "programa_id": 1,
  "fecha": "2025-12-29 10:30:00"
}
```

## Relaciones

### programas → admisiones (1:N)
- Un programa puede tener múltiples admisiones
- Una admisión pertenece a un solo programa
- Si se elimina un programa, las admisiones relacionadas deben manejarse (CASCADE o SET NULL)

## Consultas Comunes

### Listar todos los programas
```sql
SELECT * FROM programas ORDER BY nombre;
```

### Obtener programa por ID
```sql
SELECT * FROM programas WHERE id = ?;
```

### Crear nuevo programa
```sql
INSERT INTO programas (nombre, descripcion, imagen_url)
VALUES (?, ?, ?);
```

### Actualizar programa
```sql
UPDATE programas 
SET nombre = ?, descripcion = ?, imagen_url = ?
WHERE id = ?;
```

### Eliminar programa
```sql
DELETE FROM programas WHERE id = ?;
```

### Listar admisiones con información del programa
```sql
SELECT 
  a.id,
  a.nombre AS estudiante,
  a.email,
  a.telefono,
  a.fecha,
  p.nombre AS programa,
  p.descripcion AS programa_descripcion
FROM admisiones a
INNER JOIN programas p ON a.programa_id = p.id
ORDER BY a.fecha DESC;
```

### Contar admisiones por programa
```sql
SELECT 
  p.nombre AS programa,
  COUNT(a.id) AS total_admisiones
FROM programas p
LEFT JOIN admisiones a ON p.id = a.programa_id
GROUP BY p.id, p.nombre
ORDER BY total_admisiones DESC;
```

### Buscar admisiones por email
```sql
SELECT * FROM admisiones 
WHERE email LIKE '%' || ? || '%';
```

### Admisiones de los últimos 30 días
```sql
SELECT * FROM admisiones
WHERE fecha >= datetime('now', '-30 days')
ORDER BY fecha DESC;
```

## Reglas de Integridad

### Integridad Referencial
- `programa_id` en `admisiones` debe existir en `programas.id`
- No se pueden crear admisiones sin un programa válido

### Validaciones de Negocio
1. **Email único**: Un estudiante no puede tener múltiples admisiones con el mismo email
2. **Nombre del programa único**: No pueden existir dos programas con el mismo nombre
3. **Email válido**: Debe tener formato válido (@domain.com)
4. **Teléfono opcional**: Puede ser NULL

## Backup y Recuperación

### Crear backup
```bash
sqlite3 universidad_exponencial.db ".backup 'backup.db'"
```

### Restaurar desde backup
```bash
cp backup.db universidad_exponencial.db
```

### Exportar a SQL
```bash
sqlite3 universidad_exponencial.db .dump > backup.sql
```

### Importar desde SQL
```bash
sqlite3 universidad_exponencial.db < backup.sql
```

## Performance

### Índices Recomendados
```sql
-- Índice para búsquedas por email
CREATE INDEX idx_admisiones_email ON admisiones(email);

-- Índice para filtros por programa
CREATE INDEX idx_admisiones_programa ON admisiones(programa_id);

-- Índice para búsquedas por fecha
CREATE INDEX idx_admisiones_fecha ON admisiones(fecha);
```

### Optimización de Consultas
- Usar `EXPLAIN QUERY PLAN` para analizar consultas
- Limitar resultados con `LIMIT` cuando sea apropiado
- Usar transacciones para operaciones múltiples

## Migraciones

### Versión 1.0 (Actual)
- Creación de tablas `programas` y `admisiones`
- Relación 1:N entre programas y admisiones

### Versión 2.0 (Propuesta)
```sql
-- Agregar campos adicionales a programas
ALTER TABLE programas ADD COLUMN duracion_anos INTEGER;
ALTER TABLE programas ADD COLUMN modalidad TEXT;

-- Agregar tabla de usuarios/administradores
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  rol TEXT NOT NULL
);
```

## Consideraciones de Seguridad
- Usar prepared statements para prevenir SQL injection
- No almacenar contraseñas en texto plano
- Validar y sanitizar entrada de usuario
- Limitar permisos de acceso al archivo .db
