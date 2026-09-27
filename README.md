# 🛍️ MiTiendita — E-commerce en React + Firebase

Proyecto final del curso de **React** de **Talento Tech 2026**.

Tienda online con catálogo de productos, carrito de compras, registro e inicio de sesión de usuarios y un **panel de administración** para crear, editar y eliminar productos. Los datos se guardan en **Firebase**.

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)

🔗 **Demo en vivo:** (https://proyecto-final-react-git-main-leonardo26.vercel.app/)

---

## 📑 Contenido

- [Funcionalidades](#-funcionalidades)
- [Usuario de prueba](#-usuario-de-prueba)
- [Rutas](#%EF%B8%8F-rutas)
- [Instalación](#-instalación)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Tecnologías](#%EF%B8%8F-tecnologías)
- [Requisitos de la consigna](#-requisitos-de-la-consigna)
- [Autor](#-autor)

---

## ✨ Funcionalidades

### 🛒 Tienda
- **Catálogo de productos** traído desde Firestore, en tarjetas con imagen, categoría, stock y precio
- **Barra de búsqueda** por nombre del producto
- **Paginación** de 4 productos por página
- **Detalle del producto**: nombre, descripción, imagen, categoría, precio y stock
- Indicador de carga mientras se traen los datos

### 🧺 Carrito de compras (`CarritoContext`)
- Si agregás un producto que ya está en el carrito, **no se duplica**: suma cantidad
- Botones para **aumentar o disminuir** la cantidad de cada producto
- **Control de stock**: no deja agregar más unidades de las disponibles
- **Eliminación individual** con un modal de confirmación
- Muestra el total de productos y el importe total

### 🔐 Autenticación y roles (`AuthContext`)
- **Registro** e **inicio de sesión** con Firebase Authentication
- El rol de cada usuario (`admin` o `user`) se lee de la colección `usuarios` en Firestore
- El enlace al **Dashboard** solo aparece en el menú si el usuario es administrador
- **Ruta protegida**: si un usuario común intenta entrar al panel de administración, no puede

### 🧑‍💼 Dashboard de administración (CRUD)
- **Crear** productos nuevos (nombre, categoría, precio, stock, descripción e imagen)
- **Editar** productos existentes
- **Eliminar** productos, con confirmación previa
- Las imágenes se suben a **ImgBB** y el enlace se guarda en Firestore

### 📱 Diseño
- **Responsive**, hecho con Tailwind CSS
- **Menú hamburguesa** en pantallas chicas
- Sección de **Contacto** con el equipo de la tienda

---

## 👤 Usuario de prueba

Para probar el panel de administración:

| Rol           | Email             | Contraseña  |
|---------------|-------------------|-------------|
| Administrador | `admin@gmail.com` | `Admin1234` |

También podés crear una cuenta nueva desde **Registro** para ver la tienda como usuario común.

---

## 🗺️ Rutas

| Ruta                          | Página                     | Acceso            |
|-------------------------------|----------------------------|-------------------|
| `/`                           | Inicio                     | 🌐 Pública        |
| `/ProductosNacionales`        | Catálogo de productos      | 🌐 Pública        |
| `/ProductosNacionales/:id`    | Detalle del producto       | 🌐 Pública        |
| `/Carrito`                    | Carrito de compras         | 🌐 Pública        |
| `/Contacto`                   | Equipo / contacto          | 🌐 Pública        |
| `/login`                      | Iniciar sesión             | 🌐 Pública        |
| `/registro`                   | Crear cuenta               | 🌐 Pública        |
| `/AltaProducto`               | Dashboard (gestión)        | 🔒 Solo admin     |

---

## 🚀 Instalación

El proyecto usa **pnpm** como gestor de paquetes.

```bash
# 1. Clonar el repositorio
git clone https://github.com/efileonardo-creator/ProyectoFinalReact.git
cd ProyectoFinalReact

# 2. Instalar dependencias
pnpm install

# 3. Iniciar el servidor de desarrollo
pnpm dev
```

Después abrí la dirección que aparece en la terminal (por defecto `http://localhost:5173`).

### Scripts disponibles

| Comando         | Descripción                                  |
|-----------------|----------------------------------------------|
| `pnpm dev`      | Inicia el servidor de desarrollo             |
| `pnpm build`    | Genera la versión de producción              |
| `pnpm preview`  | Muestra la versión de producción localmente  |
| `pnpm lint`     | Revisa el código con ESLint                  |

---

## 📁 Estructura del proyecto

```
📦 ProyectoFinalReact
 ┣ 📂 public
 ┃ ┣ 📂 data              → nosotros.json (datos del equipo)
 ┃ ┗ 📂 images            → Fotos del equipo
 ┣ 📂 src
 ┃ ┣ 📂 componentes
 ┃ ┃ ┣ 📂 carrito                → Vista del carrito
 ┃ ┃ ┣ 📂 formularioProductos    → Formulario de alta/edición
 ┃ ┃ ┣ 📂 gestion                → Dashboard de administración
 ┃ ┃ ┣ 📂 hooks                  → Hooks personalizados (useAuth, useCart, useSearch)
 ┃ ┃ ┣ 📂 inicio                 → Página de inicio
 ┃ ┃ ┣ 📂 layout                 → Header, Navbar, Footer y Layout
 ┃ ┃ ┣ 📂 login                  → Inicio de sesión
 ┃ ┃ ┣ 📂 mensaje                → Modales y alertas
 ┃ ┃ ┣ 📂 productosNacionales    → Catálogo y detalle del producto
 ┃ ┃ ┣ 📂 registros              → Registro de usuarios
 ┃ ┃ ┣ 📂 rutasProtegidas        → Protección de rutas por rol
 ┃ ┃ ┗ 📂 staff                  → Sección de contacto / equipo
 ┃ ┣ 📂 context
 ┃ ┃ ┣ 📜 AuthContext.jsx        → Usuario, login, registro y roles
 ┃ ┃ ┣ 📜 CarritoContext.jsx     → Estado y lógica del carrito
 ┃ ┃ ┗ 📜 SearchContext.jsx      → Estado de la búsqueda
 ┃ ┣ 📂 firebase
 ┃ ┃ ┗ 📜 config.js              → Configuración de Firebase
 ┃ ┣ 📜 App.jsx                  → Definición de rutas
 ┃ ┗ 📜 main.jsx                 → Punto de entrada
 ┣ 📜 index.html
 ┣ 📜 package.json
 ┗ 📜 vite.config.js
```

---

## 🛠️ Tecnologías

| Tecnología            | Uso                                              |
|-----------------------|--------------------------------------------------|
| **React 19**          | Interfaz de usuario                              |
| **Vite**              | Entorno de desarrollo y build                    |
| **React Router DOM**  | Navegación y rutas protegidas                    |
| **Context API**       | Estado global (autenticación, carrito, búsqueda) |
| **Tailwind CSS 4**    | Estilos y diseño responsive                      |
| **Firebase Auth**     | Registro e inicio de sesión                      |
| **Cloud Firestore**   | Base de datos de productos y usuarios            |
| **ImgBB API**         | Alojamiento de imágenes de productos             |
| **ESLint**            | Control de calidad del código                    |

---

## ✅ Requisitos de la consigna

- [x] Estructura clara y ordenada del proyecto
- [x] Estilos y diseño responsive con menú hamburguesa (Tailwind CSS)
- [x] Carrito de compra funcional (`CarritoContext`)
- [x] Autenticación: registro, login y autorización por rol (`AuthContext`)
- [x] CRUD completo en Firebase: mostrar, agregar, editar y eliminar productos
- [x] Rutas públicas (Inicio, Productos) y ruta protegida para administrador (Dashboard)
- [x] Detalle del producto: título, precio, descripción, imagen, stock y categoría
- [x] Carrito sin duplicados, con aumento, disminución y eliminación individual
- [x] Barra de búsqueda y paginación
- [ ] Sección de opiniones del producto _(opcional)_
- [ ] Deploy _(agregar enlace arriba)_

---

## 👤 Autor

Desarrollado por **[efileonardo-creator](https://github.com/efileonardo-creator)** como proyecto final del curso de React de **Talento Tech**.
