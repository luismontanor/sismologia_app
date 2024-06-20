### README para el Frontend (sismologia_app/README.md)

```markdown
# Sismología App - Frontend

Este proyecto es la parte del frontend de la aplicación web para monitorear y comentar sobre eventos sísmicos. Está desarrollado en React utilizando Vite.

## Características Principales

- **Frontend en React**: Interfaz de usuario moderna y reactiva.

## Configuración y Ejecución

1. **Clonar el repositorio**:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd sismologia_root/sismologia_app
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**:
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**:
   - Frontend: `http://localhost:5173`

> **Nota:** Para ejecutar correctamente la aplicación de React, asegúrate de que el backend esté en funcionamiento. Puedes encontrar el backend en la siguiente dirección: [sismologia_api](https://github.com/luismontanor/sismologia_api).

## Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para cualquier mejora o corrección.
```

### Contenido del archivo `.gitignore` (sismologia_app/.gitignore)

```plaintext
# dependencies
node_modules/

# testing
coverage/

# production
build/

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

Este archivo `.gitignore` asegurará que la carpeta `node_modules` y otros archivos innecesarios no sean incluidos en tu repositorio de Git.
