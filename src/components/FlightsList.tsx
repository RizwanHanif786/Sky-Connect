import { Box, Card, CircularProgress, Grid, Typography } from "@mui/material";
import { useGetFlightsQuery } from "../services/flights";
import { Data } from "../types/types";
import { useMemo } from "react";
import { getFormattedFlights } from "../helpers/utils";

type Props = {
  flightParams: Data;
  publishLoading: (loading: boolean) => void;
  loading: boolean;
};

export const FlightsList = ({
  flightParams,
  publishLoading,
  loading,
}: Props) => {
  const { data = {} } = useGetFlightsQuery(flightParams);

  const formattedFlights = useMemo(() => {
    publishLoading(false);
    if (data) {
      return getFormattedFlights(data?.data?.itineraries);
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      {loading ? (
        <CircularProgress
          size={50}
          sx={{ display: "block", margin: "auto", marginTop: 5 }}
        />
      ) : (
        <Box p={2}>
          {formattedFlights && formattedFlights.length > 0 ? (
            formattedFlights.map((flight, index) => (
              <Card
                key={index}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{ textAlign: { xs: "center", sm: "left" } }}
                  >
                    <Typography variant="subtitle2" color="textSecondary">
                      Origin
                    </Typography>
                    <Typography variant="h6">{flight.departure}</Typography>
                    <Typography variant="body2">{flight.origin}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{ textAlign: { xs: "center", sm: "left" } }}
                  >
                    <Typography variant="subtitle2" color="textSecondary">
                      Destination
                    </Typography>
                    <Typography variant="h6">{flight.arrival}</Typography>
                    <Typography variant="body2">
                      {flight.destination}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    sx={{ textAlign: { xs: "center", sm: "left" } }}
                  >
                    <Typography variant="subtitle2" color="textSecondary">
                      Info
                    </Typography>
                    <Typography variant="h6">{flight.price}</Typography>
                    <Typography variant="body2">
                      {flight.duration}{" "}
                      {flight.stops > 1
                        ? `(${flight.stops} stops)`
                        : `(${flight.stops} stop)`}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            ))
          ) : (
            <Typography
              variant="h6"
              color="textSecondary"
              sx={{ textAlign: "center", mt: 5 }}
            >
              No flights found
            </Typography>
          )}
        </Box>
      )}
    </>
  );
};
