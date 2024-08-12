"use client";
import { BorderColor, Label } from "@mui/icons-material";
import {
  Box,
  Button,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  styled,
} from "@mui/material";

const InputFieldLabel = styled("label")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: "600",
  color: "#0A2540",
}));

const InputFieldInput = styled(TextField)(({ theme }) => ({
  borderRadius: "7px",
  marginTop: "4px",
  "& input::placeholder": {
    fontSize: "16px",
    color: "#425466",
  },
  "& textarea::placeholder": {
    fontSize: "16px",
    color: "#425466",
  },
  "& fieldset": {
    borderColor: "#DEEAF6",
  },
}));

const OutlinedInputWrapper = styled(OutlinedInput)(({ theme }) => ({
  borderRadius: "7px",
  marginTop: "4px",

  "& fieldset": {
    borderColor: "#DEEAF6",
  },
}));

const ImageInputImageWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#F6F9FC",
  borderRadius: "50px",
  padding: "26px",
}));

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const SelectInputWrapper = styled(Select)({
  marginTop: "8px",

  "& input::placeholder": {
    fontSize: "16px",
    color: "#425466",
  },
  "& fieldset": {
    borderColor: "#DEEAF6",
  },
  "& .MuiSelect-select": {
    opacity: "50% !important",
  },
});

const UploadDocumentInputWrapper = styled(Stack)({
  border: "1px solid #DEEAF6",
  backgroundColor: "#F6F9FC",
  borderRadius: "7px",
  padding: "36px",
});

export {
  ImageInputImageWrapper,
  VisuallyHiddenInput,
  InputFieldLabel,
  InputFieldInput,
  SelectInputWrapper,
  UploadDocumentInputWrapper,
  OutlinedInputWrapper,
};
