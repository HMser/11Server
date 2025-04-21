const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3000;
const allowedDomains = ['live.statusarea.link','hshr.site','www.statusarea.link', 'statusarea.link','https://hshr-play.blogspot.com'];
//app.set('public', path.join(__dirname, 'public'));
// Middleware to check the Referer header
app.use((req, res, next) => {
    const referer = req.get('Referer');
    if (!referer || !allowedDomains.some(domain => referer.includes(domain))) {
        return res.send("You tried to access a page you did not have prior authorization for. <br>kindly visit <a href='https://www.statusarea.link'>www.statusarea.link</a>");
    
    }
    next();
});
 app.use((req, res, next) => {  
    res.setHeader('Cache-Control', 'no-store');  
    next();  
  }); 
app.use(express.static(path.resolve(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.set('public', path.join(__dirname, 'public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'ch.html'));
});
app.use((req, res) => {
  res.status(404).send('Currently not found...try again later');
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
