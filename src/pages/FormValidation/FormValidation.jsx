import React, { useState } from "react";
import {
  Button,
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormLabel,
  FormControl,
  FormHelperText,
  RadioGroup,
  Radio,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";

// Formik & Yup Constants.
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  age: "",
  games: [],
  gender: "",
  acceptTerms: false,
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(10, "First name must be less or equal 10 Characters.")
    .matches(/^[A-Za-z ]*$/, "Please enter valid name")
    .required("First name is required."),
  lastName: Yup.string()
    .max(10, "Last name must be less or equal 10 Characters.")
    .matches(/^[A-Za-z ]*$/, "Please enter valid surname")
    .required("Last name is required."),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required.")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  age: Yup.string().required("Age is required"),
  games: Yup.array().min(2, "Choose at least two games"),
  gender: Yup.string().required("Gender is required"),
  acceptTerms: Yup.bool().oneOf(
    [true],
    "Accept Terms & Conditions is required"
  ),
});

const FormValidation = () => {
  // Password hide/show States.
  const [passwordVisible, setPasswordVisible] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });
  const showPassword = (value) => {
    if (value === "password") {
      setPasswordVisible({
        ...passwordVisible,
        showPassword: !passwordVisible.showPassword,
      });
    } else {
      setPasswordVisible({
        ...passwordVisible,
        showConfirmPassword: !passwordVisible.showConfirmPassword,
      });
    }
  };

  // Formik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
  });
  console.log(formik.errors);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ my: 2 }}>
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          noValidate
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                label="First Name"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstName && Boolean(formik.errors.firstName)
                }
                helperText={formik.touched.firstName && formik.errors.firstName}
                onBlur={formik.handleBlur}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="lastName"
                label="Last Name"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={
                  formik.touched.lastName && Boolean(formik.errors.lastName)
                }
                helperText={formik.touched.lastName && formik.errors.lastName}
                onBlur={formik.handleBlur}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="email"
                label="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                onBlur={formik.handleBlur}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                value={formik.values.password}
                type={passwordVisible.showPassword ? "text" : "password"}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
                onBlur={formik.handleBlur}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => showPassword("password")}>
                        {passwordVisible.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                value={formik.values.confirmPassword}
                type={passwordVisible.showConfirmPassword ? "text" : "password"}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
                onBlur={formik.handleBlur}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={showPassword}>
                        {passwordVisible.showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={formik.touched.age && Boolean(formik.errors.age)}
              >
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                  name="age"
                  value={formik.values.age}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <FormHelperText>
                  {formik.touched.age && formik.errors.age}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                required
                error={formik.touched.games && Boolean(formik.errors.games)}
                component="fieldset"
                variant="standard"
              >
                <FormLabel component="legend">Pick two games</FormLabel>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="games"
                        value="cricket"
                      />
                    }
                    label="Cricket"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="games"
                        value="badminton"
                      />
                    }
                    label="Badminton"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        name="games"
                        value="hockey"
                      />
                    }
                    label="Hockey"
                  />
                </FormGroup>
                <FormHelperText>
                  {formik.touched.games && formik.errors.games}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                required
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              >
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Gender
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    name="gender"
                    value="male"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    name="gender"
                    value="female"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    name="gender"
                    value="other"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    control={<Radio />}
                    label="Other"
                  />
                </RadioGroup>
                <FormHelperText>
                  {formik.touched.gender && formik.errors.gender}
                </FormHelperText>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                required
                error={
                  formik.touched.acceptTerms &&
                  Boolean(formik.errors.acceptTerms)
                }
                component="fieldset"
                variant="standard"
              >
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        name="acceptTerms"
                        value={formik.values.acceptTerms}
                        checked={formik.values.acceptTerms}
                      />
                    }
                    label="Accept Terms & Conditions"
                  />
                </FormGroup>
                <FormHelperText>
                  {formik.touched.acceptTerms && formik.errors.acceptTerms}
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                color="error"
                onClick={() => formik.resetForm()}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Reset
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default FormValidation;
