import React from "react";
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const MOCK_DATA = [
  {
    id: "1",
    title: "Morning Calm",
    description: "Start your day with peace and focus. A short 10 minute meditation.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
    duration: "10 min",
  },
  {
    id: "2",
    title: "Deep Sleep",
    description: "Relax your mind and body for a deep restful sleep.",
    image: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800",
    duration: "15 min",
  },
  {
    id: "3",
    title: "Stress Relief",
    description: "Release tension and anxiety with guided breathing.",
    image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800",
    duration: "12 min",
  },
  {
    id: "4",
    title: "Focus & Energy",
    description: "Boost your concentration and energy for work and study.",
    image: "https://images.unsplash.com/photo-1474418397713-7ede21d49118?w=800",
    duration: "8 min",
  },
  {
    id: "5",
    title: "Evening Relax",
    description: "Wind down after a long day with gentle meditation.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    duration: "20 min",
  },
];

const Home = () => {
  const router = useRouter();

  return (
    <View style={styles.center}>
      <FlatList
        data={MOCK_DATA}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push(`/meditation-details/${item.id}`)}
          >
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1, paddingLeft: 12 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.sub}>{item.description}</Text>
              <Text style={styles.sub}>{item.duration}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, backgroundColor: "#fff" },
  card: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  sub: { fontSize: 13, color: "#666", marginTop: 4 },
});

export default Home;