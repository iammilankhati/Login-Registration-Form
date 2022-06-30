import React from "react";
import { Button, Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";

const Error = () => {
  return (
    <div style={{ paddingTop: "200px" }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <h1>....Dead Page....</h1>
        <Button variant="contained" color="primary">
          {" "}
          <Link
            href="/signup"
            style={{ color: "#fff", textDecoration: "none" }}
          >
            Back to Home
          </Link>
        </Button>
      </Grid>
    </div>
  );
};

export default Error;
