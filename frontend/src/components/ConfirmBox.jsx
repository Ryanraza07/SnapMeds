import React from 'react'
import { IoClose } from 'react-icons/io5'

const ConfirmBox = ({close, cancel,confirm}) => {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 z-50  bg-neutral-800/70 p-4 flex justify-center items-center'>
        <div className='bg-white w-full max-w-md p-4 rounded '>
         <div className='flex justify-between items-center gap-3'>
             <h1>
                Permanent Delete
             </h1>
             <button onClick={close}>
                <IoClose size={25}/>
             </button>
         </div>
         <p className='my-4'>Are you Sure Permanent Delete?</p>
         <div className='w-fit ml-auto flex items-center gap-3'>
            <button onClick={cancel} className='bg-red-500 text-white px-4 py-1 rounded'>
             Cancel
            </button>
            <button onClick={confirm} className='px-4 py-1 bg-green-600 rounded text-white hover:text-white'>
                Confirm

            </button>
         </div>
        </div>
    </div>
  )
}

export default ConfirmBox