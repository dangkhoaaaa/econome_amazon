const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

mongoose
  .connect("mongodb+srv://sa:12345@cluster0.vuxjd0r.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log("Error connecting to MonggoDb", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");
const Order = require("./models/order");

//function to send Verification Email to the user
const sendVerificationEmail = async (email, verificationToken) => {
  // create a nodemailler transport object

  const transporter = nodemailer.createTransport({
    // configure the email service
    service: "gmail.com",
    auth: {
      user: "dangkhoa3348@gmai.com",
      pass: "hvejqjqwjqdgnqdx",
    },
  });
  //compose the email message
  const mailOptions = {
    from: "amazon.com",
    to: email,
    subject: "Email Verification",
    text: "Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}",
  };

  //send the email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("Error sending verification email", error);
  }
};

//endpoint to register in the app
app.port("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registerd" });
    }

    //create a new User
    const newUser = new User({ name, email, password });

    //generate and store the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    //save the user to the database
    await newUser.save();

    //save verification email to the user
    sendVerificationEmail(newUser.email, newUser.verificationToken);
  } catch (error) {
    console.log("error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

//endpoints to verify the email
app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    //Find the user with the given verification token
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }
    // Mark the user as verified
    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Email Verificationon Failed",
    });
  }
});
