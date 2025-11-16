export default function Counter({ tasks, filter, openModal }) {
  const tasksTotal = tasks.length;
  const tasksFilter = tasks.filter((task) => {
    if (filter === 'pending') {
      return !task.completed;
    }
    if (filter === 'completed') {
      return task.completed;
    }
  });

  return (
    <div className='Counter'>
      <div className='flex flex-col sm:flex-row gap-y-2 mt-4 text-gray-800 justify-between items-center'>
        {filter === 'all' && <label>Total : {tasksTotal} items</label>}
        {filter === 'pending' && (
          <label>
            Total : {tasksFilter.length} of {tasksTotal} items
          </label>
        )}
        {filter === 'completed' && (
          <label>
            Total : {tasksFilter.length} of {tasksTotal} items
          </label>
        )}
        <button
          type='button'
          title='Reset all'
          onClick={() => openModal(false)}
          className='bg-gray-50 px-8 py-1.5 text-sm rounded-md shadow text-gray-600 outline outline-black/15 hover:bg-gray-200'
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
