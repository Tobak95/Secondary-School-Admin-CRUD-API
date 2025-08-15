const USER = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleRegister = async (req, res) => {
  //Accepts user details (e.g., name, email, password)
  const { fullName, email, phoneNumber, role, password } = req.body;

  try {
    //This function is checking if the user already exists in the dB

    const alreadyExistingUser = await USER.findOne({
      $or: [{ email: email || null }, { phoneNumber: phoneNumber || null }],
    });
    if (alreadyExistingUser) {
      res
        .status(400)
        .json({ message: "User with email or phone number already exists" });
    }

    //protecting user password. Hashes passwords using bcrypt before storing in the database.
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Validates data before saving.
    const user = await USER.create({
      fullName,
      email,
      phoneNumber,
      role: role || "user",
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, message: "user Registered Successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//handling log-in with the already registered unique email and password
const handleLogin = async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  //finding a user with a unique email
  try {
    const user = await USER.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Account not found, Please Register" });
    }

    if (user.role != role) {
      return res
        .status(403)
        .json({ success: false, message: "unauthorize access for this role" });
    }

    //checking if password is correct while the user is logging in
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //generate token  (validity, period) jwt would be used for authorization,
    //payload means the unique identification of the user
    //jsonwebtoken is used to sign the token, and its would be installed in the terminal as npm i jason web token
    const token = jwt.sign(
      { email: user.email, role: user.role, userId: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1 days",
      }
    );

    return res.status(200).json({
      token,
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleRegister,
  handleLogin,
};
