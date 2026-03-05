import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../theme';
import { getHistory } from '../api';

export default function HomeScreen({ navigation }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            loadHistory();
        }, [])
    );

    const loadHistory = async () => {
        setLoading(true);
        const data = await getHistory();
        setHistory(data);
        setLoading(false);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.historyCard}
            onPress={() => navigation.navigate('Chat', { prefill: item.question })}
        >
            <Text style={styles.historyQ} numberOfLines={1}>{item.question}</Text>
            <Text style={styles.historyA} numberOfLines={2}>{item.answer}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerArea}>
                <Text style={styles.welcomeText}>Hello, Builder!</Text>
                <Text style={styles.subText}>Got a project question?</Text>
            </View>

            <TouchableOpacity
                style={styles.mainButton}
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Chat')}
            >
                <Text style={styles.mainButtonText}>ASK AI EXPERT</Text>
            </TouchableOpacity>

            <View style={styles.historySection}>
                <Text style={styles.sectionTitle}>Recent Questions</Text>
                {loading ? (
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                ) : history.length === 0 ? (
                    <Text style={styles.emptyText}>No recent questions.</Text>
                ) : (
                    <FlatList
                        data={history}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 20 }}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: theme.spacing.m,
    },
    headerArea: {
        marginTop: theme.spacing.m,
        marginBottom: theme.spacing.l,
    },
    welcomeText: {
        color: theme.colors.text,
        fontSize: theme.fontSize.header,
        fontWeight: 'bold',
    },
    subText: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSize.regular,
        marginTop: theme.spacing.s,
    },
    mainButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.xl,
        borderRadius: theme.borderRadius.large,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing.xl,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    mainButtonText: {
        color: theme.colors.background,
        fontSize: theme.fontSize.large,
        fontWeight: '900',
    },
    historySection: {
        flex: 1,
    },
    sectionTitle: {
        color: theme.colors.text,
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
        marginBottom: theme.spacing.m,
    },
    historyCard: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.medium,
        marginBottom: theme.spacing.m,
    },
    historyQ: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.regular,
        fontWeight: 'bold',
        marginBottom: theme.spacing.s,
    },
    historyA: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSize.small,
        lineHeight: 20,
    },
    emptyText: {
        color: theme.colors.textMuted,
        fontStyle: 'italic',
    }
});
