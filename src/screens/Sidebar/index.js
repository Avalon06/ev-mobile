import React, { Component } from "react";
import { ImageBackground, TouchableOpacity, Image, Dimensions } from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import { Container, Content, Text, Icon, ListItem, Thumbnail, View } from "native-base";
import ProviderFactory from "../../provider/ProviderFactory";
import I18n from "../../I18n/I18n";
import styles from "./style";

const _provider = ProviderFactory.getProvider();

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  async componentDidMount() {
    // Logoff
    const userInfo = await _provider.getUserInfo();
    // Add sites
    this.setState({
      userName: `${userInfo.name} ${userInfo.firstName}`
    });
  }

  async _logoff() {
    // Logoff
    await _provider.logoff();
    // Back to login
    this.props.navigation.dispatch(StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: "Login"})]
    }));
  }

  _navigateTo = (screen) => {
    // Navigate
    this.props.navigation.navigate(screen);
    // Close
    this.props.navigation.closeDrawer();
  }

  render() {
    const navigation = this.props.navigation;
    const { userName } = this.state;
    return (
      <Container>
        <ImageBackground style={styles.background} source={require("../../../assets/sidebar-transparent.png")}>
          <Content style={styles.drawerContent}>
            <View style={styles.logoContainer}>
              <Image source={require("../../../assets/logo-low.gif")} style={{}} />
            </View>
            <ListItem style={[styles.links, styles.spaceTop]} button iconLeft onPress={() => this._navigateTo("Sites")}>
              <Icon name="ios-grid-outline" />
              <Text style={styles.linkText}>{I18n.t("sidebar.sites")}</Text>
            </ListItem>
            {/* <ListItem button onPress={() => navigation.navigate("Settings")} iconLeft style={styles.links}>
              <Icon name="ios-settings-outline" />
              <Text style={styles.linkText}>SETTINGS</Text>
            </ListItem> */}
            {/* <ListItem button onPress={() => navigation.navigate("Feedback")} iconLeft style={styles.links}>
              <Icon name="ios-paper-outline" />
              <Text style={styles.linkText}>FEEDBACK</Text>
            </ListItem> */}
          </Content>
          <View style={styles.logoutContainer}>
            <View style={styles.logoutbtn} foregroundColor={"white"}>
              <View style={styles.gridLogoutContainer}>
                <View style={styles.columnAccount}>
                  <TouchableOpacity style={styles.buttonLogout} onPress={() => this._logoff()}>
                    <Text style={styles.logout}>{I18n.t("authentication.logOut")}</Text>
                    <Text note style={styles.name}>{userName}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.columnThumbnail}>
                  <TouchableOpacity style={styles.buttonThumbnail} onPress={() => navigation.navigate("Profile")}>
                    <Thumbnail style={styles.profilePic} source={require("../../../assets/no-photo.png")} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}

export default SideBar;
