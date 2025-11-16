import { useRef, useEffect } from 'react'

export default function ModalDialog({isShow, eventTarget, submitDialog, setShowModel}) {
  const dialogRef = useRef(null);
  const dialog = dialogRef.current;

  useEffect(() => {
    if (!isShow) {
      return;
    }
    dialog.showModal();
    return () => dialog.close();
  }, [isShow, dialog]);

  return (
    <dialog ref={dialogRef} className='mx-auto my-40 w-90 px-8 py-6 bg-white rounded-lg shadow-xl outline outline-black/10 backdrop:bg-black/20'>
      <form onSubmit={(e) => {submitDialog(), e.preventDefault(), setShowModel(false)}}>
        <div className='flex flex-col gap-y-4'>
          <h5 className='text-xl font-extrabold text-gray-700'>Do you want to {eventTarget ? 'delete' : 'reset'}?</h5>
          <p className='text-base text-zinc-600'>This will permanently {eventTarget ? 'delete this task.' : 'remove all tasks.'}</p>
          <div className='flex justify-end mt-2 gap-x-2 font-semibold text-base tracking-wider'>
            <button type="button" onClick={() => setShowModel(false)} className='w-24 text-sm rounded-md shadow-sm outline outline-black/15 text-gray-600 bg-gray-50 hover:bg-gray-200'>
              Cancel
            </button>
            <button type="submit" className='w-24 text-sm py-2 rounded-md shadow-sm outline outline-black/15 text-white bg-blue-600 hover:bg-blue-800'>
              {eventTarget ? 'Delete': 'Reset'}
            </button>
          </div>
        </div>
      </form>
    </dialog>
  )
}
