import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { clientsData, GlobalContext } from "../context/GlobalState";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const AddClientData = () => {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();

  const { clientsData, addClient } = useContext(GlobalContext);

  const [client, setClient] = useState("");
  const [sizeInMB, setSizeInMB] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = (e) => {

    const newClient = {
      client: client,
      sizeInMB: Number(sizeInMB),
      startDate: startDate,
      endDate: endDate,
    };
    
    const allClients = clientsData.map(d => d['client']);
    const findClient = allClients.indexOf(newClient.client);

    if(findClient >= 0) {
      setErrorMessage("Duplicate Client")

      setClient("");
      setSizeInMB(0);
      setStartDate("");
      setEndDate("");
    } else if (endDate < startDate) {
      console.log("End date less than Start Date")
      setErrorMessage("End Date should be greater or equal to Start date")
    } else {
      addClient(newClient);

      setClient("");
      setSizeInMB(0);
      setStartDate("");
      setEndDate("");
      setErrorMessage(false);
    }

    history.push("/");
  
  };

  return (
    <Container className="m-3">
      <h1>Add new client data</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <Form.Control
              name="client"
              type="text"
              placeholder="Client name"
              value={client}
              onChange={(e) => setClient(e.target.value)}
              ref={register({
                required: "Please enter Client name",
                maxLength: {
                  value: 30,
                  message: "Please enter a name fewer than 20 characters",
                },
              })}
            />
            <span className="text-danger">{errors.client && errors.client.message}</span>
          </Col>
          <Col>
            <Form.Control
              name="sizeInMB"
              type="text"
              placeholder="Size in MB"
              value={sizeInMB}
              onChange={(e) => setSizeInMB(e.target.value)}
              ref={register({
                required: "Please enter valid number",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Please enter a value greater than 0",
                },
              })}
            />
            <span className="text-danger">{errors.sizeInMB && errors.sizeInMB.message}</span>
          </Col>
          <Col>
            <Form.Control
              name="startDate"
              type="text"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              ref={register({
                required: "Please enter valid date",
                valueAsDate: true,
              })}
            />
            <span className="text-danger">{errors.startDate && errors.startDate.message}</span>
          </Col>
          <Col>
            <Form.Control
              name="endDate"
              type="text"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              ref={register({
                required: "Please enter valid date",
                valueAsDate: true,
              })}
            />
            <span className="text-danger">{errors.endDate && errors.endDate.message}</span>
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Add
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
      {errorMessage ? <span className="text-danger">{errorMessage}</span> : <p></p>} 
    </Container>
  );
};

export default AddClientData;
