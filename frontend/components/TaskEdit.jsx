/* eslint-disable no-unused-vars */
import axios from "axios";
import { useState } from "react";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

/* eslint-disable react/prop-types */
function TaskEdit({ task }) {
  const [taskName, setTaskName] = useState(task.name);
  const [taskCompleted, setTaskCompleted] = useState(task.completed);
  const [taskDueDate, setTaskDueDate] = useState("");
  const [taskDetails, setTaskDetails] = useState(task.details);

  const handleUpdateTask = async () => {
    console.log(task._id, taskName, taskCompleted);
    try {
      const response = await axios.put(
        `http://localhost:3000/tasks/${task._id}`,
        {
          name: taskName,
          completed: taskCompleted,
          dueDate: taskDueDate,
          details: taskDetails,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDueDateChange = (newDateValue) => {
    const dateIntoJsDate = newDateValue.toDate();
    const dateISOString = dateIntoJsDate.toISOString();
    setTaskDueDate(dateISOString);
    console.log(taskDueDate);
  };

  return (
    <div className="h-full w-full bg-teal-500 rounded-lg">
      <div className="flex h-full w-full ">
        <div className="flex-1 px-6 py-8 rounded-xl">
          <h1 className="text-2xl text-zinc-700 font-bold text-center mb-5">
            EDIT THE TASK
          </h1>

          <form className="flex-1 space-y-4">
            <div className="flex-col gap-5 justify-center items-center">
              <label
                htmlFor="task"
                className="block text-sm font-medium text-black"
              >
                Task Name :
              </label>
              <input
                type="text"
                id="task"
                name="task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label
                htmlFor="task"
                className="block text-sm font-medium text-black"
              >
                Description :
              </label>
              <textarea
                id="task"
                name="task"
                value={taskDetails}
                onChange={(e) => setTaskDetails(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                rows="4"
                style={{ resize: "vertical", overflowY: "auto" }}
              ></textarea>
            </div>

            <div className="w-full">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <div className="flex justify-between items-center w-full">
                    <label className="block text-sm font-medium text-black">
                      Due Date :
                    </label>
                    <DemoItem>
                      <DatePicker
                        disablePast
                        value={dayjs(task.dueDate)}
                        onChange={(value) => handleDueDateChange(value)}
                        views={["year", "month", "day"]}
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "5px",
                          width: "100%",
                        }}
                      />
                    </DemoItem>
                  </div>
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div className="flex gap-5 justify-between items-center">
              <label
                htmlFor="completed"
                className="block text-sm font-medium text-black"
              >
                Completed :
              </label>
              <input
                type="checkbox"
                id="completed"
                name="completed"
                defaultChecked={task.completed}
                onChange={(e) => setTaskCompleted(e.target.checked)}
                className="block w-6 h-6"
              />
            </div>

            <div className="flex-1">
              <button
                type="submit"
                onClick={handleUpdateTask}
                className="w-full flex-1 justify-center py-2 px-4 mt-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskEdit;