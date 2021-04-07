import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { GlobalContext } from "../context/GlobalState";
import DateChart from "./DateChart";

const sortObj = (obj) =>
  Object.keys(obj)
    .sort()
    .reduce((res, key) => ((res[key] = obj[key]), res), {});


const Calculator = () => {
  const { clientsData } = useContext(GlobalContext);

  const clientsList = clientsData.map((d) => d.client);
  const clientsDataSize = clientsData.map((d) => d.sizeInMB);
  const totalClientDataSize = clientsDataSize.reduce(
    (total, value) => total + value
  );

  const Mbps = clientsData.map((d) => {
    let days = (new Date(d.endDate) - new Date(d.startDate)) / 86400000 + 1;
    let mbps = (((d.sizeInMB * 8) / (24 * 60 * 60)) * days).toFixed(2);
    return mbps;
  });

  const peakSizeInMbps = Math.max(...Mbps);

  const getDenormalizedRecord = (startDate, endDate, sizeInMB) => {
    let dt = new Date(startDate);
    let end = new Date(endDate);
    let diff_days = (end - dt) / 86400000 + 1;
    let sizeInMBperDay = sizeInMB / diff_days;

    let output = [];
    let record = {};
    while (dt <= end) {
      record["cutover_date"] = new Date(dt).toISOString().slice(0, 10);
      record["sizeInMBperDay"] = sizeInMBperDay;

      output.push(record);
      record = {};
      dt.setDate(dt.getDate() + 1);
    }
    return output;
  };

  const denormalizedData = [];
  clientsData.map((d) => {
    return denormalizedData.push(
      getDenormalizedRecord(d.startDate, d.endDate, d.sizeInMB)
    );
  });

  let flattened = denormalizedData.reduce(
    (acc, curVal) => acc.concat(curVal),
    []
  );

  let sum = flattened.reduce((total, row) => {
    total[row["cutover_date"]] =
      (total[row["cutover_date"]] || 0) + row["sizeInMBperDay"];
    return total;
  }, {});

  const sortSum = sortObj(sum);
  console.log(sortSum);

  let dates = Object.keys(sortSum);
  let sizeInMB = Object.values(sortSum);
  sizeInMB = sizeInMB.map((d) => d.toFixed(0));
  const peakSizeInMB = Math.max(...sizeInMB);

  return (
    <Container>
      <h1>Calculator</h1>
      <Link to="/bandwidth" className="btn btn-dark my-3">
        Go back
      </Link>
      <Row>
        <Col className="text-center">
          <Card className="my-3 p-3 rounded">
            <Card.Body>
              <Card.Title>
                <strong>Total Clients</strong>
              </Card.Title>

              <Card.Text as="h4">{clientsList.length}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-center">
          <Card className="my-3 p-3 rounded">
            <Card.Body>
              <Card.Title>
                <strong>Total Size in MB</strong>
              </Card.Title>

              <Card.Text as="h4">{new Intl.NumberFormat().format(totalClientDataSize)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-center">
          <Card className="my-3 p-3 rounded">
            <Card.Body>
              <Card.Title>
                <strong>Peak Size MB/Day</strong>
              </Card.Title>

              <Card.Text as="h4">{new Intl.NumberFormat().format(peakSizeInMB)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="text-center">
          <Card className="my-3 p-3 rounded">
            <Card.Body>
              <Card.Title>
                <strong>Peak Mbps</strong>
              </Card.Title>

              <Card.Text as="h4">
                {new Intl.NumberFormat().format(peakSizeInMbps)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col>
          {clientsList.length > 0 ? (
            <DateChart
              dates={clientsList}
              sizeInMB={clientsDataSize}
              title="Clients Data size in MB"
              xaxis="Clients"
              yaxis="Size in MB"
              chartType="bar"
            />
          ) : (
            ""
          )}
        </Col>
        <Col>
          {clientsList.length > 0 ? (
            <DateChart
              dates={clientsList}
              sizeInMB={Mbps}
              title="Clients Data Mbps"
              xaxis="Clients"
              yaxis="Size in Mbps"
              chartType="line"
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          {dates.length > 0 ? (
            <DateChart
              dates={dates}
              sizeInMB={sizeInMB}
              title="Data Transfer per day (MB)"
              xaxis="Dates"
              yaxis="Size in MB"
              chartType="bar"
            />
          ) : (
            ""
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Calculator;
