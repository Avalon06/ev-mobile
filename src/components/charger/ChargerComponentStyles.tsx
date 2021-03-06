import deepmerge from 'deepmerge';
import ResponsiveStylesheet from 'react-native-responsive-stylesheet'
import { ScaledSheet } from 'react-native-size-matters';

import commonColor from '../../theme/variables/commonColor';

const commonStyles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: commonColor.brandPrimaryDark
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5@s',
    paddingRight: '5@s',
    borderBottomColor: commonColor.listBorderColor,
    borderBottomWidth: 1,
    backgroundColor: commonColor.headerBgColor
  },
  headerName: {
    color: commonColor.headerTextColor,
    fontSize: '20@s',
    marginLeft: '5@s',
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: '10@s',
    marginRight: '10@s'
  },
  icon: {
    fontSize: '20@s',
    paddingLeft: '20@s',
  },
  heartbeatIcon: {
    color: commonColor.brandSuccess,
    paddingLeft: '20@s',
    fontSize: '18@s'
  },
  deadHeartbeatIcon: {
    color: commonColor.brandDanger,
    paddingLeft: '20@s',
    fontSize: '18@s'
  },
  connectorsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap'
  }
});

const portraitStyles = {};

const landscapeStyles = {};

export default function computeStyleSheet(): any {
  return ResponsiveStylesheet.createOriented({
    landscape: deepmerge(commonStyles, landscapeStyles),
    portrait: deepmerge(commonStyles, portraitStyles)
  });
}
