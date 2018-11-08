import React, { Component } from "react";
import { Text as RNText, ScrollView, RefreshControl } from "react-native";
import { Container, Icon, View, Badge, Thumbnail, Text } from "native-base";

import * as Animatable from "react-native-animatable";

import { Header } from "../TabNavigator";
import ProviderFactory from "../../../provider/ProviderFactory";
import I18n from "../../../I18n/I18n";
import Utils from "../../../utils/Utils";
import styles from "./styles";
import Constants from "../../../utils/Constants";

const noPhoto = require("../../../../assets/no-photo.png");
const _provider = ProviderFactory.getProvider();

class ConnectorDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      charger: this.props.navigation.state.params.charger,
      connector: this.props.navigation.state.params.connector,
      alpha: this.props.navigation.state.params.alpha,
      user: {},
      userID: undefined,
      tagID: undefined,
      timestamp: undefined,
      seconds: undefined,
      minutes: undefined,
      hours: undefined,
      userImage: undefined,
      refreshing: false,
      isAdmin: false
    };
  }

  async componentDidMount() {
    // Is Admin ?
    this.setState({
      isAdmin: await _provider._isAdmin()
    });
    // Is their a transaction ?
    if (this.state.connector.activeTransactionID && this.state.isAdmin) {
      // Yes, get and set the transaction informations
      const result = await this._getTransaction();
      this.setState({
        user: result.user,
        tagID: result.tagID,
        timestamp: new Date(result.timestamp),
        userID: result.user.id
      }, async () => {
          await this._getUserImage();
      });
    }
    // Is their a timestamp ?
    if (this.state.timestamp && this.state.isAdmin) {
      // Yes: Get date
      const timeNow = new Date();
      // Get elapsed time
      let hours = this.formatTimer(Math.abs(timeNow.getHours() - this.state.timestamp.getHours()));
      let minutes = this.formatTimer(Math.abs(timeNow.getMinutes() - this.state.timestamp.getMinutes()));
      let seconds = this.formatTimer(Math.abs(timeNow.getSeconds() - this.state.timestamp.getSeconds()));
      // Set elapsed time
      this.setState({
        hours,
        minutes,
        seconds
      }, () => {
        // Start timer
        this.elapsedTime = setInterval(() => {
          this.setState({
            seconds: this.formatTimer(++this.state.seconds)
          });
          this._userChargingElapsedTime();
        }, 1000);
      });
    }
    // Refresh every minutes
    this.timer = setInterval(() => {
      this._timerRefresh();
    }, Constants.AUTO_REFRESH_PERIOD_MILLIS);
  }

  componentWillUnmount() {
    // Clear interval if it exists
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.elapsedTime) {
      clearInterval(this.elapsedTime);
    }
  }

  _getCharger = async (chargerId) => {
    try {
      let result = await _provider.getCharger(
        { ID: chargerId }
      );
      return (result);
    } catch (error) {
      // Other common Error
      Utils.handleHttpUnexpectedError(error, this.props);
    }
  }

  _getTransaction = async () => {
  const { connector } = this.state;
    try {
      let result = await _provider.getTransaction(
        { ID: connector.activeTransactionID }
      );
      console.log("Transaction :", result);
      return result;
    } catch (error) {
      // Other common Error
      Utils.handleHttpUnexpectedError(error, this.props);
    }
  }

  _getUserImage = async () => {
    const { userID } = this.state;
    let userImage;
    try {
      userImage = await _provider.getUserImage(
        { ID: userID }
      );
      if (userImage.image) {
        this.setState({userImage: userImage.image});
      }
    } catch (error) {
      // Other common Error
      Utils.handleHttpUnexpectedError(error, this.props);
    }
  }

  formatTimer = (val) => {
    // Put 0 next to the digit if lower than 10
    let valString = val + "";

    if (valString.length < 2) {
      return "0" + valString;
    }
    return valString;
  };

  _userChargingElapsedTime = () => {
    // Set new elapsed time
    this.setState({
      seconds: this.formatTimer(this.state.seconds % 60),
      minutes: this.state.seconds % 60 === 0 ? this.formatTimer(++this.state.minutes % 60) : this.formatTimer(this.state.minutes),
      hours: this.state.minutes % 60 === 0 && this.state.seconds % 60 === 0 ? this.formatTimer(++this.state.hours % 60) : this.formatTimer(this.state.hours)
    });
  }

  _timerRefresh = async () => {
    let result = await this._getCharger(this.state.charger.id);
    this.setState({
      charger: result,
      connector: result.connectors[String.fromCharCode(this.state.alpha.charCodeAt() - 17)]
    }, () => console.log("Refreshed: ", this.state.charger));
  }

  _onRefresh = () => {
    this.setState({refreshing: true}, async () => {
      let result = await this._getCharger(this.state.charger.id);
      console.log("Stored: ", result);
      this.setState({
        refreshing: false,
        charger: result,
        connector: result.connectors[String.fromCharCode(this.state.alpha.charCodeAt() - 17)]
      });
    });
  }

  renderAdmin = () => {
    const { connector, alpha, refreshing, user, tagID, userImage, timestamp, hours, minutes, seconds } = this.state;
    return (
      <ScrollView style={styles.scrollViewContainer} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />
      }>
        <Animatable.View style={styles.content} animation="fadeIn" delay={100}>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              { connector.status === "Available" && connector.currentConsumption === 0 ?
                <Animatable.View>
                  <Badge style={styles.badgeContainer} success>
                    <RNText style={styles.badgeText}>{alpha}</RNText>
                  </Badge>
                </Animatable.View>
              : (connector.status === "Occupied" || connector.status === "SuspendedEV") && connector.currentConsumption === 0 ?
                <Animatable.View>
                  <Badge style={styles.badgeContainer} danger>
                    <RNText style={styles.badgeText}>{alpha}</RNText>
                  </Badge>
                </Animatable.View>
              : connector.currentConsumption !== 0 ?
                <Animatable.View animation="fadeIn" iterationCount={"infinite"} direction="alternate-reverse">
                  <Badge style={styles.badgeContainer} danger>
                    <RNText style={styles.badgeText}>{alpha}</RNText>
                  </Badge>
                </Animatable.View>
              :
                <Animatable.View>
                  <Badge style={styles.badgeContainer} danger>
                    <RNText style={styles.badgeText}>{alpha}</RNText>
                  </Badge>
                </Animatable.View>
              }
              {connector.status === "Faulted" ?
                <Text style={styles.faultedText}>{connector.info}</Text>
              :
                <Text style={styles.connectorStatus}>
                  { connector.status === "Available" ?
                    I18n.t("connector.available")
                  : connector.status === "Occupied" ?
                    I18n.t("connector.occupied")
                  : connector.status === "Charging" ?
                    I18n.t("connector.charging")
                  : connector.status === "SuspendedEV" ?
                    I18n.t("connector.suspendedEV")
                  :
                    connector.status
                  }
                </Text>
              }
            </View>
            <View style={styles.columnContainer}>
              {connector.status === "Available" ?
                <View>
                  <Thumbnail style={styles.profilePic} source={noPhoto} />
                  <Text style={styles.undefinedStatusText}>-</Text>
                </View>
              :
                <View>
                  <Thumbnail style={styles.profilePic} source={userImage ? {uri: userImage} : noPhoto} />
                  {user.name && user.firstName ?
                    <Text style={styles.statusText}>{`${user.name} ${user.firstName}`}</Text>
                  :
                    <Text style={styles.statusText}>Unknown user</Text>
                  }
                  {tagID && (
                    <Text style={styles.tagIdText}>({tagID})</Text>
                  )}
                </View>
              }
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <Icon type="FontAwesome" name="bolt" style={styles.iconSize} />
              { (connector.currentConsumption / 1000).toFixed(1) === 0.0 || connector.currentConsumption === 0 ?
                <Text style={styles.undefinedStatusText}>-</Text>
              :
                <View style={styles.currentConsumptionContainer}>
                  <Text style={styles.currentConsumptionText}>{(connector.currentConsumption / 1000).toFixed(1)}</Text>
                  <Text style={styles.kWText}>{I18n.t("details.instant")}</Text>
                </View>
              }
            </View>
            <View style={styles.columnContainer}>
              <Icon type="Ionicons" name="time" style={styles.iconSize} />
              {timestamp ?
                <Text style={styles.undefinedStatusText}>{`${hours}:${minutes}:${seconds}`}</Text>
              :
                <Text style={styles.undefinedStatusText}>- : - : -</Text>
              }
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <Icon style={styles.iconSize} type="MaterialIcons" name="trending-up" />
              { (connector.totalConsumption / 1000).toFixed(1) === 0.0 || connector.totalConsumption === 0 ?
                <Text style={styles.undefinedStatusText}>-</Text>
              :
                <View style={styles.energyConsumedContainer}>
                  <Text style={styles.energyConsumedNumber}>{(connector.totalConsumption / 1000).toFixed(1)}</Text>
                  <Text style={styles.energyConsumedText}>{I18n.t("details.consumed")}</Text>
                </View>
              }
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }

  renderBasic = () => {
    const { connector, alpha, refreshing, timestamp, hours, minutes, seconds } = this.state;
    return (
      <ScrollView style={styles.scrollViewContainer} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />
      }>
        <Animatable.View style={styles.content} animation="fadeIn" delay={100}>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              { connector.status === "Available" && connector.currentConsumption === 0 ?
                <Animatable.View>
                  <Badge style={styles.badgeContainer} success>
                    <RNText style={styles.badgeText}>{alpha}</RNText>
                  </Badge>
                </Animatable.View>
              : (connector.status === "Occupied" || connector.status === "SuspendedEV") && connector.currentConsumption === 0 ?
                <Animatable.View>
                  <Badge style={styles.badgeContainer} danger>
                    <RNText style={styles.badgeText}>{alpha}</RNText>
                  </Badge>
                </Animatable.View>
              : connector.currentConsumption !== 0 ?
                <Animatable.View animation="fadeIn" iterationCount={"infinite"} direction="alternate-reverse">
                  <Badge style={styles.badgeContainer} danger>
                    <RNText style={styles.badgeText}>{alpha}</RNText>
                  </Badge>
                </Animatable.View>
              :
                <Animatable.View>
                  <Badge style={styles.badgeContainer} danger>
                    <RNText style={styles.badgeText}>{alpha}</RNText>
                  </Badge>
                </Animatable.View>
              }
              {connector.status === "Faulted" ?
                <Text style={styles.faultedText}>{connector.info}</Text>
              :
                <Text style={styles.connectorStatus}>
                  { connector.status === "Available" ?
                    I18n.t("connector.available")
                  : connector.status === "Occupied" ?
                    I18n.t("connector.occupied")
                  : connector.status === "Charging" ?
                    I18n.t("connector.charging")
                  : connector.status === "SuspendedEV" ?
                    I18n.t("connector.suspendedEV")
                  :
                    connector.status
                  }
                </Text>
              }
            </View>
            <View style={styles.columnContainer}>
              <Icon type="FontAwesome" name="bolt" style={styles.iconSize} />
              { (connector.currentConsumption / 1000).toFixed(1) === 0.0 || connector.currentConsumption === 0 ?
                <Text style={styles.undefinedStatusText}>-</Text>
              :
                <View style={styles.currentConsumptionContainer}>
                  <Text style={styles.currentConsumptionText}>{(connector.currentConsumption / 1000).toFixed(1)}</Text>
                  <Text style={styles.kWText}>{I18n.t("details.instant")}</Text>
                </View>
              }
            </View>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.columnContainer}>
              <Icon type="Ionicons" name="time" style={styles.iconSize} />
              {timestamp ?
                <Text style={styles.undefinedStatusText}>{`${hours}:${minutes}:${seconds}`}</Text>
              :
                <Text style={styles.undefinedStatusText}>- : - : -</Text>
              }
            </View>
            <View style={styles.columnContainer}>
              <Icon style={styles.iconSize} type="MaterialIcons" name="trending-up" />
              { (connector.totalConsumption / 1000).toFixed(1) === 0.0 || connector.totalConsumption === 0 ?
                <Text style={styles.undefinedStatusText}>-</Text>
                :
                <View style={styles.energyConsumedContainer}>
                  <Text style={styles.energyConsumedNumber}>{(connector.totalConsumption / 1000).toFixed(1)}</Text>
                  <Text style={styles.energyConsumedText}>{I18n.t("details.consumed")}</Text>
                </View>
              }
            </View>
          </View>
        </Animatable.View>
      </ScrollView>
    );
  }

  render() {
    const navigation = this.props.navigation;
    const { charger, connector, alpha } = this.state;
    return (
      <Container>
        <Header charger={charger} connector={connector} alpha={alpha} navigation={navigation} />
        { this.state.isAdmin ?
          this.renderAdmin()
        :
          this.renderBasic()
        }
      </Container>
    );
  }
}

export default ConnectorDetails;
