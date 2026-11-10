import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const MOCK_DATA = [
  { id: "1", title: "Morning Calm", description: "Start your day with peace and focus. A short 10 minute meditation.", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800", duration: "10 min" },
  { id: "2", title: "Deep Sleep", description: "Relax your mind and body for a deep restful sleep.", image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800", duration: "15 min" },
  { id: "3", title: "Stress Relief", description: "Release tension and anxiety with guided breathing.", image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800", duration: "12 min" },
  { id: "4", title: "Focus & Energy", description: "Boost your concentration and energy for work and study.", image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800", duration: "8 min" },
  { id: "5", title: "Evening Relax", description: "Wind down after a long day with gentle meditation.", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800", duration: "20 min" },
];

export default function MeditationDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const item = MOCK_DATA.find((m) => m.id === id);

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Not found - id: {id}</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: "blue", marginTop: 10 }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.duration}>{item.duration}</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 250, borderRadius: 12 },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 16 },
  desc: { fontSize: 15, color: "#555", marginTop: 8 },
  duration: { fontSize: 14, color: "#888", marginTop: 8 },
  button: { backgroundColor: "#000", padding: 14, borderRadius: 10, marginTop: 20, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});