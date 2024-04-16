
import { sortBy } from "lodash";
import { useEffect, useState } from "react";
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import headerStyle from "@/styles/headerTitle.module.css"
import tableStyle from "@/styles/table.module.css"


import ArrowRight from "@/components/Icon/new/ArrowRight"
import Link from "next/link";
// STATIC DATA 

const rowData = [
    {
    id : 1 ,
    image : "",
    name : "End of the season offer DAS CAN",
    Value: "ddd",
    item  : "rw",
    IsFeatured :false,
    startDate : "2023-11-01",
    EndDate : "2023-12-01",
    FlashSale : true
    },
    {
    id : 2,
    image : "",
    name : "Marraw aafaf",
    Value: "dasdd",
    item  : "zcx",
    IsFeatured :true,
    startDate : "2023-11-01",
    EndDate : "2023-12-01",
    FlashSale : false
    },
    {
    id : 3 ,
    image : "eeeee",
    name : "Marraw aafaf",
    Value: "ddd",
    item  : "gg",
    IsFeatured :false,
    startDate : "2023-11-01",
    EndDate : "2023-12-01",
    FlashSale : false
    },
]


const Offers = () => {

    
    const [page, setPage] = useState<number>(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
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
                    item.image.toString().includes(search.toLowerCase()) ||
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.Value.toLowerCase().includes(search.toLowerCase()) ||
                    item.item.toLowerCase().includes(search.toLowerCase()) ||
                    item.startDate.toLowerCase().includes(search.toLowerCase()) ||
                    item.EndDate.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);
    return (
        <>
        <div className={headerStyle.HeaderSetting}>
            <h1 className={headerStyle.header}>Offers</h1>  

            <div className="SearchBoc">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className={tableStyle.AddNew}>
                <Link href= "/apps/offers/new">Add new</Link>
            </div>
        </div> 


          <div className={tableStyle.TableContainer}>
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: 'image', title: '', sortable: false },
                            { accessor: 'name', title: 'Name', sortable: false },
                            { accessor: 'Value', title: 'Value', sortable: false },
                            { accessor: 'item', title : "item" ,  sortable: false },
                            { accessor: 'IsFeatured', title : "IsFeatured" ,  sortable: false ,
                                render : (data)=>{
                                    return( <div className={data.IsFeatured ?" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                                    :"bg-gray-400 text-white  font-bold py-2 px-4 rounded text-center"}>
                                        {data.IsFeatured ? <> Featured </> : <> Not Featured </>}
                                     </div>
                                     )}
                            },
                            { accessor: 'startDate', title : "startDate" ,  sortable: false },
                            { accessor: 'EndDate', title : "EndDate" ,  sortable: false },
                            { accessor: 'FlashSale', title : "FlashSale" ,  sortable: false  ,
                                render : (data)=>{
                                    return( <div className={data.FlashSale ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                                    :"bg-gray-400 text-white  font-bold py-2 px-4 rounded text-center"}>
                                        {data.FlashSale ? <> Flash sale </> : <> Not FlashSale </>}
                                     </div>
                                     )}
                            },
                            {accessor : "id" ,title : "" , sortable :false , 
                            render : (data) =>{
                                return ( <div onClick={()=>{location.assign(`/apps/offers/${data.id}`)}}>
                                    <p 
                                    style={{border : "1px solid black" , borderRadius : "50%"
                                     ,width : "30px" ,height : "30px"  , display :"flex", alignItems:"center" , justifyContent :"center"}}>
                                        <ArrowRight/>
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

export default Offers
