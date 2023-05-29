const { Router } = require("express");//we need the express router to plug into applications
const controllerGen = require("../controllers/controllerGen"); //Send the general requests to the general controllers
const controllerUser = require("../controllers/controllerUser"); //Send the Login and signup requests to the appropriate controller
const router  = Router(); ///creates a new router

router.get("/", controllerGen.index_get);
// router.post("/", controller.index_post);

router.get("/signup", controllerUser.signup_get);
// router.post("/signup", controller.signup_post);

router.get("/login", controllerUser.login_get);
// router.post("/logInn", controller.logInn_post);

router.get("/item", controllerGen.item_get);
router.post("/item", controllerGen.item_post);

module.exports = router;