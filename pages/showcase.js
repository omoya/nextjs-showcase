import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native-web";
import Image from "next/image";
import axios from "axios";

const createItemRow = (item, index) => {
  return (
    <TouchableOpacity key={index} style={[styles.item]}>
      <Image
        src={item.image_url}
        alt="Avatar"
        layout="fill"
        placeholder="blur"
        blurDataURL={item.thumb_url}
      />
    </TouchableOpacity>
  );
};

function Divider() {
  return <View style={styles.divider} />;
}

const Showcase = () => {
  const [scrollEnabled, setEnabled] = useState(true);
  const [throttle, setThrottle] = useState(16);
  const [leftButtonTitle, setLeftButtonTitle] = useState("Left");
  const [profiles, setProfiles] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function getProfiles() {
      try {
        // const response = await axios.get("https://reqres.in/api/users?page=2");
        const response = await axios.get("/api/products");
        console.log(response);

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
            // onScroll={() => {
            //   console.log("onScroll");
            // }}
            horizontal={true}
            ref={scrollRef}
            scrollEnabled={scrollEnabled}
            scrollEventThrottle={throttle}
            style={[styles.scrollView, !scrollEnabled && styles.disabled]}
          >
            {profiles && profiles.length > 0 && profiles.map(createItemRow)}
          </ScrollView>

          <View style={styles.floating}>
            <Button
              // onPress={() => {
              //   setEnabled((val) => !val);
              // }}
              // onMouseOver={(event) => console.log(event)}
              title={leftButtonTitle}
            />
          </View>

          <View style={styles.buttons}>
            <Button
              // onPress={() => {
              //   setEnabled((val) => !val);
              // }}
              onMouseOver={(event) => console.log(event)}
              title={scrollEnabled ? "Disable" : "Enable"}
            />
            <Divider />
            <Button
              onPress={() => {
                setThrottle((val) => (val !== 16 ? 16 : 1000));
              }}
              title="Throttle"
            />
            <Divider />
            <Button
              style={{ height: 200 }}
              onPress={() => {
                setThrottle((val) => (val !== 16 ? 16 : 1000));
              }}
              title="Throttle"
            />
          </View>
          <View style={styles.buttons}>
            <Button
              onPress={() => {
                scrollRef.current.scrollTo({ y: 0 });
              }}
              title="To start"
            />
            <Divider />
            <Button
              onPress={() => {
                scrollRef.current.scrollTo({ y: 50 });
              }}
              title="To 50px"
            />
            <Divider />
            <Button
              onPress={() => {
                scrollRef.current.scrollToEnd({ animated: true });
              }}
              title="To end"
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
  floating: {
    width: 50,
    position: "fixed",
    left: 20,
  },
});

export default Showcase;
