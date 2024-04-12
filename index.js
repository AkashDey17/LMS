const express = require("express");
const app = express();
const nodeMailer = require("nodemailer");
const path = require("path");
const port = 8080;


app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/send-email", async (req, res) => {
 
  const { name, email, message } = req.body;

  let transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "akashdey1718@gmail.com",
      pass: "qwlb rain gxsv dgfu",
    },
  });

  let mailOptions = {
    from: "akashdey1718@gmail.com",
    to: "akashdeypersonal17@gmail.com",
    subject: "New Message from Your Website",
    text: `Name: ${name}\nEmail: ${email}\n`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Thank you for your email..Our team will contact to you shortly");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email");
  }
});








app.get("/", (req,res) => {
    res.render("index.ejs");
    
})
app.listen(port, () => {
    console.log(`App is listening to port ${port}`);
});
