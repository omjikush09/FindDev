import { PrismaClient } from "@prisma/client";
import { Request,Response } from "express"

const prisma=new PrismaClient();
export const getUser=async(req:Request,res:Response)=>{
    // const userId=req.auth.userId
    console.log(JSON.stringify(req.user))
    const user=req?.user;
    const id=user?.id;
    const data=await prisma.user.findUnique({
        where:{
            id
        }
    })

    return res.send(data)
}


export const updateProfile=async (req:Request,res:Response)=>{
    const user=req?.user;
    // const id=user?.id;
    const id=user?.id;
    // console.log(user);
    const body=req.body
    try {
        const updateUser = await prisma.user.update({
            where: {
              id,
            },
            data: {
               name:body.name,
               description:body.description,
               profession:body.profession,
               availableFor:body.availableFor,
               social:body.social
            },
          })
    
          return res.send(updateUser);
    } catch (error) {
        console.log(error)
        return res.status(400).json({"error":"Something wrong with payload"})
    }
   
}
// Get all users
export const getAllUsers=async (req:Request,res:Response)=>{

    const query=req.query
    const profession= query.profession=="student"? "student":"working" 
    console.log(profession)
    // console.log(query)

    try {
        const users=await prisma.user.findMany({
            where:{
                profession
            },
            select:{
                id:true,
                name:true,
                social:true,
                description:true
            }
        })
        return res.json(users)
    } catch (error) {
        return res.status(400).json({error})
    }
}


export const hello=(req:Request,res:Response,next:CallableFunction)=>{
    console.log('hello')
// console.log(GOOGLE_KEY.clientID)
    console.log(JSON.stringify(req.cookies))
// console.log(req.cookies)
    next()
    // res.send("middlreware")
}


//upadate lanuage
export const updateUserLanguage=async (req:Request,res:Response)=>{
    const userId=req.user?.id 
    const body =req.body;
    try {
        const language= await prisma.language.update({
            where:{
                userId
            },
        data:body,
    })
    // console.log(language)
    return res.json(language)
 } catch (error) {
    console.log("he")
    try {
        const language= await prisma.language.create({
        
        data:{...body,userId},
    })
    return res.json(language)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error});
    }
    }
}

