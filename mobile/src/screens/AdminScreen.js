import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { theme } from '../theme';
import { addTip } from '../api';

export default function AdminScreen() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [content, setContent] = useState('');

    const handleAddTip = async () => {
        if (!title || !category || !content) {
            Alert.alert("Error", "Please fill all fields.");
            return;
        }

        const res = await addTip(title, category, content);
        if (res && res.success) {
            Alert.alert("Success", "Tip added temporarily to mock DB.");
            setTitle('');
            setCategory('');
            setContent('');
        } else {
            Alert.alert("Error", "Could not reach local API. Check connection.");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Admin Dashboard</Text>
            <Text style={styles.subText}>Manage Knowledge Base (Dummy Auth - Open for MVP)</Text>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Add New Tip</Text>

                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Scaffolding Load" placeholderTextColor="#666" />

                <Text style={styles.label}>Category</Text>
                <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Safety, Framing, Masonry..." placeholderTextColor="#666" />

                <Text style={styles.label}>Content / Advice</Text>
                <TextInput style={styles.inputArea} value={content} onChangeText={setContent} multiline placeholder="Enter step-by-step or rules..." placeholderTextColor="#666" />

                <TouchableOpacity style={styles.mainButton} onPress={handleAddTip}>
                    <Text style={styles.mainButtonText}>PUBLISH TIP</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Architectural Readiness</Text>
                <Text style={styles.infoLine}>• React Native Expo App Ready</Text>
                <Text style={styles.infoLine}>• Node.js Backend API Ready</Text>
                <Text style={styles.infoLine}>• SQLite Mock DB Integrated</Text>
                <Text style={styles.infoLine}>• AI Prompt Handlers Mocked</Text>
                <Text style={styles.infoSub}>For future updates, database syncs directly to Firebase/Supabase credentials in .env.</Text>
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
        marginTop: theme.spacing.m,
    },
    subText: {
        color: theme.colors.textMuted,
        marginBottom: theme.spacing.l,
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
    label: {
        color: theme.colors.textMuted,
        marginBottom: theme.spacing.s,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        borderRadius: theme.borderRadius.medium,
        padding: theme.spacing.m,
        fontSize: theme.fontSize.regular,
        marginBottom: theme.spacing.m,
    },
    inputArea: {
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        borderRadius: theme.borderRadius.medium,
        padding: theme.spacing.m,
        fontSize: theme.fontSize.regular,
        marginBottom: theme.spacing.m,
        minHeight: 100,
        textAlignVertical: 'top',
    },
    mainButton: {
        backgroundColor: theme.colors.primary,
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.medium,
        alignItems: 'center',
    },
    mainButtonText: {
        color: theme.colors.background,
        fontSize: theme.fontSize.regular,
        fontWeight: '900',
    },
    infoBox: {
        padding: theme.spacing.m,
        borderColor: theme.colors.secondary,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: theme.borderRadius.medium,
        marginBottom: 40,
    },
    infoTitle: {
        color: theme.colors.secondary,
        fontWeight: 'bold',
        marginBottom: theme.spacing.s,
    },
    infoLine: {
        color: theme.colors.textMuted,
        marginBottom: 4,
    },
    infoSub: {
        color: '#666',
        fontSize: 12,
        marginTop: theme.spacing.m,
        fontStyle: 'italic',
    }
});
