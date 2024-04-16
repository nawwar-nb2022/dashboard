
import headerStyle from "@/styles/headerTitle.module.css"
import style from "@/styles/BlogList.module.css"
import React, { useState } from 'react';
const ReactQuill = dynamic(()=>import('react-quill'), {ssr:false})
import 'react-quill/dist/quill.snow.css';
import Select from 'react-select';


import { FileInput } from '@mantine/core';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "@/store";
import dynamic from "next/dynamic";

// static data

const options = [
    { value: 'orange', label: 'Orange' },
    { value: 'white', label: 'White' },
    { value: 'purple', label: 'Purple' },
];


interface inputsType {
    eTitle : string,
    eLDesc : string,
    eSDesc : string,
    aTitle : string,
    aLDesc : string,
    aSDesc : string,
    cat : string,
    date : any,
    active : boolean
}
const NewList = () => {


    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const  [inputs , setInputs] = useState<inputsType>({
        eTitle :"",
        eLDesc : "",
        eSDesc : "",
        aTitle :"",
        aLDesc : "",
        aSDesc : "",
        cat : "",
        date : "",
        active : true
    })
    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | string)=>{
        if(typeof(e) != "string" ){     
            let name = e?.target.name
            let value = e?.target.value    
           setInputs(prev=>({...prev , [name] : value}))
        }
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
        <div className={headerStyle.HeaderSetting}>
            <h1 className={headerStyle.header}> CREATE BLOG </h1>  
        </div>

          <div className={style.FormContainer}>
              <form onSubmit={handleSubmit}>
                <div className={style.row}>
                    <label htmlFor="eTitle"> Blog English Title </label>
                    <input type="text" name="eTitle" id="eTitle"
                    value={inputs.eTitle} onChange={handleChange}
                    />
                </div>

                <div className={style.row}>
                    <label htmlFor="eLDesc"> English Description </label>
                    <ReactQuill theme="snow" value={inputs.eLDesc} onChange={ e=>{
                        setInputs(prev=>({...prev , ["eLDesc"] : e}))
                    }} />  
                    </div>
                <div className={style.row}>
                    <label htmlFor="eSDesc"> English Short Description </label>
                    <input type="text" name="eSDesc" id="eSDesc"
                    value={inputs.eSDesc} onChange={handleChange}
                    />
                </div>
                
                <div className={style.divider}></div>
                
                <div className={style.row}>
                    <label htmlFor="aTitle"> Blog Arabic Title </label>
                    <input type="text" name="aTitle" id="aTitle"
                    value={inputs.aTitle} onChange={handleChange}
                    />
                </div>

                <div className={style.row}>
                    <label htmlFor="aLDesc"> Arabic Description </label>
                    <ReactQuill theme="snow" value={inputs.aLDesc} onChange={ e=>{
                        setInputs(prev=>({...prev , ["aLDesc"] : e}))
                    }} />  
                    </div>
                <div className={style.row}>
                    <label htmlFor="aSDesc"> Arabic Short Description </label>
                    <input type="text" name="aSDesc" id="aSDesc"
                    value={inputs.eSDesc} onChange={handleChange}
                    />
                </div>

                <div className={style.divider}></div>

                <div className={style.row}>
                    <label htmlFor="cat">Category</label>
                    <Select placeholder="Select an option" options={options}
                    id="cat" onChange={
                        (e : any )=>setInputs(
                            prev=>({...prev, ["cat"] : e?.value})
                            )}
                     />
                </div>

                <div className={style.row}>
                    <label htmlFor="date"> Post date</label>
                    <Flatpickr value={inputs.date} 
                    options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} 
                    className="form-input" onChange={(e) =>{
                        setInputs( prev=>({...prev , ["date"] : e })
                        )}
                    }/>
                </div>

                <div className={style.row}>
                        <FileInput
                            label="Image"
                            onChange={e=>handleImageChange(e)}
                        />
                </div>


                <div className={style.row}>
                    <p>Activate</p>
                    <label className="w-12 h-6 relative">
                        <input type="checkbox" 
                        checked={inputs.active}
                        onChange={(e)=>setInputs(prev=>({...prev , ["active"] : e.target.checked}))}
                        className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" 
                        id="custom_switch_checkbox1" />
                        <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                    </label>
                </div>

                <div className={style.btnContainer}>
                        <button type="submit">
                            Submit
                        </button>
                </div>
              </form>
          </div>


        
        </>
    )
}

export default NewList
