import { useRouter } from "next/router"
import headerStyle from "@/styles/headerTitle.module.css"
import style from "@/styles/career.module.css"
import React, { useState } from "react"

const ReactQuill = dynamic(()=>import('react-quill') , {ssr: false})
import 'react-quill/dist/quill.snow.css';


import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "@/store";
import { FileInput } from "@mantine/core";
import Image from "next/image";
import dynamic from "next/dynamic";

interface inputsType {
     aName: string;
    aType: string;
    aBenefit: string;
    aDesc: string;
    eName: string;
    eType: string;
    eBenefit: string;
    eDesc: string;
    sDate: any;
    eDate : any ;
    salary : string ,
    image : File | null | string
}

const NewCareer = () => {
    const {query} = useRouter()

    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const [inputs , setInputs] = useState<inputsType>({
        aName : "",
        aType : "",
        aBenefit : "",
        aDesc : "",
        eName : "",
        eType : "",
        eBenefit : "",
        eDesc : "",
        sDate : "",
        eDate : "",
        salary : "",
        image : "",
    })


    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        let name = e.target.name ;
        let value = e.target.value ;


        setInputs(prev=>({...prev , [name] : value}))
    }

    const handleSubmit = (e :React.FormEvent) =>{
        e.preventDefault()
        
        console.log(inputs)
    }
    return (
        <>
            <div className={headerStyle.HeaderSetting}>
                <h1 className={headerStyle.header}>Create career </h1>  
            </div>

            <div className={style.formContainer}>
                <form onSubmit={handleSubmit}>


                    <div className={style.row}>
                        <label htmlFor="aName">
                            Arabic Name
                        </label>
                        <input type="text" name="aName" value={inputs.aName}
                            id="aName" onChange={handleChange}
                        />
                    </div>
                    
                    <div className={style.row}>
                        <label htmlFor="aType">
                            Arabic Type
                        </label>
                        <input type="text" name="aType" value={inputs.aType}
                            id="aType" onChange={handleChange}
                        />
                    </div>

                    <div className={style.row}>
                        <label htmlFor="aBenefit">
                            Arabic Benefit
                        </label>
                        <input type="text" name="aBenefit" value={inputs.aBenefit}
                            id="aBenefit" onChange={handleChange}
                        />
                    </div>
                    <div className={style.row}>
                        <label htmlFor="aDesc">
                            Arabic Description
                        </label>
                        <ReactQuill theme="snow"  id="aDesc" value={inputs.aDesc} onChange={
                            (e : string)=>setInputs(prev=>({...prev , ["aDesc"] : e}))
                        } />
                    </div>

                    <div className={style.row}>
                        <label htmlFor="eName">
                            English Name
                        </label>
                        <input type="text" name="eName" value={inputs.eName}
                            id="eName" onChange={handleChange}
                        />
                    </div>

                    <div className={style.row}>
                        <label htmlFor="eType">
                            English Type
                        </label>
                        <input type="text" name="eType" value={inputs.eType}
                            id="eType" onChange={handleChange}
                        />
                    </div>

                    <div className={style.row}>
                        <label htmlFor="eBenefit">
                            English Benefit
                        </label>
                        <input type="text" name="eBenefit" value={inputs.eBenefit}
                            id="eBenefit" onChange={handleChange}
                        />
                    </div>
                    
                    <div className={style.row}>
                        <label htmlFor="aBenefit">
                            English Description
                        </label>
                        <ReactQuill theme="snow" value={inputs.eDesc} onChange={
                            (e : string)=>setInputs(prev=>({...prev , ["eDesc"] : e}))
                        } />
                    </div>

                    <div className={style.row}>
                        <label htmlFor="sDate"> From Date </label>
                        <Flatpickr value={inputs.sDate} id="sDate"
                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} 
                        className="form-input" onChange={(date) => setInputs(prev=>({...prev , ["sDate"] : date}))} />

                    </div>

                    <div className={style.row}>
                        <label htmlFor="eDate"> To Date </label>
                        <Flatpickr value={inputs.eDate} id="eDate"
                        options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} 
                        className="form-input" onChange={(date) => setInputs(prev=>({...prev , ["eDate"] : date}))} />

                    </div>

                    <div className={style.row}>
                        <label htmlFor="image"> Image </label>
                         <FileInput  id="image" onChange={
                             (file)=>setInputs(prev=>({...prev , ["image"] :file }))
                         } />   
                    </div>


                    <div className={style.btnContainer}>
                        <button type="submit">submit</button>
                    </div>
                </form>

            </div>
        </>
    )
}

export default NewCareer
