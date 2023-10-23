const port = process.env.PORT || 3000;
const cors = require("cors");
const express = require("express");
const connect = require("./database/connection");
const cookieParser = require("cookie-parser");
const routesUser = require("./routes/routeUser");
const routesCurso = require("./routes/routeCurso");
const routesTaller = require("./routes/routeTaller");

// TOKEN
const authenticateToken = require("./middleware/auth");

//Conectamos a la BD
connect();

//Creamos el enrutador
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); 
  //permite requests desde cualquier origen
  next(); 
});

//usamos cors para evitar errores de CORS
//usamos cors para evitar errores de CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


//importamos cookie parser
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Api Intecap Schedule!");
});

//usamos siempre el formato de JSON
app.use(express.json());

//Definimons las rutas
app.use("/api", routesUser);
app.use("/api", routesCurso);
app.use("/api", routesTaller);

//Iniciamos el servidor
app.listen(port, () => {
  console.log(`Server corriendo en: http://localhost:${port}`);
});
