function Header({username, Signout}) {
  return (
    <section className='header'>
      <div className='bg-slate-600 flex flex-row px-12 py-4 items-center justify-between'>
        <div className="flex gap-4">
          <img src="./src/assets/notepad.svg" alt="notepad" className="size-10"/>
          <h1 className='text-4xl font-semibold text-white'>Task List</h1>
        </div>
        {username && (
          <div>
            <p>User: {username}</p>
            <button type='button' onClick={Signout} className='flex gap-2 text-white'>
              <span>Sign out</span>
              <span className='material-icons'>logout</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Header;