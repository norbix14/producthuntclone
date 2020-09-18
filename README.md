# Product Hunt Clone

Clon simple de **[Product Hunt](https://www.producthunt.com/ "Sitio oficial")**

Hecho usando **React**, **Next.js** y **Firebase**

## Snapshots

![Inicio](/snapshots/inicio.png "Todos los productos")

![Ver un producto](/snapshots/ver.png "Ver un producto")

![Agregar producto](/snapshots/agregar.png "Agregar producto")

![Eliminar producto](/snapshots/eliminar.png "Eliminar producto")

![Iniciar sesión](/snapshots/login.png "Iniciar sesión")

![Crear cuenta](/snapshots/crear-cuenta.png "Crear cuenta")

## Primeros pasos

Clonar repositorio

**`git clone <repository> --branch <master> <directory>`**

Instalar dependencias necesarias

**`npm i`**

Ver **[App](http://localhost:3000 "Modo de desarrollo")** en modo de desarrollo

**`npm run dev`**

## Este proyecto utiliza **[Firebase](https://firebase.google.com/ "Google Firebase")**

Son necesarias las credenciales de tu propia cuenta en Firebase

Colocarlas en **/firebase/config.js** o en el archivo **.env.local**

Ejemplo del archivo **.env.local**:

		API_KEY=api-key
		AUTH_DOMAIN=auth-domain
		DATABASE_URL=database-url
		PROJECT_ID=project-id
		STORAGE_BUCKET=storage-bucket
		MESSAGING_SENDER_ID=messaging-sender-id
		APP_ID=app-id

## Proyecto en modo de producción

Crear `build` de producción

**`npm run build`**

Crear carpeta `out`

**`npm run export`**

## Ver el proyecto en modo de produccion

Instalar `serve`

**`npm i -g serve`**

Ver **[App](http://localhost:5000 "Modo de producción")** en modo de produccion

**`serve -s out`**
