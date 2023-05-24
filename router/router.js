const { Router } = require("express");//we need the express router to plug into applications
const controller = require("../controllers/controllerGen"); //exports our controller to get our functions
const router  = Router(); ///creates a new router

router.get("/", controller.index_get);
// router.post("/", controller.index_post);

// router.get("/signup", controller.signup_get);
// router.post("/signup", controller.signup_post);

// router.get("/logInn", controller.logInn_get);
// router.post("/logInn", controller.logInn_post);

// router.get("/minPokeSide", controller.minPokeSide_get)
// router.delete("/minPokeSide", controller.minPokeSide_delete)

module.exports = router;