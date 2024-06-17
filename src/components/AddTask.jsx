import { useState } from "react";
import iconCross from "../images/icon-cross.svg";

function AddTask(props) {

    // Initializing inputValue state to empty string.
    let [inputValue, setInputValue] = useState("");

    // This function update the state of inputValue.
    const updateInputValue = (e) => {
        setInputValue(e.target.value);
    }

    // Add task in taskList when user press enter key.
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddBtnClick();
        }
    };

    // This function handles the click of addTaskBtn and add task to taskLIst array.
    const handleAddBtnClick = () => {
        const newTask = {
            id: Date.now(),
            title: inputValue,
            taskStatus: "Incomplete"
        }

        if (newTask.title !== "") {
            props.addTask(newTask);
            setInputValue("")
        }
    }

    return (
        <>
        <div className={`addTask ${props.theme} flex`}>
            <button id="addTaskBtn" className="leftTileBtn flex" onClick={handleAddBtnClick}>
                <img src={iconCross} alt="Add task" />
            </button>
            <label htmlFor="newTask">
                <input type="text" id="newTask" placeholder="Create a new todo..." value={inputValue} onChange={updateInputValue} onKeyDown={handleKeyPress} />
            </label>
        </div>
        </>
    )
}

export default AddTask;