import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.set('json spaces', 2);


app.get('/', (req, res) => {
  res.send("Hello World")
});
app.get('/test/:type', (req, res) => {
  switch(req.params.type) {
    case 'json':
      const jsonFile = path.join(process.cwd(), 'public', 'app.json');
      const jsonStringify = fs.readFileSync(jsonFile, 'utf-8');
      res.json(jsonStringify);
      break;
    case 'html':
      const htmlFile = path.join(process.cwd(), 'public', 'app.html');
      const html = fs.readFileSync(htmlFile);
      res.send(html.toString());
      break;
    default:
      res.send('not found');
  }
  
})
app.use('/', (req, res) => {
  res.status(404);
  res.send("not found");
});
app.listen(port, () => {
  console.log('app is running on port' + port);
});
