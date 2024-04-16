
import { sortBy } from "lodash";
import { useEffect, useState } from "react";
import { DataTable, DataTableSortStatus } from 'mantine-datatable';

import headerStyle from "@/styles/headerTitle.module.css"
import tableStyle from "@/styles/table.module.css"


import Link from "next/link";
import IconSettings from "@/components/Icon/IconSettings";

interface rowDataType {
    id: number;
    name: string;
    email: string;
    Company: string;
    Phone: string;
}
// STATIC DATA 

const rowData = [
    {
    id : 1 ,
    name : "End of the season offer DAS CAN",
    email: "ddd",
    Company  : "rw",
    Phone :"8098098",
    },
    {
    id : 2 ,
    name : "End of the season offer DAS CAN",
    email: "ddd",
    Company  : "rw",
    Phone :"8098098",
    },
    {
    id : 3 ,
    name : "End of the season offer DAS CAN",
    email: "ddd",
    Company  : "rw",
    Phone :"8098098",
    }
]

const Index = () => {

    
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
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.Phone.toLowerCase().includes(search.toLowerCase()) ||
                    item.Company.toLowerCase().includes(search.toLowerCase())
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
                <h1 className={headerStyle.header}>RFQ</h1>  

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
                            { accessor: 'name', title: 'Name', sortable: true },
                            { accessor: 'email', title: 'Email', sortable: true },
                            { accessor: 'Phone', title: 'Phone', sortable: false },
                            { accessor: 'Company', title : "Company" ,  sortable: true },
                            {accessor : "id" ,title : "" , sortable :false , 
                            render : (data) =>{
                                return ( <div onClick={()=>{location.assign(`/apps/rfq/${data.id}`)}}>
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
