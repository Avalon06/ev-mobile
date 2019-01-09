import { ResponsiveStyleSheet } from "react-native-responsive-ui";
import commonColor from "../../theme/variables/commonColor";
import { scale } from 'react-native-size-matters';
import deepmerge from "deepmerge";

const commonStyles = {
  header: {
    height: scale(45),
    paddingTop: scale(5),
    paddingBottom: scale(5),
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3"
  },
  leftHeader: {
    flex: 0
  },
  bodyHeader: {
    flex: 1
  },
  rightHeader: {
    flex: 0
  },
  logoHeader: {
    width: scale(45),
    resizeMode: "contain"
  },
  titleHeader: {
    color: commonColor.textColor,
    fontSize: scale(15),
    width: "75%",
    textAlign: "center",
    fontWeight: "bold"
  },
  iconHeader: {
    fontSize: scale(25)
  },
  content: {
    flex: 1
  },
  spinner: {
    flex: 1
  }
};

const portraitStyles = {
};

const landscapeStyles = {
};

export default function computeStyleSheet() {
  return ResponsiveStyleSheet.select([
    {
      query: { orientation: "landscape" },
      style: deepmerge(commonStyles, landscapeStyles)
    },
    {
      query: { orientation: "portrait" },
      style: deepmerge(commonStyles, portraitStyles)
    }
  ]);
}