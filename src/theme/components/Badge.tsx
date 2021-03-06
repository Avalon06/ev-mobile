import { moderateScale, scale } from 'react-native-size-matters';

import commonColor from './../variables/commonColor';
import variable from './../variables/platform';

export default (variables /* : * */ = variable) => {
  const badgeTheme: any = {
    '.primary': {
      backgroundColor: variables.buttonPrimaryBg
    },
    '.warning': {
      backgroundColor: variables.buttonWarningBg
    },
    '.info': {
      backgroundColor: variables.buttonInfoBg
    },
    '.success': {
      backgroundColor: variables.buttonSuccessBg
    },
    '.danger': {
      backgroundColor: variables.buttonDangerBg
    },
    'NativeBase.Text': {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      color: variables.badgeColor,
      fontSize: variables.fontSizeBase,
      lineHeight: variables.lineHeight - 5,
      textAlign: 'center',
      paddingTop: moderateScale(11, 4),
      paddingBottom: moderateScale(8),
      paddingHorizontal: 3
    },
    backgroundColor: variables.badgeBg,
    padding: variables.badgePadding,
    paddingHorizontal: 6,
    borderStyle: 'solid',
    borderColor: commonColor.textColor,
    borderWidth: scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(44),
    height: scale(44)
  };
  return badgeTheme;
};
