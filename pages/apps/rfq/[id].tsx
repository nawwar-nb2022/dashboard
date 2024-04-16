import { useRouter } from "next/router"

import headerStyle from "@/styles/headerTitle.module.css"
import style from "@/styles/qfrDetail.module.css"
import Link from "next/link"
import Image from "next/image"

const UpdateRFQ = () => {
    const {query} = useRouter()
    return (
        <>
            <div className={headerStyle.HeaderSetting}>
                <h1 className={headerStyle.header}>{query.id}</h1>  
            </div> 

            <div className={style.DataContainer}>
                <div className={style.row}>
                    <div className={style.SingleContainer}>
                            <div className={style.label}>
                                Name
                            </div>
                            <div className={style.inputStyle}>
                                name of the qfr
                            </div>
                    </div>

                    <div className={style.SingleContainer}>
                            <div className={style.label}>
                                Email
                            </div>
                            <div className={style.inputStyle}>
                                email of the qfr
                            </div>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.SingleContainer}>
                            <div className={style.label}>
                                Phone
                            </div>
                            <div className={style.inputStyle}>
                                phone number of the qfr
                            </div>
                    </div>

                    <div className={style.SingleContainer}>
                            <div className={style.label}>
                                company
                            </div>
                            <div className={style.inputStyle}>
                                company of the qfr
                            </div>
                    </div>
                </div>


                <div className={style.overLayContainer}>
                        <div className={style.header}>
                            <Link href={"/apps"}>
                                company name 
                            </Link>
                        </div>
                        <div className={style.row}>
                            <div className={style.SingleContainer}>
                                    <div className={style.label}>
                                        Quantity
                                    </div>
                                    <div className={style.inputStyle}>
                                        Quantity number of the qfr
                                    </div>
                            </div>

                            <div className={style.SingleContainer}>
                                    <div className={style.label}>
                                        Type
                                    </div>
                                    <div className={style.inputStyle}>
                                        Type of the qfr
                                    </div>
                            </div>
                        </div>

                        <div className={style.row}>
                                <div className={style.ProductContainer}>
                                    <div className={style.label}>Product</div>
                                    <div className={style.ContainerImage}>
                                        <Image 
                                            width="50"
                                            height="50"
                                            alt="product name"
                                            src="/dasd"
                                        />
                                        <p>product name</p>
                                    </div>
                                </div>
                                <div className={style.CategoryContainer}>
                                    <div className={style.label}>Product</div>
                                    <div className={style.ContainerImageCat}>
                                        <Image 
                                            width="50"
                                            height="50"
                                            alt="category name"
                                            src="/dasd"
                                        />
                                        <p>Category name</p>
                                    </div>
                                </div>
                        </div>
                </div>
            
                <div className={style.row}>

                    <div className={style.SingleContainer}>
                        <div className={style.label}>
                            Message
                        </div>
                        <div className={style.inputStyle}>
                            Message
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateRFQ
