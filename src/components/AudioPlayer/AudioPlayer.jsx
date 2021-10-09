import React from "react";
import AudioPlayer from "material-ui-audio-player";
import { ThemeProvider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

// const muiTheme = createTheme({});
const useStyles = makeStyles((theme) => {
  return {
    root: {
      margin: "0 0 20px 0",
      borderRadius: "10px",
      boxShadow: "0px 0px 0px 1px rgba(0, 0, 0, 0.4)",
    },
    progressTime: {
      position: "relative",
      top: "18%",
    },
  };
});

const CustomAudioPlayer = ({ meanings, lightMode, themeDark, themeLight }) => {
  return (
    <ThemeProvider theme={lightMode ? themeDark : themeLight}>
      <AudioPlayer
        useStyles={useStyles}
        src={meanings[0].phonetics[0] && meanings[0].phonetics[0].audio}
      ></AudioPlayer>
    </ThemeProvider>
  );
};

export default CustomAudioPlayer;
