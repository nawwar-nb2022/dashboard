
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
        arName : "",
        enName : "qwe",
        date : "",
        Active : false
    },
    {
        id : 2 ,
        image : "e",
        arName : "eqwe",
        enName : "q",
        date : "",
        Active : false
    },
    {
        id :3 ,
        image : "",
        arName : "",
        enName : "",
        date : "",
        Active : true
    },
    {
        id :4 ,
        image : "",
        arName : "",
        enName : "qwe",
        date : "",
        Active : false
    },
    {
        id : 5 ,
        image : "e",
        arName : "eqwe",
        enName : "q",
        date : "",
        Active : false
    },
    {
        id :6 ,
        image : "",
        arName : "",
        enName : "",
        date : "",
        Active : true
    },
    {
        id :7,
        image : "",
        arName : "",
        enName : "qwe",
        date : "",
        Active : false
    },
    {
        id :8 ,
        image : "e",
        arName : "eqwe",
        enName : "q",
        date : "",
        Active : false
    },
    {
        id :9 ,
        image : "",
        arName : "",
        enName : "",
        date : "",
        Active : true
    },
    {
        id : 10 ,
        image : "",
        arName : "",
        enName : "qwe",
        date : "",
        Active : false
    },
    {
        id : 11 ,
        image : "e",
        arName : "eqwe",
        enName : "q",
        date : "",
        Active : false
    },
    {
        id :12 ,
        image : "",
        arName : "",
        enName : "",
        date : "",
        Active : true
    }
]



const List = () => {

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
                    item.arName.toLowerCase().includes(search.toLowerCase()) ||
                    item.enName.toLowerCase().includes(search.toLowerCase()) ||
                    item.date.toLowerCase().includes(search.toLowerCase()) 
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
            <h1 className={headerStyle.header}>Blogs</h1>  

            <div className="SearchBoc">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className={tableStyle.AddNew}>
                <Link href= "/apps/blogs/List/newList">Add new</Link>
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
                            { accessor: 'enName', title: 'enName', sortable: true },
                            { accessor: 'arName', title: 'arName', sortable: true },
                            { accessor: 'date', title : "date" ,  sortable: true },
                            { accessor: 'Active', title : "active" ,  sortable: false  ,
                                render : (data)=>{
                                    return( <div className={data.Active ? "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-center"
                                    :"bg-gray-400 text-white  font-bold py-2 px-4 rounded text-center"}
                                        style={{width : "max-content"}}
                                    >
                                        {data.Active ? <> Yes </> : <> No </>}
                                     </div>
                                     )}
                            },
                            {accessor : "id" ,title : "" , sortable :false , 
                            render : (data) =>{
                                return ( <div onClick={()=>{location.assign(`/apps/blogs/List/${data.id}`)}}>
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
                        onPageChange={(p) =>{ setPage(p) ;console.log(p)}}
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

export default List
