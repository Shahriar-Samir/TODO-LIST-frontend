import React, { useContext, useEffect, useRef, useState } from "react";
import { FaBars, FaHamburger, FaSearch } from "react-icons/fa";
import { IoIosAdd, IoIosAddCircle } from "react-icons/io";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import { IoMdNotifications } from "react-icons/io";
import { Tooltip, useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { AuthContext } from "../Providers/AuthProvider";
import { toast } from "react-toastify";
import Select from "react-select";
import useAxios from "../hooks/useAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading2 from "../Home/Loading2";
import Footer from "../Components/Footer";
import io from "socket.io-client";

const Dashboard = () => {
  const { user, logout, setLoading, loading } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: notificationsLength, isFetching: notiFetching } = useQuery({
    queryKey: ["notiLen"],
    queryFn: () =>
      axiosSecure.get(`/userNotiLengths/${user?.uid}`).then((res) => {
        return res.data;
      }),
  });

  const navigate = useNavigate();

  useEffect(() => {
    const socket = io("https://todo-list-backend-ku5w.onrender.com", {
      withCredentials: true,
    });
    socket.connect();
    socket.on("notificationsLength", (newData) => {
      queryClient.setQueryData(["notiLen"], (oldData) => {
        return newData;
      });
    });
    return () => {
      socket.off("notificationsLength");
      socket.close();
    };
  }, []);

  const axiosSecure = useAxios();

  const { data, isFetching } = useQuery({
    queryKey: ["amounts"],
    queryFn: () =>
      axiosSecure.get(`/userTasksAmounts/${user?.uid}`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    const socket = io("https://todo-list-backend-ku5w.onrender.com", {
      withCredentials: true,
    });
    socket.connect();
    socket.on("amounts", (newData) => {
      queryClient.setQueryData(["amounts"], (oldData) => {
        return newData;
      });
    });
    return () => {
      socket.off("amounts");
      socket.close();
    };
  }, []);

  const options = [
    { value: "Most Important", label: "Most Important" },
    { value: "Important", label: "Important" },
    { value: "Normal", label: "Normal" },
  ];

  const md = useMediaQuery("(min-width:768px)");

  const [descripiton, setDescription] = useState();
  const [taskName, setTaskName] = useState();

  const changeDescription = (e) => {
    setDescription(e.target.textContent);
  };
  const changeTaskName = (e) => {
    setTaskName(e.target.textContent);
  };

  const [navbar, setNavbar] = useState(md);

  const openNavbar = (e) => {
    e.stopPropagation();
    if (md === false) {
      setNavbar(true);
    }
    if (navbar === false) {
      setNavbar(true);
    }
  };
  const closeNavbar = (e) => {
    if (navbar === true && md === true) {
      setNavbar(true);
    }
    if (md === false && navbar === true) {
      setNavbar(false);
    }
  };
  const signOut = () => {
    logout()
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        toast.error("Something went wrong");
      });
  };
  const nameRef = useRef();
  const descriptionRef = useRef();
  const dateRef = useRef();
  const timeRef = useRef();
  const priorityRef = useRef();
  const reminderRef = useRef();

  const addTask = () => {
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
          descriptionRef.current.textContent = "description";
          nameRef.current.textContent = "task name";
          toast.success("New Task Added");
        })
        .catch(() => {
          toast.error("Something went wrong");
        });
    }
  };

  const search = (e) => {
    e.preventDefault();
    const form = e.target;
    const queryData = form.query.value;
    navigate(`/app/search?uid=${user.uid}&query=${queryData}`);
  };

  if (isFetching || notiFetching) {
    return <Loading2 />;
  }

  return (
    <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-white ">
      <div className="drawer lg:drawer-open flex">
        <motion.div
          initial={{ x: -600 }}
          animate={{ x: navbar === true ? 0 : -600 }}
          transition={{ ease: "easeIn" }}
          className="w-3/4 md:w-2/4 lg:w-1/4 h-[100vh] absolute md:static z-30 md:block overflow-hidden shadow-xl"
        >
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul
            className={`flex flex-col ${
              md
                ? "bg-transparent"
                : "bg-gradient-to-r from-indigo-400 to-cyan-400 "
            } gap-4 p-4 w-full h-full text-white border-[#e2e2e2] `}
          >
            <div className="flex w-full justify-center items-center flex-col">
              <div className="w-full flex justify-end">
                <IoClose
                  className="text-white text-3xl md:hidden"
                  onClick={closeNavbar}
                />
              </div>
              <motion.div
                initial={{ scale: 0, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  ease: "easeIn",
                  type: "spring",
                  damping: 5,
                }}
                className="flex justify-center items-center gap-5"
              >
                <img src="/logos/cover.png" className="w-[50px]" />
                <h1 className="font-bold text-3xl">Check It</h1>
              </motion.div>
            </div>
            {/* Sidebar content here */}
            <form
              onSubmit={search}
              className="text-white mt-3 flex justify-between rounded-lg relative w-full bg-transparent border border-white"
            >
              <input
                className="p-2 outline-0 rounded-lg w-full  bg-transparent placeholder:text-gray-200"
                name="query"
                placeholder="search tasks"
              />
              <button>
                {" "}
                <FaSearch className="absolute top-3 right-2 " />
              </button>
            </form>
            <li
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              <button className="flex items-center gap-2 text-md btn bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500  w-full">
                {" "}
                Add Task <IoIosAddCircle className="text-2xl" />
              </button>
            </li>
            <NavLink
              to="/app/allTasks"
              className={({ isActive }) =>
                isActive
                  ? `btn bg-transparent border-none shadow-md hover:bg-transparent text-white rounded-lg text-sm flex justify-normal w-full underline shadow-blue-200`
                  : `btn bg-transparent border-none shadow-md hover:bg-transparent text-white rounded-lg text-sm flex justify-normal w-full `
              }
            >
              <div className="flex justify-between w-full">
                <p>All Task</p>
                <div className="badge text-xs">{data.allTasksLength}</div>
              </div>
            </NavLink>
            <NavLink
              to="/app/today"
              className={({ isActive }) =>
                isActive
                  ? `btn bg-transparent border-none shadow-md hover:bg-transparent text-white rounded-lg text-sm flex justify-normal w-full underline shadow-blue-200`
                  : `btn bg-transparent border-none shadow-md hover:bg-transparent text-white rounded-lg text-sm flex justify-normal w-full `
              }
            >
              <div className="flex justify-between w-full">
                <p>Today</p>
                <div className="badge text-xs">{data.todayTasksLength}</div>
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive
                  ? `btn bg-transparent border-none shadow-md hover:bg-transparent text-white rounded-lg text-sm flex justify-normal w-full border border-white underline shadow-blue-200`
                  : `btn bg-transparent border-none shadow-md hover:bg-transparent text-white rounded-lg text-sm flex justify-normal w-full border border-transparent `
              }
              to="/app/events"
            >
              Events
            </NavLink>
          </ul>
        </motion.div>
        <div
          className="w-full md:w-3/4 overflow-auto h-[100vh] overflow-x-hidden"
          onClick={closeNavbar}
        >
          <motion.nav
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="flex justify-end items-center  px-5 py-3 gap-5 top-0 sticky z-10"
          >
            <div className="flex justify-end items-center rounded-2xl border border-[#e2e2e2] shadow-md px-5 py-3 gap-5">
              <FaBars onClick={openNavbar} className="md:hidden" />
              <Tooltip title="Notifications">
                <Link
                  to="/app/notifications"
                  className="flex items-center relative w-[50px]"
                >
                  <IoMdNotifications className="text-2xl text-blue-400" />
                  <div className="badge bg-red-500 text-white font-bold absolute right-1 top-0 p-1">
                    {notificationsLength?.notiLen}
                  </div>
                </Link>
              </Tooltip>
              <div className="dropdown">
                <Tooltip title={user?.displayName}>
                  <div tabIndex={0} role="button" className="m-1">
                    <img
                      src={user?.photoURL ? user.photoURL : "/logos/user.png"}
                      className="w-[50px] h-[50px] object-cover rounded-full border-2 border-blue-500 outline-none"
                    />
                  </div>
                </Tooltip>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-box z-[1] w-52 p-2 shadow right-0 mt-2"
                >
                  <li>
                    <Link to={`/app/profile`}>Profile</Link>
                  </li>
                  {loading ? (
                    <li>
                      <a className="font-bold">
                        <span className="loading loading-spinner loading-md"></span>
                      </a>
                    </li>
                  ) : (
                    <li onClick={signOut}>
                      <a className="font-bold">Logout</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </motion.nav>
          <div className="min-h-[100vh]">
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
      <dialog
        id="my_modal_5"
        className="modal w-11/12 mx-auto modal-bottom sm:modal-middle"
      >
        <div className="modal-box p-0 bg-transparent h-full shadow-none flex justify-center items-start flex-col w-full">
          <div className="flex flex-col gap-2 border rounded-xl p-3 bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white w-full">
            <div className="flex w-full justify-between items-center bg-transparent">
              <label className="px-0 input outline-0 border-0 flex items-center gap-2 border-none outline-none focus-within:outline-none h-fit bg-transparent">
                <p
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                  ref={nameRef}
                  className={`outline-none w-full max-w-[250px] cursor-text  font-bold text-white  focus-within:before:content-none ${
                    taskName ? "" : " before:content-['Task_name']"
                  }`}
                  onInput={changeTaskName}
                ></p>
              </label>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="text-2xl">
                  <IoClose />
                </button>
              </form>
            </div>
            <label className="px-0 input  flex items-center gap-2  border-none outline-none focus-within:outline-none h-fit bg-transparent">
              <p
                contentEditable={true}
                suppressContentEditableWarning={true}
                ref={descriptionRef}
                className={`outline-none w-full text-white bg-transparent cursor-text  focus-within:before:content-none ${
                  descripiton ? "" : "before:content-['Description']"
                }`}
                onInput={changeDescription}
              ></p>
            </label>
            <div className="flex items-center gap-3">
              <div className="dropdown ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500"
                >
                  Due Date
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white rounded-box z-30 w-52 p-2 shadow"
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
                      className=" bg-transparent w-full border p-2 outline-none focus-within:outline-none"
                    />
                  </div>
                </ul>
              </div>

              <div className="dropdown ">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn m-1 bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500"
                >
                  Reminder
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg rounded-box z-[30] w-52 p-2  right-0"
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
                ref={priorityRef}
                options={options}
                className="text-sm text-black"
              />
            </div>
            <div className="flex w-full justify-end gap-3">
              <form method="dialog">
                <button
                  className="btn bg-gradient-to-r from-indigo-400 to-cyan-400 border-none text-white shadow-lg hover:bg-gradient-to-r hover:from-indigo-500 hover:to-cyan-500 "
                  onClick={addTask}
                >
                  Add Task
                </button>
              </form>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn bg-red-500 border-none text-white">
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Dashboard;
