const router = require("express").Router();
const User = require("../models/register");
const bcrypt = require("bcrypt");
const notifier = require("node-notifier");
const jwt = require("jsonwebtoken");
const insert = require("../models/insert");
const getdata = require("../models/getdata");
const del = require("../models/delete");
//const update = require("../models/delete");
const verify = require("./verifytoken");

router.post("/register", async (req, res) => {
  //validate user unique or not.
  const validuser = await User.findOne({ email: req.body.email });
  if (validuser) return res.status(400).send("user alrady exits");

  //hashing password for security
  const salt = await bcrypt.genSalt(10);
  const psw = await bcrypt.hash(req.body.password, salt);

  //New user registration
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: psw,
  });
  try {
    const saveUser = await user.save();
    res.send(saveUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//login api
router.post("/login", async (req, res) => {
  //check email is present in database or not
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("email is not found");

  //check password is present in database or not
  const verifypass = await bcrypt.compare(req.body.password, user.password);
  if (!verifypass) return res.status(400).send("wrong password");

  //creat and assign token....
  // const token = jwt.sign({ _id: user._id }, process.env.SCRET_KEY);

  const token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 10 * 60, //seconds
      data: { _id: user._id },
    },
    process.env.SCRET_KEY
  );

  // res.header("auth-token", token).send(token);

  res.cookie("token", token, {
    maxAge: 60 * 10 * 1000, //miliseconds
    httpOnly: true,
  });

  res.status(200).send({
    status: "success",
    token,
  });
});

//Time table api
router.get("/create-table", (req, res) => {
  res.render("creattimetable");
});

router.post("/TimeTable-api", async (req, res) => {
  let data = {
    name: req.body.name,
    branch: req.body.branch,
    subjectname: [
      req.body.sn1,
      req.body.sn2,
      req.body.sn3,
      req.body.sn4,
      req.body.sn5,
      req.body.sn6,
      req.body.sn7,
      req.body.sn8,
      req.body.sn9,
    ],

    starttime: [
      req.body.st1,
      req.body.st2,
      req.body.st3,
      req.body.st4,
      req.body.st5,
      req.body.st6,
      req.body.st7,
      req.body.st8,
      req.body.st9,
    ],
    endtime: [
      req.body.et1,
      req.body.et2,
      req.body.et3,
      req.body.et4,
      req.body.et5,
      req.body.et6,
      req.body.et7,
      req.body.et8,
      req.body.et9,
      //e10: req.body.et10,
    ],
    links: [
      req.body.l1,
      req.body.l2,
      req.body.l3,
      req.body.l4,
      req.body.l5,
      req.body.l6,
      req.body.l7,
      req.body.l8,
      req.body.l9,
    ],
    lname: [
      req.body.n1,
      req.body.n2,
      req.body.n3,
      req.body.n4,
      req.body.n5,
      req.body.n6,
      req.body.n7,
      req.body.n8,
      req.body.n9,
    ],
    discriptions: [
      req.body.d1,
      req.body.d2,
      req.body.d3,
      req.body.d4,
      req.body.d5,
      req.body.d6,
      req.body.d7,
      req.body.d8,
      req.body.d9,
    ],

    Monday: [
      req.body.s1,
      req.body.s2,
      req.body.s3,
      req.body.s4,
      req.body.s5,
      req.body.s6,
      req.body.s7,
      req.body.s8,
      req.body.s9,
      //s10: req.body.s10,
    ],
    Tuesday: [
      req.body.s11,
      req.body.s12,
      req.body.s13,
      req.body.s14,
      req.body.s15,
      req.body.s16,
      req.body.s17,
      req.body.s18,
      req.body.s19,
      // s10: req.body.s10,
    ],
    Wednesday: [
      req.body.s21,
      req.body.s22,
      req.body.s23,
      req.body.s24,
      req.body.s25,
      req.body.s26,
      req.body.s27,
      req.body.s28,
      req.body.s29,
      //s10: req.body.s10,
    ],
    Thursday: [
      req.body.s31,
      req.body.s32,
      req.body.s33,
      req.body.s34,
      req.body.s35,
      req.body.s36,
      req.body.s37,
      req.body.s38,
      req.body.s39,
      //s10: req.body.s10,
    ],
    Friday: [
      req.body.s41,
      req.body.s42,
      req.body.s43,
      req.body.s44,
      req.body.s45,
      req.body.s46,
      req.body.s47,
      req.body.s48,
      req.body.s49,
      //s10: req.body.s10,
    ],
    Saturday: [
      req.body.s51,
      req.body.s52,
      req.body.s53,
      req.body.s54,
      req.body.s55,
      req.body.s56,
      req.body.s57,
      req.body.s58,
      req.body.s59,
      //s10: req.body.s10,
    ],
  };
  insert("timetable", data, res);
});
router.get("/TimeTable-api", async (req, res) => {
  getdata("timetable", res);
});
router.delete("/TimeTable-api", async (req, res) => {
  del(req.body.id, "timetable", res);
});
router.post("/del-table", async (req, res) => {
  del(req.body.id, "timetable", res);
});

module.exports = router;
