// Auth
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/env/development");
const axios = require("axios");

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRES_IN,
  });
};

// Generate OTP
function generate_otp(n) {
  var add = 1,
    max = 12 - add;
  if (n > max) {
    return generate_otp(max) + generate_otp(n - max);
  }
  max = Math.pow(10, n + add);
  var min = max / 10;
  var number = Math.floor(Math.random() * (max - min + 1)) + min;
  return ("" + number).substring(add);
}

// Send OTP_SMS
const sendotpsms = async (mobile, otp) => {
  const url = `https://japi.instaalerts.zone/httpapi/QueryStringReceiver?ver=1.0&key=85vPjHrgsW0K6eFPukkUyQ==&send=UCLDRY&dlt_entity_id=1201159246289472172&dest=${mobile}&text=${otp}%20this%20is%20your%20OTP%20for%20login%20to%20UClean.%20We%20love%20%28doing%29%20laundry%2C%20so%20you%20don%27t%20have%20to%21&dlt_template_id=1107161868825314691`;
  try {
    const response = await axios.get(url);
    // console.log(response);
  } catch (error) {
    console.error(error);
  }
};

// login
const login = async (req, res, next) => {
  try {
    // console.log(req.body);
    const { mobile, password } = req.body;
    const currentdatetime = new Date();

    if (!mobile || !password) {
      return res.status(400).json({
        message: "Either mobile or password is missing.",
        status: "warning",
      });
    }
    const check_runner = await Runners.findOne({ mobile });
    if (!check_runner) {
      return res.status(400).json({
        message: "No user found with the mobile.",
        status: "warning",
      });
    }

    const passwordMatch = await bcrypt.compare(password, check_runner.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "The password you entered is incorrect.",
        status: "warning",
      });
    }
    const token = generateToken(check_runner.id);
    await Runners.updateOne({ mobile: mobile }).set({
      token: token,
      updated_at: currentdatetime,
    });

    const runner = await Runners.findOne({ mobile });

    res.status(200).json({
      message: "Login successfully",
      status: "success",
      data: {
        runner,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong.",
      status: "failed",
    });
  }
};

// Send OTP
const sendOtp = async (req, res, next) => {
  try {
    const { mobile } = req.body;

    if (mobile == "") {
      return res.status(400).json({
        message: "Mobile is mandatory",
        status: "error",
      });
    }

    const runner = await Runners.findOne({ mobile });

    if (!runner) {
      return res.status(400).json({
        message: "No user found with the mobile number.",
        status: "errror",
      });
    }

    if (runner.password == "" || runner.password == null) {
      const otp = generate_otp(4);
      await sendotpsms(mobile, otp);

      const updateotp = await Runners.updateOne({ mobile: mobile }).set({
        otp: otp,
      });

      return res.json({
        message: "OTP has been sent on your mobile number",
        status: "success",
        isPassword: 0,
        otp: otp,
      });
    } else {
      return res.json({
        message: "Mobile number is registered with a password.",
        status: "error",
        isPassword: 1,
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong.",
      status: "failed",
    });
  }
};

// Verify OTP
const verifyOtp = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const runner = await Runners.findOne({ mobile: mobile });
    const currentdatetime = new Date();

    if (!runner) {
      return res.status(400).json({
        message: "Incorrect mobile number.",
        status: "error",
      });
    }

    if (runner.otp !== otp) {
      return res.status(400).json({
        message: "Incorrect OTP.",
        status: "error",
      });
    }
    const token = generateToken(runner.id);
    const updateToken = await Runners.updateOne({ mobile: mobile }).set({
      token: token,
      updated_at: currentdatetime,
    });

    if (!updateToken) {
      return res.status(400).json({
        message: "Token update unsuccessful",
        status: "error",
      });
    }

    const updatedRunner = await Runners.findOne({ mobile: mobile });

    return res.json({
      message: "OTP verified successfully",
      status: "success",
      data: {
        runner: updatedRunner,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};

// Set Password
const setPassword = async (req, res, next) => {
  try {
    const { mobile, password, confirmPassword } = req.body;
    const currentdatetime = new Date();
    if (password === confirmPassword) {
      const bcryptPassword = await bcrypt.hash(password, 12);
      const updatePassword = await Runners.updateOne(
        { mobile: mobile },
        { password: bcryptPassword },
        { updated_at: currentdatetime }
      );
      // console.log("Update password:", updatePassword);

      return res.status(200).json({
        status: "success",
        message: "Password set successfully",
      });
    } else {
      return res.status(400).json({
        message: "Passwords do not match",
        status: "error",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong",
      status: "failed",
    });
  }
};

// Validate Login
const validateLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const runner = await Runners.findOne({ token });
    return res.status(200).json({
      message: "Login verified",
      status: "success",
      data: {
        runner,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "something went wrong",
      status: "failed",
    });
  }
};

// self declaration
const selfDeclaration = async (req, res) => {
  try {
    const currentdatetime = new Date();
    const declaration = req.body;
    const token = req.headers.authorization.replace("Bearer ", "");

    await Runners.updateOne({ token: token }).set({
      declaration: declaration,
      updated_at: currentdatetime,
    });
    return res.status(200).json({
      status: "success",
      message: "Self-declaration saved successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

module.exports = {
  login,
  selfDeclaration,
  sendOtp,
  verifyOtp,
  setPassword,
  validateLogin,
};
