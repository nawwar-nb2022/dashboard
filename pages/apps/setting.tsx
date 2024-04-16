import styles from "@/styles/setting.module.css"
import headerStyle from "@/styles/headerTitle.module.css"
import { useState } from "react"
const Setting = () => {

    const [inputs , setInputs] = useState({
        EN_title : "",
        AR_Title : "",
        Vat : "",
        WhatsApp : "",
        IC_Header : "",
        IC_Footer : "",
        IN_Email : "",
        IN_Sale_Email:"",
        I_Career_Email:"",
        URL_Food_Address : "",
        URL_Address : "",

    })
    return (
        <>
          <div className={headerStyle.HeaderSetting}>
            <h1 className={headerStyle.header}>Setting</h1>  
          </div> 

          <div className={styles.CardContainer}>

                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        English Site title
                    </p>
                    <input type="text" placeholder="Enter Arabic name"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        Arabic Site title
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        Vat
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        WhatsApp
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        Informative Header Code
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        Informative Footer Code
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        Informative Notify Email
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        Informative Notify Sales Email
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        Informative Career Email
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                        forms.en_aya_food_linktree
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <p className={styles.LabelName}>
                       forms.en_emtc_linktree
                    </p>
                    <input type="text"/>
                </div>
                <div className={styles.CardSection}>
                    <button className={styles.Submit}>Save 0 change</button>
                </div>

          </div>
        </>
    )
}

export default Setting
