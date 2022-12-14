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
    const newQuery={}
    const newQueryLooking={}
    for (const q in query){
        console.log(q);
        
        if(q==="profession"){
           continue
        }else if(q=== "hackathon" ||  q==="competative_programing" || q==="dsa" ){
            Object.assign(newQueryLooking,{[q]:true})
            continue;
        }
        Object.assign(newQuery,{[q]:true})
    }
    console.log(newQuery)
   
    try {
        const users=await prisma.user.findMany({
            where:{
                profession,
                Language:newQuery,
                Looking:newQueryLooking
            },
            select:{
                id:true,
                name:true,
                social:true,
                description:true,
                email:true,
                Language:true
                
            }, 
        })
        return res.json(users)
    } catch (error) {
        console.log(error)
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

//upadate looking
export const updateUserLooking=async (req:Request,res:Response)=>{
    const userId=req.user?.id 
    const body =req.body;
    try {
        const language= await prisma.looking.update({
            where:{
                userId
            },
        data:body,
    })
    // console.log(language)
    return res.json(language)
 } catch (error) {

    try {
        const language= await prisma.looking.create({
        
        data:{...body,userId},
    })
    return res.json(language)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error});
    }
    }
}


export const updateUserMonth=async (req:Request,res:Response)=>{
    const userId=req.user?.id 
    const body =req.body;
    try {
        const month= await prisma.month.update({
            where:{
                userId
            },
        data:body,
    })
    // console.log(language)
    return res.json(month)
 } catch (error) {

    try {
        const month= await prisma.month.create({
        
        data:{...body,userId},
    })
    return res.json(month)
    } catch (error) {
        console.log(error)
        return res.status(400).json({error});
    }
    }
}

