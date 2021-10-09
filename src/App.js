import { makeStyles, withStyles } from "@material-ui/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header/Header";
import "@fontsource/montserrat";
import Definitions from "./components/Definitions/Definitions";
import Switch from "@material-ui/core/Switch";
import { grey } from "@material-ui/core/colors";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles({
  mainContainer: {
    height: "100vh",
    transition: "all 0.5s linear",
  },
  vocab: {
    height: "100vh",
  },
  switchContainer: {
    position: "absolute",
    top: "10px",
    right: "15px",
  },
});

function App() {
  const classes = useStyles();
  const [word, setWord] = useState("");
  const [category, setCategory] = useState("en");
  const [meanings, setMeanings] = useState([]);
  const [lightMode, setLightMode] = useState(false);

  const ThemeSwitch = withStyles({
    switchBase: {
      color: grey[300],
      "&$checked": {
        color: grey[500],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
      "& + $track": {
        backgroundColor: grey[400],
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const themeLight = createTheme({
    palette: {
      primary: {
        main: lightMode ? "#282c34" : "#fff",
      },
      type: "light",
    },
  });

  const themeDark = createTheme({
    palette: {
      background: {
        default: "#282c34",
      },
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const dictionaryApi = async () => {
    try {
      const data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/${category}/${word}`
      );
      setMeanings(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dictionaryApi();
    // eslint-disable-next-line
  }, [word, category]);
  return (
    <ThemeProvider theme={lightMode ? themeLight : themeDark}>
      <CssBaseline />
      <div className={classes.mainContainer}>
        <Container maxWidth="md">
          <Grid
            container
            className={classes.vocab}
            alignContent="flex-start"
            justifyContent="space-evenly"
          >
            <Box className={classes.switchContainer}>
              <Typography component="span">
                {lightMode ? "Dark" : "Light"} Mode
              </Typography>
              <ThemeSwitch
                checked={lightMode}
                onChange={() => {
                  console.log("clicked!");
                  setLightMode(!lightMode);
                }}
              />
            </Box>
            <Header
              category={category}
              setCategory={setCategory}
              word={word}
              setWord={setWord}
            />
            {meanings && (
              <Definitions
                word={word}
                meanings={meanings}
                category={category}
                lightMode={lightMode}
                themeLight={themeLight}
                themeDark={themeDark}
              />
            )}
          </Grid>
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
