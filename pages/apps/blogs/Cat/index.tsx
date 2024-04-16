
import headerStyle from "@/styles/headerTitle.module.css"
import tableStyle from "@/styles/table.module.css"
import style from "@/styles/catBlog.module.css"

import { DataTableSortStatus } from "mantine-datatable";

import Link from "next/link"
import { useState } from "react";
import Image from "next/image";

const Data = [
    {
        id : 0,
        image : "",
        name : "test 1",
        description: " Eyad Al Mahamid Car",

    },
    {
        id : 1,
        image : "",
        name : "test 2",
        description: "Eyad Al Mahamid Trading",

    },
    {
        id : 2,
        image : "",
        name : "test 3",
        description: "Aya food Roastery",

    },
]
const Cat = () => {

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    

    return (
        <>
        <div className={headerStyle.HeaderSetting}>
            <h1 className={headerStyle.header}>BLOG CATEGORY</h1>  

            <div className="SearchBoc">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className={tableStyle.AddNew}>
                <Link href= "/apps/blogs/Cat/newCat">Add new</Link>
            </div>
        </div>


        <div className={style.GridContainer}>
        {Data.map(data=>{
            return (
                <div key={data.id} className={style.CardContainer}>
                    <div className={style.imageSection}>
                        <Image
                            width="125"
                            height="125"
                            src={data.image}
                            alt="cat name"
                        />
                    </div>
                    <div className={style.DetailsSection}>
                        <p>{data.name}</p>
                        <p>{data.description}</p>
                        <Link href={`/apps/blogs/Cat/${data.id}`}>Edit</Link>
                    </div>
                </div>
            )
        })}


        </div>
        </>
    )
}

export default Cat
