import { useState } from "react";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "./Task";

function TaskList(props) {

    // activeActionBtn state will keep track of the primary btn which is active to change it's color.
    const [activeActionBtn, setActiveActionBtn] = useState({
        allTaskBtn: "active",
        activeTaskBtn: "notActive",
        completedTaskBtn: "notActive"
    })

    // Tasks array of objects.
    const tasks = props.taskList;

    // Active tasks array.
    const activeTasks = tasks.filter(task => task.taskStatus === "Incomplete");

    // Completed tasks array.
    const completedTasks = tasks.filter(task => task.taskStatus === "Completed");

    // Number of tasks Completed in taskList.
    const numberOfTasksCompleted = tasks.length - completedTasks.length;

    // This function removes all completed tasks from the taskList.
    const handleClearAllTasksBtnClick = () => {
        props.clearCompletedTasks();
    }

    // This function displays all the tasks on screen.
    const displayAllTasks = () => {

        // Update the color of the clicked button.
        setActiveActionBtn({
            allTaskBtn: "active",
            activeTaskBtn: "notActive",
            completedTaskBtn: "notActive"
        });
        setActiveTasksView(null);
        setCompletedTasksView(null);
    }

    // This function creates a view for active tasks and displays them all screen.
    const displayActiveTasks = () => {

        // Update the color of the clicked button.
        setActiveActionBtn({
            allTaskBtn: "notActive",
            activeTaskBtn: "active",
            completedTaskBtn: "notActive"
        })
        const view = (
            <>
            {activeTasks.map(task => {
                return <Task id={task.id} title={task.title} taskStatus={task.taskStatus} theme={props.theme} key={task.id} removeTask={props.removeTask} updateTaskStatus={props.updateTaskStatus} removeTaskBtnClass={"hide"} isButtonDisabled={true} />
            })}
            </>
        )
        setActiveTasksView(view);
        setCompletedTasksView(null);
    }

    // This function creates a view for completed tasks and displays them on screen.
    const displayCompletedTasks = () => {

        // Update the color of the clicked button.
        setActiveActionBtn({
            allTaskBtn: "notActive",
            activeTaskBtn: "notActive",
            completedTaskBtn: "active"
        })
        const view = (
            <>
            {completedTasks.map(task => {
                return <Task id={task.id} title={task.title} taskStatus={task.taskStatus} theme={props.theme} key={task.id} removeTask={props.removeTask} updateTaskStatus={props.updateTaskStatus} removeTaskBtnClass={"hide"} isButtonDisabled={true} />
            })}
            </>
        )
        setActiveTasksView(null);
        setCompletedTasksView(view);
    }

    // All tasks view.
    const allTasksView = (
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
            {tasks.map(task => {
                return <Task id={task.id} title={task.title} taskStatus={task.taskStatus} theme={props.theme} key={task.id} removeTask={props.removeTask} updateTaskStatus={props.updateTaskStatus} removeTaskBtnClass={""} isButtonDisabled={false} />
            })}
        </SortableContext>
    )

    // Initializing state for activeTasksView and completedTasksView with null.
    const [activeTasksView, setActiveTasksView] = useState(null);
    const [completedTasksView, setCompletedTasksView] = useState(null);


    return (
        <>
        <div id="taskList">
            {activeTasksView || completedTasksView || allTasksView}
            <div className={`taskListFooter flex ${props.theme}`}>
                <p className="numberOfTasks">{numberOfTasksCompleted} items left</p>

                <div className="taskActionBtnContainer flex">
                    <div className="primaryActions">
                        <button id="displayAllTasksBtn" className={`actionBtn ${activeActionBtn.allTaskBtn}`} onClick={displayAllTasks}>All</button>
                        <button id="displayActiveTasksBtn" className={`actionBtn ${activeActionBtn.activeTaskBtn}`} onClick={displayActiveTasks}>Active</button>
                        <button id="displayCompletedTasksBtn" className={`actionBtn ${activeActionBtn.completedTaskBtn}`} onClick={displayCompletedTasks}>Completed</button>
                    </div>
                    <div className="secondaryActions">
                        <button id="clearAllTasksBtn" className="actionBtn" onClick={handleClearAllTasksBtnClick}>Clear Completed</button>
                    </div>
                </div>
            </div>
        </div>
        <p className="featureText">Drag and drop to reorder list</p>
        </>
    )
}

export default TaskList;