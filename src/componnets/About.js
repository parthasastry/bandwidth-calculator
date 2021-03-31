import React from "react";
import { Container } from "react-bootstrap";

const About = () => {
  return (
    <Container>
      <h1>FAQ</h1>
      <hr />
      <div>
        <h6>What is the purpose of this website?</h6>
        <p>
          The puprose of this site is to provide cloud migration teams a tool
          to calculate the bandwidth required (in Mbps - Million-bits-per-second) for data migration. 
        </p>
      </div>
      <br />
      <div>
        <h6>How to use this Website?</h6>
        <p>
          The website provides facility to add, edit and delete the client data related to their name, size in MB (Megabytes) and window that is available for data migration.
        </p>
      </div>
      <br />
      <div>
        <h6>Why do I see data entered?</h6>
        <p>
          The website is seeded with some test data to help visualize the graphs. There is a facility to delete the rows. Please delete the row and add your data. Press calculate button to see the graphs and summary.
        </p>
      </div>
      <br />
      <div>
        <h6>I have my data in a spreadsheet. Is there a facility to upload spreadsheet?</h6>
        <p>
          The website currently does not have a facility to upload spreadsheet. For now the data needs to be entered manually.
        </p>
      </div>
      <br />
      
    </Container>
  );
};

export default About;
