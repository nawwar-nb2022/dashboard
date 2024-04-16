
import headerStyle from "@/styles/headerTitle.module.css"
import style from "@/styles/updateOffers.module.css"
import { useRouter } from "next/router"
import React, {  useState } from "react"
import Select from 'react-select';


import { FileInput } from '@mantine/core';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';


import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "@/store";

interface inputsType {
    eName : string,
    aName : string,
    pValue : number ,
    isFeatured : boolean,
    company : string,
    Choose : string,
    sDate : any ,
    eDate : any,
    image :  File | null | string
}

const ChooseArray = [
    {value : "Brand" , label : "Brand"}, 
    {value : "Category" , label : "Category"}, 
    {value : "Product" , label : "Product"} 
]
const UpdateOffer = () => {

    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    const {query} = useRouter()

    const [inputs , setInputs] = useState<inputsType>({
        eName : "",
        aName : "",
        pValue : 0,
        isFeatured : false,
        company: "",
        Choose : "", //select item depend on other select
        sDate : "",
        eDate : "",
        image : null,
        })

 
    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        let name = e.target.name 
        let value = e.target.value 

        setInputs(prev=>({...prev , [name] : value}))
    }

    const [ChooseData , setChooseData]= useState<{value : string , label : string}[] | []>([])
    const [chooseLabel  , setChooseLabel] = useState<string>("")
    const handleChooseOption = (e: any) =>{
        setChooseLabel(e.value)
        if(e.value == "Brand"){
            setChooseData([
                {value: "f" , label :"Brand f"},
                {value: "a" , label :"Brand"},
                {value: "f" , label :"g"},
            ])
        }else if (e.value == "Category" ){
            setChooseData([
                {value: "f" , label :"Category"},
                {value: "a" , label :"d"},
                {value: "f" , label :"g"},
            ])
            
        } else {
            setChooseData([
                {value: "f" , label :"Product"},
                {value: "a" , label :"d"},
                {value: "f" , label :"g"},
            ])
        }
    }


    const handleImageChange = (e : File | null)=>{
        setInputs(prev=>{
            return ({...prev , ['image'] : e})
        })
    }

    const  handleSubmit = (e : React.FormEvent)=>{
        e.preventDefault()
        // console.log(inputs)
    }
    return (
        <>
        <div className={headerStyle.HeaderSetting}>
            <h1 className={headerStyle.header}>{query.id} should be the offer name </h1>  
        </div>

        <div className={style.formContainer}>
            <form onSubmit={(e)=>handleSubmit(e)}>
                    <div className={style.row}>
                        <label htmlFor="eName">Offer English Name</label>
                        <input type="text" name="eName" id="eName" value={inputs.eName} 
                            onChange={e=>handleChange(e)}
                        />
                    </div>
                    <div className={style.row}>
                        <label htmlFor="aName">Offer Arabic Name</label>
                        <input type="text" name="aName" id="aName" value={inputs.aName} 
                            onChange={e=>handleChange(e)}
                        />
                    </div>

                    <div className={style.GridGroup}>
                        <div className={style.inputGroup}>
                            <label htmlFor="pValue">Percent Value</label>
                            <input type="number" name="pValue" id="pValue" value={inputs?.pValue}
                              onChange={e=>handleChange(e)}
                            />
                        </div>
                        <div className={style.switchContainer}>
                            <label className="w-12 h-6 relative">
                                <input type="checkbox" 
                                checked={inputs.isFeatured}
                                onChange={(e)=>setInputs(prev=>({...prev , ["isFeatured"] : e.target.checked}))}
                                className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" 
                                id="custom_switch_checkbox1" />
                                <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                            </label>
                        </div>
                    </div>

                    
                    <div className={style.row}>
                        <label htmlFor="company">Company</label>
                        <input type="text" name="company" id="company" value={inputs.company} 
                            onChange={e=>handleChange(e)}
                        />
                    </div>
                    
                    
                    <div className={style.row}>
                        <label htmlFor="choose" >Choose an element</label>
                        <Select styles={{control: (baseStyle , state)=>({
                                    ...baseStyle , borderRadius:"15px"
                                })}} 
                             placeholder="Select an option" id="choose" 
                             options={ChooseArray}  
                             onChange={(e : any)=>{handleChooseOption(e)}}
                        />
                    </div>
                    {chooseLabel &&
                    <div className={style.SelectContainer}>
                            <div>
                        <label> {chooseLabel}</label>
                        <Select styles={{control: (baseStyle , state)=>({
                                    ...baseStyle , borderRadius:"15px"
                                })}} 
                             placeholder="Select an option" id="" 
                             options={ChooseData}  
                             onChange={(e : any)=>{setInputs(prev=>({...prev , ["Choose"] : e.value}))}}
                        />
                            </div>
                    </div>}

                    <div className={style.GridGroup}>
                        <div className={style.inputGroup}>
                            <label htmlFor="pValue">Start Date</label>
                            <Flatpickr value={inputs.sDate} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" 
                            onChange={(date) => setInputs(prev=>({...prev, ["sDate"] : date}))} />
                        
                        </div>
                    
                        <div className={style.inputGroup}>
                            <label htmlFor="pValue">End Date</label>
                            <Flatpickr value={inputs.eDate} options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} className="form-input" 
                            onChange={(date) => setInputs(prev=>({...prev, ["eDate"] : date}))} />
                        </div>
                    
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
                            Submit
                        </button>
                </div>
            </form>
        </div>
        </>
    )
}

export default UpdateOffer
