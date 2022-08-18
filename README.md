Intalación Del Proyecto

###!Nota: Instalar Python3.9, pip, XAMPP, git, npm y nodejs

------------------------------------------------------------------------------------
01 'Clonación Del Proyecto e instalacion de virtualenv'
------------------------------------------------------------------------------------
Paso 0:
Clonar el repositorio:

    git clone https://gitlab.com/p6956/manganiacos-web.git
------------------------------------------------------------------------------------
Paso 1:
Dentro del proyecto habra que isntalar un entorno virtual de desarrollo para python,
con el siguiente comando:

    pip install virtualenv
------------------------------------------------------------------------------------
Paso 2:
Una vez instalado Virtualenv vamos a verificar si quedo correctamente instalado con el
comando:

    pip freeze
------------------------------------------------------------------------------------
Paso 3:
Crear un entorno Virtual con Virtualenv
Una vez Instalado  Python tendremos que ejecutar siguiente comando:

    python -m virtualenv env
------------------------------------------------------------------------------------
02 'Activar el entorno virtual y ejecutar el proyecto'
------------------------------------------------------------------------------------
Paso 4:
Este comando anterior creará un directorio llamado env (o cualquier nombre que hayas
escogido) que contiene nuestro entorno virtual (básicamente un montón de archivos y
carpetas). Todo lo que queremos hacer ahora es iniciarlo ejecutando:

    Windows = env\Scripts\activate
    Linux = source env\bin\activate
------------------------------------------------------------------------------------
Paso 5:
Dentro de la carpeta procedemos a instalar las dependencias que necesitemos para que
funcione el proyecto con el siguiente comando:

    pip install -r requirements.txt
------------------------------------------------------------------------------------
Paso 6:
Ahora podemos ejecutar el proyecto con el siguiente comando:
    
    python manage.py runserver
------------------------------------------------------------------------------------
03 'Instalar ReactJS'
------------------------------------------------------------------------------------
Paso 7:
Instalar paquetes de npm con el siguiente comando:

    npm i


    npm start
    Inicia el servidor de desarrollo.

    npm run build
    Empaqueta la aplicación en archivos estáticos para la producción.

    Happy hacking!
------------------------------------------------------------------------------------