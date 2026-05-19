export const loginUser = (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123456") {
    return res.json({
      success: true,
      message: "Login Success",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Credentials",
  });
};