import { productListColumns } from '@/Data/Applications/ECommerce/ProductList';
import { ProductListType } from '@/Types/ECommerce.type';
import React, { useEffect,useState } from 'react'
import DataTable from 'react-data-table-component'
import FilterComponent from './Common/FilterComponent';

const MembersListTable = ({membersListTableData}:any) => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authSession = sessionStorage.getItem("authSession");
  const [filterText, setFilterText] = useState('');

  
  
  const filteredItems: ProductListType[] = membersListTableData.filter(
        (item: ProductListType) => {
            return Object.values(item).some((value) =>
                value && value.toString().toLowerCase().includes(filterText.toLowerCase())
            );
        }
    );
    return (
        <div className="list-product">
            <FilterComponent
                onFilter={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)}
                filterText={filterText}
            />
            <DataTable className='custom-scrollbar' data={filteredItems} columns={productListColumns} pagination />
        </div>
    )
}
export default MembersListTable;