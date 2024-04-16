"use client"
import { useRouter } from "next/router"


import Flatpickr from 'react-flatpickr';
import Select from 'react-select';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';


import headerStyle from "@/styles/headerTitle.module.css"
import style from "@/styles/updateUser.module.css"
import React, { useEffect, useState } from "react"
import { IRootState } from "@/store";

//  static data
const options = [
    {value : "a" , label : "a"},
    {value : "b" , label : "b"},
    {value : "c" , label : "c"},
    {value : "d" , label : "d"},
    {value : "e" , label : "e"},
    {value : "f" , label : "f"},
    {value : "" , label : ""},
]
const ActiveArray = [
    {value  : true , label :"Yes"},
    {value  : false , label :"No"},
]



interface inputsType {
            fName :string,
        sName : string ,
        mName : string,
        lName : string,
        email : string,
        pNumber :number,
        iNumber : number,
        nationally : string,
        country : string,
        dBirth : any,
        Active : true,
        role: string
}

const New = () => {
    const {query} = useRouter()
    let role = query.role
    const [RoleArray , setRoleArray] = useState<{value:string , label : string}[]>([])
    useEffect(()=>{
        if ( role == "admin"){
           setRoleArray([
               {value : "admin" , label :"admin"} ,
                {value : "superAdmin"  ,label:"superAdmin"}
            ])
        }else{
            setRoleArray([{value : "user" , label : "user"}])
        }
    },[query.role])



    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [inputs , setInputs] = useState<inputsType>({
        fName : "",
        sName : "",
        mName : "",
        lName : "",
        email : "",
        pNumber :0,
        iNumber : 0,
        nationally : "",
        country : "",
        dBirth : "",
        Active : true,
        role: "",
    })

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        let val = e.target.value ;
        let name = e.target.name ;

        setInputs( (prev)=>{
            return ({...prev , [name] : val })
        })
    }


    const handleSubmit = (e:React.FormEvent)=>{
        e.preventDefault()
        console.log(inputs)
    }
    return (
        <>

        <div className={headerStyle.HeaderSetting}>
            <h1 className={headerStyle.header}>CREATE USER </h1>  
        </div>

        <div className={style.formContainer}>

                <form onSubmit={handleSubmit}>
                    <div className={`${style.GridInputContainer} ${style.row}`}>
                        <div className={style.inputGroup}>
                            <label htmlFor="fName"> First Name</label>
                            <input type="text" name="fName" id="fName" value={inputs.fName} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="sName"> Second Name</label>
                            <input type="text" name="sName" id="sName" value={inputs.sName} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="mName"> Middle Name</label>
                            <input type="text" name="mName" id="mName" value={inputs.mName} onChange={(e)=>handleChange(e)} />
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="lName"> last Name</label>
                            <input type="text" name="lName" id="lName" value={inputs.lName} onChange={(e)=>handleChange(e)} />
                        </div>
                    </div>
                    <div className={style.row}>
                        <label htmlFor="email">E-mail</label>
                        <input type="email" name="email" value={inputs.email}
                            onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div className={style.row}>
                        <label htmlFor="pNumber">phone Number</label>
                        <input type="number" name="pNumber" value={inputs.pNumber}
                            onChange={(e)=>handleChange(e)}/>
                    </div>
                    <div className={style.row}>
                        <label htmlFor="iNumber">Identity Number</label>
                        <input type="number" name="iNumber" value={inputs.iNumber}
                            onChange={(e)=>handleChange(e)}/>
                    </div>

                    <div className={`${style.GridInputContainer} ${style.row}`}>
                        <div className={style.inputGroup}>
                            <label htmlFor="dBirth"> Date of Birth</label>
                            <Flatpickr value={inputs.dBirth}  id="dBirth"
                            options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} 
                            className="form-input" onChange={(date) =>{
                                setInputs(prev=>({...prev,["dBirth"] : date}))
                            }} />  
                        </div>
                        <div className={style.inputGroup}>
                            <label htmlFor="nationally"> Nationally</label>

                            <Select 
                                styles={{control: (baseStyle , state)=>({
                                    ...baseStyle , borderRadius:"15px"
                                })}}
                            placeholder="Select an option" id="nationally" 
                             options={options}              
                             onChange={(e : any)=>{setInputs(prev=>({...prev, ["nationally"] : e.value}))
                            }}
                             />
                         </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="country"> country</label>

                            <Select styles={{control: (baseStyle , state)=>({
                                    ...baseStyle , borderRadius:"15px"
                                })}} 
                             placeholder="Select an option" id="country" 
                             options={options}  
                             onChange={(e : any)=>{setInputs(prev=>({...prev, ["country"] : e.value}))}}
                              />
                         </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="Role"> Role</label>
                            <Select styles={{control: (baseStyle , state)=>({
                                    ...baseStyle , borderRadius:"15px"
                                })}} 
                             placeholder="Select an option" id="role" 
                             options={RoleArray}  defaultValue ={RoleArray[0]} 
                             onChange={(e : any)=>{setInputs(prev=>({...prev, ["role"] : e.value}))}}
                              />
                        </div>

                        <div className={style.inputGroup}>
                            <label htmlFor="Active"> Active</label>

                            <Select styles={{control: (baseStyle , state)=>({
                                    ...baseStyle , borderRadius:"15px"
                                })}} 
                             placeholder="Select an option" id="Active" 
                             options={ActiveArray}  
                             onChange={(e : any)=>{setInputs(prev=>({...prev, ["Active"] : e.value}))}}
                              />


                         </div>
                    </div>

                    
                    <div className={style.row}>
                                <div className={style.btnContainer}>
                                  <button type="submit">
                                      save
                                  </button>
                                </div>
                    </div>


                </form>

        </div>                
        </>
    )
}

export default New
