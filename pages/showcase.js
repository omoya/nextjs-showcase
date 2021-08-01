import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native-web";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import Image from "next/image";
import axios from "axios";

const createItemRow = (item, index) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <TouchableOpacity key={index} style={[styles.item]}>
            <Image
              src={item.image_url}
              alt="Avatar"
              layout="fill"
              placeholder="blur"
              blurDataURL={item.thumb_url}
            />
          </TouchableOpacity>
        </div>
        <div className="flip-card-back">
          <h1>John Doe</h1>
          <p>Architect & Engineer</p>
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  );
};

function Divider() {
  return <View style={styles.divider} />;
}

const Showcase = () => {
  const [scrollEnabled, setEnabled] = useState(true);
  const [throttle, setThrottle] = useState(16);
  const [offsetX, setOffsetX] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : null
  );

  const [profiles, setProfiles] = useState([]);
  const scrollRef = useRef(null);

  // console.log("vw", window.innerWidth);

  const handleScroll = (event) => {
    event.nativeEvent.contentOffset.x !== offsetX
      ? setOffsetX(event.nativeEvent.contentOffset.x)
      : null;
    event.nativeEvent.layoutMeasurement.width !== layoutWidth
      ? setLayoutWidth(event.nativeEvent.layoutMeasurement.width)
      : null;
  };

  const handleLeftButton = () => {
    console.log(offsetX, layoutWidth);
    console.log(offsetX + layoutWidth);
    scrollRef.current.scrollTo({ x: offsetX - layoutWidth });
  };

  const handleRightButton = () => {
    console.log(offsetX, layoutWidth);
    console.log(offsetX + layoutWidth);
    scrollRef.current.scrollTo({ x: offsetX + layoutWidth });
  };

  useEffect(() => {
    async function getProfiles() {
      try {
        // const response = await axios.get("https://reqres.in/api/users?page=2");
        const response = await axios.get("/api/products");

        setProfiles(response.data.results);
      } catch (error) {
        console.error(error);
      }
    }

    getProfiles();
    return () => {
      null;
    };
  }, []);

  return (
    <>
      <div>
        <View style={styles.container}>
          <ScrollView
            onScroll={handleScroll}
            horizontal={true}
            pagingEnabled={true}
            ref={scrollRef}
            scrollEnabled={scrollEnabled}
            // scrollEventThrottle={throttle}
            style={[styles.scrollView, !scrollEnabled && styles.disabled]}
          >
            {profiles && profiles.length > 0 && profiles.map(createItemRow)}
          </ScrollView>

          <View style={styles.leftButton}>
            <Button
              onPress={handleLeftButton}
              title={<CaretLeftFilled style={{ fontSize: 40 }} />}
              color={"transparent"}
            />
          </View>
          <View style={styles.rightButton}>
            <Button
              onPress={handleRightButton}
              title={<CaretRightFilled style={{ fontSize: 40 }} />}
              color={"transparent"}
            />
          </View>
        </View>
      </div>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
  },
  scrollView: {
    backgroundColor: "#eeeeee",
    height: "100vh",
    // maxHeight: 250,
  },

  disabled: {
    opacity: 0.5,
  },
  item: {
    margin: 5,
    padding: 5,
    backgroundColor: "#cccccc",
    borderRadius: 3,
    width: "100vw",
    height: "100vh",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: "1rem",
    backgroundColor: "green",
  },
  divider: {
    width: "1rem",
  },
  leftButton: {
    backgroundColor: "none",
    width: 10,
    height: 10,
    position: "fixed",
    left: 40,
    top: 300,
  },

  rightButton: {
    backgroundColor: "none",
    width: 10,
    height: 10,
    position: "fixed",
    right: 50,
    top: 300,
  },
});

export default Showcase;
