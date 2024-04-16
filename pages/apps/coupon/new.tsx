import { useRouter } from "next/router"

import headerStyle from "@/styles/headerTitle.module.css"
import style from "@/styles/updateCoupon.module.css"
import React, { useState } from "react"


import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from "@/store";

interface inputsType { 
    pValue : number , 
    maxDiscount : number , 
    codeType : string,
    sDate : string | any ,
    eDate  :string | any ,
    cType : "product" | "category",
    usageLimit : string,
    published : boolean, 
}

const NewCoupon = () => {

    const dispatch = useDispatch();
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;
    const [date1, setDate1] = useState<any>('2022-07-05');

    const [inputs , setInputs] = useState<inputsType>({
        pValue : 0,
        maxDiscount : 0,
        codeType : "",
        published : true, 
        sDate : "",
        eDate : "",
        cType : "product",
        usageLimit : "",
    })
    const handleSubmit = (e : React.FormEvent)=>{
        e.preventDefault()
        console.log(inputs)
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        let name = e.target.name 
        let value= e.target.value
        setInputs(prev=>({...prev , [name] : value}))
    }
    return (
        <>
            <div className={headerStyle.HeaderSetting}>
                <h1 className={headerStyle.header}>CREATE COUPON </h1>  
            </div>


            <div className={style.formContainer}>
                <form onSubmit={handleSubmit}>  
                
                    <div className={style.inputGroupContainer}>
                            <div className={style.title}>Type</div>
                            <div className={style.subTitle}>Coupon Value</div>
                            <div className={style.row}>
                                <div className={style.inputContainer}>
                                    <label htmlFor="pValue">percent value</label>
                                    <div className="flex">
                                        <input type="number" placeholder="" 
                                        className="form-input ltr:rounded-r-none rtl:rounded-l-none flex-1 ltr:rounded-l-md rtl:rounded-r-md" 
                                        name="pValue" id="pValue" value={inputs.pValue} onChange={handleChange}
                                        />
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-semibold border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            %
                                        </div>
                                    </div>
                                </div>

                                <div className={style.inputContainer}>
                                    <label htmlFor="maxDiscount">max Discount</label>
                                    <div className="flex">
                                        <input type="number" placeholder="" 
                                        className="form-input ltr:rounded-r-none rtl:rounded-l-none flex-1 ltr:rounded-l-md rtl:rounded-r-md" 
                                        name="maxDiscount" id="maxDiscount" value={inputs.maxDiscount} onChange={handleChange}
                                        />
                                        <div className="bg-[#eee] flex justify-center items-center ltr:rounded-r-md rtl:rounded-l-md px-3 font-light border ltr:border-l-0 rtl:border-r-0 border-white-light dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                            AED
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={style.subTitle}>Code</div>
                            
                            <div className={style.row}>
                                <label className="inline-flex">
                                    <input type="radio" className="form-checkbox peer"
                                        name="square_text_radio"
                                        value="auto generated"
                                        checked={inputs.codeType == "auto generated"}
                                        onChange={()=>{setInputs(
                                            prev=>({...prev , ["codeType"] : "auto generated"}))
                                             console.log(inputs.codeType)
                                        }
                                        } />
                                    <span className="peer-checked:text-primary">Auto generate</span>
                                </label>

                                <label className="inline-flex">
                                    <input type="radio" className="form-checkbox peer"  
                                    value=""
                                    checked={inputs.codeType !== "auto generated"}
                                    onChange={()=>{setInputs(
                                            prev=>({...prev , ["codeType"] : ""})
                                        )
                                     console.log(inputs.codeType)
                                    }}
                                    name="square_text_radio"/>
                                    <span className="peer-checked:text-primary">Enter Code</span>
                                </label>
                            </div>
                            { inputs.codeType != "auto generated" &&
                                <div className={style.inputContainer}>
                                        <label htmlFor="codeType">Enter code</label>
                                        <input type="text"  className={style.input}
                                        name="codeType" id="Code"
                                        value={inputs.codeType} onChange={handleChange}
                                        />
                                </div>
                            }

                            <div className={style.row}>
                               <div className={style.inputGroup}>
                                <p>published</p>
                                <label className="w-12 h-6 relative">
                                    <input 
                                        onChange={()=>{setInputs(prev=>({...prev, ["published"] : !inputs.published}))}}
                                        checked={inputs.published} name="published"
                                        type="checkbox" className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" id="custom_switch_checkbox1" />
                                    <span className="bg-[#ebedf2] dark:bg-dark block h-full rounded-full before:absolute before:left-1 before:bg-white dark:before:bg-white-dark dark:peer-checked:before:bg-white before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:bg-primary before:transition-all before:duration-300"></span>
                                </label>
                               </div>
                            </div>
                   
                    </div>
                    <div className={style.inputGroupContainer}>
                            <div className={style.title}>
                                Date
                            </div>

                            <div className={style.row}>
                                <div className="inputGroup">
                                    <label>
                                        start date
                                    </label>
                                    <Flatpickr value={inputs.sDate} 
                                    options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }}
                                    className="form-input" onChange={(date) => setInputs(prev=>({...prev , ["sDate"] : date}))} />
                                </div>
                                <div className="inputGroup">
                                    <label>
                                        end date
                                    </label>
                                    <Flatpickr value={inputs.eDate} 
                                    options={{ dateFormat: 'Y-m-d', position: isRtl ? 'auto right' : 'auto left' }} 
                                    className="form-input" onChange={(date) => setInputs(prev=>({...prev , ["eDate"] : date}))} />
                                </div>

                            </div>
                    </div>
                    <div className={`${style.inputGroupContainer} ${style.fullWidth}`}>
                            <div className={style.title}>
                                usage
                            </div>
                            <div className={style.subtitle}>
                                Couponable Type
                            </div>
                            <div className={style.row}>
                                 <label className="inline-flex">
                                    <input type="radio" className="form-checkbox peer"
                                        name="square_text_radio2"
                                        value="product"
                                        checked={inputs.cType == "product"}
                                        onChange={()=>setInputs(
                                            prev=>({...prev , ["cType"] : "product"}))
                                        } />
                                    <span className="peer-checked:text-primary">product</span>
                                </label>

                                 <label className="inline-flex">
                                    <input type="radio" className="form-checkbox peer"
                                        name="square_text_radio2"
                                        value="category"
                                        checked={inputs.cType == "category"}
                                        onChange={()=>setInputs(
                                            prev=>({...prev , ["cType"] : "category"}))
                                        } />
                                    <span className="peer-checked:text-primary">category</span>
                                </label>
                            </div>
                    
                            <div className={style.row}>
                                <label className="inline-flex">
                                    <input type="radio" className="form-checkbox peer"
                                        name="square_text_radio3"
                                        value=""
                                        checked={inputs.usageLimit != "UNLIMITED"}
                                        onChange={()=>{setInputs(
                                            prev=>({...prev , ["usageLimit"] : ""}))
                                             console.log(inputs.codeType)
                                        }
                                        } />
                                    <span className="peer-checked:text-primary">Enter Value</span>
                                </label>

                                <label className="inline-flex">
                                    <input type="radio" className="form-checkbox peer"  
                                    value="UNLIMITED"
                                    checked={inputs.usageLimit == "UNLIMITED"}
                                    onChange={()=>setInputs(
                                            prev=>({...prev , ["usageLimit"] : "UNLIMITED"})
                                        )}
                                    name="square_text_radio3"/>
                                    <span className="peer-checked:text-primary">UNLIMITED</span>
                                </label>
                            </div>
                            { inputs.usageLimit != "UNLIMITED" &&
                                <div className={style.inputContainer}>
                                        <label htmlFor="usageLimit">Enter Value</label>
                                        <input type="text"  className={style.input}
                                         name="Code" id="usageLimit"
                                        value={inputs.usageLimit}
                                        onChange={handleChange}
                                         />
                                </div>
                            }
                    </div>

                    <div className={style.btnContainer}>
                        <button type="submit">submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default NewCoupon
