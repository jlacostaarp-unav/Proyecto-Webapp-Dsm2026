# CineApp DSM - Documentación Técnica del Proyecto

Este documento describe la arquitectura, los componentes y las características de React utilizadas en el desarrollo de la aplicación CineApp DSM, una plataforma de Video on Demand (VOD) desarrollada como proyecto de la asignatura DSM.

---

## Arquitectura y Características de React

El proyecto utiliza una arquitectura basada en componentes funcionales, aprovechando las capacidades modernas de React para gestionar el estado y los efectos secundarios.

### 1. Gestión del Estado Global (Context API)
Se ha implementado **`AuthContext`** para gestionar el estado de autenticación en toda la aplicación. Esto permite que componentes como el `Header` o las páginas de detalles sepan si hay un usuario logueado sin necesidad de pasar *props* manualmente por todos los niveles.

### 2. Hooks de React
- **`useState`**: Utilizado para gestionar estados locales como el texto de búsqueda, filtros de categorías, datos de películas, y el manejo de formularios.
- **`useEffect`**: Fundamental para:
    - Persistencia de sesión al recargar la página.
    - Sincronización de datos con `localStorage` (comentarios, ratings, favoritos).
    - Ejecución de lógica de scroll y filtrado en tiempo real.
- **`useContext`**: Permite consumir el contexto global de usuario de forma sencilla.
- **`useParams`**: Utilizado en `MovieDetail` para extraer el ID de la película directamente desde la URL.
- **`useNavigate`**: Empleado para redirecciones programáticas (ej. enviar al usuario al login tras registrarse o intentar votar sin sesión).

### 3. Enrutamiento (React Router v7)
Se utiliza un sistema de rutas dinámico para separar las vistas de la aplicación:
- Rutas públicas: Home, Registro, Login.
- Rutas dinámicas: Detalle de película (`/movie/:id`).
- Rutas protegidas (por lógica): Favoritos.

### 4. Persistencia de Datos
Dado que el proyecto se encuentra en fase previa a Firebase, se ha implementado un sistema robusto de persistencia basado en **`localStorage`**, simulando una base de datos real para:
- Usuarios registrados y credenciales.
- Listado de favoritos por usuario.
- Sistema de valoraciones (ratings) y comentarios.

---

## Descripción de Componentes

### Componentes de Interfaz (UI)
- **`Header.jsx`**: Cabecera dinámica. Cambia los enlaces mostrados según si el usuario está autenticado. Incluye el acceso a favoritos y el botón de logout.
- **`Footer.jsx`**: Pie de página estático con enlaces a información legal y contacto.
- **`Peliculas.jsx`**: Componente contenedor que recibe un listado de películas y las organiza en una cuadrícula (grid) responsive.
- **`Pelicula.jsx`**: Tarjeta individual de película. Muestra información básica y badges dinámicos con la nota media y el número de comentarios calculados en tiempo real.

### Páginas (Vistas principales)
- **`Home.jsx`**:
    - **Carrusel**: Muestra películas destacadas.
    - **Buscador**: Filtrado por título mediante entrada de texto.
    - **Filtros**: Botonera para filtrar por categorías.
- **`MovieDetail.jsx`**: Es el componente más complejo. Gestiona:
    - Visualización detallada del contenido.
    - **Valoraciones**: Sistema de 5 estrellas con restricción de un solo voto por usuario.
    - **Comentarios**: Hilo de mensajes con identificación de autor y restricción de un comentario por persona.
    - **Favoritos**: Botón para añadir/quitar de la lista personal.
    - **Recomendaciones**: Lógica que sugiere películas del mismo género.
- **`Register.jsx` / `Login.jsx`**: Gestionan la entrada al sistema, con validaciones de formulario y comprobación de duplicados en el registro.
- **`Favorites.jsx`**: Filtra y muestra únicamente las películas añatidas a la lista del usuario actual.
- **`Contact.jsx` / `LegalNotice.jsx`**: Páginas estáticas para cumplimiento de requisitos de información.

---

## Tecnologías Utilizadas
- **React**: Biblioteca principal para la interfaz.
- **React Bootstrap**: Framework de CSS para componentes responsive y diseño premium.
- **JavaScript (ES6+)**: Lógica de filtrado, mapeo de datos y gestión de promesas simuladas.
- **CSS3**: Estilos personalizados, efectos de hover y diseño de sistema de estrellas.
