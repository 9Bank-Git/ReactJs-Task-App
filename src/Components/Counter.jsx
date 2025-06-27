export default function Counter({ tasksActive, tasksTotal, openModal }) {
  return (
    <div className='Counter'>
      <div className='flex flex-col sm:flex-row gap-y-2 mt-4 text-gray-800 justify-between items-center'>
        <span className='font-normal text-base sm:text-lg'>
          Active : {tasksActive} out of {tasksTotal} tasks
        </span>
        <button
          type='button'
          title='Reset all'
          onClick={() => openModal(false)}
          className='px-8 py-1 text-sm sm:text-base rounded-md shadow outline outline-black/15 bg-gray-50 hover:bg-gray-200'
        >
          Reset
        </button>
      </div>
    </div>
  )
}