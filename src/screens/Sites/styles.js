import { ResponsiveStyleSheet } from "react-native-responsive-ui";
import commonColor from "../../theme/variables/commonColor";
import { scale } from 'react-native-size-matters';
import deepmerge from "deepmerge";

const commonStyles = {
  header: {
    height: scale(40)
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
    width: scale(40),
    resizeMode: "contain"
  },
  titleHeader: {
    color: commonColor.textColor,
    fontSize: scale(20),
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
