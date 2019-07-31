import React from "react";
import { ResponsiveComponent } from "react-native-responsive-ui";
import { TouchableOpacity } from "react-native";
import { Text, View, Icon } from "native-base";
import openMap from "react-native-open-maps";
import computeStyleSheet from "./SiteComponentStyles";
import PropTypes from "prop-types";
import * as Animatable from "react-native-animatable";
import Constants from "../../utils/Constants";
import ChargePointStatusContainerComponent from "../charge-point-status/ChargePointStatusContainerComponent";

let counter = 0;
export default class SiteComponent extends ResponsiveComponent {
  _siteLocation(address) {
    openMap({
      latitude: address.latitude,
      longitude: address.longitude,
      zoom: 18
    });
  }

  render() {
    const style = computeStyleSheet();
    const { site, navigation } = this.props;
    return (
      <Animatable.View
        animation={counter++ % 2 === 0 ? "flipInX" : "flipInX"}
        iterationCount={1}
        duration={Constants.ANIMATION_SHOW_HIDE_MILLIS}
      >
        <TouchableOpacity onPress={() => navigation.navigate("SiteAreas", { siteID: site.id })}>
          <View style={style.container}>
            <View style={style.headerContent}>
              <TouchableOpacity onPress={() => this._siteLocation(site.address)}>
                <Icon style={style.icon} name="pin" />
              </TouchableOpacity>
              <Text style={style.name}>{site.name}</Text>
              <Icon style={style.icon} name="arrow-forward" />
            </View>
            <View style={style.connectorContent}>
              <ChargePointStatusContainerComponent
                totalConnectors={site.totalConnectors}
                availableConnectors={site.availableConnectors}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Animatable.View>
    );
  }
}

SiteComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
  site: PropTypes.object.isRequired
};

SiteComponent.defaultProps = {};
