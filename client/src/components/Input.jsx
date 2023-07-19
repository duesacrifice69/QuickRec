import React from "react";
import {
  TextField,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Input = ({
  name,
  label,
  handleChange,
  half,
  type,
  required,
  handleShowPassword,
  size,
}) => {
  return (
    <Grid item xs={12} sm={half ? 6 : 12} sx={{ textAlign: "left" }}>
      <Typography sx={{ fontSize: "1rem", fontWeight: 500, mb: "5px" }}>
        {label}
      </Typography>
      <TextField
        name={name}
        onChange={handleChange}
        required={required}
        fullWidth
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : name === "mobileNo" && {
                startAdornment: (
                  <InputAdornment position="start">
                    <Typography
                      sx={{
                        pr: "10px",
                        borderRight: (theme) =>
                          `1px solid ${theme.palette.secondary.main}`,
                      }}
                    >
                      +94
                    </Typography>
                  </InputAdornment>
                ),
              }
        }
        sx={{
          backgroundColor: (theme) => theme.palette.background.main,
        }}
        size={size ? size : "small"}
      />
    </Grid>
  );
};

export default Input;
