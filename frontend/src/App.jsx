import axios from "axios";
import { useEffect, useState } from "react";
import { MdDone } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import TaskEdit from "../components/TaskEdit.jsx";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import TaskAdd from "../components/TaskAdd.jsx";
import { IoMdAddCircleOutline } from "react-icons/io";

function App() {
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState({});
  const [typingDate, setTypingDate] = useState();
  const [searchDate, setsearchDate] = useState();
  const [showEditTask, setShowEditTask] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const fetchData = async () => {
    const response = await axios.get(`http://localhost:3000/tasks`);
    // console.log(response.data);
    setTasks(response.data);
  };

  const fetchSearchData = async () => {
    const response = await axios.get(
      `http://localhost:3000/tasks?date=${searchDate}`
    );
    // console.log(response.data);
    setTasks(response.data);
  };

  // calculate the width of the screen when the component mounts
  useEffect(() => {
    // Function to update the width state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchSearchData();
  }, [searchDate]);

  const handleCreateTask = () => {
    setShowAddTask(true);
  };

  const handleTaskEdit = (task_id) => {
    setActiveTask(filterTask(task_id)[0]);
    setShowEditTask(true);
  };

  const handleSearchDate = (date) => {
    setsearchDate(date);
    if (date === "") {
      fetchData();
    }
  };

  const handleTaskStatus = async (task_id, name, completed) => {
    console.log(task_id, name, completed);
    const response = await axios.put(`http://localhost:3000/tasks/${task_id}`, {
      completed: !completed,
    });
    console.log(response.data);
    fetchData();
  };

  const handleDeleteTask = async (task_id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/tasks/${task_id}`
      );
      console.log(response.data);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const filterTask = (task_id) => {
    return tasks.filter((task) => task._id === task_id);
  };

  const readableDueDate = (dueDate) => {
    if (dueDate) {
      return dueDate.substring(0, 10);
    } else {
      return "No due date";
    }
  };

  return (
    <div className="flex w-full h-screen bg-indigo-500 justify-center items-center">
      <div
        className={`${
          windowWidth <= 800 ? "w-3/5" : "w-2/5"
        } h-4/5 bg-white rounded-2xl flex flex-col pb-5`}
        // style={{ width: widthOfScreen < 768 ? "100%" : "50%" }}
      >
        <h1 className="flex-none text-3xl font-bold pt-5 pl-5">
          My To-Do List
        </h1>

        <div className="flex justify-between items-center px-5 pt-5 pb-4 gap-3">
          <input
            type="text"
            className="w-4/5 h-10 border border-gray-300 rounded-full px-5"
            placeholder="Task by Date (YYYY-MM-DD)"
            value={typingDate}
            onChange={(e) => setTypingDate(e.target.value)}
          />
          <button
            className="w-9 h-8 bg-blue-500 text-white rounded-full flex justify-center items-center"
            onClick={() => handleSearchDate(typingDate)}
          >
            <FaSearch />
          </button>
          <button
            className="w-9 h-8 bg-blue-500 text-white rounded-full flex justify-center items-center"
            onClick={() => handleCreateTask()}
          >
            <IoMdAddCircleOutline size={25} />
          </button>
          {showAddTask && (
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-90 bg-gray-900">
              <div
                className={`${
                  windowWidth < 768 ? "w-3/5" : "w-1/3"
                } p-5 rounded-3xl relative h-3/4 bg-teal-500`}
              >
                <button
                  className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
                  onClick={() => setShowAddTask(false)}
                >
                  <IoIosCloseCircleOutline size={25} />
                </button>
                <TaskAdd task={activeTask} />
              </div>
            </div>
          )}
        </div>

        <div
          className="flex-1 px-5 overflow-hidden overflow-y-auto pb-4"
          // hide scrollbar
          style={{ scrollbarWidth: "none", scrollBehavior: "smooth" }}
        >
          <ul>
            {tasks.map((task, index) => (
              <div key={index} className="flex-1 justify-between items-center">
                <li className="flex w-full my-2 gap-5 items-center p-4 bg-slate-300 rounded-2xl">
                  <div className="flex-1">
                    <div className="flex-row pr-5">
                      <span>{task.name}</span>
                      <span className="flex text-sm text-black text-opacity-50">
                        {/* {readableDueDate(task.dueDate)} */}
                        {task.details}
                      </span>
                    </div>
                  </div>
                  <div className="">
                    <span className="font-semibold text-black text-opacity-50">
                      {readableDueDate(task.dueDate)}
                    </span>
                  </div>

                  <div className="flex gap-4">
                    {task.completed ? (
                      <button
                        className="bg-green-500 text-white rounded-md w-6 h-6 flex justify-center items-center"
                        onClick={() =>
                          handleTaskStatus(task._id, task.name, task.completed)
                        }
                      >
                        <MdDone />
                      </button>
                    ) : (
                      <button
                        className="bg-white text-black rounded-md w-6 h-6 flex justify-center items-center"
                        onClick={() =>
                          handleTaskStatus(task._id, task.name, task.completed)
                        }
                      >
                        <IoMdTime />
                      </button>
                    )}

                    <button
                      className="bg-yellow-500 text-white rounded-md w-6 h-6 flex justify-center items-center"
                      onClick={() => handleTaskEdit(task._id)}
                    >
                      <MdEdit />
                    </button>
                    <button
                      className="bg-red-500 text-white rounded-md w-6 h-6 flex justify-center items-center"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </li>
                {showEditTask && (
                  <div className="fixed inset-0 flex items-center justify-center bg-opacity-90 bg-gray-900">
                    <div
                      className={`${
                        windowWidth < 768 ? "w-3/5" : "w-1/3"
                      } p-5 rounded-3xl relative h-3/4 bg-teal-500`}
                    >
                      <button
                        className="absolute top-3 right-3 bg-red-500 text-white w-8 h-8 rounded-full flex justify-center items-center"
                        onClick={() => setShowEditTask(false)}
                      >
                        <IoIosCloseCircleOutline size={25} />
                      </button>
                      <TaskEdit task={activeTask} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </ul>
        </div>
        <div className="flex-none p-"></div>
      </div>
    </div>
  );
}

export default App;
