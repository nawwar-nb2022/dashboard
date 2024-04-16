
import IconSettings from "@/components/Icon/IconSettings";
import headerStyle from "@/styles/headerTitle.module.css"
import tableStyle from "@/styles/table.module.css"
import { sortBy } from "lodash";
import { DataTableSortStatus ,DataTable } from "mantine-datatable";
import Link from "next/link"
import React, { useEffect, useState } from "react";



const rowData = [
    {
    id : 1 ,
    code : "",
    user : "Undefined",
    discount: 10,
    UsageLeft  : "rw",
    published :false,
    },
    {
    id : 2,
    code : "",
    user : "Undefined",
    discount: 0,
    UsageLeft  : "rw",
    published :true,
    },
    {
    id : 3 ,
    code : "",
    user : "Undefined",
    discount: 50,
    UsageLeft  : "UNLIMITED",
    published :false,
    },
]

interface dataType { 
    id: number; 
    code: string; 
    user: string; 
    discount: number; 
    UsageLeft: string; 
    published: boolean; 
    }
const Index = () => {

    let [checkForUpdate , setCheckForUpdate] = useState(false)
       
    const [page, setPage] = useState<number>(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [RowDataUpdate , setUpdate ] = useState<dataType[]>(rowData)
    const [initialRecords, setInitialRecords] = useState(sortBy(RowDataUpdate, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });


     useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.code.toString().includes(search.toLowerCase()) ||
                    item.user.toLowerCase().includes(search.toLowerCase()) ||
                    item.UsageLeft.toLowerCase().includes(search.toLowerCase()) || 
                    item.discount.toString().includes(search.toLowerCase()) 
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);


    useEffect(()=>{
        // update published action
        console.log(RowDataUpdate , checkForUpdate )
        setInitialRecords(sortBy(RowDataUpdate, 'id'))
        setRecordsData(initialRecords)

    }, [RowDataUpdate , checkForUpdate])

    const  handleSwitch = (e : React.ChangeEvent<HTMLInputElement> , id :number)=>{
        let check =  e.target.checked   
        
        
        let updatedPublish = RowDataUpdate.filter(data=> data.id == id)[0]
        // console.log(updatedPublish)

        // update the checked row
        let updatedPublishValue = {...updatedPublish , ["published"] : check} 
        // remove the old version
        let indexOfUpdate = RowDataUpdate.indexOf(updatedPublish)
        RowDataUpdate.splice(indexOfUpdate , 1)

        // add the object after edit 
        RowDataUpdate.push(updatedPublishValue)
        // console.log(RowDataUpdate)
        setUpdate(RowDataUpdate)

        setCheckForUpdate(!checkForUpdate)
    }

    return (
        <>
        <div className={headerStyle.HeaderSetting}>
            <h1 className={headerStyle.header}>coupon</h1>  

            <div className="SearchBoc">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className={tableStyle.AddNew}>
                <Link href= "/apps/coupon/new">Add new</Link>
            </div>
        </div> 



        <div className={tableStyle.TableContainer}>
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: 'code', title: 'code', sortable: false },
                            { accessor: 'user', title: 'user', sortable: false },
                            { accessor: 'discount', title: 'discount', sortable: false },
                            { accessor: 'UsageLeft', title : "usage Left" ,  sortable: false },
                            { accessor: 'published', title : "published" ,  sortable: false, 
                                render : (data)=>{
                                    return (
                                        <>
                                            <label className="w-12 h-6 relative">
                                                <input type="checkbox" 
                                                className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" 
                                                id="custom_switch_checkbox1"
                                                    checked={data.published}
                                                    onChange={(e)=>{handleSwitch(e, data.id)}}
                                                />
                                                <span className="outline_checkbox border-2 border-[#ebedf2] dark:border-white-dark block h-full rounded-full before:absolute before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 peer-checked:border-primary peer-checked:before:bg-primary before:transition-all before:duration-300"></span>
                                            </label>
                                        </>
                                    )
                                }   
                            },
                            
                            {accessor : "id" ,title : "" , sortable :false , 
                            render : (data) =>{
                                return ( <div onClick={()=>{location.assign(`/apps/coupon/${data.id}`)}}>
                                    <p>
                                        <IconSettings/>
                                    </p>
                                </div>)
                            }
                            }
                        ]}
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        minHeight={200}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>

        </>
    )
}

export default Index
