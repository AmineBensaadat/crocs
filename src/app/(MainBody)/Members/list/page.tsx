"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { Page, SampleCard, SamplePage } from "@/Constant";
import { samplePageData } from "@/Data/Pages/Pages";
import { checkToken } from "@/lib/CheckToken";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import React, { useEffect } from "react";
import withAuth from "@/middleware/withAuth";
import MembersTable from "@/Components/Members/membersTable";

const MembersList = () => {
  return ( 
  <>
  <Breadcrumbs mainTitle={SamplePage} parent={Page} title={SamplePage} />
  <Container fluid>
    <Row>
      <Col sm={12}>
        <Card>
          <CommonCardHeader title={SampleCard} span={samplePageData} headClass="pb-0" />
          <CardBody>
          <MembersTable />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
  </>);
};

export default MembersList;