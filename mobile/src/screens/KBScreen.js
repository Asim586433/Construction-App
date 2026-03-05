import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { theme } from '../theme';
import { getTips } from '../api';

export default function KBScreen() {
    const [searchQuery, setSearchQuery] = useState('');
    const [tips, setTips] = useState([]);
    const [loading, setLoading] = useState(false);

    useFocusEffect(
        useCallback(() => {
            fetchTips(searchQuery);
        }, [])
    );

    const fetchTips = async (queryText) => {
        setLoading(true);
        const data = await getTips(queryText);
        setTips(data);
        setLoading(false);
    };

    const handleSearch = (text) => {
        setSearchQuery(text);
        // Basic debounce via timeout setup could be here, but direct works for MVP locally
        setTimeout(() => fetchTips(text), 300);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.category}</Text>
                </View>
            </View>
            <Text style={styles.cardContent}>{item.content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Library & Codes</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search tips (e.g., mortar, pitch)"
                    placeholderTextColor={theme.colors.textMuted}
                    value={searchQuery}
                    onChangeText={handleSearch}
                />
            </View>

            {loading ? (
                <ActivityIndicator size="large" color={theme.colors.primary} style={{ marginTop: 20 }} />
            ) : tips.length === 0 ? (
                <Text style={styles.emptyText}>No knowledge found for that query.</Text>
            ) : (
                <FlatList
                    data={tips}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 20 }}
                />
            )}
        </View>
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
        marginBottom: theme.spacing.m,
        marginTop: theme.spacing.m,
    },
    searchContainer: {
        marginBottom: theme.spacing.l,
    },
    searchInput: {
        backgroundColor: theme.colors.surface,
        color: theme.colors.text,
        borderRadius: theme.borderRadius.large,
        padding: theme.spacing.m,
        fontSize: theme.fontSize.regular,
    },
    card: {
        backgroundColor: theme.colors.surface,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.medium,
        marginBottom: theme.spacing.m,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.s,
    },
    cardTitle: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
        flex: 1,
    },
    badge: {
        backgroundColor: '#444',
        paddingHorizontal: theme.spacing.s,
        paddingVertical: 4,
        borderRadius: theme.borderRadius.small,
        marginLeft: theme.spacing.m,
    },
    badgeText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardContent: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSize.regular,
        lineHeight: 22,
    },
    emptyText: {
        color: theme.colors.textMuted,
        textAlign: 'center',
        marginTop: theme.spacing.xl,
        fontSize: theme.fontSize.regular,
    }
});
