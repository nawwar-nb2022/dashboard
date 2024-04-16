
import { useRouter } from "next/router"

import style from "@/styles/updateCat.module.css"
import Image from "next/image"
import React, { useEffect, useState } from "react"


import { FileInput } from '@mantine/core';
import dynamic from "next/dynamic";


const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css';

interface inputType {
    eName : string ,
    eDesc : string ,
    aName : string ,
    aDesc : string ,
    image : File | null | string
}
const UpdateCat = () => {
    const {query} = useRouter()

    const [tabs ,setTabs] = useState<string>("basic")

    const [inputs ,setInputs ] = useState<inputType>({
        eName : "",
        eDesc : "",
        aName : "",
        aDesc : "",
        image : ""
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        let name = e.target.name
        let value = e.target.value

        setInputs(prev=>({...prev , [name] : value}))
    }

    const handleImageChange = (e : File | null)=>{
        setInputs(prev=>{
            return ({...prev , ['image'] : e})
        })
    }

    const handleSubmit = (e : React.FormEvent)=>{
        e.preventDefault()

        console.log(inputs)
    }


    return (
        <>
        <div className={style.HeaderSetting}>
            <h1 className={style.Header}>
                {query.id}
            </h1>  

        <div className={style.tabSection}>
            <button onClick={()=>setTabs("basic")}>Basic Details</button>
            <button onClick={()=>setTabs("meta")}>Meta Data</button>
        </div>
        

        </div>
    
        {tabs == "basic" ? 
            <div className={style.Basic}>
                <div className={style.imageSection}>
                    <Image
                        width="150"
                        height ="150"
                        src="/catname"
                        alt="cat"
                    />    
                </div>  

                <form onSubmit={handleSubmit}>
                    <div className={style.row}>
                        <fieldset>
                            <legend> {" "} Blog Category English Name {" "}</legend>
                            <input type="text" name="eName" id="eName"
                                value={inputs.eName} onChange={(e)=>handleChange(e)}
                            />
                        </fieldset>
                    </div>

                    <div className={style.row}>
                        <fieldset>
                            <legend> {" "} Blog Category English Name {" "}</legend>
                            <ReactQuill theme="snow" value={inputs.eDesc} onChange={(e)=>{
                                setInputs(prev=>({...prev , ['eDesc'] : e }))
                            }} />     

                        </fieldset>
                    </div>
                    <div className={style.row}>
                        <fieldset>
                            <legend> {" "} Blog Category Arabic Name {" "}</legend>
                            <input type="text" name="aName" id="aName"
                                value={inputs.aName} onChange={(e)=>handleChange(e)}
                            />
                        </fieldset>
                    </div>

                    <div className={style.row}>
                        <fieldset>
                            <legend> {" "} Blog Category Arabic Name {" "}</legend>
                            <ReactQuill theme="snow" value={inputs.aDesc} 
                            style={{border:"none"}}
                            onChange={(e)=>{
                                setInputs(prev=>({...prev , ['aDesc'] : e }))
                            }} />                       
                        </fieldset>
                    </div>


                    <div className={style.row}>
                        <fieldset>
                            <legend> {" "}Image{" "}</legend>
                            <FileInput
                            style={{border :"0px solid white"}}
                                // value={value} 
                                onChange={e=>handleImageChange(e)}
                            />                     
                        </fieldset>
                    </div>

                    <div className={style.btnContainer}> 
                            <button type="submit">
                                save
                            </button>
                    </div>
                </form>
            </div>
        :
            <div className={style.MetaSection}> 
                <span className="animate-spin border-4 border-primary border-l-transparent rounded-full  w-6 h-6 inline-block align-middle m-auto mb-10"></span>
            </div>

        }
        </>
    )
}

export default UpdateCat
