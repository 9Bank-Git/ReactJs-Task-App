import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import TaskForm from '../Components/TaskForm.jsx';
import DropDown from "../Components/DropDown.jsx";
import TaskItems from '../Components/TaskItems.jsx';
import Counter from '../Components/Counter.jsx';
import ModalDialog from '../Components/ModalDialog.jsx';

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const [deletedId, setDeletedId] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [filter, setFilter] = useState('all');
  
  // Load tasks from local storage.
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks === null || storedTasks.length === 0) {
      return;
    }
    setTasks(storedTasks); 
  }, []);

  // Save tasks to local storage every time it changes.
  useEffect(() => {
    if (tasks.length === 0) {
      return ;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add new task to the list.
  const addTask = async (task) => {
    if (task === '') {
      toast.warning('Please, fill out something.');
      return;
    }
    const newTask = {id: Date.now(), text: task, completed: false};
    setTasks([...tasks, newTask]);
    toast.success('Successfully add new task');
  }

  // Toggle task completion status.
  const toggleCompleted = (toggleId) => {
    setTasks(tasks.map(task => 
      task.id === toggleId ? {...task, completed: !task.completed} : task
    ));
  }

  // Move task up in the list.
  const moveTaskUp = (index) => {
    if (index > 0) {
      const updateTasks = [...tasks];
      [updateTasks[index], updateTasks[index - 1]] = [updateTasks[index - 1], updateTasks[index]];
      setTasks(updateTasks);
    }
  }

  // Move task down in the list.
  const moveTaskDown = (index) => {
    if (index < tasks.length - 1) {
      const updateTasks = [...tasks];
      [updateTasks[index], updateTasks[index + 1]] = [updateTasks[index + 1], updateTasks[index]];
      setTasks(updateTasks);
    }
  }

  // Update the edited task to the list.
  const editedTasks = (editedId, newText) => {
    setTasks([...tasks].map(task => 
      task.id === editedId ? { ...task, text: newText } : task
    ));
    toast.success('Successfully edited task');
  }

  // Open modal dialog for confirm delete or reset action.
  const openModal = (isOpen, taskId) => {
    if (isOpen === false && tasks.length === 0) {
      toast.warn('There is no task list.');
    } else {
      isOpen ? setIsDelete(true) : setIsDelete(false);
      setDeletedId(taskId);
      setShowModel(true);
    }
  }

  // Submit dialog action based on event target.
  const submitDialog = () => {
    if (isDelete) { 
      setTasks(tasks.filter(task => task.id !== deletedId));
      setDeletedId(null); 
    } else {
      setTasks([]);
      localStorage.clear();
    }
    toast.success(`Successfully ${isDelete ? 'deleted task' : 'cleared tasks'}`);
  }

  return (
    <section className='tasks-list flex flex-1'>
      <div className='flex flex-col px-12 py-6 w-full'>
        <TaskForm addTask={addTask} />
        <DropDown filter={filter} setFilter={setFilter} />
        <TaskItems
          tasks={tasks}
          filter={filter}
          setFilter={setFilter}
          toggleCompleted={toggleCompleted}
          moveTaskUp={moveTaskUp}
          moveTaskDown={moveTaskDown}
          editedTask={editedTasks}
          openModal={openModal}
        />
        <Counter tasks={tasks} filter={filter} openModal={openModal} />
        <ModalDialog
          isShow={showModel}
          eventTarget={isDelete}
          submitDialog={submitDialog}
          setShowModel={setShowModel}
        />
      </div>
    </section>
  );
}