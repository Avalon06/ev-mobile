import React from "react";
import { Image } from "react-native";
import { Header, Left, Right, Body, Title, Subtitle, Button, Icon } from "native-base";
import { ResponsiveComponent } from "react-native-responsive-ui";
import computeStyleSheet from "./styles";
import PropTypes from "prop-types";

const logo = require("../../../assets/logo-low.gif")

export default class HeaderComponent extends ResponsiveComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const style = computeStyleSheet();
    const { title, subTitle, leftAction, leftActionIcon, leftActionIconType, rightAction, rightActionIcon, rightActionIconType } = this.props;
    return (
      <Header style={style.header}>
        <Left style={style.leftHeader}>
          {leftAction ?
            <Button transparent onPress={() => leftAction()}>
              <Icon active type={leftActionIconType} name={leftActionIcon} style={[style.iconHeader, style.leftIconHeader]} />
            </Button>
          :
            <Image source={logo} style={style.logoHeader} />
          }
        </Left>
        <Body style={style.bodyHeader}>
          <Title style={subTitle ? [style.titleHeader, style.titleHeaderWithSubTitle] : style.titleHeader}>{title}</Title>
          {subTitle ?
            <Subtitle style={style.subTitleHeader}>{subTitle}</Subtitle>
          :
            undefined
          }
        </Body>
        <Right style={style.rightHeader}>
          {rightAction ?
            <Button transparent onPress={() => rightAction()}>
              <Icon active type={rightActionIconType} name={rightActionIcon} style={[style.iconHeader, style.rightIconHeader]} />
            </Button>
          :
            <Image source={logo} style={style.logoHeader} />
          }
        </Right>
      </Header>
    );
  }
}

HeaderComponent.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  leftAction: PropTypes.func,
  leftActionIcon: PropTypes.string,
  leftActionIconType: PropTypes.string,
  rightAction: PropTypes.func,
  rightActionIcon: PropTypes.string,
  rightActionIconType: PropTypes.string,
};

HeaderComponent.defaultProps = {
  leftActionIconType: "MaterialIcons",
  rightActionIconType: "MaterialIcons"
};