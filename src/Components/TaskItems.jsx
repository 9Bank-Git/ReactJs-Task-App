import { useState } from 'react';
import { toast } from 'react-toastify'
import { filterTasks } from './filterTasks.jsx';

export default function TaskItems({
  tasks,
  filter,
  toggleCompleted,
  moveTaskUp,
  moveTaskDown,
  editedTask,
  openModal,
}) {
  const visibleTasks = filterTasks(tasks, filter);
  return (
    <div className='task-items flex flex-col flex-1 gap-4'>
      <hr className='mt-2 text-gray-400' />
      <ul className='flex flex-col flex-1 gap-y-2'>
        {visibleTasks.map((task, index) => (
          <ItemsList
            key={task.id}
            task={task}
            index={index}
            completedTask={toggleCompleted}
            moveTaskUp={moveTaskUp}
            moveTaskDown={moveTaskDown}
            editedTask={editedTask}
            openModal={openModal}
          />
        ))}
      </ul>
      <hr className='text-gray-400' />
    </div>
  );
}

function ItemsList({task, index, completedTask, showActive, moveTaskUp, moveTaskDown, editedTask, openModal}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState('');
  
  // Handle editing mode
  const handleEdit = () => {
    setIsEditing(true);
    setEditText(task.text);
  }

  // Handle save action to editing
  const handleSave = (taskId) => {
    if (editText === '') {
      toast.warning('Please, fill out something.');
      return;
    } else {
    editedTask(taskId, editText);
    setIsEditing(false);
    }
  }

  return (
    <li className='bg-white flex flex-col sm:flex-row px-6 py-2.5 gap-y-2 gap-x-2 rounded shadow justify-between'>
      <div className='w-full space-x-2'>
        <div className='float-left flex mt-1 gap-4'>
          <input
            type='checkbox'
            title='Completed'
            checked={task.completed}
            onChange={() => completedTask(task.id)}
            className='my-auto rounded-full size-3.5 accent-gray-500 hover:opacity-60'
          />
          <span
            className={`size-4.5 shrink-0 rounded-full font-semibold text-xs text-center content-center ${
              task.completed ? 'text-gray-100 bg-sky-200' : 'text-white bg-sky-500'
            }`}
          >
            {index + 1}
          </span>
        </div>
        {isEditing ? (
          <input
            type='text'
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className='w-full mt-1 rounded-xs invalid:outline-pink-500'
            required
            autoFocus
          />
        ) : (
          <div
            className={`w-full break-all ${
              task.completed ? 'line-through text-gray-300' : 'text-gray-800'
            }`}
          >
            {task.text}
          </div>
        )}
      </div>
      <div className='flex gap-x-3 items-center justify-end'>
        {isEditing ? (
          <>
            <div className={`${showActive ? 'hidden' : 'flex space-x-2'}`}>
              <button
                type='button'
                title='Move up'
                onClick={() => moveTaskUp(index)}
                className='flex px-1 py-1 rounded text-gray-500 hover:bg-zinc-200 items-center'
              >
                <i className='material-icons md-18'>arrow_upward</i>
              </button>
              <button
                type='button'
                title='Move down'
                onClick={() => moveTaskDown(index)}
                className='flex px-1 py-1 rounded text-gray-500 hover:bg-zinc-200 items-center'
              >
                <i className='material-icons md-18'>arrow_downward</i>
              </button>
            </div>
            <button
              type='button'
              title='Save'
              onClick={() => handleSave(task.id)}
              className='flex px-1 py-1 rounded text-gray-500 hover:bg-zinc-200 items-center'
            >
              <i className='material-icons md-18'>save</i>
            </button>
            <button
              type='button'
              title='Cancel'
              onClick={() => setIsEditing(false)}
              className='flex px-1 py-1 rounded text-gray-500 hover:bg-zinc-200 items-center'
            >
              <i className='material-icons md-18'>close</i>
            </button>
          </>
        ) : (
          <>
            <button
              type='button'
              title='Edit'
              onClick={() => handleEdit()}
              className='flex px-1 py-1 rounded text-gray-500 hover:bg-zinc-200 items-center'
            >
              <i className='material-icons md-18'>edit</i>
            </button>
            <button
              type='button'
              title='Delete'
              onClick={() => openModal(true, task.id)}
              className='flex px-1 py-1 rounded text-gray-500 hover:bg-zinc-200 items-center'
            >
              <i className='material-icons md-18'>delete</i>
            </button>
          </>
        )}
      </div>
    </li>
  );
}
