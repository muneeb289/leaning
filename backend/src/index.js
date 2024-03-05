const express = require("express");
const fs = require("fs");
const process = require("process");
const dotenv = require("dotenv");
const db = require("./dbconnection/dbconnection.js");
const cors = require('cors');
const bcrypt = require("bcrypt");
const RandomString = require("randomstring");
const SendMail = require("./utils/SendMail.js")
const { query, validationResult } = require('express-validator');



dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(
  cors(
    {
      origin: "http://192.168.43.243:3000",
      methods: ["GET", "POST"],
    }
  )
)

// con


app.post("/api/signup", async (req, res) => {
  const { User_Email, User_Password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(User_Password, 10);
    db.query(`INSERT INTO tbl_users (User_Email,User_Password,User_Password_Hash) VALUES ("${User_Email}","${User_Password}","${hashedPassword}");`, (err, result) => {
      if (err) {
        return res.json({ err })
      };
      if (result.insertId > 0) {
        const RandomTocken = RandomString.generate(100)
        // verification email will be send if successfully registered, but now this not working because SMTP not set yet.
        // const Verificatio_Subject = `Mail Verification`
        // const Verificatio_Content = `<p>Hi ${User_Email}, </br> Please <a href="http://192.168.43.243:3000/api/verifyEmail?tocken="${RandomTocken}">verify</a> your email.</p>`

        // SendMail(User_Email, Verificatio_Subject, Verificatio_Content);
        db.query(`INSERT INTO tbl_verification (User_ID,User_verification_code) VALUES ("${result.insertId}","${RandomTocken}"");`, (err, result) => {
          try {
            if (err) {
              console.log(err)
            } else {
              return res.json({ result })
            }
          } catch (error) {
            console.log(error)
          }
        })



        return res.json({ result })
      } else {
        return res.json({ msf: "User not registerd" })
      }
    })
  } catch (error) {
    console.log(`error from catch ${error}`)
    return res.status(500).send({ msg: `Internal Server Error ${error}` });
  }

});

app.post("/api/login", (req, res) => {
  const { User_Email, User_Password } = req.body;
  try {
    db.query(`SELECT * FROM tbl_users WHERE User_Email = '${User_Email}';`, (err, result) => {
      if (err) {
        return res.json({ err })
      }
      if (result.length > 0) {
        bcrypt.compare(User_Password, result[0].User_Password_Hash, () => {
          if (!passwordMatch) {
            return res.json({ msg: "Auth Failed" });
          } else {
            return res.json({ msg: `User found with ${User_Email}`, result: { User_Email: result[0].User_Email, Is_Admin: result[0].Is_Admin } })
          }
        });
      }
      else {
        return res.json({ msg: `User not found. please check username` })
      }
    })
  } catch (error) {
    // console.log(`error from catch ${error}`)
    return res
      .status(500)
      .json({ msg: `Internal Server Error from /api/login`, error: error });
  }
})


// // User login
// router.post('/login', async (req, res) => {
//   try {

//     const passwordMatch = await bcrypt.compare(password, user.password);
//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Authentication failed' });
//     }
//     const token = jwt.sign({ userId: user._id }, 'your-secret-key', {
//       expiresIn: '1h',
//     });
//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: 'Login failed' });
//   }
// });




app.listen(PORT, () => console.log(`server is runnig on port ${PORT}`))