
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
    name : "Marraw aafaf",
    email: "me@test.com",
    role  : "",
    action : "",
    },
    {
    id : 2,
    image : "",
    name : "test2",
    email: "",
    role  : "",
    action : "",
    },
    { 
    id : 3,
    image : "",
    name : "dasd sd",
    email: "DAta@sad.re",
    role  : "qew",
    action : "action",
    }
]

// colum

const Admins = () => {
    
    
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
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.role.toLowerCase().includes(search.toLowerCase()) ||
                    item.action.toLowerCase().includes(search.toLowerCase())
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
            <h1 className={headerStyle.header}>ADMINS TABLE</h1>  

            <div className="SearchBoc">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>
            </div>

            <div className={tableStyle.AddNew}>
                <Link
                    href={{
                        pathname : "/apps/users/new",
                        query : {role : "admin"}
                }}
                >Add new</Link>
            </div>
          </div> 


             <div className={tableStyle.TableContainer}>
                    <DataTable
                        noRecordsText="No results match your search query"
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        columns={[
                            { accessor: 'image', title: 'Image', sortable: false },
                            { accessor: 'name', title: 'Name', sortable: true },
                            { accessor: 'email', title: 'Email', sortable: true },
                            { accessor: 'role', title : "Role" ,  sortable: true },
                            { accessor: 'action', title : "Active" ,  sortable: false },
                            {accessor : "id" ,title : "" , sortable : false , 
                            render : (data) =>{
                                return ( <div onClick={()=>{location.assign(`/apps/users/${data.id}`)}}>
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

export default Admins
