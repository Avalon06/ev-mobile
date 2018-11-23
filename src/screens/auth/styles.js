import { Dimensions, Platform, StyleSheet } from "react-native";
const commonColor = require("../../theme/variables/commonColor");

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  nodisplay: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: "black"
  },
  background: {
    flex: 1,
    width: null,
    height: deviceHeight,
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  spinner: {
    flex: 1
  },
  containerLogo: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    flexGrow: 1
  },
  helpBtns: {
    opacity: 0.9,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    marginTop: -60
  },
  logo: {
    resizeMode: "contain",
    height: deviceHeight / 6,
    alignSelf: "center"
  },
  form: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  buttonActionsheet: {
    alignSelf: "center",
    justifyContent: "center",
    width: deviceWidth / 1.87,
    marginBottom: 15,
    backgroundColor: "rgba(255,255,255,0.30)"
  },
  textActionsheet: {
    color: "#FFFFFF"
  },
  formErrorText: {
    fontSize: 12,
    color: commonColor.brandDanger,
    textAlign: "right",
    top: -10
  },
  button: {
    marginTop: 7,
    height: 50,
    fontSize: 16
  },
  buttonText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "900"
  },
  listItemEulaCheckbox : {
    borderBottomWidth: 0,
    paddingTop: 0,
    paddingBottom: 5,
    margin: 10
  },
  eulaText: {
    fontSize: 12
  },
  eulaLink: {
    fontSize: 12,
    textDecorationLine: "underline",
  },
  linksContainer: {
    paddingTop: deviceHeight < 600 ? 5 : Platform.OS === "android" ? 10 : 15,
    flexDirection: "row"
  },
  linksButtonLeft: {
    alignSelf: "flex-start"
  },
  linksButtonRight: {
    alignSelf: "flex-end"
  },
  linksButtonCenter: {
    alignSelf: "center"
  },
  helpButton: {
    opacity: 0.9,
    fontWeight: "bold",
    color: "#fff",
    fontSize: 14,
  },
  inputGroup: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.3)",
    marginBottom: 15,
    borderWidth: 0,
    borderColor: "transparent"
  },
  input: {
    paddingLeft: 10,
    color: "#fff"
  },
  icon: {
    width: 50,
    color: "#fff"
  },
  otherLinkText: {
    alignSelf: "center",
    opacity: 0.8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#EFF"
  }
});
