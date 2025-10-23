import sql from "../config/db.js"

export const getUserCreations = async (req,res)=> {
    try {
        const {userId} = req.auth()

        const creations = await sql `SELECT * FROM creations WHERE user_id = ${userId} ORDER BY 
        created_at DESC`

        res.json({success:true, creations})
    } catch (error) {
        res.json({success:false, message : error.message})
    }
}


export const getPublishedCreations = async (req,res)=> {
    try {
        const {userId} = req.auth()

        const creations = await sql `SELECT * FROM creations WHERE publish = true ORDER BY 
        created_at DESC`

        res.json({success:true, creations})
    } catch (error) {
        res.json({success:false, message : error.message})
    }
}


export const toggleLikeCreation = async (req,res)=> {
    try {
        
        const {userId} = req.auth()
        const {id} = req.body

        const [creation] = await sql `SELECT * FROM creations WHERE id = ${id}`
        if(!creation) {
            return res.json({success:false, message:'creation not found'})
        }


        const currentLikes = creation.likes
        const userIdStr = userId.toString()
        let updatedlikes
        let message

        if(currentLikes.includes(userIdStr)) {
            updatedlikes = currentLikes.filter(()=> user !== userIdStr)
            message = 'Creation unliked'
        }else {
            updatedlikes = [...currentLikes, userIdStr]
            message = 'Creation liked'
        }

        const formattedArray = `{${updatedlikes.join(',')}}`

        await sql `UPDATE creations SET likes = ${formattedArray}::text[] WHERE id = ${id}`



        res.json({success:true, message})
    } catch (error) {
        res.json({success:false, message : error.message})
    }
}