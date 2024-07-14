import { Schema } from "mongoose";
import Task from "./Task.js";

const textTaskSchema = Schema({
  textBody: {
    type: String,
    required: true,
  },
});

export default Task.discriminator("TextTask", textTaskSchema);
