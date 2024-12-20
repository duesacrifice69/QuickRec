import {
  useTheme,
  Paper,
  Stepper,
  Step,
  StepButton,
  Button,
  MobileStepper,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const steps = [
  { name: "Basic Details", path: "/application/basicDetails" },
  { name: "Educational Qualification", path: "/application/eduDetails" },
  { name: "Professional Experience", path: "/application/proDetails" },
  { name: "Other Achievements", path: "/application/otherDetails" },
  { name: "Declaration", path: "/application/declaration" },
];

const StepGuide = ({ state, isMobile, activeStep, setActiveStep }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(steps[activeStep - 1].path, state);
  };
  const handleStep = (index) => {};
  return (
    <Paper
      sx={{
        display: "flex",
        minWidth: "180px",
        maxHeight: "600px",
        justifyContent: "center",
      }}
    >
      {" "}
      {isMobile ? (
        <MobileStepper
          variant="dots"
          steps={steps.length}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 400, flexGrow: 1 }}
          nextButton={
            <Button
              size="small"
              type="submit"
              form="application"
              disabled={activeStep === steps.length - 1}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
      ) : (
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            pt: "1rem",
            pb: "1rem",
            "& .MuiStepper-root": {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            },
            "& .MuiStepConnector-root": {
              display: "block",
              margin: "auto",
            },
            "& .MuiStepConnector-line": {
              height: "100%",
            },
            "& .MuiStep-root": {
              margin: "auto",
            },
          }}
        >
          {steps.map((label, index) => (
            <Step
              key={label.name}
              sx={{
                "& .MuiStepLabel-root": {
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "0.5rem",
                },
                "& .MuiStepLabel-iconContainer": {
                  padding: "0",
                },
              }}
            >
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label.name}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      )}
    </Paper>
  );
};

export default StepGuide;
