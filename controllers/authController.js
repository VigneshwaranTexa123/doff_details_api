export const loginUser = (req, res) => {
  const { username, password } = req.body;

  // Default Static Login
  const defaultUsername = "admin";
  const defaultPassword = "123456";

  if (
    username === defaultUsername &&
    password === defaultPassword
  ) {
    return res.status(200).json({
      success: true,
      message: "Login Successful",
      user: {
        username: "admin",
        role: "Admin",
      },
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Username or Password",
  });
};