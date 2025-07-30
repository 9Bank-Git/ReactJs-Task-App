import { useState } from 'react';
import { toast } from 'react-toastify'

export default function TaskItems({display, showActive, setShowActive, toggleCompleted, moveTaskUp, moveTaskDown, editedTask, openModal}) {
  return (
    <div className='TaskItems flex flex-col flex-1'>
      <div className='inline-flex mt-6 mb-1 items-end'>
        <p className='text-base sm:text-lg'>Tasks List</p>
        <label className='flex gap-1 ml-8 sm:ml-16 text-sm sm:text-base text-gray-800'>
          <input 
            type='checkbox'
            checked={showActive}
            onChange={(e) => setShowActive(e.target.checked)}
            className='accent-sky-600'
          />
          Show only active
        </label>
      </div>
      <hr className='text-slate-300 mb-3'/>
      <ul className='flex flex-col flex-1 gap-y-2'>
        {display.map((task, index) => (
          <ItemsList
            key={task.id}
            task={task}
            index={index}
            completedTask={toggleCompleted}
            showActive={showActive}
            moveTaskUp={moveTaskUp}
            moveTaskDown={moveTaskDown}
            editedTask={editedTask}
            openModal={openModal}
          />
        ))}
      </ul>
      <hr className='text-slate-300 mt-3'/>
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
    <li className='flex flex-col md:flex-row px-6 md:px-4 py-3 gap-y-3 md:gap-x-2 rounded shadow bg-white items-center text-center md:text-left'>
      <input 
        type='checkbox'
        title='Completed'
        checked={task.completed}
        onChange={() => completedTask(task.id)}
        className='size-3.5 accent-gray-500/25 hover:opacity-60'
      />
      <div className='flex ml-3'>
        <span className={`size-4.5 rounded-full font-semibold text-sm text-center content-center ${task.completed ? 'line-through text-gray-100 bg-sky-200' : 'text-white bg-sky-500'}`}>
          {index + 1}
        </span>
      </div>
      <div className='flex w-full justify-center md:justify-start'>
        {isEditing ? (
          <input 
            type='text'
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className='w-full rounded-xs outline outline-gray-400 invalid:outline-pink-500'
            required
            autoFocus
          />
        ) : (
          <span className={`w-full break-all ${task.completed ? 'line-through text-gray-300' : 'text-gray-800'}`}>{task.text}</span>
        )}
      </div>
      <div className='flex gap-x-3'>
        {isEditing ? (
          <>
            <div className={`${showActive ? 'hidden': 'flex space-x-1.5'}`}>
              <button type='button' title='Move up' onClick={() => moveTaskUp(index)} className='flex px-1 py-1 rounded text-slate-600 hover:bg-zinc-200 items-center'>
                <i className='material-icons' style={{fontSize: '20px'}}>arrow_upward</i>
              </button>
              <button type='button' title='Move down' onClick={() => moveTaskDown(index)} className='flex px-1 py-1 rounded text-slate-600 hover:bg-zinc-200 items-center'>
                <i className='material-icons' style={{fontSize: '20px'}}>arrow_downward</i>
              </button>
            </div>
            <button type='button' title='Save' onClick={() => handleSave(task.id)} className='flex px-1 py-1 rounded text-slate-600 hover:bg-zinc-200 items-center'>
              <i className='material-icons' style={{fontSize: '20px'}}>save</i>
            </button>
            <button type='button' title='Cancel' onClick={() => setIsEditing(false)} className='flex px-1 py-1 rounded text-slate-600 hover:bg-zinc-200 items-center'>
              <i className='material-icons' style={{fontSize: '20px'}}>close</i>
            </button>
          </>
        ) : (
          <>
            <button type='button' title='Edit' onClick={() => handleEdit()} className='flex px-1 py-1 rounded text-slate-600 hover:bg-zinc-200 items-center'>
              <i className='material-icons' style={{fontSize: '20px'}}>edit</i>
            </button>
            <button type='button' title='Delete' onClick={() => openModal(true, task.id)} className='flex px-1 py-1 rounded text-slate-600 hover:bg-zinc-200 items-center'>
              <i className='material-icons' style={{fontSize: '20px'}}>delete</i>
            </button>
          </>
        )}
      </div>
    </li>
  );
}
