import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { GlobalContext, deleteAllClients } from "../context/GlobalState";
import { Container, Button, Alert, Table } from "react-bootstrap";

const ClientList = () => {
  const { clientsData, deleteClient, deleteAllClients } = useContext(GlobalContext);

  const tableHeader = (
    <thead>
      <tr>
        <th>Client</th>
        <th>Size in MB</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
  );

  const tableData = clientsData.map((client) => {
    return (
      <tr key={client.client}>
        <td>{client.client}</td>
        <td>{client.sizeInMB}</td>
        <td>{client.startDate}</td>
        <td>{client.endDate}</td>
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
    <Container className="m-3">
      <React.Fragment>
        {clientsData.length > 0 ? (
          <React.Fragment>
            <h1>Clients Data</h1>
            <Button variant="danger"
              onClick={deleteAllClients}
            >Reset</Button>
            {T}
          </React.Fragment>
        ) : (
          <Alert variant="dark">Please enter client data</Alert>
        )}
        <Link to={`/calculator`}>
          <Button>
            <i class="fas fa-calculator 4x"></i> Calculate
          </Button>
        </Link>
      </React.Fragment>
    </Container>
  );
};

export default ClientList;
