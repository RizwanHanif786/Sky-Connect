import React, { useState } from "react";
import {
  Button,
  Popover,
  Box,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { PASSENGERS } from "../helpers/constants";
import { PassengerType } from "../types/types";

type Props = {
  publishPassengers: (passengers: Record<PassengerType, number>) => void;
};

export const PassengerSelector = ({ publishPassengers }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [passengers, setPassengers] = useState<Record<PassengerType, number>>({
    adults: 1,
    children: 0,
    infants: 0,
  });

  const open = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log('event: ', event);
    setAnchorEl(event.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  const incrementPassengerCount = (type: PassengerType) => {
    const updatedPassengers = {
      ...passengers,
      [type]: passengers[type] + 1,
    };

    setPassengers((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    publishPassengers(updatedPassengers);
  };

  const decrementPassengerCount = (type: PassengerType) => {
    const updatedPassengers = {
      ...passengers,
      [type]: Math.max(0, passengers[type] - 1),
    };
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] - 1), // Ensure no negative values
    }));
    publishPassengers(updatedPassengers);
  };

  const totalPassengers =
    passengers.adults + passengers.children + passengers.infants;

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="outlined"
        onClick={handleOpen}
        style={{
          color: "#000000",
          border: "1px solid #000000",
          borderRadius: "5px",
          padding: "15px",
          width: "100%",
        }}
      >
        {totalPassengers} Passenger{totalPassengers > 1 ? "s" : ""}
      </Button>

      {/* Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={onClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2} width={300}>
          {PASSENGERS.map(({ label, key, description }) => (
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              key={key}
              mb={1}
            >
              <Grid item>
                <Typography variant="body1">
                  {label}
                  {description && (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      display="block"
                    >
                      {description}
                    </Typography>
                  )}
                </Typography>
              </Grid>
              <Grid item>
                <Box display="flex" alignItems="center">
                  <IconButton
                    size="small"
                    onClick={() => decrementPassengerCount(key as PassengerType)}
                    disabled={passengers[key as PassengerType] === 0}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body1" mx={1}>
                    {passengers[key as PassengerType]}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => incrementPassengerCount(key as PassengerType)}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          ))}

          {/* Actions */}
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button onClick={onClose} color="inherit">
              Cancel
            </Button>
            <Button onClick={onClose} variant="contained">
              Done
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
