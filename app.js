const express = require("express");
const bodyParser = require("body-parser");
// const notes = [{ content: "Learning web development" }];
const notes = [];

const app = express();

// Servir archivos estáticos desde la carpeta 'server'
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

const getFrontPageHtml = (noteCount) => {
  return `
    <! DOCTYPE html>
    <html>
      <head>
      </head>
      <body>
        <div class='container'>
          <p>number of notes created ${noteCount}</p>
          <a href='/notes'>notes</a>
          <img src='./assets/kuva.png' width='200' />
        </div>
      </body>
    </html>
`;
};

const getNotesPageHtml = () => {
  return `
   <!DOCTYPE html>
    <html>
    <head>
      <link rel="stylesheet" type="text/css" href="/assets/main.css" />
      <script type="text/javascript" src="/assets/main.js"></script>
    </head>
    <body>
      <div class='container'>
        <h1>Notes</h1>
        <div id='notes'>
        </div>
        <form action='/new_note' method='POST'>
          <input type="text" name="note"><br>
          <input type="submit" value="Save">
        </form>
      </div>
    </body>
    </html>
`;
};

app.get("/", (req, res) => {
  const page = getFrontPageHtml(notes.length);
  res.send(page);
});

app.get("/notes", (req, res) => {
  const page = getNotesPageHtml();
  res.send(page);
});

app.get("/data.json", (req, res) => {
  res.json(notes);
});

app.post("/new_note", (req, res) => {
  console.log(req.body);
  const { note } = req.body;
  notes.push({ content: note });
  console.log(notes)
  res.redirect('/notes')
});

app.listen(3000, () => console.log(`Running at 3000`));