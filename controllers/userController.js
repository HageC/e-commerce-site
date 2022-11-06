const getUsers = async (req, res) => {
  res.send("Get users");
};

const getUser = async (req, res) => {
  res.send("Get user");
};

const showUser = async (req, res) => {
  res.send("Show user");
};

const updateUser = async (req, res) => {
  res.send("Update user");
};

const updatePassword = async (req, res) => {
  res.send("Update password");
};

export { getUsers, getUser, showUser, updateUser, updatePassword };
