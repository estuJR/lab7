# Diferencias entre `http` nativo y Express

> **Curso:** Sistemas y Tecnologías Web
> **Laboratorio:** 7
> **Estudiante:** Javier Alvizures

---

## 📌 Contexto

En el Laboratorio 6 construí un servidor HTTP usando únicamente el módulo nativo
`http` de Node.js. Para este Laboratorio 7 migré ese mismo servidor a Express
manteniendo las mismas rutas y funcionalidad. Después de hacer la migración, estas
son las diferencias más importantes que noté entre ambos enfoques.

---

## 1. Manejo de rutas

Con `http` nativo, todas las peticiones caen en un solo callback gigante. Dentro de
ese callback hay que ir comparando manualmente `req.url` contra cada posible ruta
con `if (req.url === "/info")`, `if (req.url === "/saludo")`, etc. Cuando hay
muchas rutas, el archivo se vuelve un bloque enorme de condicionales.

Con Express, cada ruta se declara por separado con su propio método: `app.get("/info", ...)`,
`app.get("/saludo", ...)`. El método HTTP queda explícito en el código y cada
endpoint vive en su propio bloque, lo cual es mucho más legible.

## 2. Respuestas

En `http` nativo siempre tengo que escribir tres pasos: `res.writeHead(status, headers)`,
luego `res.end(contenido)`, y antes de eso convertir manualmente con `JSON.stringify()`
si quiero responder JSON. También hay que acordarse de incluir el header
`Content-Type: application/json; charset=utf-8` en cada respuesta JSON.

Express simplifica esto enormemente. Para responder JSON basta con `res.json(objeto)`
y Express se encarga de hacer el `stringify`, setear el header correcto y mandar el
status 200 por defecto. Si quiero un status distinto, encadeno `res.status(404).json({...})`.

## 3. Manejo de 404 y rutas no encontradas

En `http` nativo, el 404 era la última condición del callback principal: si ninguna
de las comparaciones de URL coincidía, caía al final y respondía 404. Funciona, pero
mezcla el "fallback" con la lógica de las demás rutas.

En Express, el 404 se maneja con un middleware al final: `app.use((req, res) => {...})`.
Si ninguna ruta declarada arriba hizo match, Express pasa la petición a ese middleware
y desde ahí respondo con 404. Esto separa claramente la lógica de rutas válidas de
la lógica de rutas inexistentes.

## 4. Lectura de archivos y async/await

Esta parte funciona casi igual en ambos enfoques porque sigo usando `fs/promises`
con `await`. La diferencia está en que con `http` nativo el callback principal
tenía que ser `async` para todas las rutas (aunque la mayoría no lo necesitaran),
mientras que en Express cada ruta es independiente y solo marco como `async`
las que realmente lo necesitan, como `/api/student`.

## 5. Ecosistema de middleware

Aunque en este laboratorio no usé middlewares de terceros, vale la pena mencionar
que Express tiene un ecosistema enorme de middlewares listos: `cors`, `helmet`,
`morgan`, `express.json()`, `express.urlencoded()`, etc. Cada uno se conecta con
una sola línea (`app.use(...)`) y agrega funcionalidad sin tener que escribirla
desde cero. Con `http` nativo, cualquier funcionalidad común (parsear body JSON,
loggear requests, manejar CORS) hay que implementarla a mano cada vez.

## 6. Cantidad de código

Comparando los dos archivos del Lab 6 y el Lab 7, el de Express quedó claramente
más corto. Las respuestas JSON pasaron de tres líneas (`writeHead` + `JSON.stringify`
+ `end`) a una sola con `res.json()`. Y el callback principal gigante se convirtió
en cinco bloques pequeños e independientes, uno por ruta.

---

## 🎯 Conclusión

El módulo `http` nativo es excelente para entender los fundamentos de cómo funciona
un servidor en Node.js, qué son los headers, cómo se construye una respuesta y cómo
se interpreta una URL. Es como aprender a manejar carro estándar antes de manejar
automático.

Express, en cambio, es la herramienta práctica del día a día. Ahorra muchísimo
código repetitivo, hace que el archivo sea más legible y permite enfocarse en la
lógica de negocio en vez de en los detalles del protocolo. Para cualquier proyecto
real en Node.js, Express (o un framework similar) es la elección obvia.

---

## ✍️ Autor

**Javier Alvizures**
Universidad del Valle de Guatemala — Ciencias de la Computación