
import IconSettings from "@/components/Icon/IconSettings";
import IconX from "@/components/Icon/IconX";
import headerStyle from "@/styles/headerTitle.module.css"
import tableStyle from "@/styles/table.module.css"
import { CareersDataType, ResponseData } from "@/types/careers";
import { sortBy } from "lodash";
import { DataTableSortStatus ,DataTable } from "mantine-datatable";
import Image from "next/image";
import Link from "next/link"
import React, { useEffect, useState } from "react";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const rowData = [
    {
        id : 0,
        applicationId : 10,
        image : "d",
        eName : "e",
        aName : "a",
        salary : "3",
        sDate : "",
        eDate : "",
    },
    {
        id : 1,
        applicationId : 12,
        image : "d",
        eName : "e",
        aName : "a",
        salary : "3",
        sDate : "",
        eDate : "",
    },
]


export async function getStaticProps (){
    try{
        const res = await fetch( process.env.NEXT_PUBLIC_BASE_URL+"careers")
        if(res.ok){

            const CareersData = await res.json();
            return { props : { CareersData }}  
        }else{
            return {props : { CareersData : "no data" }}
        }
    }catch (e) {
        console.log("failed to load data")
        console.log(e);    

        return {props : { CareersData : "no data" }}
    }
}

const Career = ({CareersData} : { CareersData : CareersDataType}) => {
    
    const [data , setData] = useState<ResponseData[]>(CareersData.data)
    const [page, setPage] = useState<number>(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(data, 'id'));
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
        if(data){
            setInitialRecords(() => {
                return data.filter((item) => {
                    return (
                        item?.locales?.en?.name.toString().includes(search.toLowerCase()) ||
                        item?.locales?.ar?.name.toLowerCase().includes(search.toLowerCase()) ||
                        item?.to_date.toLowerCase().includes(search.toLowerCase()) || 
                        item?.from_date.toString().includes(search.toLowerCase()) 
                    );
                });
            });

        }
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

      const showMessage = (id : number | string) => {
        MySwal.fire({
            title: `${id} had beed deleted`,
            toast: true,
            // position: isRtl ? 'top-start' : 'top-end',
            position:'top-end',
            showConfirmButton: false,
            timer: 3000,
            showCloseButton: true,
        });

    };

    if(!data) {
        return <>loading ... </>
    }
    return (
        <>
            <div className={headerStyle.HeaderSetting}>
                <h1 className={headerStyle.header}>careers </h1>  

                <div className="SearchBoc">
                    <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                        <div className="ltr:ml-auto rtl:mr-auto">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>
 
                <div className={tableStyle.AddNew}>
                    <Link href= "/apps/careers/new">Add new</Link>
                </div>
            </div> 


            <div className={tableStyle.TableContainer}>
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: '', title: '', sortable: false,
                             render :(data)=>(
                                <>
                                    <Image
                                        className={tableStyle.TableImage}
                                        alt={data.locales.en.name}
                                        src={`https://staging.emtc.ae/storage/uploads/small/${data.image_webp}`}
                                        width="100"
                                        height ="100"
                                        placeholder="blur"
                                        blurDataURL="rgba(0,0,0,0.2)"
                                    />
                                    
                                </>
                            )},
                            { accessor: 'locales.en.name', title: 'English name', sortable: true },
                            { accessor: 'locales.ar.name', title: 'Arabic Name', sortable: true },
                            { accessor: 'salary', title: 'salary', sortable: true },
                            { accessor: 'from_date', title : "From date" ,  sortable: false  , 
                                render : (data)=>{
                                    let time = new Date (data.from_date)
                                    let year = time.getFullYear();
                                    let month = time.getMonth();
                                    let day = time.getDate();
                                    return (<> {day}-{month}-{year}</>)
                                }
                            },
                            { accessor: 'to_date', title : "To date" ,  sortable: false,
                                render : (data)=>{
                                    let time = new Date (data.to_date)
                                    let year = time.getFullYear();
                                    let month = time.getMonth();
                                    let day = time.getDate();
                                    return (<> {day}-{month}-{year}</>)
                                }
                            },
                            { accessor: 'company_id', title : "" ,  sortable: false , 
                                render : ({company_id})=>{
                                    return (
                                        <>
                                            <Link href="/" className="btn btn-primary w-fit rounded-3xl">
                                                show application
                                            </Link>
                                        </>
                                    )
                                }
                            },
                            {accessor : "id" ,title : "" , sortable :false , 
                            render : (data) =>{
                                return ( 
                                <div className={tableStyle.EditSection}>
                                    <Link href={`/apps/careers/${data.id}`}>
                                            <IconSettings/>
                                    </Link>
                                    <button 
                                     type="button" onClick={()=>showMessage(data.id)}>
                                         <IconX/>
                                    </button>

                                </div>
                                )
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

export default Career
