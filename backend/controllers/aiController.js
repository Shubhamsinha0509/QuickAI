import OpenAI from "openai";
import sql from "../config/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const openai = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

export const generateArticle = async (req,res) => {
    try {
        const { userId } = req.auth()
        const { prompt, length } =  req.body
        const plan = req.plan
        const free_usage = req.free_usage

        if(plan !== 'premium' && free_usage >= 20){
            return res.json({ success:false, message : 'Limit reached. Upgrade to continue.'})
        }

        const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature : 0.7,
    max_tokens : length
});

    const content = response.choices[0].message.content

    await sql ` INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId},${prompt},${content}, 'article')`;



    if(plan !== 'premium'){
        await clerkClient.users.updateUserMetadata(userId,{
            privateMetadata: {
                free_usage : free_usage + 1
            }
        })
    }

    res.json({success:true, content})


    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}



export const generateBlogTitle = async (req,res) => {
    try {
        const { userId } = req.auth()
        const { prompt } =  req.body
        const plan = req.plan
        const free_usage = req.free_usage

        if(plan !== 'premium' && free_usage >= 20){
            return res.json({ success:false, message : 'Limit reached. Upgrade to continue.'})
        }

    const response = await openai.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [
        {
            role: "user",
            content: prompt,
        },
    ],
    temperature : 0.7,
    max_tokens : 100
});

    const content = response.choices[0].message.content

    await sql ` INSERT INTO creations (user_id, prompt, content, type) 
    VALUES (${userId},${prompt},${content}, 'blog-title')`;



    if(plan !== 'premium'){
        await clerkClient.users.updateUserMetadata(userId,{
            privateMetadata: {
                free_usage : free_usage + 1
            }
        })
    }

    res.json({success:true, content})


    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}



export const generateImage = async (req,res) => {
    try {
        const { userId } = req.auth()
        const { prompt, publish } =  req.body
        const plan = req.plan
        

        if(plan !== 'premium' && free_usage >= 20){
            return res.json({ success:false, message : 'This feature is only available for premium subscriptions.'})
        }

        const formData = new FormData()
        formData.append('prompt', prompt)
        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1",formData, {
            headers : {'x-api-key':process.env.CLIPDROP_API_KEY},
            responseType : "arraybuffer"
        }) 

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`


        const {secure_url} =  await cloudinary.uploader.upload(base64Image)



    await sql ` INSERT INTO creations (user_id, prompt, content, type, publish) 
    VALUES (${userId},${prompt},${secure_url}, 'image', ${publish ?? false})`;

    res.json({success:true, content:secure_url})


    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}



export const removeImageBackground = async (req,res) => {
    try {
        const { userId } = req.auth()
        const  image  = req.file
        const plan = req.plan
        

        if(plan !== 'premium' && free_usage >= 20){
            return res.json({ success:false, message : 'This feature is only available for premium subscriptions.'})
        }

        // Convert buffer to base64 for Cloudinary upload (memory storage compatibility)
        const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
        
        const {secure_url} = await cloudinary.uploader.upload(base64Image, {
            transformation : [ 
                {
                    effect : 'background_removal',
                    background_removal : 'remove_the_background'
                }
            ]
        })

    await sql ` INSERT INTO creations (user_id, prompt, content, type ) 
    VALUES (${userId},'Remove background from image',${secure_url}, 'image' )`;

    res.json({success:true, content:secure_url})


    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}




export const removeImageObject = async (req,res) => {
    try {
        const { userId } = req.auth()
        const { object } =req.body
        const  image  = req.file
        const plan = req.plan
        

        if(plan !== 'premium' && free_usage >= 20){
            return res.json({ success:false, message : 'This feature is only available for premium subscriptions.'})
        }

        // Convert buffer to base64 for Cloudinary upload (memory storage compatibility)
        const base64Image = `data:${image.mimetype};base64,${image.buffer.toString('base64')}`;
        
        const {public_id} = await cloudinary.uploader.upload(base64Image)

        const imageUrl = cloudinary.url(public_id,{
            transformation : [{effect: `gen_remove:${object}`}],
            resource_type : 'image',
        })

    await sql ` INSERT INTO creations (user_id, prompt, content, type ) 
    VALUES (${userId},${`Remove ${object} from image`},${imageUrl}, 'image' )`;

    res.json({success:true, content:imageUrl})


    } catch (error) {
        console.log(error.message)
        res.json({success:false,message:error.message})
    }
}
