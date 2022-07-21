import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";
import useClasses from "./hooks/useClassesHook";

const styles = (theme) => ({
  appBar: {
    borderRadius: 15,
    margin: "30px 100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "30% !important",
    border: "2px solid black",
  },
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
});

const App = () => {
  const classes = useClasses(styles);
  return (
    <div className={classes.wrapper}>
      <VideoPlayer />

      <Options>
        <Notifications />
      </Options>
    </div>
  );
};

export default App;
