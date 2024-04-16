import { useRouter } from "next/router"

import headerStyle from "@/styles/headerTitle.module.css"
import style from "@/styles/updateCompany.module.css"
import Select from 'react-select';

import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/flatpickr.css';
import {  useSelector } from 'react-redux';
import { IRootState } from "@/store";
import { Accordion } from "@mantine/core";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(()=>import("react-quill") , {ssr: false})
import 'react-quill/dist/quill.snow.css';


const WeekDay = [
    {label : "Monday" , value: "Monday"},
    {label : "Tuesday" , value: "Tuesday"},
    {label : "Wednesday" , value: "Wednesday"},
    {label : "Thursday" , value: "Thursday"},
    {label : "Friday" , value: "Friday"},
    {label : "Saturday" , value: "Saturday"},
    {label : "Sunday" , value: "Sunday"},
]
const UpdateCompany = () => {
    const {query} = useRouter()
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl' ? true : false;

    return (
        <>
            <div className={headerStyle.HeaderSetting}>
                <h1 className={headerStyle.header}> {query.id} should be the company name </h1>  
            </div>



            <div className={style.MainContainer}>
                <div className={style.UpdateIMage}></div>
                <div className={style.UpdateLocalization}>
                    <h1 className={style.header}>Localization</h1>
                    <form>
                        <Accordion variant="filled" disableChevronRotation defaultValue="Apples">
                                <Accordion.Item key={0} value={"english"} >
                                    <Accordion.Control >English</Accordion.Control>
                                    <Accordion.Panel>
                                        <div className={style.inputContainer}>
                                            <label htmlFor="englishTitle"> Company English Title </label>
                                            <input type="text" id="englishTitle" name="englishTitle"/>
                                        </div>
                                        <div className={style.inputContainer}>
                                            <label htmlFor="englishDesc"> English Description </label>
                                            <ReactQuill theme="snow" 
                                            //     value={inputs.eDesc} onChange={(e)=>{
                                            //     setInputs(prev=>({...prev , ['eDesc'] : e }))
                                            // }}
                                             /> 
                                        </div>
                                        </Accordion.Panel>
                                </Accordion.Item>
                                <Accordion.Item key={1} value={"arabic"} >
                                    <Accordion.Control >Arabic</Accordion.Control>
                                    <Accordion.Panel>
                                        <div className={style.inputContainer}>
                                            <label htmlFor="ArabicTitle"> Company Arabic Title </label>
                                            <input type="text" id="ArabicTitle" name="ArabicTitle"/>
                                        </div>
                                        <div className={style.inputContainer}>
                                            <label htmlFor="ArabicDesc"> Arabic Description </label>
                                            <ReactQuill theme="snow" 
                                            //     value={inputs.eDesc} onChange={(e)=>{
                                            //     setInputs(prev=>({...prev , ['eDesc'] : e }))
                                            // }} 
                                            /> 
                                        </div>
                                    </Accordion.Panel>
                                </Accordion.Item>
                        </Accordion>
                        <div className={style.btnContainer}>
                            <button type="submit">save</button>
                        </div>
                    </form>
                </div>
                <div className={style.UpdateMedia}>
                    <h1 className={style.header}>Social media</h1>
                    <div className={style.FormGridContainer}>
                        <form>
                            <div className={style.inputContainer}>
                                <label htmlFor="facebook">Facebook</label>
                                <input type="text" name="facebook" id="facebook"/>
                            </div>
                            <div className={style.inputContainer}>
                                <label htmlFor="instagram">Instagram</label>
                                <input type="text" name="instagram" id="instagram"/>
                            </div>
                            <div className={style.inputContainer}>
                                <label htmlFor="whatsApp">WhatsApp</label>
                                <input type="text" name="whatsApp" id="whatsApp"/>
                            </div>
                            <div className={style.inputContainer}>
                                <label htmlFor="tiktok">Tiktok</label>
                                <input type="text" name="tiktok" id="tiktok"/>
                            </div>

                            <div className={style.btnContainer}>
                                <button type="submit">save</button>
                            </div>

                        </form>
                    </div>
                </div>
                <div className={style.Contact}>
                    <h1 className={style.header}>Contact Info</h1>
                    <div className={style.FormGridContainer}>
                        <form>
                            <div className={style.inputContainer}>

                                <p>Is Featured</p>
                                <label className="w-12 h-6 relative">
                                    <input type="checkbox" 
                                    className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" 
                                    id="custom_switch_checkbox1"
                                        // checked={data.featured}
                                        // onChange={(e)=>{handleSwitch(e, data.id)}}
                                    />
                                    <span className="outline_checkbox border-2 border-[#ebedf2] 
                                    dark:border-white-dark block h-full rounded-full before:absolute 
                                    before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 
                                    before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 
                                    peer-checked:border-primary peer-checked:before:bg-primary before:transition-all 
                                    before:duration-300"></span>
                                </label>
                            </div>

                            <div className={style.inputContainer}>
                                <label htmlFor="phone">Phone</label>
                                <input type="text" name="phone" id="phone"/>
                            </div>
                            <div className={style.inputContainer}>
                                <label htmlFor="email">E-mail</label>
                                <input type="text" name="email" id="email"/>
                            </div>
                            <div className={style.inputContainer}>
                                <label htmlFor="mobile">Mobile</label>
                                <input type="text" name="mobile" id="mobile"/>
                            </div>
                            
                            <div className={style.btnContainer}>
                                <button type="submit">save</button>
                            </div>
                        </form> 
                    </div>

                </div>
                <div className={style.updateWorkTime}>
                    <h1 className={style.header}>WorkTime</h1>
                    <div className={style.FormGridContainer}>
                        <form>
                            <div className={style.inputContainer}>
                                <label htmlFor="oHour">Open Hour</label>
                                <Flatpickr
                                    options={{
                                        noCalendar: true,
                                        enableTime: true,
                                        dateFormat: 'H:i',
                                        position: isRtl ? 'auto right' : 'auto left',
                                    }}
                                    // defaultValue={date4}
                                    className="form-input"
                                    // onChange={(date4) => setDate4(date4)}
                                />
                            </div>

                            <div className={style.inputContainer}>
                                <label htmlFor="cHour">Close Hour</label>
                                <Flatpickr
                                    options={{
                                        noCalendar: true,
                                        enableTime: true,
                                        dateFormat: 'H:i',
                                        position: isRtl ? 'auto right' : 'auto left',
                                    }}
                                    // defaultValue={date4}
                                    className="form-input"
                                    // onChange={(date4) => setDate4(date4)}
                                />
                            </div>
                            <div className={style.inputContainer}>
                                <label htmlFor="cHour">Close Hour</label>
                                <Select 
                                    styles={{control: (baseStyle , state)=>({
                                        ...baseStyle , borderRadius:"15px"
                                    })}} 
                                    placeholder="Select an option" id="choose" 
                                    options={WeekDay}  
                                />
                            </div>
                            <div className={style.inputContainer}>
                                <label htmlFor="cHour">Close Hour</label>
                                <Select 
                                    styles={{control: (baseStyle , state)=>({
                                        ...baseStyle , borderRadius:"15px"
                                    })}} 
                                    placeholder="Select an option" id="choose" 
                                    options={WeekDay}  
                                />
                            </div>
                            <div className={style.btnContainer}>
                                <button type="submit">save</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className={style.updateLocation}>
                    <h1 className={style.header}>Location</h1>
                    <div className={style.mapContainer}>
                        map
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateCompany
