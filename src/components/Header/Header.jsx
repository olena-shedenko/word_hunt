import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import categories from "../../data/category";

const useStyles = makeStyles({
  headerTitle: {
    fontSize: "7vw",
    textTransform: "uppercase",
    fontFamily: "Montserrat, sans-serif",
  },
  header: {
    width: "100%",
    height: "35vh",
  },
  search: {
    width: "43%",
    "& input": {
      paddingLeft: "10px",
    },
  },
  select: {
    width: "43%",
  },
});

const Header = ({
  category,
  setCategory,
  word,
  setWord,
  // lightMode,
  // themeLight,
  // themeDark,
}) => {
  const classes = useStyles();
  const handleChange = (language) => {
    setCategory(language);
    setWord("");
  };
  return (
    <Grid
      className={classes.header}
      direction="column"
      container
      justifyContent="space-evenly"
      alignItems="center"
    >
      <Typography variant="h1" component="h1" className={classes.headerTitle}>
        {word ? word : "Word Hunt"}
      </Typography>

      <Grid container justifyContent="space-evenly">
        <TextField
          className={classes.search}
          id="standard-basic"
          label="Search a Word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        ></TextField>
        <TextField
          className={classes.select}
          select
          label="Language"
          value={category}
          onChange={(e) => handleChange(e.target.value)}
        >
          {categories.map((option) => (
            <MenuItem key={option.label} value={option.label}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Grid>
  );
};
export default Header;
