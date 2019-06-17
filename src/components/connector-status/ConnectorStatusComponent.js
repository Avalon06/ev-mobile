import React from "react";
import { Text as TextRN } from "react-native";
import { View } from "native-base";
import Constants from "../../utils/Constants";
import { ResponsiveComponent } from "react-native-responsive-ui";
import * as Animatable from "react-native-animatable";
import computeStyleSheet from "./ConnectorStatusComponentStyles";
import PropTypes from "prop-types";

export default class ConnectorStatusComponent extends ResponsiveComponent {
  // eslint-disable-next-line class-methods-use-this
  _getStyleFromStatus(connector, style) {
    switch (connector.status) {
      // Green
      case Constants.CONN_STATUS_AVAILABLE:
        return style.statusGreen;
      // Red
      case Constants.CONN_STATUS_SUSPENDED_EV:
      case Constants.CONN_STATUS_SUSPENDED_EVSE:
      case Constants.CONN_STATUS_OCCUPIED:
      case Constants.CONN_STATUS_CHARGING:
      case Constants.CONN_STATUS_FAULTED:
      case Constants.CONN_STATUS_RESERVED:
      case Constants.CONN_STATUS_UNAVAILABLE:
        return style.statusRed;
      // Orange
      case Constants.CONN_STATUS_PREPARING:
      case Constants.CONN_STATUS_FINISHING:
        return style.statusOrange;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _getStatusAnimation(connector) {
    // First check
    if (connector.status === Constants.CONN_STATUS_CHARGING) {
      return "fadeIn";
    }
    return "";
  }

  render() {
    const style = computeStyleSheet();
    const { connector } = this.props;
    const connectorLetter = String.fromCharCode(64 + connector.connectorId);
    return (
      <View style={[this.props.style, style.container]}>
        <Animatable.View
          animation={this._getStatusAnimation(connector)}
          iterationCount={"infinite"}
          direction="alternate-reverse"
        >
          <View style={[style.statusContainer, this._getStyleFromStatus(connector, style)]}>
            <TextRN style={style.statusLetter}>{connectorLetter}</TextRN>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

ConnectorStatusComponent.propTypes = {
  connector: PropTypes.object.isRequired
};

ConnectorStatusComponent.defaultProps = {};