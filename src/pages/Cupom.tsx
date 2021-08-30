import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Cupom = () => (
    <View style={styles.container}>
        <Text style={styles.header}>Você clicou no Cupom!</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        fontSize: 50,
        fontWeight: "bold"
    }
});

export default Cupom;
