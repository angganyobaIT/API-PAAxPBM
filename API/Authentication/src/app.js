const express = require("express");

const cors = require("cors");

const authRoutes =
    require("./routes/authRoutes");

const {
    swaggerUi,
    specs,
} = require("./docs/swagger");

const app = express();
const userRoutes =
    require("./routes/userRoutes");

app.use(cors());

app.use(express.json());


// swagger
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);


// routes
app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/users",
    userRoutes
);
module.exports = app;