# 📚 Documentación de API JavaScript - funciones.js

## Tabla de Contenidos
- [Funciones de Programas](#funciones-de-programas)
- [Funciones de Admisiones](#funciones-de-admisiones)
- [Funciones de UI](#funciones-de-ui)
- [Utilidades](#utilidades)

## Funciones de Programas

### `cargarProgramas()`
Carga todos los programas desde la base de datos.

**Retorno**: `Promise<Array>`
```javascript
// Ejemplo de uso
cargarProgramas().then(programas => {
  console.log(programas);
});
```

### `crearPrograma(datos)`
Crea un nuevo programa académico.

**Parámetros**:
- `datos` (Object): Objeto con información del programa
  - `nombre` (string): Nombre del programa
  - `descripcion` (string): Descripción
  - `imagen_url` (string): URL de la imagen

**Retorno**: `Promise<Object>`

```javascript
// Ejemplo
crearPrograma({
  nombre: "Ingeniería de Software",
  descripcion: "Programa de 4 años",
  imagen_url: "https://ejemplo.com/img.jpg"
}).then(resultado => {
  console.log("Programa creado:", resultado);
});
```

### `actualizarPrograma(id, datos)`
Actualiza un programa existente.

**Parámetros**:
- `id` (number): ID del programa
- `datos` (Object): Datos a actualizar

**Retorno**: `Promise<boolean>`

### `eliminarPrograma(id)`
Elimina un programa.

**Parámetros**:
- `id` (number): ID del programa

**Retorno**: `Promise<boolean>`

## Funciones de Admisiones

### `cargarAdmisiones()`
Obtiene todas las admisiones.

**Retorno**: `Promise<Array>`

### `crearAdmision(datos)`
Registra una nueva admisión.

**Parámetros**:
- `datos` (Object):
  - `nombre` (string): Nombre del estudiante
  - `email` (string): Email
  - `telefono` (string): Teléfono
  - `programa_id` (number): ID del programa

**Retorno**: `Promise<Object>`

```javascript
// Ejemplo
crearAdmision({
  nombre: "Juan Pérez",
  email: "juan@email.com",
  telefono: "123456789",
  programa_id: 1
}).then(admision => {
  console.log("Admisión creada:", admision);
});
```

### `actualizarAdmision(id, datos)`
Actualiza una admisión existente.

**Parámetros**:
- `id` (number): ID de la admisión
- `datos` (Object): Datos a actualizar

**Retorno**: `Promise<boolean>`

### `eliminarAdmision(id)`
Elimina una admisión.

**Parámetros**:
- `id` (number): ID de la admisión

**Retorno**: `Promise<boolean>`

## Funciones de UI

### `renderizarProgramas(programas)`
Renderiza la lista de programas en el DOM.

**Parámetros**:
- `programas` (Array): Array de objetos de programa

**Retorno**: `void`

### `renderizarAdmisiones(admisiones)`
Renderiza la lista de admisiones en el DOM.

**Parámetros**:
- `admisiones` (Array): Array de objetos de admisión

**Retorno**: `void`

### `mostrarModal(tipo, datos)`
Muestra un modal para crear/editar.

**Parámetros**:
- `tipo` (string): "programa" o "admision"
- `datos` (Object): Datos a prellenar (opcional)

**Retorno**: `void`

### `cerrarModal()`
Cierra el modal activo.

**Retorno**: `void`

## Utilidades

### `validarEmail(email)`
Valida formato de email.

**Parámetros**:
- `email` (string): Email a validar

**Retorno**: `boolean`

```javascript
// Ejemplo
const esValido = validarEmail("test@example.com");
console.log(esValido); // true
```

### `validarTelefono(telefono)`
Valida formato de teléfono.

**Parámetros**:
- `telefono` (string): Teléfono a validar

**Retorno**: `boolean`

### `formatearFecha(fecha)`
Formatea una fecha a string legible.

**Parámetros**:
- `fecha` (Date | string): Fecha a formatear

**Retorno**: `string`

### `mostrarNotificacion(mensaje, tipo)`
Muestra una notificación al usuario.

**Parámetros**:
- `mensaje` (string): Mensaje a mostrar
- `tipo` (string): "success", "error", "warning", "info"

**Retorno**: `void`

```javascript
// Ejemplo
mostrarNotificacion("Programa creado exitosamente", "success");
```

## Manejo de Errores

Todas las funciones asíncronas devuelven Promises y deben manejarse con try/catch:

```javascript
try {
  const programas = await cargarProgramas();
  renderizarProgramas(programas);
} catch (error) {
  mostrarNotificacion("Error al cargar programas", "error");
  console.error(error);
}
```

## Eventos Personalizados

### `programaCreado`
Disparado cuando se crea un programa.

**Detalles**: `{ id, nombre, descripcion }`

### `admisionCreada`
Disparado cuando se crea una admisión.

**Detalles**: `{ id, nombre, email, programa_id }`

```javascript
// Escuchar eventos
document.addEventListener('programaCreado', (e) => {
  console.log('Nuevo programa:', e.detail);
});
```
