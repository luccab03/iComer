/**
 * @format
 */

import { AppRegistry, Platform } from "react-native";
import App from "./src/App";
import { name as appName } from "./app.json";
import PushNotification from "react-native-push-notification";
import * as RootNavigation from "./src/RootNavigation";

PushNotification.configure({
    onNotification: function(notification) {
        // console.log("NOTIFICATION:", notification);
        if (notification.data.tipo === 1) { // Button
            RootNavigation.navigate("Mock");
        } else if (notification.data.tipo === 2) {
            switch (notification.data.id ){
                case 1:
                    RootNavigation.navigate("Cupom");
                    break;
                case 2:
                    RootNavigation.navigate("Almoco");
                    break;
                case 3:
                    RootNavigation.navigate("Oferta");
            }
        }
    },

    requestPermissions: Platform.OS === "ios",
});

AppRegistry.registerComponent(appName, () => App);
