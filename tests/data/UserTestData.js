export const documents = [
  {
    _id: "ids1",
    name: {
      firstName: "Test",
      lastName: "User 1",
    },
    email: "email@email.com",
    password: "ABCDefg123!",
    role: "user",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "ids2",
    name: {
      firstName: "Test",
      lastName: "User 2",
    },
    email: "email2@email.com",
    password: "ABCDefg123!",
    role: "user",
    createdAt: new Date().toISOString(),
  },
];

export const loginData = {
  email: documents[0].email,
  password: documents[0].password,
};

export const registerData = {
  name: {
    firstName: "Test",
    lastName: "User 3",
  },
  email: "test@tests.co.uk",
  password: "ABCDefg123!",
};
