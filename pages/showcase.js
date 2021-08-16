import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native-web";

import { Col, Row } from "antd";
import { CaretLeftFilled, CaretRightFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCaretLeft,
  faCaretRight,
  faChess,
  faChild,
  faClock,
  faEye,
  faGraduationCap,
  faLink,
  faMale,
  faMoneyBillWave,
  faStar,
  faTrash,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
// import Link from "next/link";
import Image from "next/image";
import axios from "axios";

const Showcase = () => {
  const [scrollEnabled, setEnabled] = useState(true);
  const [rotated, setRotated] = useState(false);
  const [offsetX, setOffsetX] = useState(0);
  const [layoutWidth, setLayoutWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : null
  );

  const [profiles, setProfiles] = useState([]);
  const scrollRef = useRef(null);

  const animationHandler = () =>
    rotated ? setRotated(false) : setRotated(true);

  const createItemRow = (item, index) => {
    const handlePress = (url) => {
      Linking.canOpenURL(url).then((supported) => {
        return Linking.openURL(url);
      });
    };
    return (
      <div className="flip-card">
        <div
          className="flip-card-inner"
          style={rotated ? { transform: "rotateY(180deg)" } : null}
        >
          <div className="flip-card-front">
            <div className="product_front">
              <h3 className="game_h3">
                <span className="game_h3_span">{item.name}</span>
              </h3>
            </div>
            <TouchableOpacity
              key={index}
              style={{
                backgroundColor: "#cccccc",
                borderRadius: 3,
                width: "100vw",
                height: "75vh",
                zIndex: 0,
              }}
            >
              <Image
                src={item.image_url}
                alt="Avatar"
                layout="fill"
                placeholder="blur"
                blurDataURL={item.thumb_url}
              />

              {"description_preview" in item && item.description_preview && (
                <Row type="flex" style={{ marginTop: 50 }}>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: "5vh",
                      left: "47vw",
                      minWidth: 90,
                      minHeight: 90,
                      width: "6vw",
                      height: "6vw",
                      color: "white",
                      zIndex: 1,
                      backgroundColor: "rgba(50,50,50,0.7)",
                      borderRadius: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={animationHandler}
                  >
                    <FontAwesomeIcon icon={faEye} size="4x" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: "5vh",
                      left: "37vw",
                      minWidth: 90,
                      minHeight: 90,
                      width: "6vw",
                      height: "6vw",
                      color: "white",
                      zIndex: 1,
                      backgroundColor: "rgba(50,50,50,0.7)",
                      borderRadius: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={animationHandler}
                  >
                    <FontAwesomeIcon icon={faTrash} size="4x" />{" "}
                  </TouchableOpacity>
                  <FontAwesomeIcon
                    className="my_arrow"
                    style={{
                      position: "absolute",
                      bottom: "7vh",
                      left: "55vw",
                      color: "white",
                    }}
                    icon={faCaretRight}
                    size="4x"
                  />

                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      bottom: "5vh",
                      left: "57vw",
                      minWidth: 90,
                      minHeight: 90,
                      width: "6vw",
                      height: "6vw",
                      color: "white",
                      zIndex: 1,
                      backgroundColor: "rgba(50,50,50,0.7)",
                      borderRadius: "50%",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={animationHandler}
                  >
                    <FontAwesomeIcon icon={faStar} size="4x" />{" "}
                  </TouchableOpacity>
                </Row>
              )}
            </TouchableOpacity>
            <div
              style={{ height: "15vh", width: "100 vw", background: "black" }}
            >
              <Row style={{ color: "white", paddingTop: 10 }}>
                <Col span={8}>
                  <FontAwesomeIcon icon={faUsers} size="3x" />{" "}
                  <p>
                    Players: {item.min_players} - {item.max_players}
                  </p>
                </Col>
                <Col span={8}>
                  <FontAwesomeIcon icon={faClock} size="3x" />
                  <p>
                    Playtime: {item.min_playtime} - {item.max_playtime}
                  </p>
                </Col>
                <Col span={8}>
                  <FontAwesomeIcon icon={faStar} size="3x" />{" "}
                  <p>Rating: {item.average_user_rating}</p>
                </Col>
              </Row>
            </div>
          </div>
          <div className="flip-card-back">
            {"description_preview" in item && item.description_preview && (
              <Row style={{ marginTop: 50, padding: "20px 100px" }}>
                <Text
                  style={{
                    textAlign: "justify",
                    color: "white",
                    fontSize: 22,
                  }}
                >
                  <span className="description_span">
                    {item.description_preview}
                  </span>
                </Text>
              </Row>
            )}
          </div>
        </div>
      </div>
    );
  };

  const handleScroll = (event) => {
    event.nativeEvent.contentOffset.x !== offsetX
      ? setOffsetX(event.nativeEvent.contentOffset.x)
      : null;
    event.nativeEvent.layoutMeasurement.width !== layoutWidth
      ? setLayoutWidth(event.nativeEvent.layoutMeasurement.width)
      : null;
  };

  const handleLeftButton = () => {
    scrollRef.current.scrollTo({ x: offsetX - layoutWidth });
    setRotated(false);
  };

  const handleRightButton = () => {
    scrollRef.current.scrollTo({ x: offsetX + layoutWidth });
    setRotated(false);
  };

  useEffect(() => {
    async function getProfiles() {
      try {
        // const response = await axios.get("https://reqres.in/api/users?page=2");
        const response = await axios.get("/api/products");

        setProfiles(response.data.results);
        console.log(response.data.results);
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
        <View
          style={{
            alignSelf: "stretch",
          }}
        >
          <ScrollView
            onScroll={handleScroll}
            horizontal={true}
            pagingEnabled={true}
            ref={scrollRef}
            scrollEnabled={scrollEnabled}
            // scrollEventThrottle={throttle}
            style={{
              backgroundColor: "#eeeeee",
              height: "100vh",
            }}
          >
            {profiles && profiles.length > 0 && profiles.map(createItemRow)}
          </ScrollView>

          <View
            style={{
              backgroundColor: "none",
              width: 10,
              height: 10,
              position: "fixed",
              left: 40,
              top: 300,
            }}
          >
            <Button
              onPress={handleLeftButton}
              title={<CaretLeftFilled style={{ fontSize: 40 }} />}
              color={"transparent"}
            />
          </View>
          <View
            style={{
              backgroundColor: "none",
              width: 10,
              height: 10,
              position: "fixed",
              right: 50,
              top: 300,
            }}
          >
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

export default Showcase;
