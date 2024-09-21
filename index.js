require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

app.use(bodyParser.json());

app.use(cors());
url_list = [];
app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

app.post('/api/shorturl/',function(req,res){
  console.log(req.body)
  
  var url = req.body['url'];
  console.log(url)
  var isMatch = url.substr(0, 8) == 'https://' || url.substr(0, 7) == 'http://';
  if(URL.canParse(url) && isMatch)
  {url_list.push(url);
    console.log("pushed");
  res.json({ original_url : url, short_url : url_list.length})}
  else{
    res.json({error : "invalid url"});
  }
});

app.get('/api/shorturl/:url_num?',function(req,res){
  let url = url_list[req.params.url_num-1];
  console.log(url);
  res.redirect(url);
});
