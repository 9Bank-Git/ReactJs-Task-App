import { useState } from 'react';

function TaskForm({ addTask }) {
  const [task, setTask] = useState('');
  const [pending, setPending] = useState(false);

  const submitTaskForm = async (e) => {
    e.preventDefault();
    setPending(true);
    await delay();
    addTask(task);
    setTask('');
    setPending(false);
  };

  const delay = () => {
    return new Promise((resolve) => 
      setTimeout(resolve, 1000)
  );}

  return (
    <div className='AddTask'>
      <form onSubmit={(e) => submitTaskForm(e)}>
        <label>New Task</label>
        <div className='static flex flex-col gap-3 sm:relative '>
          <input
            type='text'
            value={task}
            maxLength='100'
            onChange={(e) => setTask(e.target.value)}
            placeholder='Write something ...'
            required
            disabled={pending}
            className={`w-full p-2 rounded ${pending ? 'bg-slate-200' : 'bg-white'}`}
          />
          <button
            type='submit'
            title='New task'
            disabled={pending}
            className={`w-full py-2 sm:absolute sm:inset-y-0 sm:right-0 sm:m-1 sm:w-24 text-sm shadow rounded text-white hover:bg-slate-700
              ${pending ? 'bg-slate-500' : 'bg-slate-600'}
            `}
          >
            {pending ? 'Adding...' : 'ADD'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;