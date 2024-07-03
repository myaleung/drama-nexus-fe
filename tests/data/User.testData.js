import mongoose from "mongoose";

export const ids = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const documents = [
  {
    _id: ids[0],
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
    _id: ids[1],
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