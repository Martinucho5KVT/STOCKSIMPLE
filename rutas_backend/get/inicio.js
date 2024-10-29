import { tienda } from "../../controaldores/tienda.js" 
import { botones } from "../../controaldores/botones.js"

const inicio = (req,res)=>{
    res.status(200).render('index.hbs', {botones, tienda})
}



export {
    inicio
} 