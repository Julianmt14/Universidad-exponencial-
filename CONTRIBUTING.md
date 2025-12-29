# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Universidad Exponencial! Esta guía te ayudará a comenzar.

## 📋 Tabla de Contenidos
- [Código de Conducta](#código-de-conducta)
- [¿Cómo puedo contribuir?](#cómo-puedo-contribuir)
- [Reportar Bugs](#reportar-bugs)
- [Proponer Nuevas Funcionalidades](#proponer-nuevas-funcionalidades)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Estándares de Código](#estándares-de-código)

## 📜 Código de Conducta
Este proyecto sigue el Código de Conducta de GitHub. Al participar, se espera que mantengas un ambiente respetuoso y acogedor.

## 🚀 ¿Cómo puedo contribuir?

### Reportar Bugs
Si encuentras un bug, por favor:
1. Verifica que no exista un issue similar
2. Crea un nuevo issue con la etiqueta `bug`
3. Incluye:
   - Descripción clara del problema
   - Pasos para reproducirlo
   - Comportamiento esperado vs. comportamiento actual
   - Capturas de pantalla si aplica
   - Información del navegador/sistema

### Proponer Nuevas Funcionalidades
Para proponer una nueva funcionalidad:
1. Crea un issue con la etiqueta `enhancement`
2. Describe claramente:
   - El problema que resuelve
   - La solución propuesta
   - Alternativas consideradas
   - Impacto en el proyecto

## 🔄 Proceso de Pull Request

1. **Fork el repositorio**
2. **Crea una rama** desde `main`:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. **Realiza tus cambios**
4. **Commits descriptivos**:
   ```bash
   git commit -m "feat: agregar sistema de notificaciones"
   ```
5. **Push a tu fork**:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```
6. **Crea el Pull Request**
7. **Espera la revisión**

### Convenciones de Commits
Usamos [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formato, punto y coma faltantes, etc.
- `refactor:` Refactorización de código
- `test:` Agregar tests
- `chore:` Actualizar dependencias, etc.

## 💻 Estándares de Código

### JavaScript
- Usar `const` y `let` en lugar de `var`
- Nombres de variables descriptivos en camelCase
- Funciones documentadas con JSDoc
- Manejo apropiado de errores

```javascript
/**
 * Obtiene un programa por su ID
 * @param {number} id - ID del programa
 * @returns {Object} Programa encontrado
 */
function obtenerPrograma(id) {
  // implementación
}
```

### HTML
- Indentación de 2 espacios
- Atributos en minúsculas
- Comentarios para secciones principales
- Usar elementos semánticos

### CSS
- Nombres de clases descriptivos en kebab-case
- Organizar por secciones
- Comentarios para bloques principales
- Mobile-first approach

## ✅ Checklist antes de Pull Request
- [ ] El código sigue los estándares del proyecto
- [ ] He agregado comentarios donde es necesario
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevos warnings
- [ ] He probado en diferentes navegadores
- [ ] Los commits siguen las convenciones

## 🐛 Debugging
Para reportar problemas, incluye:
- Versión del navegador
- Sistema operativo
- Pasos para reproducir
- Logs de consola si aplican

## 📞 ¿Necesitas Ayuda?
- Revisa la [documentación](docs/)
- Abre un issue con la etiqueta `question`
- Contacta a @Julianmt14

¡Gracias por contribuir! 🎉
