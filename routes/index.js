var express = require("express");
var router = express.Router();
const axios = require("axios");



/* GET home page. */
router.get("/", async (req, res, next) => {
    let anuncios = [];
  axios
    .get("http://localhost:3000/apiv1/anuncios",{
        params: req.query
      })
    
    .then(httpResponse => {
      if (httpResponse.data && httpResponse.data.success) {
        anuncios = httpResponse.data.results;
      }
      res.render("index", { title: "Nodepop", anuncios: anuncios });
    })
    .catch(err => {
      res.render('error', {message: err, error: {status: 500}});
    });
 
});

module.exports = router;
