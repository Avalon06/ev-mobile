import React, { Component } from "react";
import { TouchableOpacity, ImageBackground, Alert } from "react-native";
import { Button, Icon, Text, Footer, FooterTab, View } from "native-base";
import { TabNavigator } from "react-navigation";
import Orientation from "react-native-orientation";

import ProviderFactory from "../../../provider/ProviderFactory";
import I18n from "../../../I18n/I18n";
import Utils from "../../../utils/Utils";

import ConnectorDetails from "../ConnectorDetails";
import ChargerDetails from "../ChargerDetails";
import GraphDetails from "../GraphDetails";
import styles from "./styles";

const _provider = ProviderFactory.getProvider();

export class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      siteImage: undefined,
      isAdmin: false,
      isAuthorisedStopTransaction: false
    };
  }

  async componentDidMount() {
    await this._getSiteImage();
    await this._isAdmin();
    await this._isAuthorizedStopTransaction();
  }

  _isAdmin = async () => {
    let result = await _provider._isAdmin();
    this.setState({
     isAdmin: result
    });
 }

  onStartTransaction = () => {
    const { charger } = this.props;
    Alert.alert(
      `${I18n.t("details.startTransaction")}`,
      `${I18n.t("details.startTransactionMessage")} ${charger.id} ?`,
      [
        {text: "Yes", onPress: () => this.startTransaction()},
        {text: "No"}
      ]
    );
  }

  onStopTransaction = () => {
    const { charger } = this.props;
    Alert.alert(
      `${I18n.t("details.stopTransaction")}`,
      `${I18n.t("details.stopTransactionMessage")} ${charger.id} ?`,
      [
        {text: "Yes", onPress: () => this.stopTransaction()},
        {text: "No"}
      ]
    );
  }

  startTransaction = async () => {
    const { charger, connector } = this.props;
    try {
      await _provider.startTransaction(charger.id, connector.connectorId);
    } catch (error) {
      // Other common Error
      Utils.handleHttpUnexpectedError(error, this.props);
    }
  }

  stopTransaction = async () => {
    const { charger, connector } = this.props;
    try {
      await _provider.stopTransaction(charger.id, connector.activeTransactionID);
    } catch (error) {
      // Other common Error
      Utils.handleHttpUnexpectedError(error, this.props);
    }
  }

  _isAuthorizedStopTransaction = async () => {
    try {
      let isAuthorised = await _provider.isAuthorizedStopTransaction(
        { Action: "StopTransaction", Arg1: this.props.charger.id, Arg2: this.props.connector.activeTransactionID }
      );
      this.setState({
        isAuthorisedStopTransaction: isAuthorised.IsAuthorized
      });
    } catch (error) {
      // Other common Error
      Utils.handleHttpUnexpectedError(error, this.props);
    }
  }

  _getSiteImage = async () => {
    try {
      let result = await _provider.getSiteImage(
        { ID: this.props.charger.siteArea.siteID }
      );
      if (result) {
        this.setState({siteImage: result.image}, () => console.log("SiteID", this.props.charger.siteArea.siteID));
      }
    } catch (error) {
      // Other common Error
      Utils.handleHttpUnexpectedError(error, this.props);
    }
  }

  render() {
    const { charger, connector, alpha, navigation } = this.props;
    const { isAuthorisedStopTransaction, siteImage } = this.state;
    return (
      <View>
        <View style={styles.header}>
          <View style={styles.arrowIconColumn}>
            <Button transparent onPress={() => navigation.navigate("Chargers")}>
              <Icon active name="arrow-back" style={styles.headerIcons} />
            </Button>
          </View>
          <View style={styles.chargerNameColumn}>
            <Text style={styles.chargerName}>{charger.id}</Text>
            <Text style={styles.connectorName}>{I18n.t("details.connector")} {alpha}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <ImageBackground style={styles.backgroundImage} source={{uri: siteImage}}>
          {this.state.isAdmin && (
            <View style={styles.transactionContainer}>
              {connector.activeTransactionID === 0 ?
                <TouchableOpacity onPress={() => this.onStartTransaction()}>
                  <View style={styles.outerCircle}>
                    <View style={styles.innerCircleStartTransaction}>
                      <Icon style={styles.startStopTransactionIcon} type="MaterialIcons" name="play-arrow" />
                    </View>
                  </View>
                </TouchableOpacity>
              :
                <TouchableOpacity disabled={!isAuthorisedStopTransaction} onPress={() => this.onStopTransaction()}>
                  <View style={styles.outerCircle}>
                    <View style={styles.innerCircleStopTransaction}>
                      <Icon style={styles.startStopTransactionIcon} type="MaterialIcons" name="stop" />
                    </View>
                  </View>
                </TouchableOpacity>
              }
            </View>
          )}
          </ImageBackground>
        </View>
      </View>
    );
  }
}

class TabDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }

  async componentDidMount() {
    await this._isAdmin();
  }

  componentDidUpdate() {
    this.isGraphTabActive();
  }

  componentWillUnmount() {
    Orientation.lockToPortrait();
  }

  _isAdmin = async () => {
    let result = await _provider._isAdmin();
    this.setState({
     isAdmin: result
    });
 }

  isGraphTabActive = () => {
    if (this.props.navigationState.index === 2) {
      Orientation.unlockAllOrientations();
      Orientation.lockToLandscape();
    } else {
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
    }
  }

  render() {
    const navigation = this.props.navigation;
    const state = this.props.navigationState;
    return (
      <Footer style={styles.footerContainer}>
        <FooterTab>
          <Button vertical active={state.index === 0} onPress={()=>navigation.navigate("ConnectorDetails")}>
            <Icon type="Feather" name="zap"/>
            <Text>{I18n.t("details.connector")}</Text>
          </Button>
          { this.state.isAdmin && (
            <Button vertical active={state.index === 1} onPress={()=>navigation.navigate("ChargerDetails")}>
              <Icon type="MaterialIcons" name="info" />
              <Text>{I18n.t("details.informations")}</Text>
            </Button>
          )}
          <Button vertical active={this.state.isAdmin ? state.index === 2 : state.index === 1} onPress={()=>navigation.navigate("GraphDetails")}>
            <Icon type="MaterialIcons" name="timeline" />
            <Text>{I18n.t("details.graph")}</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

const Details = TabNavigator(
  {
    ConnectorDetails: { screen: ConnectorDetails },
    ChargerDetails: { screen: ChargerDetails },
    GraphDetails: { screen: GraphDetails }
  },
  {
    tabBarPosition: "bottom",
    swipeEnabled: false,
    initialRouteName: "ConnectorDetails",
    animationEnabled: false,
    tabBarComponent: props => {
      return (
        <TabDetails {...props} />
      );
    }
  }
);

export default Details;
