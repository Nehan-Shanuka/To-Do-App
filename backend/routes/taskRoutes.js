import express from "express";
import { Task } from "../models/taskModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  console.log(req.query.date);
  let date = req.query.date;

  if (date === "") {
    date = undefined;
  }

  try {
    const tasks = await Task.find();

    if (date !== undefined) {
      // Parse the date to get the start and end of the day
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      // console.log(startOfDay, ", ", endOfDay);

      // Find tasks with dueDate within the specified date range
      const filteredTasks = await Task.find({
        dueDate: {
          $gte: startOfDay, /// $gte: greater than or equal to
          $lt: endOfDay /// $lt: less than
        }
      });
      return res.status(201).json(filteredTasks);
    }

    return res.status(201).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    const taskCreated = await Task.create(task);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, req.body);
        return res.status(201).json(task);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndDelete(id);
        return res.status(201).json(task);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default router;