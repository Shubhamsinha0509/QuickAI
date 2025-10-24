import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { Trash2 } from 'lucide-react'

const CreationItem = ({item, onDelete}) => {

    const[expanded,setExpanded] = useState(false)

    const handleDelete = (e) => {
        e.stopPropagation()
        if(window.confirm('Are you sure you want to delete this creation?')) {
            onDelete(item.id)
        }
    }

  return (
    <div onClick={()=> setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer'>
        <div className='flex items-center justify-between gap-4'>
            
            <div>
                <h2>{item.prompt}</h2>
                <p className='text-gray-500'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
            <div className='flex items-center gap-2'>
                <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'>{item.type}</button>
                {onDelete && (
                    <button 
                        onClick={handleDelete}
                        className='p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors'
                        title='Delete creation'
                    >
                        <Trash2 className='w-4 h-4'/>
                    </button>
                )}
            </div>

        </div>
        {
            expanded && (
                <div>
                    {item.type === 'image' ? (
                        <div>
                            <img src={item.content} alt="image" className='mt-3 w-full max-w-md'/>
                        </div>
                    ) : (
                        <div className='mt-3 h-full overflow-y-scroll text-sm 
                        text-slate-700'>
                            <div className='reset-tw'>
                                <ReactMarkdown>{item.content}</ReactMarkdown>
                                
                            </div>

                        </div>
                    )}
                </div>
            )
        }
    </div>
  )
}

export default CreationItem