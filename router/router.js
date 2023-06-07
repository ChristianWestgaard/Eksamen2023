const { Router } = require("express");//we need the express router to plug into applications
const controllerGen = require("../controllers/controllerGen"); //Send the general requests to the general controllers
const controllerUser = require("../controllers/controllerUser"); //Send the Login and signup requests to the appropriate controller
const { requireAuth, checkUser } = require("../middleware/authToken");
const router  = Router(); ///creates a new router

router.get("*", checkUser)

router.get("/", controllerGen.index_get);
router.post("/", controllerGen.index_post);

router.get("/hjelp", controllerGen.hjelp_get)

router.get("/signup", controllerUser.signup_get);
router.post("/signup", controllerUser.signup_post);

router.get("/login", controllerUser.login_get);
router.post("/login", controllerUser.login_post);

router.get("/logout", controllerUser.logout_get)

router.get("/item", requireAuth, controllerGen.item_get);
router.post("/item", requireAuth, checkUser, controllerGen.item_post);

router.get("/:email", requireAuth, controllerGen.user_get)

// GET request for displaying the text list
router.get('/edit', (req, res) => {
    res.render('edit', { Items });
});

// POST request to update the text
router.post('/edit', (req, res) => {
    const updatedText = req.body.editText;
    const textId = req.body.editTextId;

    // Find the index of the text in the array
    const index = texts.indexOf(textId);
    if (index !== -1) {
        // Update the text at the given index
        texts[index] = updatedText;
    }

    res.redirect('/list'); // Redirect back to the text list page
});

// POST request to delete the text
router.post('/delete', (req, res) => {
    const deletedText = req.body.deleteText;

    // Remove the text from the array
    texts = texts.filter(text => text !== deletedText);

    res.redirect('/list'); // Redirect back to the text list page
});

module.exports = router;


module.exports = router;