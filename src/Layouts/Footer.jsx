export default function Footer() {
  return (
    <section className='Footer'>
      <div className='flex flex-col sm:flex-row px-4 md:px-2 py-3 md:py-3.5 text-base sm:text-lg text-white bg-slate-600 items-center justify-center'>
        <span>&#169; { `${new Date().getFullYear()} TailwindCSS Theme - Made By`}</span>
        <a href='https://github.com/9Bank-Git' target='_blank' title='Visit GitHub' className='pl-1.5 text-cyan-300 no-underline hover:underline hover:underline-offset-2'>9Bank-Git</a>
      </div>
    </section>
  )
}