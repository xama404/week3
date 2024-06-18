const express = require("express");
const path = require("path");
const { title } = require("process");

const app = express();
const port = 5000;

const data = [];

//app.set
//mendeskripsikan template engine apa yang dipakai
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "src/views"));

// ini untuk assets
app.use("/assets", express.static(path.join(__dirname, "src/assets")));
//midleware alat yg berfungsi memproses inputan dari form (request)
app.use(express.urlencoded({ extended: false }));

//routing
app.get("/", Home);
app.get("/blog", blog);
app.get("/add-blog", viewblog);
app.post("/add-blog", addBlog);
app.get("/blog-detail/:id", blogDetail);
app.get("/testimonial", testimonial);
app.get("/contact", contact);
function Home(req, res) {
  res.render("index");
}

function blog(req, res) {
  res.render("blog", { data });
}

function viewblog(req, res) {
  res.render("add-blog");
}

function addBlog(req, res) {
  const { title, content } = req.body;

  console.log("title: ", title);
  console.log("content: ", content);

  const dataBlog = { title, content };

  const uwu = data.unshift(dataBlog);

  console.log("uwu");

  res.redirect("blog");
}

function blogDetail(req, res) {
  const { id } = req.params;
  //const data = {id,title,content};

  const detail = data[id];
  res.render("blog-detail", { detail });
}

function testimonial(req, res) {
  res.render("testimonial");
}

function contact(req, res) {
  res.render("contact");
}

app.listen(port, () => {
  console.log(`server berjalan pada port ${port}`);
});
