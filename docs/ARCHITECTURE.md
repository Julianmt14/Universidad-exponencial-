# 🏗️ Arquitectura del Sistema - Universidad Exponencial

## Visión General
Universidad Exponencial es una aplicación web de página única (SPA) construida con tecnologías web estándar sin frameworks externos.

## Arquitectura General

```
┌─────────────────────────────────────────┐
│          Interfaz de Usuario            │
│            (index.html)                 │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│       Capa de Presentación              │
│         (estilos/ CSS)                  │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│       Lógica de Negocio                 │
│        (funciones.js)                   │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│       Capa de Datos                     │
│  (universidad_exponencial.db - SQLite)  │
└─────────────────────────────────────────┘
```

## Componentes Principales

### 1. Capa de Presentación (UI)
**Archivo**: `index.html`
- Estructura HTML semántica
- Componentes reutilizables
- Formularios de entrada de datos
- Tablas de visualización
- Navegación principal

### 2. Capa de Estilos
**Directorio**: `estilos/`
- CSS modular por componentes
- Diseño responsive con media queries
- Variables CSS para consistencia
- Animaciones y transiciones

### 3. Capa de Lógica
**Archivo**: `funciones.js`

Responsabilidades:
- Interacción con el DOM
- Validación de formularios
- Comunicación con la base de datos
- Manejo de eventos de usuario
- Procesamiento de datos

### 4. Capa de Datos
**Archivo**: `universidad_exponencial.db`

Esquema:
- Tabla `programas`: Almacena información de programas académicos
- Tabla `admisiones`: Registra solicitudes de estudiantes
- Relaciones: FK entre admisiones y programas

## Flujo de Datos

### Flujo de Lectura (Query)
```
Usuario → UI (evento) → funciones.js → SQLite → funciones.js → UI (render)
```

### Flujo de Escritura (Create/Update/Delete)
```
Usuario → Formulario → Validación → funciones.js → SQLite → Confirmación → UI actualizado
```

## Patrones de Diseño

### 1. Separation of Concerns
- HTML: Estructura
- CSS: Presentación
- JavaScript: Comportamiento

### 2. Event-Driven Architecture
- Listeners para interacciones de usuario
- Callbacks para operaciones asíncronas
- Event bubbling para delegación

### 3. Module Pattern (Implícito)
- Funciones organizadas por dominio
- Encapsulamiento de lógica
- Namespace para evitar colisiones

## Decisiones Técnicas

### ¿Por qué Vanilla JavaScript?
- Sin dependencias externas
- Mayor control y rendimiento
- Menor tamaño de payload
- Simplicidad en deployment

### ¿Por qué SQLite?
- Base de datos embebida
- Sin configuración de servidor
- Perfecta para aplicaciones pequeñas/medianas
- Portabilidad

## Seguridad
- Validación de entrada en cliente
- Sanitización de datos
- Prevención de SQL injection (prepared statements)
- HTTPS en producción (Netlify)

## Performance
- Carga lazy de recursos
- Minificación de assets
- Compresión de imágenes
- Caching de consultas frecuentes

## Escalabilidad
El sistema actual es adecuado para:
- Hasta 10,000 programas
- Hasta 50,000 admisiones
- Operaciones CRUD en tiempo real

Para mayor escala se recomienda:
- Migrar a PostgreSQL/MySQL
- Implementar backend (Node.js/Python)
- Agregar caching (Redis)
- Load balancing

## Deployment
**Plataforma**: Netlify
- Build automático desde GitHub
- CDN global
- HTTPS gratuito
- Rollbacks instantáneos

## Futuras Mejoras
1. Implementar PWA (Progressive Web App)
2. Agregar autenticación de usuarios
3. Sistema de reportes y analíticas
4. API REST para integraciones
5. Tests automatizados
