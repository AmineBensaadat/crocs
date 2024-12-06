"use client";
import React, { useEffect, useState } from "react";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { Page, SampleCard, SamplePage } from "@/Constant";
import { samplePageData } from "@/Data/Pages/Pages";
import { checkToken } from "@/lib/CheckToken";
import { ImagePath } from "@/Constant";
import Link from "next/link";
import Image from "next/image";
import withAuth from "@/middleware/withAuth";
import MembersTable from "@/Components/Members/membersTable";
import DashboardCommonHeader from "@/Components/General/Dashboard/Common/DashboardCommonHeader";
import {
  Card,
  CardBody,
  Col,
  Button,
  FormGroup,
  Input,
  Label,
  Container,
  Row,
  Table,
} from "reactstrap";
import { CommonDropdown } from "@/Components/General/Dashboard/Common/CommonDropdown";

const MembersList = () => {
  const [filterText, setFilterText] = useState("");
  const manageOrderHead = [
    "Full Name",
    "Membership Type",
    "Joining Date",
    "Expiry Date",
    "Status",
    "join_date",
    "status",
    "Contact",
    "Payment Statu",
    "Actions",
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
    <>
      <Breadcrumbs
        mainTitle={"Members List"}
        parent={Page}
        title={"Members List"}
      />
      <Container fluid className="ecommerce-dashboard">
        <Row>
        <Col xl={12} lg={12} className="box-col-7">
            <Card>
              <DashboardCommonHeader cardClass="pb-0" title={"RecentOrders"} dropDownFalse />
              <CardBody className="pt-0 report">
                <div className="custom-scrollbar table-responsive">
                  <div className="dataTables_wrapper no-footer">
                    <div id="report_filter" className="dataTables_filter ">
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
                            <td>
                              <div className="d-flex">
                                <div className="flex-shrink-0">
                                  <Image
                                    src={`${ImagePath}/avtar/3.jpg`}
                                    width={42}
                                    height={42}
                                    alt="product"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3 mt-2">
                                  <Link href={"/app/users/user_profile"}>
                                    <h6>
                                      {data.first_name} {data.last_name}
                                    </h6>
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{data.plan_name}</td>
                            <td>
                            {data.join_date}
                            </td>
                            <td>15/10/2025</td>
                            <td><Button color={data.join_date}>{data.status}</Button></td>
                            <td>{data.join_date}</td>
                            <td>{data.status}</td>
                            <td>{data.phone}</td>
                            <td>payé</td>
                            <td><CommonDropdown /></td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MembersList;
