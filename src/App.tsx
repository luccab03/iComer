import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PushNotification from "react-native-push-notification";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./RootNavigation";
import Almoco from "./pages/Almoco";
import Oferta from "./pages/Oferta";
import Cupom from "./pages/Cupom";

const { Navigator, Screen } = createNativeStackNavigator();

const App = () => {
    const createChannel = () => {
        PushNotification.createChannel({
            channelId: "test-channel",
            channelName: "Test Channel"
        }, () => {
        });
        PushNotification.createChannel({
            channelId: "scheduled-channel",
            channelName: "Scheduled Channel"
        }, () => {
        });
    };

    const handleNotification = () => {
        PushNotification.localNotification({
            channelId: "test-channel",
            title: "Teste",
            message: "Isso é um teste provocado pelo clique do botão",
            userInfo: { tipo: 1 }
        });
    };

    const Main = () => (
        <View style={Styles.container}>
            <View style={Styles.textContainer}>
                <Text style={Styles.header}>iComer</Text>
            </View>
            <View style={Styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                    handleNotification();
                }} style={Styles.button}>
                    <Text>Testar Notificação</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const Mock = () => (
        <View style={Styles.container}>
            <Text style={Styles.header}>Tela destino da notificação</Text>
        </View>
    );

    const notificationScheduler = () => {
        let i = 1;
        setInterval(() => {
            if (i === 1) {
                PushNotification.localNotification({
                    channelId: "scheduled-channel",
                    title: "iComer",
                    message: "Você tem um cupom disponível!",
                    userInfo: { tipo: 2, id: 1 }
                });
                i = 2;
            } else if (i === 2) {
                PushNotification.localNotification({
                    channelId: "scheduled-channel",
                    title: "iComer",
                    message: "Só não vai esquecer de almoçar viu?",
                    userInfo: { tipo: 2, id: 2 }
                });
                i = 3;
            } else if (i === 3) {
                PushNotification.localNotification({
                    channelId: "scheduled-channel",
                    title: "iComer",
                    message: "Ofertas disponíveis no app",
                    userInfo: { tipo: 2, id: 3 }
                });
                i = 1;
            }
        }, 300 * 1000);
    };

    useEffect(() => {
        createChannel();
        notificationScheduler();
    });

    return (
        <NavigationContainer ref={navigationRef}>
            <Navigator initialRouteName={"Home"}>
                <Screen name={"Home"} component={Main} options={{ headerShown: false }} />
                <Screen name={"Mock"} component={Mock} options={{ headerShown: false }} />
                <Screen name={"Oferta"} component={Oferta} options={{ headerShown: false }} />
                <Screen name={"Cupom"} component={Cupom} options={{ headerShown: false }} />
                <Screen name={"Almoco"} component={Almoco} options={{ headerShown: false }} />
            </Navigator>
        </NavigationContainer>
    );
};


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        flex: 1,
        marginTop: 50
    },
    header: {
        fontSize: 50,
        fontWeight: "bold"
    },
    buttonContainer: {
        flex: 2
    },
    button: {
        padding: 15,
        backgroundColor: "#959595",
        borderRadius: 40
    },
});

export default App;
