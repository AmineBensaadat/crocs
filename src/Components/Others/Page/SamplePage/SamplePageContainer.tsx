"use client";
import Breadcrumbs from "@/CommonComponent/BreadCrumbs";
import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { Page, SampleCard, SamplePage } from "@/Constant";
import { samplePageData } from "@/Data/Pages/Pages";
import { Card, CardBody, Col, Container, Row } from "reactstrap";

const SamplePageContainer = () => {
  return (
    <>
      <Breadcrumbs mainTitle={SamplePage} parent={Page} title={SamplePage} />
      <Container fluid>
        <Row>
          <Col sm={12}>
            <Card>
              <CommonCardHeader title={SampleCard} span={samplePageData} headClass="pb-0" />
              <CardBody>
                <p>{`"fgdfgyfy dfgdfh"`}</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>

  );
};

export default SamplePageContainer;
