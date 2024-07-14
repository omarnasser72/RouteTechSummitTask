import { Schema } from "mongoose";
import Task from "./Task.js";

const listTaskSchema = Schema({
  items: [
    {
      textBody: {
        type: String,
        required: true,
      },
    },
  ],
});

export default Task.discriminator("ListTask", listTaskSchema);
