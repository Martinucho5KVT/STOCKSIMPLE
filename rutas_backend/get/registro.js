import { botones } from "../../controaldores/botones.js"
const registro = (req,res)=>{
    res.status(200).render("registro.hbs",{botones})
}


export{
    registro
}