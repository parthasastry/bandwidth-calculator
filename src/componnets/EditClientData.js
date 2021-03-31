import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import { GlobalContext } from "../context/GlobalState";

const EditClientData = (route) => {
  const [dateError, setDateError] = useState(false);
  const { register, handleSubmit, errors } = useForm();

  let history = useHistory();
  const { clientsData, editClient } = useContext(GlobalContext);

  const [selectedClient, setSelectedClient] = useState({
    client: "",
    sizeInMB: 0,
    startDate: "",
    endDate: "",
  });

  const currentClient = route.match.params.id;

  useEffect(() => {
    const client = currentClient;
    const selectedClient = clientsData.find((d) => d.client == client);
    setSelectedClient(selectedClient);
    console.log('selectedClient: ', selectedClient)
  }, [currentClient, clientsData]);


  const handleOnChange = (userKey, newValue) => {
    setSelectedClient({ ...selectedClient, [userKey]: newValue });
  };

  const onSubmit = (e) => {

    if (selectedClient.endDate < selectedClient.startDate) {
      setDateError(true)
    } else {
      setDateError(false)
      selectedClient.sizeInMB = Number(selectedClient.sizeInMB)
      editClient(selectedClient);
      history.push("/");
    }
  };
  
  return (
    <Container className="m-3">
      <h1>Edit client data for {selectedClient.client}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Control
              type="number"
              value={selectedClient.sizeInMB}
              onChange={(e) => handleOnChange("sizeInMB", e.target.value)}
              ref={register({
                required: "Please enter valid number",
                min: {
                  value: 1,
                  message: "Please enter a value greater than 0",
                },
              })}
            />
            <span className="text-danger">
              {errors.sizeInMB && errors.sizeInMB.message}
            </span>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={selectedClient.startDate}
              onChange={(e) => handleOnChange("startDate", e.target.value)}
              ref={register({
                required: "Please enter valid date",
                valueAsDate: true,
              })}
            />
            <span className="text-danger">
              {errors.startDate && errors.startDate.message}
            </span>
          </Col>
          <Col>
            <Form.Control
              type="text"
              value={selectedClient.endDate}
              onChange={(e) => handleOnChange("endDate", e.target.value)}
              ref={register({
                required: "Please enter valid date",
                valueAsDate: true,
              })}
            />
            <span className="text-danger">
              {errors.endDate && errors.endDate.message}
            </span>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
          <Col>
            <Button
              variant="warning"
              type="submit"
              onClick={() => history.push("/")}
            >
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
      {dateError ? <span className="text-danger">End date has to be greater/equal to Start date</span> : <p></p>} 
    </Container>
  );
};

export default EditClientData;
