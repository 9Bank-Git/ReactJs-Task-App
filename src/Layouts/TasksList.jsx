import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import AddTask from '../Components/AddTask.jsx';
import TaskItems from '../Components/TaskItems.jsx';
import Counter from '../Components/Counter.jsx';
import ModalDialog from '../Components/ModalDialog.jsx';

export default function TasksList() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [active, setActive] = useState([]);
  const [display, setDisplay] = useState([]);
  const [deletedId, setDeletedId] = useState(null);
  const [event, setEvent] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showActive, setShowActive] = useState(false);
  
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

  // Filter active tasks.
  useEffect(() => {
    setActive(tasks.filter(task => !task.completed));
  }, [tasks]);

  // Update the display list based on the active tasks or all tasks.
  useEffect(() => {
    setDisplay(showActive ? active : tasks);
  }, [showActive, active, tasks]);

  // Add new task to the list.
  const addTask = (task) => {
    if (task === '') {
      toast.warning('Please, fill out something.');
      return;
    }
    setTasks([...tasks, {id: Date.now(), text: task, completed: false}]);
    toast.success('Successfully add new task');
  }

  // Toggle task completion status.
  const toggleCompleted = (toggleId) => {
    setTasks(tasks.map(task => task.id === toggleId ? {...task, completed: !task.completed} : task));
    toast.success('Successfully toggle completed task');
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
    setTasks([...tasks].map(task => task.id === editedId ? { ...task, text: newText } : task));
    toast.success('Successfully edited task');
  }

  // Open modal dialog for confirm delete or reset action.
  const openModal = (isOpen, taskId) => {
    if (isOpen === false && tasks.length === 0) {
      toast.warn('There is no task list.');
    } else {
      isOpen ? setEvent(true) : setEvent(false);
      setDeletedId(taskId);
      setShowModel(true);
    }
  }

  // Submit dialog action based on event target.
  const submitDialog = () => {
    if (event) { 
      setTasks(tasks.filter(task => task.id !== deletedId));
      setDeletedId(null); 
    } else {
      setTasks([]);
      setActive([]);
      localStorage.clear();
    }
    toast.success(`Successfully ${event ? 'deleted task' : 'reset tasks'}`);
  }

  return (
    <section className='TasksList'>
      <div className='flex flex-col flex-1 max-w-full w-[92%] px-4 py-6 text-gray-900'>
        <AddTask
          task={task}
          setTask={setTask}
          addTask={addTask}
        />
        <TaskItems 
          display={display}
          showActive={showActive}
          setShowActive={setShowActive}
          toggleCompleted={toggleCompleted}
          moveTaskUp={moveTaskUp}
          moveTaskDown={moveTaskDown}
          editedTask={editedTasks}
          openModal={openModal}
        />
        <Counter
          tasksActive={active.length}
          tasksTotal={tasks.length}
          openModal={openModal}
        />
        <ModalDialog
          isShow={showModel}
          eventTarget={event}
          submitDialog={submitDialog}
          setShowModel={setShowModel}
        />
      </div>
    </section>
  );
}