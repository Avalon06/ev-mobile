import deepmerge from 'deepmerge';
import { Platform } from 'react-native';
import ResponsiveStylesheet from 'react-native-responsive-stylesheet'
import { ScaledSheet } from 'react-native-size-matters';

import commonColor from '../../theme/variables/commonColor';

const commonStyles = ScaledSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderBottomWidth: 1,
    borderBottomColor: commonColor.listBorderColor
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '5@s',
    paddingBottom: '5@s',
    borderBottomWidth: 1,
    borderBottomColor: commonColor.listBorderColor,
    backgroundColor: commonColor.headerBgColor
  },
  headerName: {
    paddingTop: Platform.OS === 'ios' ? '2@s' : 0,
    paddingLeft: '10@s',
    fontSize: '20@s',
    fontWeight: 'bold',
    color: commonColor.headerTextColor
  },
  connectorContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: '12@s',
    paddingBottom: '12@s',
    borderBottomWidth: 1,
    borderBottomColor: commonColor.brandPrimaryDark
  },
  icon: {
    fontSize: '30@s',
    marginLeft: '10@s',
    marginRight: '10@s',
    color: commonColor.headerTextColor
  },
  iconHidden: {
    opacity: 0
  },
  detailedContent: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  badgeContainer: {
    paddingTop: '5@s',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  badgeSuccessContainer: {},
  badgeOccupiedContainer: {},
  connectorText: {
    color: commonColor.textColor,
    marginTop: '-15@s',
    marginRight: '10@s',
    fontSize: '20@s'
  },
  connectorBadge: {
    marginTop: '5@s'
  },
  freeConnectorBadge: {
    backgroundColor: commonColor.brandInfo
  },
  occupiedConnectorBadge: {
    backgroundColor: commonColor.brandDanger
  },
  connectorBadgeTitle: {
    minWidth: '35@s',
    textAlign: 'center',
    fontSize: '25@s',
    paddingTop: Platform.OS === 'ios' ? '3@s' : 0,
    paddingBottom: Platform.OS === 'ios' ? '3@s' : 0,
    fontWeight: 'bold',
    color: commonColor.textColor
  },
  connectorSubTitle: {
    fontSize: '15@s',
    paddingBottom: '5@s',
    marginTop: '5@s',
    marginBottom: '5@s',
    marginLeft: '10@s',
    marginRight: '10@s',
    color: commonColor.textColor
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
