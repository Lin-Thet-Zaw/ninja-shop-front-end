import { Button, Grid, Typography, Container } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-black text-white">
      <Container>
        <Grid
          container
          spacing={3}
          sx={{
            py: 5,
            justifyContent: "space-between",
          }}
        >
          {/* Company Section */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              Company
            </Typography>
            {["About", "Blog", "Jobs", "Partners"].map((text, index) => (
              <Button
                key={index}
                fullWidth
                variant="text"
                color="inherit"
                sx={{
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {text}
              </Button>
            ))}
          </Grid>

          {/* Solutions Section */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              Solutions
            </Typography>
            {["Marketing", "Analytics", "Commerce", "Insights", "Support"].map(
              (text, index) => (
                <Button
                  key={index}
                  fullWidth
                  variant="text"
                  color="inherit"
                  sx={{
                    justifyContent: { xs: "center", sm: "flex-start" },
                  }}
                >
                  {text}
                </Button>
              )
            )}
          </Grid>

          {/* Documentation Section */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              Documentation
            </Typography>
            {["Guides", "API Status"].map((text, index) => (
              <Button
                key={index}
                fullWidth
                variant="text"
                color="inherit"
                sx={{
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                {text}
              </Button>
            ))}
          </Grid>

          {/* Legal Section */}
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
            >
              Legal
            </Typography>
            {["Claim", "Privacy", "Terms"].map((text, index) => (
              <Button
                key={index}
                fullWidth
                variant="text"
                color="inherit"
                sx={{
                  justifyContent: { xs: "center", sm: "flex-start" },
                }}
              >
                  {text}
              </Button>
            ))}
          </Grid>
        </Grid>
      </Container>

      {/* Footer Bottom */}
      <div className="text-center py-4 bg-gray-900">
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
        >
         © {new Date().getFullYear()} My Company. All rights reserved.
        </Typography>
        {/* <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
        >
          Made with ❤️ by Me.
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontSize: { xs: "0.75rem", sm: "1rem" } }}
        >
          Icons made by{" "}
          <a
            href="https://www.flaticon.com/authors/freepik"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Freepik
          </a>{" "}
          from{" "}
          <a
            href="https://www.flaticon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            www.flaticon.com
          </a>
        </Typography> */}
      </div>
    </div>
  );
};

export default Footer;
