import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext, deleteAllClients } from "../context/GlobalState";
import { Row, Col, Button, Alert, Table } from "react-bootstrap";

const ClientList = () => {
  const { clientsData, deleteClient, deleteAllClients } = useContext(
    GlobalContext
  );

  const tableHeader = (
    <thead>
      <tr>
        <th>Client</th>
        <th>Size(MB)</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Days</th>
        <th>MBPS(BITS)</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
  );

  const tableData = clientsData.map((client) => {
    let days =
      (new Date(client.endDate) - new Date(client.startDate)) / 86400000 + 1;
    let mbps = (((client.sizeInMB * 8) / (24 * 60 * 60)) * days).toFixed(0);
    return (
      <tr key={client.client}>
        <td>{client.client}</td>
        <td>{new Intl.NumberFormat().format(client.sizeInMB)}</td>
        <td>{client.startDate}</td>
        <td>{client.endDate}</td>
        <td>{days}</td>
        <td>{mbps}</td>
        <td>
          <Link to={`/edit/${client.client}`}>
            <Button>
              <i class="fas fa-edit"></i>
            </Button>
          </Link>
        </td>
        <td>
          <Button
            type="submit"
            onClick={() => deleteClient(client.client)}
            variant="danger"
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </Button>
        </td>
      </tr>
    );
  });

  const T = (
    <Table striped bordered hover>
      {tableHeader}
      <tbody>{tableData}</tbody>
    </Table>
  );

  return (
    <div className="m-3">
      <React.Fragment>
        {clientsData.length > 0 ? (
          <React.Fragment>
            <h1>Clients Data</h1>
            <Row>
              <Col>
                <Button variant="danger" onClick={deleteAllClients}>
                  Reset
                </Button>
              </Col>
              <Col>
                <Link to={`/calculator`}>
                  <Button variant="info">
                    <i class="fas fa-calculator 4x"></i> Calculate Bandwidth
                  </Button>
                </Link>
              </Col>
            </Row>
            <br />
            <Row>
            {T}
            </Row>


          </React.Fragment>
        ) : (
          <Alert variant="dark">Please enter client data</Alert>
        )}
      </React.Fragment>
    </div>
  );
};

export default ClientList;
