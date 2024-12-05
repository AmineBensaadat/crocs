import { useState, useEffect } from "react";
import { ImagePath } from "@/Constant";
import {
  Card,
  CardBody,
  Col,
  Button,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";
import Link from "next/link";
import Image from "next/image";
const MembersTable = () => {
  const [filterText, setFilterText] = useState("");
  const manageOrderHead = [
    "Full Name",
    "Membership Type",
    "Joining Date",
    "Membership Expiry Date",
    "Status",
    "join_date",
    "status",
    "Contact",
    "Payment Statu",
    "Actions"
  ];
  const [manageOrderTableBodyData, setManageOrderTableBodyData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const authSession = sessionStorage.getItem("authSession");

  const filteredItems = manageOrderTableBodyData.filter((item) => {
    return Object.values(item).some(
      (value) =>
        value &&
        value.toString().toLowerCase().includes(filterText.toLowerCase())
    );
  });
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

        setManageOrderTableBodyData(data.response);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);
  return (
    <div className="custom-scrollbar table-responsive">
      <div className="dataTables_wrapper no-footer">
        <div id="report_filter" className="dataTables_filter">
          <Label className="d-flex align-items-center">
            {" "}
            Search:
            <Input
              type="search"
              value={filterText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFilterText(e.target.value)
              }
            />
          </Label>
        </div>
        <Table
          className="display dataTable no-footer"
          id="report"
          style={{ width: "100%" }}
        >
          <thead>
            <tr role="row">
              {manageOrderHead.map((item, index) => (
                <th className="sorting" key={index}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((data, i) => (
              <tr role="row" key={i}>
              
                <td className="sorting_1">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <Image src={`${ImagePath}/avtar/3.jpg`} width={42} height={42} alt="product" />
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <Link href={"/app/ecommerce/product_list"}>
                        <h6>{data.first_name}  {data.last_name}</h6>
                      </Link>
                    </div>
                  </div>
                </td>
                <td>${data.price}</td>
                <td>
                  <Button color={data.color}>{data.status}</Button>
                </td>
                <td>{data.quantity} PCS</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default MembersTable;
