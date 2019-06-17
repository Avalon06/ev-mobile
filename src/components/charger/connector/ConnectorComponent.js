import React from "react";
import { Image, TouchableOpacity } from "react-native";
import { Text, View } from "native-base";
import { ResponsiveComponent } from "react-native-responsive-ui";
import Utils from "../../../utils/Utils";
import ConnectorStatusComponent from "../../connector-status/ConnectorStatusComponent";
import * as Animatable from "react-native-animatable";
import I18n from "../../../I18n/I18n";
import computeStyleSheet from "./ConnectorComponentStyles";
import PropTypes from "prop-types";
import Constants from "../../../utils/Constants";

export default class ConnectorComponent extends ResponsiveComponent {
  constructor(props) {
    super(props);
    // Init State
    this.state = {
      showBatteryLevel: false
    };
  }

  async componentDidMount() {
    // Set
    this.mounted = true;
    // Refresh every minutes
    this.timerAnimation = setInterval(() => {
      // Animate
      this._animate();
    }, Constants.ANIMATION_PERIOD_MILLIS);
  }

  componentWillUnmount() {
    // Stop the timer
    if (this.timerAnimation) {
      clearInterval(this.timerAnimation);
    }
  }

  _animate() {
    const { connector } = this.props;
    if (connector && connector.currentStateOfCharge === 0) {
      // SoC not supported
      return;
    }
    // Switch battery/Consumption
    this.setState({
      showBatteryLevel: !this.state.showBatteryLevel
    });
  }

  _renderFirstConnectorDetails = (connector, style) => {
    return (
      <ConnectorStatusComponent
        style={[style.statusConnectorDetail, style.statusConnectorDetailLetter]}
        connector={connector}
      />
    );
  };

  _renderSecondConnectorDetails = (connector, style) => {
    return connector.activeTransactionID !== 0 ? (
      <View style={style.statusConnectorDetail}>
        <Animatable.View
          animation={!this.state.showBatteryLevel ? "fadeIn" : "fadeOut"}
          style={style.animatableValue}
          duration={Constants.ANIMATION_ROTATION_MILLIS}
        >
          <Text style={style.value}>
            {connector.currentConsumption / 1000 < 10
              ? connector.currentConsumption > 0
                ? (connector.currentConsumption / 1000).toFixed(1)
                : 0
              : Math.trunc(connector.currentConsumption / 1000)}
          </Text>
          <Text style={style.label} numberOfLines={1}>
            {I18n.t("details.instant")}
          </Text>
          <Text style={style.subLabel} numberOfLines={1}>
            (kW)
          </Text>
        </Animatable.View>
        <Animatable.View
          animation={this.state.showBatteryLevel ? "fadeIn" : "fadeOut"}
          style={style.animatableValue}
          duration={Constants.ANIMATION_ROTATION_MILLIS}
        >
          <Text style={style.value}>{connector.currentStateOfCharge}</Text>
          <Text style={style.label} numberOfLines={1}>
            {I18n.t("details.battery")}
          </Text>
          <Text style={style.subLabel} numberOfLines={1}>
            (%)
          </Text>
        </Animatable.View>
      </View>
    ) : (
      <View style={style.statusConnectorDetail}>
        <Image style={style.connectorImage} source={Utils.getConnectorTypeImage(connector.type)} />
        <Text style={style.labelImage}>{Utils.translateConnectorType(connector.type)}</Text>
      </View>
    );
  };

  _renderThirdConnectorDetails = (connector, style) => {
    return connector.activeTransactionID !== 0 ? (
      <View style={style.statusConnectorDetail}>
        <Text style={style.value}>{Math.round(connector.totalConsumption / 1000)}</Text>
        <Text style={style.label} numberOfLines={1}>
          {I18n.t("details.total")}
        </Text>
        <Text style={style.subLabel} numberOfLines={1}>
          (kW.h)
        </Text>
      </View>
    ) : (
      <View style={style.statusConnectorDetail}>
        <Text style={style.value}>{Math.trunc(connector.power / 1000)}</Text>
        <Text style={style.label} numberOfLines={1}>
          {I18n.t("details.maximum")}
        </Text>
        <Text style={style.subLabel} numberOfLines={1}>
          (kW)
        </Text>
      </View>
    );
  };

  render() {
    const style = computeStyleSheet();
    const { connector, navigation, charger, index } = this.props;
    const even = index % 2 === 0;
    return charger.connectors.length > 1 ? (
      <TouchableOpacity
        style={style.statusConnectorContainer}
        onPress={() =>
          navigation.navigate("ChargerTab", {
            chargerID: charger.id,
            connectorID: connector.connectorId
          })
        }
      >
        <Animatable.View
          animation={even ? "slideInLeft" : "slideInRight"}
          iterationCount={1}
          duration={Constants.ANIMATION_SHOW_HIDE_MILLIS}
        >
          <View
            style={
              even
                ? [style.connectorContainer, style.leftConnectorContainer]
                : [style.connectorContainer, style.rightConnectorContainer]
            }
          >
            <View
              style={[
                style.statusConnectorDetailContainer,
                style.statusConnectorDescriptionContainer
              ]}
            >
              <Text style={style.statusDescription} numberOfLines={1}>
                {Utils.translateConnectorStatus(connector.status)}
              </Text>
            </View>
            {even ? (
              <View
                style={[
                  style.statusConnectorDetailContainer,
                  style.leftStatusConnectorDetailContainer
                ]}
              >
                {this._renderFirstConnectorDetails(connector, style)}
                {this._renderSecondConnectorDetails(connector, style)}
                {this._renderThirdConnectorDetails(connector, style)}
              </View>
            ) : (
              <View
                style={[
                  style.statusConnectorDetailContainer,
                  style.rightStatusConnectorDetailContainer
                ]}
              >
                {this._renderThirdConnectorDetails(connector, style)}
                {this._renderSecondConnectorDetails(connector, style)}
                {this._renderFirstConnectorDetails(connector, style)}
              </View>
            )}
          </View>
        </Animatable.View>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={style.statusOneConnectorContainer}
        onPress={() =>
          navigation.navigate("ChargerTab", {
            chargerID: charger.id,
            connectorID: connector.connectorId
          })
        }
      >
        <Animatable.View
          animation={"flipInX"}
          iterationCount={1}
          duration={Constants.ANIMATION_SHOW_HIDE_MILLIS}
        >
          <View style={style.connectorContainer}>
            <View style={style.statusConnectorDetailContainer}>
              <Text style={[style.statusDescription, style.statusOneDescription]} numberOfLines={1}>
                {Utils.translateConnectorStatus(connector.status)}
              </Text>
            </View>
            <View
              style={[
                style.statusConnectorDetailContainer,
                style.statusOneConnectorDetailContainer
              ]}
            >
              {this._renderFirstConnectorDetails(connector, style)}
              {this._renderSecondConnectorDetails(connector, style)}
              {this._renderThirdConnectorDetails(connector, style)}
            </View>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    );
  }
}

ConnectorComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  charger: PropTypes.object.isRequired,
  connector: PropTypes.object.isRequired,
  index: PropTypes.number
};

ConnectorComponent.defaultProps = {};