import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { theme } from '../theme';

export default function ToolsScreen() {
    const [brickLength, setBrickLength] = useState('');
    const [brickHeight, setBrickHeight] = useState('');
    const [brickResult, setBrickResult] = useState(null);

    const [concreteL, setConcreteL] = useState('');
    const [concreteW, setConcreteW] = useState('');
    const [concreteD, setConcreteD] = useState('');
    const [concreteResult, setConcreteResult] = useState(null);

    const calcBricks = () => {
        const l = parseFloat(brickLength);
        const h = parseFloat(brickHeight);
        if (isNaN(l) || isNaN(h)) {
            Alert.alert("Invalid Input", "Please enter valid numbers");
            return;
        }
        const sqft = l * h;
        const totalBricks = Math.ceil(sqft * 7); // Standard 7 bricks per sqft
        const withWaste = Math.ceil(totalBricks * 1.05);
        setBrickResult(`${totalBricks} bricks (${withWaste} inc. 5% waste)`);
    };

    const calcConcrete = () => {
        const l = parseFloat(concreteL);
        const w = parseFloat(concreteW);
        const d = parseFloat(concreteD); // in inches
        if (isNaN(l) || isNaN(w) || isNaN(d)) {
            Alert.alert("Invalid Input", "Please enter valid numbers");
            return;
        }
        // L * W * (D/12) / 27 = Cubic Yards
        const cubicYards = (l * w * (d / 12)) / 27;
        setConcreteResult(`${cubicYards.toFixed(2)} Cubic Yards`);
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            <Text style={styles.title}>Job Site Calculators</Text>

            {/* Brick Calculator */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>🧱 Brick Estimator</Text>
                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Length (ft)</Text>
                        <TextInput style={styles.input} keyboardType="numeric" value={brickLength} onChangeText={setBrickLength} />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Height (ft)</Text>
                        <TextInput style={styles.input} keyboardType="numeric" value={brickHeight} onChangeText={setBrickHeight} />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={calcBricks}>
                    <Text style={styles.buttonText}>CALCULATE BRICKS</Text>
                </TouchableOpacity>
                {brickResult && (
                    <View style={styles.resultBox}>
                        <Text style={styles.resultText}>{brickResult}</Text>
                    </View>
                )}
            </View>

            {/* Concrete Calculator */}
            <View style={styles.card}>
                <Text style={styles.cardTitle}>🏗️ Concrete Slab Volume</Text>
                <View style={styles.row}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Length (ft)</Text>
                        <TextInput style={styles.input} keyboardType="numeric" value={concreteL} onChangeText={setConcreteL} />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Width (ft)</Text>
                        <TextInput style={styles.input} keyboardType="numeric" value={concreteW} onChangeText={setConcreteW} />
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Depth (in)</Text>
                        <TextInput style={styles.input} keyboardType="numeric" value={concreteD} onChangeText={setConcreteD} />
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={calcConcrete}>
                    <Text style={styles.buttonText}>CALCULATE CONCRETE</Text>
                </TouchableOpacity>
                {concreteResult && (
                    <View style={styles.resultBox}>
                        <Text style={styles.resultText}>{concreteResult}</Text>
                    </View>
                )}
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.m,
    },
    title: {
        color: theme.colors.text,
        fontSize: theme.fontSize.header,
        fontWeight: 'bold',
        marginBottom: theme.spacing.l,
        marginTop: theme.spacing.m,
    },
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.large,
        marginBottom: theme.spacing.l,
    },
    cardTitle: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
        marginBottom: theme.spacing.m,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.spacing.m,
    },
    inputGroup: {
        flex: 1,
        marginHorizontal: theme.spacing.s / 2,
    },
    label: {
        color: theme.colors.textMuted,
        marginBottom: theme.spacing.s,
    },
    input: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        borderRadius: theme.borderRadius.medium,
        padding: theme.spacing.m,
        fontSize: theme.fontSize.regular,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.medium,
        alignItems: 'center',
        marginTop: theme.spacing.s,
    },
    buttonText: {
        color: theme.colors.background,
        fontWeight: 'bold',
        fontSize: theme.fontSize.regular,
    },
    resultBox: {
        marginTop: theme.spacing.m,
        padding: theme.spacing.m,
        backgroundColor: theme.colors.background,
        borderRadius: theme.borderRadius.medium,
        alignItems: 'center',
        borderColor: theme.colors.success,
        borderWidth: 1,
    },
    resultText: {
        color: theme.colors.success,
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
    }
});
