const express = require('express');
const app = express();
const port = 3001; // Puedes cambiar el puerto si lo deseas

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('RegulonDB MicroServices');
});

//microservice MEME
app.get('/meme/:collection/:tf/:file', (req, res) => {
  const {tf, file, collection} = req.params
  if (["ALL","SC"].find(col=>col===collection.toUpperCase())) {
    res.sendFile(__dirname + `/public/meme/${collection.toUpperCase()}/${tf}/${file}`);
  }else{
    res.send(`RegulonDB MicroServices, message error: collection no found ${collection}`);
  }
  
});

app.listen(port, () => {
  console.log(`El servidor está escuchando en el puerto ${port}`);
});