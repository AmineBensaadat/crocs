"use client";
import React, { useState, useEffect } from "react";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Page } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import MemberListHeader from "@/Components/Applications/Members/MembersList/MembersListHeader/index";
import MembersListTable from "@/Components/Applications/Members/MembersListTable";
const MembersList = () => {
  const [plans, setPlansa] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [query, setQuery] = useState("");

  const [membersListTableData, setMembersListTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const authSession = sessionStorage.getItem("authSession");
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState("");

  // Fetch data from the API
  const fetchPlans = async () => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch("/api/plans", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${JSON.parse(authSession).token || null}`, // Add the token to the Authorization header
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();

      setPlansa(data.response);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  const fetchMembers = async (query: string) => {
    try {
      setIsLoading(true); // Start loading
      const response = await fetch(`/api/members?${query}`, {
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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };
  useEffect(() => {
    fetchPlans();
    fetchMembers(query);
  }, []);

  // Function to handle plan selection
  const handleFliterChange = (filterType: string, planId: number) => {
    setFilterType(filterType);
    let newQuery = "";
    switch (filterType) {
      case "plan":
        if(planId){
          newQuery = `plan_id=${planId}`;
        }
        break;
      default:
        newQuery = ``;
        setQuery(``);
        break;
    }
    
    setQuery(newQuery);
    fetchMembers(newQuery); // Fetch members immediately after updating query
  };
  return (
    <>
      <Breadcrumbs
        mainTitle={selectedPlan}
        parent={Page}
        title={"Members List"}
      />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <Card>
              <CardBody>
                <MemberListHeader
                  linkTitle="Add member"
                  plans={plans}
                  onFliterChange={handleFliterChange}
                />
                <MembersListTable membersListTableData={membersListTableData} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MembersList;
