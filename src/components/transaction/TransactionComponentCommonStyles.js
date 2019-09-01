import { ResponsiveStyleSheet } from "react-native-responsive-ui";
import deepmerge from "deepmerge";
import commonColor from "../../theme/variables/commonColor";
import { ScaledSheet } from "react-native-size-matters";

const commonStyles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    borderBottomWidth: 1,
    borderBottomColor: commonColor.listBorderColor
  },
  transactionContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
    borderBottomColor: commonColor.listBorderColor,
    paddingLeft: "5@s",
    paddingRight: "5@s",
    height: "80@s",
    width: "100%"
  },
  label: {
    color: commonColor.textColor,
    fontSize: "10@s",
    marginTop: "-3@s"
  },
  info: {
    color: commonColor.brandPrimaryDark
  },
  success: {
    color: commonColor.brandSuccess
  },
  warning: {
    color: commonColor.brandWarning
  },
  danger: {
    color: commonColor.brandDanger
  },
  columnContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    color: commonColor.textColor,
    fontSize: "30@s",
    justifyContent: "flex-end"
  },
  labelValue: {
    fontSize: "15@s"
  }
});

const portraitStyles = {};

const landscapeStyles = {};

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