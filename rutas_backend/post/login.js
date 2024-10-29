const login_post = (req,res)=>{
        console.log("los datos son :" + req.body)
    res.status(200).json({ redirect: "/" })
}


export{
    login_post
}