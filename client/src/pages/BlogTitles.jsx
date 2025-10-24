import { Hash, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogTitles = () => {
    const blogCategories = [ 'General', 'Business', 'Lifestyle', 'Health', 'Technology', 'Travel', 'Food', 'Education' ]
  
    const [selectedCategory, setselectedCategory] = useState('General');
    const [input, setInput] = useState("");
    const [loading,setLoading] = useState(false)
    const [content,setContent] = useState('')

    const {getToken} = useAuth()
  
    const onSubmitHandler = async(e)=>{
      e.preventDefault()
      try {
        setLoading(true)
        const prompt = `Generate a blog title for the keyword ${input} in the category  ${selectedCategory}`

        const { data } = await axios.post('/api/ai/generate-blog-title',{prompt},{
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
    }
    
  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col */}
      <form onSubmit = {onSubmitHandler}className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8E37EB]" />
          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Keyword</p>
        <input onChange={(e)=>setInput(e.target.value)} value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm 
          rounded-md border border-gray-300"
          placeholder="The future of Artificial Intelligence is..."
          required
        />

        <p className="text-sm font-medium mt-4">Category</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              onClick={() => setselectedCategory(item)}
              className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedCategory === item ? "bg-purple-100 text-purple-700" : "text-gray-500 border-gray-300"}`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>
        <br />
        <button disabled={loading} className="w-full flex justify-center items-center gap-2 bg-gradient-to-r 
        from-[#C341FC] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm 
        rounded-lg cursor-pointer">
          {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 
          border-t-transparent animate-spin'></span> : <Hash className="w-5"/> }
          
          Generate title
        </button>
      </form>
      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col 
      border border-gray-200 min-h-96">

        <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-[#8E37EB]"/>
            <h1 className="text-xl font-semibold">Generated titles</h1>
        </div>
        {
          !content ? (        <div className="flex flex-1 justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 
          text-gray-400">
            <Hash className="w-9 h-9"/>
            <p>Enter a topic and click "Generate title" to get started.</p>
          </div>

        </div>):(
           <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
                      <div className=".reset-tw">
          
                        <ReactMarkdown>{content}</ReactMarkdown>
                        
                      </div>
                    </div>
        )
        }


      </div>
    </div>
  )
}

export default BlogTitles