import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, Button, Container, Form, Row, Col } from "react-bootstrap";

const Duration = () => {
  const { register, handleSubmit, errors } = useForm();
  const [bandwidth, setBandwidth] = useState(0);
  const [size, setSize] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const onSubmit = (e) => {
    const d = Number(size / (bandwidth / 8));

    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    setHours(h);
    setMinutes(m);
    setSeconds(s);

  };

  const handleReset = (e) => {
      setBandwidth(0);
      setSize(0);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
  }

  return (
    <Container>
      <h1>Duration</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col>
            <label>Bandwidth in Mbps</label>
            <Form.Control
              name="bandwidth"
              type="text"
              placeholder="Enter Bandwidth"
              value={bandwidth}
              onChange={(e) => setBandwidth(e.target.value)}
              ref={register({
                required: "Please enter valid number",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Please enter a value greater than 0",
                },
              })}
            />
            <span className="text-danger">
              {errors.bandwidth && errors.bandwidth.message}
            </span>
          </Col>
          <Col>
            <label>Size in MB</label>
            <Form.Control
              name="size"
              type="text"
              placeholder="Enter size in MB"
              value={size}
              onChange={(e) => setSize(e.target.value)}
              ref={register({
                required: "Please enter valid number",
                valueAsNumber: true,
                min: {
                  value: 1,
                  message: "Please enter a value greater than 0",
                },
              })}
            />
            <span className="text-danger">
              {errors.size && errors.size.message}
            </span>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Calculate
            </Button>
          </Col>
        </Row>
      </Form>

      <hr />
      {hours > 0 || minutes > 0 || seconds || 0 ? (
        <div>
          <p>
            <span className="h3">{size/1000000} TB</span> with a bandwidth of <span className="h3">{bandwidth} Mbps</span> takes <span className="h3">{hours} hours, {minutes} minutes and {seconds} seconds</span>
          </p>
          <Button variant="danger" onClick={(e) => handleReset()}>Reset</Button>
        </div>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Duration;
