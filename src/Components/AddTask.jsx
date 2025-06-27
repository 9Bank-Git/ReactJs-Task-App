export default function AddTask({ task, setTask, addTask }) {
  return (
    <div className='AddTask'>
      <form onSubmit={(e) => {addTask(task); e.preventDefault(); setTask('')}}>
        <h6 className='text-base sm:text-lg mt-2'>Crate New Task</h6>
        <div className='flex flex-row text-base'>
          <input
            type='text'
            value={task}
            maxLength='100'
            onChange={(e) => setTask(e.target.value)}
            className='w-full pl-1 bg-white shadow-xs rounded-l-md border border-gray-400/80 outline-none text-gray-800 placeholder-gray-400'
            placeholder='Write something ...'
            required
          />
          <input 
            type='submit'
            title='Add new task'
            value='ADD'
            disabled={task === ''}
            className='w-28 py-1.5 text-base sm:text-lg font-semibold rounded-r-md border border-slate-600 text-white bg-slate-600 hover:bg-slate-700 cursor-pointer'
          />
        </div>
      </form>
    </div>
  )
}