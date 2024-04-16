
import TimeFormat from "@/components/appsComp/TimeFormat";
import IconSettings from "@/components/Icon/IconSettings";
import headerStyle from "@/styles/headerTitle.module.css";
import tableStyle from "@/styles/table.module.css";
import { sortBy } from "lodash";
import { DataTableSortStatus ,DataTable } from "mantine-datatable";
import Image from "next/image";
// import Link from "next/link"

import React, { useEffect, useState } from "react";
import { companyAllData, CompanyType } from "@/types/company";


export async function getStaticProps (){
    try{
        const res = await fetch( process.env.NEXT_PUBLIC_BASE_URL+"companies")
        if(res.ok){

            const CompanyReturnedData = await res.json();
            return { props : { CompanyReturnedData }}  
        }
        else{
            return {props : { CompanyReturnedData : "no data" }}
        }
    
    }catch (e) {
        console.log("failed to load data")
        console.log(e);    

        return {props : { CompanyReturnedData : "no data" }}
    }
}


const Index = ({CompanyReturnedData } : {CompanyReturnedData : companyAllData}) => {


    const [data , setData] = useState<CompanyType[]>(CompanyReturnedData?.data)
    
    let [checkForUpdate , setCheckForUpdate] = useState(false)
    // data table state management
    const [page, setPage] = useState<number>(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [RowDataUpdate , setUpdate ] = useState(data)
    const [initialRecords, setInitialRecords] = useState(sortBy(RowDataUpdate, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);

    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    // get data
    useEffect(()=>{
        setUpdate(data)
    },[data])


    // update pages
     useEffect(() => {
        setPage(1);
    }, [pageSize]);
    // update navigation 
    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);
    // search functionality
    useEffect(() => {
        if(data ){
            setInitialRecords(() => {
                return data.filter((item) => {
                    return (
                        item?.locales?.ar?.name.toString().includes(search.toLowerCase()) ||
                        item?.close_hour.toLowerCase().includes(search.toLowerCase()) ||
                        item?.open_hour.toLowerCase().includes(search.toLowerCase()) 
                    );
                });
            });
        }
    }, [search]);

    // featured switch btn functionality
    useEffect(()=>{
        // console.log(RowDataUpdate);
        setInitialRecords(sortBy(RowDataUpdate, 'id'))
        setRecordsData(initialRecords)
    },[checkForUpdate , RowDataUpdate])


    const  handleSwitch = (e : React.ChangeEvent<HTMLInputElement> , id :number)=>{
        let check =  e.target.checked   
        
        if(RowDataUpdate){
            let updateFeatured = RowDataUpdate.filter(data=> data.id == id)[0]
            // console.log(updateFeatured)
    
            // update the checked row
            
            let updateFeaturedValue = {...updateFeatured , ["featured"] : check} 
            // remove the old version
            let indexOfUpdate = RowDataUpdate.indexOf(updateFeatured)
            RowDataUpdate.splice(indexOfUpdate , 1)
    
            // add the object after edit 
            RowDataUpdate.push(updateFeaturedValue)
            // console.log(RowDataUpdate)
            setUpdate(RowDataUpdate)
    
            setCheckForUpdate(!checkForUpdate)
        }
    }
    if(!data){
        return <>loading ... </>
    }


    return (
        <>
            <div className={headerStyle.HeaderSetting}>
                <h1 className={headerStyle.header}>COMPANIES</h1>  
                <div className="SearchBoc">
                    <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                        <div className="ltr:ml-auto rtl:mr-auto">
                            <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>
                </div>


            </div> 


            <div className={tableStyle.TableContainer}>
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: '', title: 'image', sortable: false  , 
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
                            { accessor: 'locales.en.name', title: 'Name', sortable: true  },
                            { accessor: 'is_featured', title : "featured" ,  sortable: false, 
                                render : (data)=>{
                                    return (
                                        <>
                                            <label className="w-12 h-6 relative">
                                                <input type="checkbox" 
                                                className="custom_switch absolute w-full h-full opacity-0 z-10 cursor-pointer peer" 
                                                id="custom_switch_checkbox1"
                                                    checked={data?.is_featured == 1}
                                                    onChange={(e)=>{handleSwitch(e, data.id)}}
                                                />
                                                <span className="outline_checkbox border-2 border-[#ebedf2] 
                                                dark:border-white-dark block h-full rounded-full before:absolute 
                                                before:left-1 before:bg-[#ebedf2] dark:before:bg-white-dark before:bottom-1 
                                                before:w-4 before:h-4 before:rounded-full peer-checked:before:left-7 
                                                peer-checked:border-primary peer-checked:before:bg-primary before:transition-all 
                                                before:duration-300"></span>
                                            </label>
                                        </>
                                    )
                                }   
                            },
                            { accessor: 'open_hour', title : "open Hour" ,  sortable: false , 
                                render : ({open_hour})=><TimeFormat time={open_hour}/> },
                            { accessor: 'close_hour', title : "close Hour" ,  sortable: false ,  
                                render : ({close_hour})=><TimeFormat time={close_hour}/> },
                            
                            {accessor : "id" ,title : "" , sortable :false , 
                            render : (data) =>{
                                return ( <div onClick={()=>{location.assign(`/apps/companies/${data.id}`)}}>
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
