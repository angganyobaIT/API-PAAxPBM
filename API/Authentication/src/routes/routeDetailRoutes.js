const express =
    require("express");

const router =
    express.Router();

const verifyToken =
    require("../middleware/auth");

router.use(
    verifyToken
);

const {

    createRouteDetail,

    getAllRouteDetails,

    getRouteDetailById,

    getRouteDetailsByThematicRoute,

} = require(
    "../controllers/routeDetailController"
);

// CREATE
router.post(
    "/",
    createRouteDetail
);

// GET ALL
router.get(
    "/",
    getAllRouteDetails
);

// GET BY THEMATIC ROUTE
router.get(
    "/thematic-route/:id",
    getRouteDetailsByThematicRoute
);

// GET BY ID
router.get(
    "/:id",
    getRouteDetailById
);

module.exports =
    router;