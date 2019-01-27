import { ResponsiveStyleSheet } from "react-native-responsive-ui";
import deepmerge from "deepmerge";
import commonColor from "../../theme/variables/commonColor";
import { scale } from "react-native-size-matters";

const commonStyles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between", 
		alignItems: "center",
    height: scale(40),
    paddingLeft: scale(10),
    paddingRight: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: commonColor.listBorderColor,
  },
  inputField: {
    flex: 1,
    paddingLeft: scale(5),
    fontSize: scale(15),
    color: commonColor.textColor
  },
  icon: {
    fontSize: scale(20),
    color: commonColor.textColor
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

