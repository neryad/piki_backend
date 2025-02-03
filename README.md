# Piki Backend

Este es el backend de la aplicación Piki, una API RESTful construida con Node.js y Express. La API proporciona endpoints para gestionar productos, roles, usuarios y más.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuir](#contribuir)
- [Licencia](#licencia)

## Instalación

1. Clona el repositorio:

   ```sh
   git clone https://github.com/tu-usuario/piki_backend.git
   cd piki_backend
   ```

2. Instala las dependencias:

   ```sh
   npm install
   ```

3. Crea un archivo [.env](http://_vscodecontentref_/0) en la raíz del proyecto con las siguientes variables de entorno:

   ```env
   TURSO_DATABASE_URL=tu_url_de_base_de_datos
   TURSO_AUTH_TOKEN=tu_token_de_autenticacion
   SECRETORPRIVATEKEY=tu_clave_secreta_jwt
   PORT=3000
   ```

4. Inicia el servidor en modo desarrollo:
   ```sh
   npm run dev
   ```

## Uso

Una vez que el servidor esté en funcionamiento, puedes acceder a la documentación de la API en `http://localhost:3000/api-docs`.

## Endpoints

### Autenticación

- `POST /auth/login`: Inicia sesión en la aplicación.
- `POST /auth/refresh-token`: Refresca el token de autenticación.

### Usuarios

- `POST /users`: Crear un nuevo usuario.
- `POST /users/userByEmail`: Obtener usuario por email.
- `GET /users/allUsers`: Obtener todos los usuarios.
- `GET /users/:id`: Obtener usuario por ID.
- `PUT /users/:id`: Actualizar usuario por ID.
- `DELETE /users/:id`: Eliminar usuario por ID.

### Roles

- `POST /roles`: Crear un nuevo rol.
- `GET /roles`: Obtener todos los roles.
- `DELETE /roles/:id`: Eliminar rol por ID.

## Estructura del Proyecto

```
└── 📁piki_backend
    └── 📁public
        └── 404.html
        └── welcome.html
    └── 📁src
        └── app.js
        └── 📁controllers
            └── 📁auth
                └── auth.js
            └── 📁helpers
                └── refres-token.js
            └── 📁materiales
                └── materials.js
            └── 📁roles
                └── 📁query
                    └── roles_query.js
                └── roles.js
            └── 📁users
                └── 📁querys
                    └── user_querys.js
                └── user.js
        └── 📁db
            └── db.js
            └── initdb.js
        └── 📁helpers
            └── jwt.js
            └── middleware.js
        └── 📁routes
            └── auth.js
            └── index.js
            └── items.js
            └── roles.js
            └── users.js
    └── .env
    └── .gitignore
    └── package-lock.json
    └── package.json
    └── README.md
```

## Contribuir

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -am 'Agrega nueva funcionalidad'`).
4. Sube tus cambios a tu fork (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
