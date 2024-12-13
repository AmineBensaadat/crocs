import { productListBodyData } from '@/Data/Applications/ECommerce/ProductList';
import React ,{useState, useEffect} from 'react'
import { Col, Input, Row } from 'reactstrap'

const ProductListBody = ({ plans, onFliterChange }) => {
      // Handle option change
  const handleFilterChange  = (type:any, e:any) => {
    onFliterChange(type, e); // Call the passed function
  };
    return (
        <Row className="row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 row-cols-2 g-3">
            <Col>
              <Input type="select" onChange={(e:any) => handleFilterChange ('plan', e.target.value)} >
              <option value=''>Choose Plan</option>
                {plans.map((data:any, id:number) => (
                  <option key={id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </Input>             
            </Col>
        </Row>
    )
}
export default ProductListBody;