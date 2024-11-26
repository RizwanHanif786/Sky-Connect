import { Box, Typography } from "@mui/material";
import { flight } from "../assets";
import { SkyFilters } from "./SkyFilters";

export const Flights = () => {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        padding: "0px 50px 0px 50px",
      }}
    >
      <img
        src={flight}
        alt="Flight"
        style={{
          width: "100%",
          height: "300px",
          justifyContent: "center",
          display: "flex",
          borderRadius: "10px",
          backgroundSize: "cover",
        }}
      />
      <Typography variant="h2" align="center">
        Flights
      </Typography>
      <Box p={2}>
        <SkyFilters />
      </Box>
    </Box>
  );
};
