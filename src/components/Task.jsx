import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import iconCross from "../images/icon-cross.svg";
import iconCheck from "../images/icon-check.svg";

function Task({id, title, taskStatus, theme, removeTask, updateTaskStatus, removeTaskBtnClass, isButtonDisabled}) {

    // Initializing value of isTouchDevice state to false.
    const [isTouchDevice, setIsTouchDevice] = useState(false);

    // If ontouchstart event is in window object, then the device has a touch screen and set isTouchDevice to true to display all removeTaskBtn.
    useEffect(() => {
        setIsTouchDevice('ontouchstart' in window);
    }, []);

    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

    // Added drag and drop transition styles for the tasks.
    const dragAndDropStyle = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    // Initializing taskHoverIndex state. When user will hover on any task then this state will be updated to the index of that task and removeTaskBtn will be displayed.
    const [taskHoverId, setTaskHoverId] = useState(null);

    // This function handles the click of removeTaskBtn and remove the task from the list.
    const handleRemoveTaskBtnClick = (e) => {
        e.stopPropagation();
        removeTask(id);
    }

    // This function handles the click of completeTaskBtn and mark the task's status as completed.
    const handleCompleteTaskBtnClick = (e) => {
        e.stopPropagation();
        updateTaskStatus(id);
    }

    return (
        <div
            className={`task ${theme} flex`}
            id={id}
            onMouseEnter={() => setTaskHoverId(id)}
            onMouseLeave={() => setTaskHoverId(null)}
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={dragAndDropStyle}>

                <button className={`completeTaskBtn leftTileBtn flex ${taskStatus} ${isButtonDisabled}`} onClick={handleCompleteTaskBtnClick} disabled={isButtonDisabled}>
                    {
                        taskStatus === "Completed" && <img src={iconCheck} alt="Completed" className="iconCheck" />
                    }
                </button>

                <p style={{width: "90%"}}>{title}</p>

                {isTouchDevice ? (
                    <button className={`removeTaskBtn ${removeTaskBtnClass}`} onClick={handleRemoveTaskBtnClick}>
                        <img src={iconCross} alt="Remove task" />
                    </button>
                ) : (
                    <button className={`removeTaskBtn ${taskHoverId === id ? '': 'hide'} ${removeTaskBtnClass}`} onClick={handleRemoveTaskBtnClick}>
                        <img src={iconCross} alt="Remove task" />
                    </button>
                )}
        </div>
    )
}

export default Task;