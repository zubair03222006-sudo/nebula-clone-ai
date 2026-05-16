/**
 * Chat Screen — migrated from cosmic-compass chat.tsx
 * AI Astrologer chat with mock responses, quick prompts, and chat bubbles.
 */
import React, { useRef, useState } from 'react';
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CosmicText } from '@/components/cosmic/CosmicText';
import { GlassCard } from '@/components/cosmic/GlassCard';
import { CosmicColors, CosmicSpacing, CosmicRadii } from '@/constants/cosmic-theme';

type Msg = { role: 'ai' | 'user'; text: string };

const INITIAL: Msg[] = [
  { role: 'ai', text: "Hi Aurora ✨ I've been reading your sky. What's calling for clarity tonight?" },
];

const PROMPTS = [
  'Will I find love this year?',
  "What's my purpose?",
  'Should I take the risk?',
  'Tell me about my Moon',
  'Career insights',
];

export default function ChatScreen() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const send = (text: string) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { role: 'user' as const, text }];
    setMessages(newMessages);
    setInput('');
    setThinking(true);

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          role: 'ai',
          text: "The stars suggest a gentle yes — but on your terms. Pisces Moon asks you to trust the feeling before the proof. A small step this week becomes the doorway.",
        },
      ]);
      setThinking(false);
    }, 1400);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatarOuter}>
            <View style={styles.avatarGlow} />
            <View style={styles.avatar}>
              <CosmicText style={{ fontSize: 20 }}>🌙</CosmicText>
            </View>
          </View>
          <View>
            <CosmicText type="h3">Nova</CosmicText>
            <View style={styles.statusRow}>
              <View style={styles.statusDot} />
              <CosmicText type="label" color={CosmicColors.gold}>AI Astrologer · Online</CosmicText>
            </View>
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, i) => `msg-${i}`}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          renderItem={({ item: m }) => (
            <View style={[styles.bubble, m.role === 'user' ? styles.userBubbleRow : styles.aiBubbleRow]}>
              <View style={[styles.bubbleInner, m.role === 'user' ? styles.userBubble : styles.aiBubble]}>
                <CosmicText type="body" color={m.role === 'user' ? CosmicColors.background : CosmicColors.foreground}>
                  {m.text}
                </CosmicText>
              </View>
            </View>
          )}
          ListFooterComponent={
            thinking ? (
              <View style={[styles.bubble, styles.aiBubbleRow]}>
                <GlassCard strong style={styles.thinkingBubble}>
                  <View style={styles.dots}>
                    <View style={[styles.dot, { opacity: 0.6 }]} />
                    <View style={[styles.dot, { opacity: 0.8 }]} />
                    <View style={[styles.dot, { opacity: 1 }]} />
                  </View>
                  <CosmicText type="micro" color={CosmicColors.mutedForeground}>
                    Consulting the stars
                  </CosmicText>
                </GlassCard>
              </View>
            ) : null
          }
        />

        {/* Quick prompts */}
        <View style={styles.promptsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.promptsRow}>
            {PROMPTS.map((p) => (
              <Pressable key={p} onPress={() => send(p)}>
                <GlassCard style={styles.promptChip} rounded="full">
                  <CosmicText type="small" color={CosmicColors.gold} style={{ marginRight: 4 }}>✨</CosmicText>
                  <CosmicText type="small">{p}</CosmicText>
                </GlassCard>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Input */}
        <View style={styles.inputSection}>
          <GlassCard strong style={styles.inputCard} rounded="full">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Ask the stars…"
              placeholderTextColor="rgba(184,168,208,0.6)"
              style={styles.input}
              onSubmitEditing={() => send(input)}
              returnKeyType="send"
            />
            <Pressable onPress={() => send(input)} style={styles.sendButton}>
              <CosmicText style={{ fontSize: 16 }} color={CosmicColors.background}>➤</CosmicText>
            </Pressable>
          </GlassCard>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CosmicColors.background,
  },

  // Header
  header: {
    paddingHorizontal: CosmicSpacing.xl,
    paddingTop: 48,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarOuter: {
    position: 'relative',
  },
  avatarGlow: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: 28,
    backgroundColor: 'rgba(168,85,247,0.3)',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: CosmicColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CosmicColors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 6,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: CosmicColors.gold,
  },

  // Messages
  messagesList: {
    paddingHorizontal: CosmicSpacing.xl,
    paddingBottom: 8,
    gap: 12,
  },
  bubble: {
    marginBottom: 4,
  },
  userBubbleRow: {
    alignItems: 'flex-end',
  },
  aiBubbleRow: {
    alignItems: 'flex-start',
  },
  bubbleInner: {
    maxWidth: '80%',
    borderRadius: CosmicRadii.xl,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userBubble: {
    backgroundColor: CosmicColors.primary,
    borderBottomRightRadius: 6,
    shadowColor: CosmicColors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  aiBubble: {
    backgroundColor: CosmicColors.glassStrong,
    borderWidth: 1,
    borderColor: CosmicColors.borderStrong,
    borderBottomLeftRadius: 6,
  },

  // Thinking
  thinkingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  dots: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: CosmicColors.violet,
  },

  // Prompts
  promptsSection: {
    paddingVertical: 8,
  },
  promptsRow: {
    paddingHorizontal: CosmicSpacing.xl,
    gap: 8,
  },
  promptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  // Input
  inputSection: {
    paddingHorizontal: CosmicSpacing.xl,
    paddingBottom: CosmicSpacing.lg,
  },
  inputCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  input: {
    flex: 1,
    color: CosmicColors.foreground,
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CosmicColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: CosmicColors.violet,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
});
