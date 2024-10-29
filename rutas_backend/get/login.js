import { botones } from "../../controaldores/botones.js"
const login = (req,res)=>{
   res.status(200).render('login.hbs', {botones})
}


export{
   login
}