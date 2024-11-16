import { encriptar } from "../../controaldores/controladores.js";

const registro_post = (req, res) => {
    res.status(200).json({ status: "ok", redirect: "/login" });
};

export { registro_post };