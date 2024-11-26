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
      <Box
        component="img"
        src={flight}
        alt="Flight"
        sx={{
          width: "100%",
          height: "300px",
          display: "flex",
          justifyContent: "center",
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
