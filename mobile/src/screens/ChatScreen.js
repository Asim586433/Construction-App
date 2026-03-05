import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { theme } from '../theme';
import { askQuestion } from '../api';

export default function ChatScreen({ route }) {
    const prefill = route.params?.prefill || '';
    const [query, setQuery] = useState(prefill);
    const [chatLog, setChatLog] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (prefill) {
            handleSend(prefill);
        }
    }, [prefill]);

    const handleSend = async (textToSubmit) => {
        const q = typeof textToSubmit === 'string' ? textToSubmit : query;
        if (!q.trim()) return;

        const newLog = [...chatLog, { role: 'user', content: q }];
        setChatLog(newLog);
        setQuery('');
        setLoading(true);

        const response = await askQuestion(q);

        setChatLog([...newLog, { role: 'ai', content: response.answer }]);
        setLoading(false);
    };

    const renderMessage = (msg, index) => {
        const isUser = msg.role === 'user';
        return (
            <View key={index} style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
                <Text style={isUser ? styles.userText : styles.aiText}>
                    {msg.content}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90}
        >
            <ScrollView style={styles.chatArea} contentContainerStyle={{ paddingBottom: 20 }}>
                {chatLog.length === 0 && !loading && (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyIcon}>👷‍♂️</Text>
                        <Text style={styles.emptyTitle}>Construction AI Ready</Text>
                        <Text style={styles.emptySub}>Ask about measurements, safety, mixes, or codes.</Text>
                    </View>
                )}
                {chatLog.map(renderMessage)}
                {loading && (
                    <View style={styles.loadingBubble}>
                        <ActivityIndicator color={theme.colors.primary} />
                        <Text style={styles.loadingText}>Analyzing...</Text>
                    </View>
                )}
            </ScrollView>

            <View style={styles.inputArea}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask a construction question..."
                    placeholderTextColor={theme.colors.textMuted}
                    value={query}
                    onChangeText={setQuery}
                    multiline
                />
                <TouchableOpacity
                    style={[styles.sendButton, !query.trim() && styles.sendButtonDisabled]}
                    onPress={handleSend}
                    disabled={!query.trim() || loading}
                >
                    <Text style={styles.sendButtonText}>SEND</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    chatArea: {
        flex: 1,
        padding: theme.spacing.m,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: theme.spacing.xxl * 2,
    },
    emptyIcon: {
        fontSize: 64,
        marginBottom: theme.spacing.m,
    },
    emptyTitle: {
        color: theme.colors.primary,
        fontSize: theme.fontSize.large,
        fontWeight: 'bold',
        marginBottom: theme.spacing.s,
    },
    emptySub: {
        color: theme.colors.textMuted,
        fontSize: theme.fontSize.regular,
        textAlign: 'center',
        paddingHorizontal: theme.spacing.xl,
    },
    messageBubble: {
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.medium,
        marginBottom: theme.spacing.m,
        maxWidth: '85%',
    },
    userBubble: {
        backgroundColor: theme.colors.primary,
        alignSelf: 'flex-end',
        borderBottomRightRadius: 0,
    },
    aiBubble: {
        backgroundColor: theme.colors.surface,
        alignSelf: 'flex-start',
        borderBottomLeftRadius: 0,
    },
    userText: {
        color: theme.colors.background,
        fontSize: theme.fontSize.regular,
        fontWeight: '600',
    },
    aiText: {
        color: theme.colors.text,
        fontSize: theme.fontSize.regular,
        lineHeight: 24,
    },
    loadingBubble: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        alignSelf: 'flex-start',
        padding: theme.spacing.m,
        borderRadius: theme.borderRadius.medium,
        borderBottomLeftRadius: 0,
    },
    loadingText: {
        color: theme.colors.primary,
        marginLeft: theme.spacing.s,
        fontWeight: 'bold',
    },
    inputArea: {
        flexDirection: 'row',
        padding: theme.spacing.m,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderTopColor: '#444',
        alignItems: 'flex-end',
    },
    input: {
        flex: 1,
        backgroundColor: theme.colors.background,
        color: theme.colors.text,
        fontSize: theme.fontSize.regular,
        borderRadius: theme.borderRadius.medium,
        paddingHorizontal: theme.spacing.m,
        paddingTop: theme.spacing.m,
        paddingBottom: theme.spacing.m,
        minHeight: 50,
        maxHeight: 120,
    },
    sendButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.medium,
        paddingHorizontal: theme.spacing.l,
        paddingVertical: theme.spacing.m,
        marginLeft: theme.spacing.m,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
    },
    sendButtonDisabled: {
        backgroundColor: '#555',
    },
    sendButtonText: {
        color: theme.colors.background,
        fontWeight: 'bold',
        fontSize: theme.fontSize.regular,
    }
});
