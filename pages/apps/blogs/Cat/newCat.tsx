
import headerStyle from "@/styles/headerTitle.module.css"
import style from "@/styles/NewCat.module.css"

import React, { useState } from "react"
import Select from 'react-select';

import { FileInput } from '@mantine/core';

const options = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];
interface inputsType {
    eName : string,
    eDesc : string ,
    aName : string ,
    aDesc : string ,
    company : string ,
    image : File | null | string 
}

const NewCat = () => {

    const [inputs  , setInputs] = useState<inputsType>({
        eName : "",
        eDesc : "",
        aName : "",
        aDesc : "",
        company : "",
        image : ""
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
        let name = e.target.name 
        let value = e.target.value 

        setInputs(prev=>({...prev , [name] : value}))
    }

    const handleSubmit = (e : React.FormEvent)=>{
        e.preventDefault()

        console.log(inputs)
    }

    const handleImageChange = (e : File | null)=>{
        setInputs(prev=>{
            return ({...prev , ['image'] : e})
        })
    }
    return (
        <>
        <div className={headerStyle.HeaderSetting}>
            <h1 className={headerStyle.header}>should be the offer name </h1>  
        </div>


        <div className={style.FormContainer}>
            <form onSubmit={handleSubmit}>

                <div className={style.row}>
                    <label htmlFor="eName">Blog Category English Name</label>
                    <input type="text" name="eName" id="eName"
                        value={inputs.eName}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="eDesc">Blog Category English Description</label>
                    <input type="text" name="eDesc" id="eDesc"
                        value={inputs.eDesc}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="aName">Blog Category Arabic Name</label>
                    <input type="text" name="aName" id="aName"
                        value={inputs.aName}
                    />
                </div>
                <div className={style.row}>
                    <label htmlFor="aDesc">Blog Category Arabic Description</label>
                    <input type="text" name="aDesc" id="aDesc"
                        value={inputs.aDesc}
                    />
                </div>

                <div className={style.row}>
                    <label htmlFor="company">company</label>
                    <Select placeholder="Select an option" options={options} 
                        onChange={(e : any)=>{setInputs(prev=>({...prev, ['company'] : e.value}))}}
                    />
                </div>

                <div className={style.row}>
                    <FileInput
                        label="Image"
                        // value={value} 
                        onChange={e=>handleImageChange(e)}
                    />
                </div>



                <div className={style.btnContainer}>
                    <button type="submit">
                        submit
                    </button>
                </div>


            </form>
        </div>
        </>
    )
}

export default NewCat
