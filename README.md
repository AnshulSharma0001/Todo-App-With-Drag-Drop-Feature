# Todo App

A simple and interactive Todo App built with React, featuring drag-and-drop functionality, theme toggling, and persistent state using local storage.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
- [Contributing](#contributing)

## Features
- **Add Tasks**: Easily add new tasks to your list.
- **Remove Tasks**: Remove individual tasks.
- **Update Task Status**: Mark tasks as complete.
- **Clear Completed Tasks**: Remove all completed tasks with a single click.
- **Drag-and-Drop**: Reorder tasks using drag-and-drop.
- **Persistent State**: Save tasks and theme settings to local storage.
- **Theme Toggling**: Switch between light and dark themes.

## Installation
1. Clone the repository:
   ```bash
    git clone https://github.com/AnshulSharma0001/Todo-App.git
    ```

2. Navigate to the project directory:
    ```bash
    cd Todo-App
    ```

3. Install dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

- Use input field to add new tasks.
- Click on the circle next to a task to mark it as complete.
- Click on the cross icon to remove that particular task.
- Click on Active to see all the active/incomplete tasks.
- Click on Completed to see all the completed tasks.
- Click on All to see all the tasks.
- Click on Clear Completed to remove all the completed tasks.
- Drag and drop to reorder the tasks.
- Use the theme toggle button in the header to switch between light and dark modes.

## Components

### App.jsx
The main component that initializes state, handles task operations, and renders the app.

### Header.jsx
A header component that contains the title and theme toggle button.

### AddTask.jsx
A component that contains the input field and button to add new tasks.

### TaskList.jsx
A component that displays the list of tasks, allows filtering, and handles task reordering.

### Task.jsx
A component that represents an individual task with buttons to mark as complete or remove the task.

## Contributing
Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue and submit a pull request.
