import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native-web";

export default function Drag() {
  // const dropZoneValues = React.useRef(null);
  // const pan = React.useRef(new Animated.ValueXY());
  const [bgColor, setBgColor] = React.useState("#2c3e50");

  // const isDropZone = React.useCallback((gesture) => {
  //   console.log("gesture", gesture.moveY);

  //   const dz = dropZoneValues.current;
  //   return gesture.moveY > dz.y && gesture.moveY < dz.y + dz.height;
  // }, []);

  // const onMove = React.useCallback(
  //   (_, gesture) => {
  //     console.log("gesture", gesture.moveY);
  //     if (isDropZone(gesture)) setBgColor("red");
  //     else setBgColor("#2c3e50");
  //   },
  //   [isDropZone]
  // );

  // const setDropZoneValues = React.useCallback((event) => {
  //   dropZoneValues.current = event.nativeEvent.layout;
  // });

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,

        // onPanResponderMove: (e, gesture) => {
        //   console.log("move", gesture, e);
        //   if (gesture.moveY < gesture.y0) console.log("Deleting entry");
        //   else if (gesture.moveY > gesture.y0)
        //     console.log("Stored as favorite", gesture.moveY, gesture.y0);
        //   else console.log("Nothing happens", gesture.moveY, gesture.y0);
        // },
        onPanResponderRelease: (e, gesture) => {
          console.log("release", gesture, e);
          if (gesture.moveY < gesture.y0) console.log("Deleting entry");
          else if (gesture.moveY > gesture.y0)
            console.log("Stored as favorite", gesture.moveY, gesture.y0);
          else console.log("Nothing happens", gesture.moveY, gesture.y0);
        },

        // onPanResponderMove: Animated.event(
        //   [
        //     null,
        //     {
        //       dx: pan.current.x,
        //       dy: pan.current.y,
        //     },
        //   ],
        //   { useNativeDriver: false },
        //   {
        //     listener: onMove,
        //   }
        // ),
      }),
    []
  );

  return (
    <View style={styles.mainContainer}>
      <View
        // onLayout={setDropZoneValues}
        style={[styles.dropZone, { backgroundColor: bgColor }]}
      >
        <Text style={styles.text}>Drop me here!</Text>
      </View>
      <View {...panResponder.panHandlers} style={styles.draggableContainer}>
        <Text style={styles.text}>Drag me!</Text>
      </View>
    </View>
  );
}

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get("window");
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dropZone: {
    height: "100vh",
    backgroundColor: "#1abc9c",
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: "center",
    color: "#fff",
  },
  draggableContainer: {
    position: "absolute",
    top: Window.height - CIRCLE_RADIUS,
    left: Window.width - CIRCLE_RADIUS,
    backgroundColor: "#1acc7c",
    width: "100%",
    height: "100%",
  },
  circle: {
    backgroundColor: "#1abc9c",
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});
