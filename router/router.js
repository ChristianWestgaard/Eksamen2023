const { Router } = require("express");//we need the express router to plug into applications
const controllerGen = require("../controllers/controllerGen"); //Send the general requests to the general controllers
const controllerUser = require("../controllers/controllerUser"); //Send the Login and signup requests to the appropriate controller
const { requireAuth, checkUser } = require("../middleware/authToken");
const router  = Router(); ///creates a new router

router.get("*", checkUser)

router.get("/", controllerGen.index_get);
router.post("/", controllerGen.index_post);

router.get("/signup", controllerUser.signup_get);
router.post("/signup", controllerUser.signup_post);

router.get("/login", controllerUser.login_get);
router.post("/login", controllerUser.login_post);

router.get("/logout", controllerUser.logout_get)

router.get("/item", requireAuth, controllerGen.item_get);
router.post("/item", requireAuth, checkUser, controllerGen.item_post);

router.get("/:email", requireAuth, controllerGen.user_get)

module.exports = router;