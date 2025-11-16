import NotepadLogo from '../assets/notepad.svg';

function Header() {
  return (
    <section className='header'>
      <div className='bg-slate-600 flex flex-row px-12 py-4 gap-2 items-center'>
        <img src={NotepadLogo} alt="notepad" className="size-10"/>
        <h1 className='text-4xl font-semibold text-white'>Task List</h1>
      </div>
    </section>
  );
}

export default Header;