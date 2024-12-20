import { useContext, useEffect, useRef, useState } from "react";
import { IoIosAdd, IoIosAddCircle } from "react-icons/io";
import { Reorder, motion } from "framer-motion";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { CiCalendar } from "react-icons/ci";
import { IoMdAlarm } from "react-icons/io";
import Task from "./Task";
import Select from "react-select";
import { toast, ToastContainer } from "react-toastify";
import useAxios from "../hooks/useAxios";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../Providers/AuthProvider";
import Loading from "../Home/Loading";
import { io } from "socket.io-client";
import { Helmet } from "react-helmet-async";

const AllTasksPage = () => {
  const options = [
    { value: "Most Important", label: "Most Important" },
    { value: "Important", label: "Important" },
    { value: "Normal", label: "Normal" },
  ];

  const [today, setToday] = useState();
  const [presentTime, setPresentTime] = useState();
  const [icon, setIcon] = useState(false);
  const [items, setItems] = useState([]);

  const [descripiton, setDescription] = useState();
  const [taskName, setTaskName] = useState();

  const changeDescription = (e) => {
    setDescription(e.target.textContent);
  };
  const changeTaskName = (e) => {
    setTaskName(e.target.textContent);
  };

  const mouseIn = () => {
    setIcon(true);
  };
  const mouseOut = () => {
    setIcon(false);
  };

  const { user } = useContext(AuthContext);
  const axiosSecure = useAxios();
  const queryClient = useQueryClient();

  const {
    data: tasks,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["Tasks"],
    initialData: [],
    queryFn: () =>
      axiosSecure.get(`/userTasksAll/${user?.uid}`).then((res) => {
        return res.data;
      }),
  });

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const timeRef = useRef(null);
  const dateRef = useRef(null);
  const reminderRef = useRef(null);
  const priorityRef = useRef(null);

  const addTask = () => {
    closeAddTask();
    const name = nameRef.current.textContent;
    const description = descriptionRef.current.textContent;
    const dueTime = timeRef.current.value;
    const reminderTime = reminderRef.current.value;
    const convertedDueDateTime = new Date(
      `${dateRef.current.value}T${dueTime}`
    );
    const dueDateTime = convertedDueDateTime.toUTCString();
    const convertedDueDate = new Date(dateRef.current.value);
    const dueDate = convertedDueDate.toDateString();
    const priority = priorityRef?.current?.props?.value?.value;
    const reminderDateTimeConvert = new Date(
      `${dateRef.current.value}T${reminderTime}`
    );
    const reminderDateTime = reminderDateTimeConvert.toUTCString();
    const status = "upcoming";
    const task = {
      uid: user?.uid,
      name,
      description,
      dueDateTime,
      dueDate,
      dueTime,
      priority,
      reminderDateTime,
      status,
    };
    if (!name) {
      toast.error("Task name required");
    } else {
      axiosSecure
        .post("/addUserTask", task)
        .then(() => {
          nameRef.current.textContent = "Task name";
          descriptionRef.current.textContent = "Description";
          toast.success("New Task Added");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  };

  const [addTaskSection, setAddTaskSection] = useState(false);

  const openAddTask = () => {
    if (addTaskSection) {
      setAddTaskSection(false);
    } else {
      setAddTaskSection(true);
    }
  };

  const closeAddTask = () => {
    setAddTaskSection(false);
  };

  const deleteTask = (id) => {
    document.getElementById(id + "main").style.display = "none";
    axiosSecure.delete(`/deleteUserTask/${id}`).then(() => {
      toast.success("Task has been deleted");
      document.getElementById(id + "delete").style.display = "none";
    });
  };

  const finishTask = (e, id) => {
    if (e.target.checked === true)
      axiosSecure
        .patch(`/checkTask/${id}`)
        .then(() => {
          document.getElementById(id + "main").style.display = "none";
          toast.success("Task completed");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
  };

  useEffect(() => {
    setItems(tasks);

    setInterval(() => {
      const date = new Date();
      setToday(date.toLocaleDateString());
      setPresentTime(date.toLocaleTimeString());
    }, 1000);
  }, []);

  useEffect(() => {
    const socket = io("https://todo-list-backend-ku5w.onrender.com", {
      withCredentials: true,
    });
    socket.connect();
    socket.on("getAllTasks", (newData) => {
      queryClient.setQueryData(["Tasks"], (oldData) => {
        return newData;
      });
    });
    return () => {
      socket.off("getAllTasks");
      socket.close();
    };
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <div className="w-10/12 mx-auto ">
      <Helmet>
        <title>All Tasks | Check It</title>
      </Helmet>
      <ToastContainer className="z-50" />
      <div className="flex mt-5 border-b border-white pb-3  justify-between">
        {today && presentTime ? (
          <div>
            <h1 className="">{today}</h1>
            <h1 className="font-sans text-xl font-bold">{presentTime}</h1>
          </div>
        ) : (
          <span className="loading loading-dots loading-md text-white"></span>
        )}
        <h1 className="text-3xl font-bold ">Pending Tasks</h1>
      </div>
      <div className="mt-5">
        <button
          onClick={openAddTask}
          className="flex items-center gap-2  text-md"
          onMouseEnter={mouseIn}
          onMouseLeave={mouseOut}
        >
          {icon ? (
            <IoIosAddCircle className="text-white text-2xl" />
          ) : (
            <IoIosAdd className="text-white text-2xl" />
          )}{" "}
          Add Task
        </button>
        <motion.div
          className={` flex-col gap-2 shadow-md rounded-md p-3 ${
            addTaskSection ? "flex" : "hidden"
          }`}
        >
          <label className="px-0 bg-transparent input outline-0 border-0 flex items-center gap-2 border-none outline-none focus-within:outline-none h-fit">
            <p
              contentEditable={true}
              suppressContentEditableWarning={true}
              className={`outline-none w-full cursor-text bg-transparent text-black font-bold  focus-within:before:content-none ${
                taskName
                  ? "text-white"
                  : "before:content-['Task_name'] text-black"
              }`}
              onInput={changeTaskName}
              ref={nameRef}
            ></p>
          </label>
          <label className="px-0 input bg-transparent  flex items-center gap-2  border-none outline-none focus-within:outline-none h-fit">
            <p
              contentEditable={true}
              ref={descriptionRef}
              suppressContentEditableWarning={true}
              className={`outline-none w-full cursor-text bg-transparent focus-within:before:content-none ${
                descripiton
                  ? "text-white"
                  : "before:content-['Description'] text-black"
              }`}
              onInput={changeDescription}
              name="taskName"
            ></p>
          </label>
          <div className="flex items-center gap-1">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 m-1"
              >
                Due Date
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg  rounded-box z-10 w-52 p-2 "
              >
                <div>
                  <label>Date</label> <br />
                  <input
                    type="date"
                    ref={dateRef}
                    className="bg-transparent w-full border p-2 outline-none focus-within:outline-none"
                  />
                </div>
                <div className="mt-2">
                  <label>Time</label> <br />
                  <input
                    type="time"
                    ref={timeRef}
                    className="bg-transparent w-full border p-2 outline-none focus-within:outline-none"
                  />
                </div>
              </ul>
            </div>

            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 m-1"
              >
                Reminder
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg  rounded-box z-[1] w-52 p-2 "
              >
                <div className="mt-2">
                  <label>Time</label> <br />
                  <input
                    type="time"
                    ref={reminderRef}
                    className="w-full border p-2 outline-none focus-within:outline-none bg-transparent"
                  />
                </div>
              </ul>
            </div>
            <Select
              options={options}
              placeholder="Priority"
              className="text-black"
              ref={priorityRef}
            />
          </div>
          <div className="flex w-full justify-end gap-3">
            <button
              className="btn bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 "
              onClick={addTask}
            >
              Add Task
            </button>
            <button
              className="btn bg-red-500 text-white"
              onClick={closeAddTask}
            >
              Cancel
            </button>
          </div>
        </motion.div>
        <Reorder.Group
          axis="y"
          values={items}
          onReorder={setItems}
          className="mt-5 flex flex-col gap-5 w-full"
        >
          {tasks?.map((item) => (
            <Reorder.Item
              id={item._id + "main"}
              key={item._id}
              value={item}
              className="flex gap-2 w-full shadow-md border-black pb-2"
            >
              <Task id={item._id} task={item} />
              <div className="form-control">
                <label className="cursor-pointer label">
                  <input
                    type="checkbox"
                    defaultChecked={false}
                    onClick={(e) => finishTask(e, item._id)}
                    className="checkbox rounded-full"
                  />
                </label>
              </div>
              <div className="w-full" role="button">
                <div className="flex justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <h1 className="font-bold">{item.name}</h1>
                  </div>
                  <div className="flex gap-4 items-center text-2xl pe-5">
                    <div
                      className="tooltip"
                      data-tip="Edit Task"
                      onClick={() => {
                        document.getElementById(item._id)?.showModal();
                      }}
                    >
                      <CiEdit className="text-yellow-600" />
                    </div>
                    <div className="tooltip" data-tip="Delete Task">
                      <MdDelete
                        className="text-red-500"
                        onClick={() =>
                          document
                            .getElementById(item._id + "delete")
                            .showModal()
                        }
                      />
                      <dialog
                        id={item._id + "delete"}
                        className="modal modal-bottom sm:modal-middle "
                      >
                        <div className="modal-box  bg-gradient-to-r from-indigo-400 to-cyan-400 ">
                          <h3 className="font-bold text-lg">
                            Are you sure you want to delete this task?
                          </h3>
                          <p className="py-2"></p>
                          <div className="modal-action ">
                            <form
                              method="dialog"
                              className="flex justify-center w-full gap-5"
                            >
                              <button
                                className="btn bg-red-500 text-white border-none"
                                onClick={() => deleteTask(item._id)}
                              >
                                Delete
                              </button>
                              <button className="btn">Cancel</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </div>
                  </div>
                </div>
                <p className="">{item.description}</p>

                <div className="flex gap-4 items-center">
                  <div className="tooltip" data-tip="Due date">
                    <div className="flex items-center gap-1">
                      <CiCalendar />
                      <p className="text-sm mt-1">
                        {item?.dueDate === "Invalid Date"
                          ? "No selected"
                          : item?.dueDate}
                      </p>
                    </div>
                  </div>
                  <div className="tooltip" data-tip="Due Time">
                    <div className="flex items-center gap-1">
                      <IoMdAlarm />
                      <p className="text-sm mt-1">
                        {item?.dueTime === "" ? "No selected" : item?.dueTime}
                      </p>
                    </div>
                  </div>
                  <h1 className="text-sm mt-1">
                    Priority: {item?.priority ? item?.priority : "Not Selected"}
                  </h1>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </div>
    </div>
  );
};

export default AllTasksPage;
