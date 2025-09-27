import jwt from "jsonwebtoken";


// api for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){

            const token = jwt.sign(email+password , process.env.JWT_SECRET);
            return res.status(200).json({ success: true, token});
        } else{
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
}


export { loginAdmin };