import { useState, useEffect } from "react";
import { DndContext, KeyboardSensor, PointerSensor, TouchSensor, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Header from "./components/Header";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import "./styles/styles.css";

function App() {

  // Getting taskData from local storage if it is present, else set taskData to pre-populate tasks.
  const taskData = JSON.parse(localStorage.getItem("taskData")) || [
    {
      id: "1",
      title: "Exercise for 30 minutes",
      taskStatus: "Incomplete"
    },
    {
      id: "2",
      title: "Jog around the park 3x",
      taskStatus: "Incomplete"
    },
    {
      id: "3",
      title: "10 minutes meditation",
      taskStatus: "Incomplete"
    },
    {
      id: "4",
      title: "Read for 1 hour",
      taskStatus: "Incomplete"
    },
    {
      id: "5",
      title: "Pick up groceries",
      taskStatus: "Incomplete"
    },
    {
      id: "6",
      title: "Drink 8 glasses of water",
      taskStatus: "Incomplete"
    }
  ];

  // Getting appTheme from local storage if it is present, else set appTheme to light.
  const appTheme = localStorage.getItem("theme") || "light";

  // Initializing theme state with light theme.
  let [theme, setTheme] = useState(appTheme);
  // let [taskList, updateTaskList] = useState([{"Complete online JavaScript course", "Jog around the park 3x", "10 minutes meditation", "Read for 1 hour", "Pick up groceries", "Complete Todo App"}]);
  const [taskList, updateTaskList] = useState(taskData);

  // Update localStorage whenever the taskList gets updated.
  useEffect(() => {
    localStorage.setItem("taskData", JSON.stringify(taskList));
  }, [taskList]);

  // Update theme in localStorage whenever the appTheme is changed by the user.
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  // This function returns the index of the task from tasklist using task id.
  const getTaskIndex = (id) => {
    return taskList.findIndex(task => task.id === id);
  }

  // This function adds the task in task list.
  const addTask = (task) => {
    updateTaskList(prevTaskList => [...prevTaskList, task]);
  }

  // This function updates the task's status to completed using the task's id
  const updateTaskStatus = (id) => {
    let updatedTaskList = [...taskList];
    const indexOfTaskToUpdate = getTaskIndex(id);
    const previousTaskStatus = updatedTaskList[indexOfTaskToUpdate].taskStatus;

    updatedTaskList[indexOfTaskToUpdate].taskStatus = previousTaskStatus === "Incomplete" ? "Completed" : "Incomplete";
    updateTaskList(updatedTaskList);
  }

  // This function takes task's id as argument and remove that task from taskList.
  const removeTask = (id) => {
    let originalTaskList = [...taskList];
    let updatedTaskList = originalTaskList.filter(task => task.id !== id);
    updateTaskList(updatedTaskList);
  }

  // This function removes all the completed tasks from taskList.
  const clearCompletedTasks = () => {
    const originalTaskList = [...taskList];
    const updatedTaskList = originalTaskList.filter(task => task.taskStatus !== "Completed")
    updateTaskList(updatedTaskList);
  }

  // This function toggles the app theme when called.
  const changeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  }

  // This function places the task where the user has dropped it.
  const handleDragEnd = (e) => {
    const {active, over, delta} = e;

    // If the draggable item is dropped at its original position then do nothing.
    if (Math.abs(delta.x) < 2 || Math.abs(delta.y) < 2 || active.id === over.id) {
      return;
    }

    // Changing the dragged item index with the dropped item index.
    updateTaskList(taskList => {
      const originalTaskWithOriginalPosition = getTaskIndex(active.id);
      const secondOriginalTaskWithOriginalPosition = getTaskIndex(over.id);

      return arrayMove(taskList, originalTaskWithOriginalPosition, secondOriginalTaskWithOriginalPosition);
    });
  };

  // Adding sensors for touch and keyboard controls for drag and drop the tasks.
  const sensors = useSensors(
    useSensor(PointerSensor, {activationConstraint: {delay: 100, tolerance: 5}}),
    useSensor(TouchSensor, {activationConstraint: {delay: 100, tolerance: 5}}),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Change body class when theme is changed to change its background color.
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <div id="app">
        <div id="background" className={theme}>
        </div>
        <main id="main">
          <Header theme={theme} changeTheme={changeTheme} />
          <AddTask theme={theme} addTask={addTask} />
          <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd} sensors={sensors}>
            <TaskList taskList={taskList} theme={theme} removeTask={removeTask} updateTaskStatus={updateTaskStatus} clearCompletedTasks={clearCompletedTasks} />
          </DndContext>
        </main>
      </div>
    </>
  )
}

export default App
