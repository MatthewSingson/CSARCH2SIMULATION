const express = require('express')
const app = express()



const port = process.env.PORT || 8080;
app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
//   homepage
})
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/css/icons', express.static(__dirname + '/node_models/bootstrap-icons/icons'))
app.listen(port, () => {
    console.log("Running on port " + port);
})