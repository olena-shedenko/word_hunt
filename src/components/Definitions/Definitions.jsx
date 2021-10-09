import React from "react";
import { makeStyles } from "@material-ui/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import CustomAudioPlayer from "../AudioPlayer/AudioPlayer";

const useStyles = makeStyles({
  meanings: {
    width: "100%",
    overflowY: "scroll",
    scrollbarWidth: "10px",
    height: "55vh",
    border: "10px solid rgb(105,105,105)",
    borderRadius: "10px",
    padding: "20px",
  },
  meaningsAudio: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "10px",
    marginBottom: "20px",
  },
  meaningsItem: {
    fontFamily: "Montserrat, sans-serif",
    padding: "10px 20px",
    marginBottom: "20px",
    borderRadius: "10px",
  },
  textBold: {
    fontWeight: "800",
  },
  subtitle: {
    fontSize: "5vw",
    fontFamily: "Montserrat, sans-serif",
  },
  definitions: {
    fontFamily: "Montserrat, sans-serif",
    fontWeight: "normal",
    fontSize: "0.9rem",
  },
});

const Definitions = ({
  word,
  meanings,
  category,
  lightMode,
  themeLight,
  themeDark,
}) => {
  const classes = useStyles();
  return (
    <Box className={classes.meanings}>
      {meanings[0] && word && category === "en" && (
        <CustomAudioPlayer
          meanings={meanings}
          lightMode={lightMode}
          themeLight={themeLight}
          themeDark={themeDark}
        />
      )}
      <Grid container direction="column">
        {word === "" ? (
          <Typography component="span" className={classes.subtitle}>
            Start by typing word in Search
          </Typography>
        ) : (
          meanings.map((meaning) =>
            meaning.meanings.map((item) =>
              item.definitions.map((def, index) => (
                <Box
                  className={classes.meaningsItem}
                  style={{
                    backgroundColor: lightMode ? "rgb(66, 66, 66)" : "white",
                    color: lightMode ? "white" : "black",
                  }}
                  key={index}
                >
                  <Typography className={classes.textBold} variant="subtitle1">
                    {def.definition}
                  </Typography>
                  <Divider
                    style={{
                      backgroundColor: lightMode
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(0, 0, 0, 0.25)",
                    }}
                  />
                  {def.example && (
                    <Box>
                      <Typography component="span" className={classes.textBold}>
                        Example:{" "}
                      </Typography>
                      <Typography
                        component="span"
                        className={classes.definitions}
                      >
                        {def.example}
                      </Typography>
                    </Box>
                  )}
                  {def.synonyms && (
                    <Box>
                      <Typography component="span" className={classes.textBold}>
                        Synonyms:{" "}
                      </Typography>
                      {def.synonyms.map((syn) => (
                        <Typography
                          component="span"
                          className={classes.definitions}
                        >
                          {syn},{" "}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              ))
            )
          )
        )}
      </Grid>
    </Box>
  );
};

export default Definitions;
