# 🎓 Universidad Exponencial

![Universidad Exponencial]
<img width="1909" height="904" alt="image" src="https://github.com/user-attachments/assets/cf971802-78ff-43a2-8e96-45ca10e398f4" />


## 📋 Descripción
Universidad Exponencial es un sistema web de gestión universitaria moderno y responsive que permite administrar programas académicos, gestionar admisiones de estudiantes y mantener un registro organizado de la información institucional.

## ✨ Características Principales
- 📚 **Gestión de Programas Académicos**: Administración completa de programas educativos
- 👥 **Sistema de Admisiones**: Registro y seguimiento de solicitudes de estudiantes
- 💾 **Base de Datos SQLite**: Almacenamiento local y eficiente
- 📱 **Interfaz Responsive**: Diseño adaptable a cualquier dispositivo
- 🔍 **Sistema de Búsqueda**: Filtrado y búsqueda de información
- 🎨 **Diseño Moderno**: Interfaz intuitiva y atractiva

## 🛠️ Tecnologías Utilizadas
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Base de Datos**: SQLite
- **Deployment**: Netlify
- **Control de versiones**: Git & GitHub

## 📁 Estructura del Proyecto
```
Universidad-exponencial-/
├── index.html                    # Página principal
├── funciones.js                  # Lógica de la aplicación
├── universidad_exponencial.sql   # Esquema de base de datos
├── universidad_exponencial.db    # Base de datos SQLite
├── package-lock.json             # Dependencias
├── estilos/                      # Archivos CSS
├── imagenes/                     # Recursos gráficos
└── U EXPO DROP NET/              # Archivos adicionales
```

## 📸 Capturas de Pantalla
![Página Principal](imagenes/screenshot1.png)
![Panel de Administración](imagenes/screenshot2.png)
![Sistema de Admisiones](imagenes/screenshot3.png)

## 🚀 Instalación

### Requisitos Previos
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- Editor de código (VS Code recomendado)
- SQLite (opcional para gestión de base de datos)

### Pasos de Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/Julianmt14/Universidad-exponencial-.git
   ```

2. Navega al directorio del proyecto:
   ```bash
   cd Universidad-exponencial-
   ```

3. Abre el archivo `index.html` en tu navegador:
   ```bash
   # En Windows
   start index.html
   
   # En macOS
   open index.html
   
   # En Linux
   xdg-open index.html
   ```

## 💻 Uso

### Iniciar la Aplicación
1. Abre `index.html` en tu navegador
2. La aplicación cargará automáticamente los datos de la base de datos
3. Navega por las diferentes secciones usando el menú principal

### Gestión de Programas
- Crear nuevos programas académicos
- Editar información de programas existentes
- Eliminar programas
- Ver detalles completos de cada programa

### Sistema de Admisiones
- Registrar nuevas solicitudes de admisión
- Vincular solicitudes a programas específicos
- Consultar historial de admisiones
- Filtrar por programa o fecha

## 🗄️ Estructura de la Base de Datos

### Tabla: programas
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER PRIMARY KEY | Identificador único |
| nombre | TEXT NOT NULL | Nombre del programa |
| descripcion | TEXT | Descripción del programa |
| imagen_url | TEXT | URL de la imagen del programa |

### Tabla: admisiones
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | INTEGER PRIMARY KEY | Identificador único |
| nombre | TEXT NOT NULL | Nombre del estudiante |
| email | TEXT NOT NULL | Email del estudiante |
| telefono | TEXT | Teléfono de contacto |
| programa_id | INTEGER | ID del programa (FK) |
| fecha | DATETIME | Fecha de solicitud |

## 🤝 Contribuciones
¡Las contribuciones son bienvenidas! Por favor lee [CONTRIBUTING.md](CONTRIBUTING.md) para detalles sobre nuestro código de conducta y el proceso para enviarnos pull requests.

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👤 Autor
**@Julianmt14**
- GitHub: [@Julianmt14](https://github.com/Julianmt14)

## 🌐 Demo en Vivo
Visita la aplicación en: [https://universidadexponencial.netlify.app](https://universidadexponencial.netlify.app)

## 📚 Documentación Adicional
- [Arquitectura del Sistema](docs/ARCHITECTURE.md)
- [Documentación de API](docs/API.md)
- [Guía de Base de Datos](docs/DATABASE.md)

---
⭐ Si este proyecto te ha sido útil, considera darle una estrella en GitHub
