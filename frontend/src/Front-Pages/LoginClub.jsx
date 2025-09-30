// import React from "react";
// import {useFormik} from "formik";
// import { useState, useEffect } from "react";
// import * as Yup from "yup";

// export default function LoginClub(){
//     const [submitData,setSubmitData] = useState(null);


//     const formik = useFormik({
//         initialValues: {
//             username:"",
//             password:"",
//         },
//         enableReinitialize:true,
//         validationSchema: Yup.object().shape({
//             username: Yup.string().required('Username is required'),
//             password: Yup.string()
//              .min(8,'Password must be at least 8 characters')
//              .required('Password is required')
//              .matches(/[A-Z]/, 'Must contain uppercase')
//              .matches(/[a-z]/, 'Must contain lowercase')
//              .matches(/[0-9]/, 'Must contain number'),
//         }),
//         onSubmit: (values) =>{
//             setSubmitData(values);
//         },
//     })
//     return(
//         <div>
//             <div>
//                 <form action="">
//                     <div>
//                         <label htmlFor="">Username</label>
//                         <input type="email" />
//                     </div>
//                     <div>
//                         <label htmlFor="">Password</label>
//                         <input type="password" />
//                     </div>
//                 </form>
//             </div>
//         </div>
//     )
// }