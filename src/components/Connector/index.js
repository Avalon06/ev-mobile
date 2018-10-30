import React, { Component } from "react";
import { Image, TouchableOpacity, Dimensions } from "react-native";
import { Text, View, Badge } from "native-base";

import * as Animatable from "react-native-animatable";
import styles from "./styles";

const type2 = require("../../../assets/connectorType/type2.gif");
const combo = require("../../../assets/connectorType/combo_ccs.gif");
const chademo = require("../../../assets/connectorType/chademo.gif");
const noConnector = require("../../../assets/connectorType/no-connector.gif");

class ConnectorComponent extends Component {

  render() {
    const { index, item, alpha, nav, charger } = this.props;
    if (index % 2 === 0) {
      return (
        <TouchableOpacity onPress={()=>nav.navigate("Details", {charger, connector: item, alpha})}>
          <Animatable.View animation="slideInLeft" iterationCount={1}>
            <View style={styles.connectorContainer}>
              <View style={styles.connectorStatus}>
                {item.status === "Available" && item.currentConsumption === 0 ?
                  <Animatable.View>
                    <Badge style={styles.badge} success>
                      <Text style={styles.badgeText}>{alpha}</Text>
                    </Badge>
                  </Animatable.View>
                : item.status === "Occupied" && item.currentConsumption === 0 ?
                  <Animatable.View>
                    <Badge style={styles.badge} danger>
                      <Text style={styles.badgeText}>{alpha}</Text>
                    </Badge>
                  </Animatable.View>
                : item.status === "Occupied" && item.currentConsumption !== 0 ?
                  <Animatable.View animation="fadeIn" iterationCount={"infinite"} direction="alternate-reverse">
                    <Badge style={styles.badge} danger>
                      <Text style={styles.badgeText}>{alpha}</Text>
                    </Badge>
                  </Animatable.View>
                :
                  <Animatable.View>
                    <Badge style={styles.badge} danger>
                      <Text style={styles.badgeText}>{alpha}</Text>
                    </Badge>
                  </Animatable.View>
                }
              </View>
              <View style={styles.status}>
                { item.currentConsumption !== 0  && item.status === "Occupied" ?
                  <View style={styles.statusDetailsContainer}>
                    <Text style={styles.statusText} numberOfLines={1}>{item.status}</Text>
                    <View style={styles.rowSpaceBetween}>
                      <View style={styles.column}>
                        <Text style={styles.energy}>{Math.trunc(item.currentConsumption / 1000) === 0 ? (item.currentConsumption / 1000).toFixed(1) : Math.trunc(item.currentConsumption / 1000)}</Text>
                        <Text style={styles.currentConsumptionUnity}>kW(Instant)</Text>
                      </View>
                      <View style={styles.column}>
                        <Text style={styles.energy}>{Math.round(item.totalConsumption / 1000)}</Text>
                        <Text style={styles.maxEnergy}>Total kW</Text>
                      </View>
                    </View>
                  </View>
                : item.currentConsumption === 0 ?
                  <View style={styles.statusDetailsContainerNoConsumption}>
                    <Text style={styles.statusText} numberOfLines={1}>{item.status}</Text>
                    <View style={styles.rowSpaceBetween}>
                      <View style={styles.column}>
                        <Image style={styles.sizeConnectorImage} source={item.type === "T2" ? type2 : item.type === "CCS" ? combo : item.type === "C" ? chademo : noConnector} />
                        <Text style={styles.connectorType}>{item.type === "T2" ? "Type 2" : item.type === "CCS" ? "CCS" : item.type === "C" ? "Type C" : "Unknown"}</Text>
                      </View>
                      <View style={styles.column}>
                        <Text style={styles.power}>{Math.trunc(item.power / 1000)}</Text>
                        <Text style={styles.maxEnergy}>kWMax</Text>
                      </View>
                    </View>
                  </View>
                :
                  <Text style={styles.statusText} numberOfLines={1}>{item.status}</Text>
                }
                {item.errorCode !== "NoError" && (
                  <Text style={styles.connectorErrorCodeText}>{item.errorCode}</Text>
                )}
              </View>
            </View>
          </Animatable.View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity onPress={()=>nav.navigate("Details", {charger, connector: item, alpha})}>
        <Animatable.View animation="slideInRight" iterationCount={1}>
          <View style={styles.connectorContainer}>
            <View style={styles.status}>
              { item.currentConsumption !== 0  && item.status === "Occupied" ?
                <View style={styles.statusDetailsContainer}>
                  <Text style={styles.statusText} numberOfLines={1}>{item.status}</Text>
                  <View style={styles.rowSpaceBetween}>
                    <View style={styles.column}>
                      <Text style={styles.energy}>{Math.trunc(item.currentConsumption / 1000) === 0 ? (item.currentConsumption / 1000).toFixed(1) : Math.trunc(item.currentConsumption / 1000)}</Text>
                      <Text style={styles.currentConsumptionUnity}>kW(Instant)</Text>
                    </View>
                    <View style={styles.column}>
                      <Text style={styles.energy}>{Math.round(item.totalConsumption / 1000)}</Text>
                      <Text style={styles.maxEnergy}>Total kW</Text>
                    </View>
                  </View>
                </View>
              : item.currentConsumption === 0 ?
                <View style={styles.statusDetailsContainerNoConsumption}>
                  <Text style={styles.statusText} numberOfLines={1}>{item.status}</Text>
                  <View style={styles.rowSpaceBetween}>
                    <View style={styles.column}>
                      <Text style={styles.power}>{Math.trunc(item.power / 1000)}</Text>
                      <Text style={styles.maxEnergy}>kWMax</Text>
                    </View>
                    <View style={styles.column}>
                      <Image style={styles.sizeConnectorImage} source={item.type === "T2" ? type2 : item.type === "CCS" ? combo : item.type === "C" ? chademo : noConnector} />
                      <Text style={styles.connectorType}>{item.type === "T2" ? "Type 2" : item.type === "CCS" ? "CCS" : item.type === "C" ? "Type C" : "Unknown"}</Text>
                    </View>
                  </View>
                </View>
              :
                <Text style={styles.statusText} numberOfLines={1}>{item.status}</Text>
              }
              {item.errorCode !== "NoError" && (
                <Text style={styles.connectorErrorCodeText}>{item.errorCode}</Text>
              )}
            </View>
            <View style={styles.connectorStatus}>
              {item.status === "Available" && item.currentConsumption === 0 ?
                <Animatable.View>
                  <Badge style={styles.badge} success>
                    <Text style={styles.badgeText}>{alpha}</Text>
                  </Badge>
                </Animatable.View>
              : item.status === "Occupied" && item.currentConsumption === 0 ?
                <Animatable.View>
                  <Badge style={styles.badge} danger>
                    <Text style={styles.badgeText}>{alpha}</Text>
                  </Badge>
                </Animatable.View>
              : item.status === "Occupied" && item.currentConsumption !== 0 ?
                <Animatable.View animation="fadeIn" iterationCount={"infinite"} direction="alternate-reverse">
                  <Badge style={styles.badge} danger>
                    <Text style={styles.badgeText}>{alpha}</Text>
                  </Badge>
                </Animatable.View>
              :
                <Animatable.View>
                  <Badge style={styles.badge} danger>
                    <Text style={styles.badgeText}>{alpha}</Text>
                  </Badge>
                </Animatable.View>
              }
            </View>
          </View>
        </Animatable.View>
      </TouchableOpacity>
    );
  }
}

export default ConnectorComponent;
