"use client";
import React, { useState } from "react";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import { Page } from "@/Constant";
import { Card, CardBody, Col, Container, Row } from "reactstrap";
import MemberListHeader from "@/Components/Applications/Members/MembersList/MembersListHeader/index";
import MembersListTable from "@/Components/Applications/Members/MembersListTable";
const MembersList = () => {
  return (
    <>
      <Breadcrumbs
        mainTitle={"Members List"}
        parent={Page}
        title={"Members List"}
      />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <Card>
              <CardBody>
                <MemberListHeader linkTitle="Add member" />
                <MembersListTable />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MembersList;
