# iseazyhirsch

El desarrollo consiste en la implementación de la consigna solicitada: una ventana modal en la que el usuario, como estudiante, mantiene una conversación con su tutor. Además, sumamos una primera pantalla Home con un listado de Cards de "Tareas" o "Tasks", para que desde allí accedan a los mensajes correspondientes a cada una de estas tareas.

Aunque no se requería implementar consumo de Apis, se crearon tres archivos JSON que representan, cada uno, una colección de datos para simular el consumo de una base de datos de tipo NoSql. Las colecciones son:
"tasks" (con data general sobre cada Tarea), 
"versions" (con la data general de cada versión de una tarea), 
y "messages" (con la data correspondiente a los mensajes), y ya vienen con data Hardcodeada.
El consumo de estos archivos JSON se realiza con Fetch, desde el Store de Pinia correspondiente (se creó un Store para cada colección: tasks, versions, messages).
Asimismo, para conservar el State y simular la interacción con una base de datos, se implementó el uso de LocalStorage.

En cuanto a las tecnologías, además de utilizar las requeridas (Vite, Vue 3, Pinia y TailwindCSS), sumamos las librerías Flowbite y Flowbite-Vue (y los íconos Heroicons) para una implementación más agil de componentes basados en TailwindCSS, tales como el Modal, las Cards, y otros.

Para mayor descripción sobre la lógica del desarrollo, se comentó diversas partes del código.

La App ya se puede ver en producción en la siguiente url:
https://leopruebas.com.ar/iseazy/

## Stack de Tecnologías
-Vite
-Vue 3,
-Pinia
-TailwindCSS
-Flowbite / Flowbite-Vue
-Heroicons

## Estructura de carpetas y archivos principales
-"src": es la carpeta principal del desarrollo. Dividida a su vez en:
-> "assets": contiene archivo main.css, que enlaza con TailwindCSS
-> "components": contiene los diversos componentes Vue de la App. 
-> "helpers" -> contiene archivos con funciones JS reutilizables.
-> "router" -> contiene el router de Vue.
-> "stores" -> contiene los Stores de Pinia
-> "views" -> contiene el archivo Home, y en caso de agregar más secciones a la App se incluirían aquí.

-"public": contiene carpeta "img" (con los avatars para el chat) y "db" (los archivos JSON)


## Instalacion

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
