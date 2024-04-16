import BlankLayout from "@/components/Layouts/BlankLayout"
import style from "@/styles/login.module.css"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

interface inputsType  {
    email : string ;
    pass : string
}
const Login = () => {

    const [inputs , setInputs] = useState<inputsType>({
        email : "",
        pass : ""
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        let name = e.target.name ;
        let value = e.target.value ;

        setInputs(prev=>({...prev , [name] : value }))
    }

    const handleSubmit = (e : React.FormEvent) =>{
        e.preventDefault()

        console.log(inputs)
    }
    return (
        <div className={style.LoginWrapper}> 
            <div className={style.LoginContainer}>
                
                <div className={style.ImageContainer}>
                    <Image alt="logo" 
                           width="200"
                           height="200"
                           src="/"
                    />
                </div>
                <div className={style.formContainer}>
                        <div className={style.logoTitle}>
                            <Image alt="logo"
                                    width="200"
                                    height="200"
                                    src="/"
                                />
                        </div>

                        <form onSubmit={handleSubmit}>

                            <div className={style.FormTitle}>
                                Login
                            </div>

                                <fieldset>
                                    <legend>E-mail</legend>
                                    <input type="email" 
                                        name="email" value={inputs.email} 
                                        onChange={handleChange}
                                    />
                                </fieldset>

                                <fieldset>
                                    <legend>Password</legend>
                                    <input type="password" 
                                        name="pass" value={inputs.pass} 
                                        onChange={handleChange}
                                    />
                                </fieldset>

                            <div className={style.btnContainer}>
                                <Link href="/auth/forgetPass">
                                    Forget Password ?
                                </Link>
                                <button type="submit">
                                    Login
                                </button>
                            </div>

                        </form>
                </div>

            </div>            
        </div>
    )
}


Login.getLayout = (page :any) =>{
    return <BlankLayout>{page}</BlankLayout>
}
export default Login
