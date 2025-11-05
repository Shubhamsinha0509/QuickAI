import { Scissors, Sparkles, Download } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveObject = () => {

  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading,setLoading] = useState(false)
  const [content,setContent] = useState('')
  
  const {getToken} = useAuth()
      
        const onSubmitHandler = async(e)=>{
          e.preventDefault()
          try {
            setLoading(true)
            if(object.split(' ').length > 1){
              return toast('please enter only one object name')
            }

          const formData = new FormData() 
          formData.append('image',input)
          formData.append('object',object)

          const { data } = await axios.post('/api/ai/remove-image-object',formData,{
          headers : {Authorization: `Bearer ${await getToken()}`}
        })

        if(data.success) {
          setContent(data.content)
        }else{
          toast.error(data.message)
        }
          } catch (error) {
            toast.error(error.message)
          }
          setLoading(false)

          if(input){
            console.log('Uploaded file',input.name)
          }
        }

        const downloadImage = async () => {
          try {
            const response = await fetch(content)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `object-removed-${Date.now()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success('Image downloaded successfully!')
          } catch (error) {
            toast.error('Failed to download image')
          }
        }

  return (
     <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col */}
      <form onSubmit = {onSubmitHandler}className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload image</p>

        <input onChange={(e)=>setInput(e.target.files[0])} accept='image/*'
          type="file"
          className="w-full p-2 px-3 mt-2 outline-none text-sm 
          rounded-md border border-gray-300 text-gray-600"
          required
        />

        <p className="mt-6 text-sm font-medium">Describe object name to remove</p>

        <textarea onChange={(e)=>setObject(e.target.value)} value={object} rows={4}
          
          className="w-full p-2 px-3 mt-2 outline-none text-sm 
          rounded-md border border-gray-300"
          placeholder="e.g., watch or spoon, Only single object name"
          required
        />

        <button disabled = {loading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r 
        from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm 
        rounded-lg cursor-pointer">
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 
          border-t-transparent animate-spin'></span> : <Scissors className="w-5"/>
          }
          
          Remove Object
        </button>
      </form>

      {/* right col */}

      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col 
      border border-gray-200 min-h-96">

        <div className="flex items-center gap-3">
            <Scissors className="w-5 h-5 text-[#4A7AFF]"/>
            <h1 className="text-xl font-semibold">Processed image</h1>
        </div>

          {
            !content ? ( <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 
          text-gray-400">
            <Scissors className="w-9 h-9"/>
            <p>Upload an image and click "Remove Object" to get started</p>
          </div>

        </div>) :(
          <div className='mt-3'>
            <img src={content} alt="image" className='w-full rounded-lg'/>
            <button 
              onClick={downloadImage}
              className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2.5 mt-4 text-sm rounded-lg cursor-pointer hover:opacity-90 transition'
            >
              <Download className="w-4 h-4"/>
              Download Image
            </button>
          </div>
        )
          }

       

      </div>
    </div>
  )
}

export default RemoveObject