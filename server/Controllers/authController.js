const User = require('../Models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const signup = async (req, res) => {
  const { name, email, password } = req.body
  if ((!name, !email, !password)) {
    return res.status(400).json({ msg: 'Please fill all the fields' })
  }
  // check the existing users
  const user = await User.find({ email })
  if (user?.length) {
    return res.status(400).json({ msg: 'user with this email already exists' })
  }

  // Create new user
  const newUser = await User.create({ name, email, password })
  res.status(200).json({
    status: 'success',
    msg: 'User created successfully! Now you can login',
    user: newUser,
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if ((!email, !password)) {
    return res
      .status(400)
      .json({ msg: 'Please provide both email and password' })
  }

  // check the user exist or not
  const user = await User.findOne({ email }).select('+password')

  // if user exists check the password
  const comparePassword = await bcrypt.compare(password, user.password)

  if (!user || !comparePassword) {
    return res.status(404).json({ msg: 'incorrect email or password' })
  }

  // create token
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

  // create cookie
  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
  })

  user.password = undefined

  res.status(200).json({
    status: 'success',
    token,
    user,
  })
}
const logout = async (req, res) => {
  // const cookies = req.cookies
  // if (!cookies?.jwt) {
  //   return res.status(204)
  // }
  // console.log(cookies)
  res.cookie('jwt', 'LoggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  })
  res.json({ status: 'success', msg: ' logout successfully' })
}

module.exports = { signup, login, logout }
