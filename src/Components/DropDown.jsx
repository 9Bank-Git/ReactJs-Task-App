function DropDown({ filter, setFilter }) {
  return (
    <div className='flex flex-col sm:flex-row mt-4 gap-x-16 gap-y-2 items-center'>
      <h6 className='text-xl text-nowrap'>Task List</h6>
      <label htmlFor='dropdown' className='flex '>
        Filter:
        <select
          name='dropdown'
          id='dropdown'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className='bg-white ml-2 text-sm rounded-xs border border-gray-400'
        >
          <option value='all'>All</option>
          <option value='pending'>Pending</option>
          <option value='completed'>Completed</option>
        </select>
      </label>
    </div>
  );
}

export default DropDown;
