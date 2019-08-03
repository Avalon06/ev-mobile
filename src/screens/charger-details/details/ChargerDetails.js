import React from "react";
import { ScrollView, Alert } from "react-native";
import { Container, View, Text, Button } from "native-base";
import { ResponsiveComponent } from "react-native-responsive-ui";
import I18n from "../../../I18n/I18n";
import computeStyleSheet from "./ChargerDetailsStyles";
import PropTypes from "prop-types";
import BackgroundComponent from "../../../components/background/BackgroundComponent";
import ProviderFactory from "../../../provider/ProviderFactory";
import Utils from "../../../utils/Utils";
import Message from "../../../utils/Message";

const _provider = ProviderFactory.getProvider();

export default class ChargerDetails extends ResponsiveComponent {
  _resetHardConfirm() {
    const { charger } = this.props;
    Alert.alert(
      I18n.t("chargers.reboot"),
      I18n.t("chargers.rebootMessage", { chargeBoxID: charger.id }),
      [
        { text: I18n.t("general.yes"), onPress: () => this._reset(charger.id, "Hard") },
        { text: I18n.t("general.cancel") }
      ]
    );
  }

  async _reset(chargeBoxID, type) {
    try {
      // Start the Transaction
      const status = await _provider.reset(chargeBoxID, type);
      // Check
      if (status.status && status.status === "Accepted") {
        Message.showSuccess(I18n.t("details.accepted"));
      } else {
        Message.showError(I18n.t("details.denied"));
      }
    } catch (error) {
      // Other common Error
      Utils.handleHttpUnexpectedError(error, this.props.navigation);
    }
  }

  render() {
    const style = computeStyleSheet();
    const { charger } = this.props;
    return (
      <Container style={style.container}>
        <BackgroundComponent active={false}>
          <ScrollView style={style.scrollViewContainer}>
            <View style={style.viewContainer}>
              <View style={style.descriptionContainer}>
                <Text style={style.label}>{I18n.t("details.vendor")}</Text>
                <Text style={style.value}>
                  {charger.chargePointVendor ? charger.chargePointVendor : "-"}
                </Text>
              </View>
              <View style={style.descriptionContainer}>
                <Text style={style.label}>{I18n.t("details.model")}</Text>
                <Text style={style.value}>
                  {charger.chargePointModel ? charger.chargePointModel : "-"}
                </Text>
              </View>
              <View style={style.descriptionContainer}>
                <Text style={style.label}>{I18n.t("details.ocppVersion")}</Text>
                <Text style={style.value}>{charger.ocppVersion ? charger.ocppVersion : "-"}</Text>
              </View>
              <View style={style.descriptionContainer}>
                <Text style={style.label}>{I18n.t("details.firmwareVersion")}</Text>
                <Text style={style.value}>
                  {charger.firmwareVersion ? charger.firmwareVersion : "-"}
                </Text>
              </View>
              <View style={style.actionContainer}>
                <Button rounded danger style={style.actionButton} onPress={() => this._resetHardConfirm()}>
                  <Text uppercase={false} style={style.actionButtonText}>{I18n.t("chargers.reboot")}</Text>
                </Button>
              </View>
            </View>
          </ScrollView>
        </BackgroundComponent>
      </Container>
    );
  }
}

ChargerDetails.propTypes = {
  charger: PropTypes.object.isRequired,
  connector: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool.isRequired
};

ChargerDetails.defaultProps = {};
