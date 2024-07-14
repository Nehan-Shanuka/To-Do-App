/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// // import AdapterDayjs from "@mui/x-date-adapter-dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import App from "../src/App";

/* eslint-disable react/prop-types */
function TaskAdd({ onTaskAdd }) {
  const [taskName, setTaskName] = useState("");
  const [taskDetails, setTaskDetails] = useState("");
  const [taskDueDate, setTaskDueDate] = useState("");

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      if (
        !taskName ||
        taskName === "" ||
        taskName === " " ||
        taskDueDate === ""
      ) {
        alert("Fill all the required fields");
        return;
      }
      console.log(taskName, taskDetails, taskDueDate);
      const response = await axios.post(`http://localhost:3000/tasks`, {
        name: taskName,
        completed: false,
        dueDate: taskDueDate,
        details: taskDetails,
      });
      console.log(response.data);
      onTaskAdd();
    } catch (error) {
      console.error(error);
    }
  };

  const today = dayjs();

  const handleDueDateChange = (newDateValue) => {
    console.log(newDateValue);
    const dateIntoJsDate = newDateValue.toDate();
    const dateISOString = dateIntoJsDate.toISOString();
    setTaskDueDate(dateISOString);
    console.log(taskDueDate);
  };

  return (
    <div className="h-full w-full bg-teal-500 rounded-lg">
      <div className="flex h-full w-full ">
        <div className="flex-1 px-6 rounded-xl">
          <h1 className="text-2xl text-zinc-700 font-bold text-center mb-5">
            ADD A TASK
          </h1>

          <form className="flex-1 space-y-6" onSubmit={handleCreateTask}>
            <div className="flex-col gap-5 justify-center items-center">
              <label
                htmlFor="task"
                className="block text-lg font-semibold text-gray-700"
              >
                Task Name :
              </label>
              <input
                type="text"
                id="task"
                name="task"
                placeholder="Add the task name"
                onChange={(e) => setTaskName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="task"
                className="block text-lg font-semibold text-gray-700"
              >
                Description :
              </label>
              <textarea
                id="task"
                name="task"
                placeholder="Add the task description"
                onChange={(e) => setTaskDetails(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
                style={{ resize: "vertical", overflowY: "auto" }}
              ></textarea>
            </div>

            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <div className="flex justify-between items-center w-full">
                    <label className="block text-sm font-medium text-black">
                      Due Date :
                    </label>
                    <DemoItem>
                      <DatePicker
                        defaultValue={today}
                        disablePast
                        value={dayjs(taskDueDate)}
                        onChange={(value) => handleDueDateChange(value)}
                        views={["year", "month", "day"]}
                        sx={{ backgroundColor: "white", borderRadius: "5px" }}
                      />
                    </DemoItem>
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="flex-1">
              <button
                type="submit"
                className="w-full flex-1 justify-center py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                CREATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskAdd;
