// Components
// import Snackbar from "./components/Snackbar/Snackbar";
// import Content from "./components/Content/Content";
import { SnackbarContainer } from "./Context/SnackbarContext";
import FormValidation from "./pages/FormValidation/FormValidation";
import Timezone from "./pages/Timezone/Timezone";

function App() {
  return (
    <SnackbarContainer>
      {/* <Content />
      <Snackbar /> */}
      {/* <FormValidation /> */}
      <Timezone/>
    </SnackbarContainer>
  );
}

export default App;
