import { StyleSheet, Dimensions } from "react-native";

const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  connectorContainer: {
    flexDirection: "row",
    paddingTop: 15
  },
  connectorStatus: {
    flexDirection: "column",
    paddingLeft: 10,
    paddingRight: 10
  },
  badge: {
    justifyContent: "center"
  },
  connectorTextInfo: {
    fontSize: 10,
  },
  connectorErrorCodeText: {
    fontSize: 9,
    color: "#FF0000"
  },
  status: {
    flexDirection: "column",
    width: 100,
    alignItems: "center",
    paddingBottom: 10
  },
  statusDetailsContainer: {
    width: deviceWidth / 4.4
  },
  statusText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 17
  },
  rowSpaceBetween: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  column: {
    flexDirection: "column"
  },
  energy: {
    fontWeight: "bold",
    fontSize: 27,
    textAlign: "center"
  },
  currentConsumptionUnity: {
    fontSize: 8
  },
  maxEnergy: {
    fontSize: 9,
    textAlign: "center"
  },
  statusDetailsContainerNoConsumption : {
    width: deviceWidth / 4.8
  },
  sizeConnectorImage: {
    width: deviceWidth / 10.7,
    height: deviceWidth / 10.7
  },
  maxPowerContainer: {
    flexDirection: "column",
    width: deviceWidth / 11
  },
  power: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center"
  },
  connectorType: {
    fontSize: 10.5,
    textAlign: "center"
  }
});