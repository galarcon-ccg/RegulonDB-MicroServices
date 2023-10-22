const express = require('express');
const app = express();
const port = 3002; // Puedes cambiar el puerto si lo deseas
const fs = require('fs');
const path = require('path');
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/ms', (req, res) => {
  res.send('RegulonDB MicroServices');
});


app.get('/ms/meme/:collection?/:tf?/:file?', (req, res) => {

  const nameDir = "MEME"
  let dir = './public/meme/';
  const { collection, tf, file } = req.params
  if (collection === undefined) {
    showDirectory(res, dir, nameDir, "./meme/")
  } else {
    if (["ALL", "SC"].find(col => col === collection.toUpperCase())) {
      dir += collection+"/"
      if (tf === undefined) {
        showDirectory(res, dir, nameDir, "./" + collection.toUpperCase() + "/")
      } else {
        dir += tf+"/"
        fs.access(dir, fs.constants.F_OK, (err) => {
          if (err) {
            console.error("error: ", err);
            res.status(404).send(`RegulonDB MicroServices, message error: TF no found ${tf}`);
          } else {
            if (file) {
              res.sendFile(__dirname + `/public/meme/${collection.toUpperCase()}/${tf}/${file}`);
            }else{
              showDirectory(res, dir, nameDir, "./" + tf + "/")
            }
          }
        });
      }
    } else {
      res.status(404).send(`RegulonDB MicroServices, message error: collection no found ${collection}`);
    }
  }

});

/*
if (collection) {
    if (["ALL", "SC"].find(col => col === collection.toUpperCase())) {
      dir += collection.toUpperCase() + "/"
      url = "./" + collection.toUpperCase() + "/"
      if (tf) {
        dir += tf
        url = "./" + tf + "/"
        
      }
    } else {
      res.status(404).send(`RegulonDB MicroServices, message error: collection no found ${collection}`);
    }
  }
fs.access(dir, fs.constants.F_OK, (err) => {
          if (err) {
            console.error("error: ", err);
            res.status(404).send(`RegulonDB MicroServices, message error: TF no found ${tf}`);
          } else {
            if (file) {
              console.log("hola",url);
              
              return
            }
          }
        });
*/

function showDirectory(res, dir, nameDir, url) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      console.error('Error al leer el directorio:', err);
      res.status(500).send('Error al leer el directorio');
    } else {
      res.render('dir', { nameDir, files, url });
    }
  });
}

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});