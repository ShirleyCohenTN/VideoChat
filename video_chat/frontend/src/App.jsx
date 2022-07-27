import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import Options from "./components/Options";
import Notifications from "./components/Notifications";
import useClasses from "./hooks/useClassesHook";

const styles = (theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center !important",
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
