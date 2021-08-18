const jwt = require("jsonwebtoken");

// module.exports = function (req, res, next) {
//   const token = req.header("auth-token");
//   if (!token) return res.status(401).send("access denite");
//   try {
//     const verified = jwt.verify(token, process.env.SCRET_KEY);
//     req.user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("invaide user");
//   }
// };

module.exports = (req, res, next) => {
  if (!req.cookies)
    return res
      .status(401)
      .json({ status: "unauthorized", message: "cookies not found" });

  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({
      status: "unauthorized",
      message: "Access token is missing or invalid",
    });

  try {
    const decoded = jwt.verify(token, process.env.SCRET_KEY);
    req.user = decoded.data;
  } catch (err) {
    res.json({
      status: "error",
      message: err.message ? err.message : "Cookie expired",
    });

    return;
  }
  next();
};
