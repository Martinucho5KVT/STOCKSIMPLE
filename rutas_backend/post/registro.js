
const registro_post = (req,res)=>{
    console.log(req.body.contra)
    res.status(200).json({ redirect: "/login" })
}


export{
    registro_post
}