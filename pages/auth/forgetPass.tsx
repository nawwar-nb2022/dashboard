import BlankLayout from "@/components/Layouts/BlankLayout"
import style from "@/styles/login.module.css"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"

const ForgetPass = () => {

    const [inputs , setInputs] = useState({
        email : "",
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
                                Forget Password
                            </div>

                                <fieldset>
                                    <legend>E-mail</legend>
                                    <input type="email" 
                                        name="email" value={inputs.email} 
                                        onChange={handleChange}
                                    />
                                </fieldset>

                            <div className={style.btnContainer}>
                                <button type="submit"
                            style={{margin:"auto"}}>
                                    Reset
                                </button>
                            </div>

                        </form>
                </div>

            </div>            
        </div>
    )
}


ForgetPass.getLayout = (page :any) =>{
    return <BlankLayout>{page}</BlankLayout>
}
export default ForgetPass
