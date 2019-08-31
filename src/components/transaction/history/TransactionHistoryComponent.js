import React from "react";
import { ResponsiveComponent } from "react-native-responsive-ui";
import { Text, View, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import moment from "moment";
import computeStyleSheet from "../TransactionComponentCommonStyles";
import * as Animatable from "react-native-animatable";
import Constants from "../../../utils/Constants";
import Utils from "../../../utils/Utils";
import PropTypes from "prop-types";

let counter = 0;
export default class TransactionHistoryComponent extends ResponsiveComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: this.props.initialVisibility
    };
  }

  render() {
    const style = computeStyleSheet();
    const { transaction, isAdmin, isPricingActive } = this.props;
    const consumption = Math.round(transaction.stop.totalConsumption / 10) / 100;
    const price = transaction.stop.price ? Math.round(transaction.stop.price * 100) / 100 : 0;
    const duration = Utils.formatDurationHHMMSS(transaction.stop.totalDurationSecs, false);
    const inactivity = Utils.formatDurationHHMMSS(transaction.stop.totalInactivitySecs, false);
    const inactivityStyle = Utils.computeInactivityStyle(transaction.stop.totalInactivitySecs);
    const navigation = this.props.navigation;
    const transactionID = transaction.id;
    return (
      <Animatable.View
        animation={counter++ % 2 === 0 ? "flipInX" : "flipInX"}
        iterationCount={1}
        duration={Constants.ANIMATION_SHOW_HIDE_MILLIS}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("TransactionChart", { transactionID });
          }}>
          <View style={style.container}>
            <View style={style.headerContent}>
              <View style={style.rowContainer}>
                <Text style={style.headerName}>{moment(new Date(transaction.timestamp)).format("LLL")}</Text>
              </View>
              <Icon style={style.icon} type="MaterialIcons" name="navigate-next" />
            </View>
            <View style={style.subHeader}>
              <Text numberOfLines={1} style={[style.subHeaderName, style.subHeaderNameLeft]}>{transaction.chargeBoxID}</Text>
              {isAdmin && transaction.user ?
                <Text numberOfLines={1} style={[style.subHeaderName, style.subHeaderNameRight]}>{transaction.user.name} {transaction.user.firstName}</Text>
              :
                undefined
              }
            </View>
            <View style={style.transactionContent}>
              <View style={style.columnContainer}>
                <Icon type="MaterialIcons" name="ev-station" style={[style.icon, style.info]} />
                <View style={style.rowContainer}>
                  <Text style={[style.labelValue, style.info]}>{`${consumption} kW.h`}</Text>
                </View>
              </View>
              <View style={style.columnContainer}>
                <Icon type="MaterialIcons" name="timer" style={[style.icon, style.info]} />
                <Text style={[style.labelValue, style.info]}>{duration}</Text>
              </View>
              <View style={style.columnContainer}>
                <Icon type="MaterialIcons" name="timer-off" style={[style.icon, inactivityStyle]} />
                <Text style={[style.labelValue, inactivityStyle]}>{inactivity}</Text>
              </View>
              {isPricingActive ?
                <View style={style.columnContainer}>
                  <Icon type="FontAwesome" name="money" style={[style.icon, style.info]} />
                  <Text style={[style.labelValue, style.info]}>{price} {transaction.priceUnit}</Text>
                </View>
              :
                  undefined
              }
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

TransactionHistoryComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  transaction: PropTypes.object.isRequired,
  isPricingActive: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

TransactionHistoryComponent.defaultProps = {};

