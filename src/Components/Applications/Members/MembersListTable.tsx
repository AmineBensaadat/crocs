import { productListColumns, productListTableData } from '@/Data/Applications/ECommerce/ProductList';
import { ProductListType } from '@/Types/ECommerce.type';
import React, { useEffect,useState } from 'react'
import DataTable from 'react-data-table-component'
import FilterComponent from './Common/FilterComponent';

const MembersListTable = () => {
  const [membersListTableData, setMembersListTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authSession = sessionStorage.getItem("authSession");
    const [filterText, setFilterText] = useState('');

      // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await fetch("/api/members", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${JSON.parse(authSession).token || null}`, // Add the token to the Authorization header
          },
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        setMembersListTableData(data.response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);
  //const filteredItems: ProductListType[] = productListTableData.filter(
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