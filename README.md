# VISUALIZADOR DE PELÍCULAS
Este visualizador de películas, fue desarrollado como parte de una prueba técnica para ser desarrollador front-end. A continuación, se mostrará el paso a paso de instalación y configuración del proyecto para su correcto funcionamiento.

## Instalación
La forma recomendada para descargar los recursos de este proyecto en su máquina local, es crear una carpeta en la que se almacenará el proyecto y posteriormente en el bash de tu preferencia digitar el comando `git init`, posteriormente, escribir:

`git clone https://github.com/Santiago1010/cidenet.git prueba-santiago-correa`

> El comando anterior, creará una carpeta llamada 'prueba-santiago-correa' con la mayoría del código fuente necesario para el correcto funcionamiento.

### Instalar dependencias y módulos
Una vez descargado el código fuente, desde la misma terminal, ingresa a la carpeta ***prueba-santiago-correa*** de la siguiente forma: `cd  prueba-santiago-correa`. Una vez en la carpeta, procede a escribir el siguiente comando:

`npm install`
> Se iniciará un proceso de instalación de módulos y dependencias.

### Variables de entorno
Para poder utiliar **correctamente el consumo de la API utilizada en este proyecto**, es necesario agregar un ***`.env`*** a la **carpeta raíz**. Dentro del ***`.env`***, se escribirá la siguiente variable:

`VITE_API_KEY=`

> No obstante, **sólo por esta vez** se dejó el archivo ya creado (auque sigue sin valor).

#### Valor de la variable de entorno
Para obtener un valor aceptable para la **API**, es necesario realizar un proceso externo que consiste en registrarse en la [documentación oficial de la API de IMDb](https://imdb-api.com/ "documentación oficial de la API de IMDb"). Al registrarte, te darán una ***API KEY*** que será lo que pondrás como **valor** en la **variable de entorno** creada en el paso anterior.

Una vez realizados todos los pasos anteriores, podrás visualizar el proyecto de forma visual. Aún así, si no deseas descargar el código fuente y pasar por todo este proceso, recuerda que el proyecto se encuentra desplegado en .

# ¡¡NOTA SÚPER IMPORTANTE!!
Debido a que se trata de una API KEY gratuita, sólo permite realizar 100 consultas diarias, por lo que hay que tener cuidado con cuántas veces se puede probar.