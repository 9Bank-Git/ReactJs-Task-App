import reactLogo from '../assets/react.svg';
import viteLogo from  '../assets/vite.svg';

export default function Header() {
  return (
    <section className='Header'>
      <div className='flex flex-row px-4 md:px-8 py-3 md:py-4 gap-x-1 font-poppins font-bold text-white bg-slate-600 items-center'>
        <img className='h-[22px] md:h-[34px] object-cover' src={viteLogo} alt='vite logo'/>
        <h1 className='text-xl sm:text-2xl md:text-4xl'>Vite</h1>
        <h1 className='ml-0.5 md:ml-1 mr-0.5 md:mr-1 text-xl sm:text-2xl md:text-4xl'>+</h1>
        <img className='h-[22px] md:h-[34px] object-cover' src={reactLogo} alt='react logo'/>
        <h1 className='text-xl sm:text-2xl md:text-4xl'>React</h1>
        <h1 className='ml-0.5 md:ml-1 text-xl sm:text-2xl md:text-4xl'>: Task List</h1>
      </div>
    </section>
  )
}