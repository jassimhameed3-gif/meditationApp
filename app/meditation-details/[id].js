import { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { COLORS, SIZES, FONT } from "../../constants/theme";
import ScreenHeaderBtn from "../../components/ScreenHeaderBtn";
import Footer from "../../components/Footer";

const MeditationDetails = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const options = {
    method: "GET",
    url: "https://meditation-app1.p.rapidapi.com/meditation",
    headers: {
      "X-RapidAPI-Key": "a3ed9d52b7mshb5f7c7bd1d1d8f1p1e4f9ajsn4b1b1e1b1b1b",
      "X-RapidAPI-Host": "meditation-app1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.request(options);
      const found = response.data.find((x) => x.id.toString() === id.toString());
      setItem(found);
      const stored = await AsyncStorage.getItem("favorites");
      const favs = stored ? JSON.parse(stored) : [];
      setIsFavorite(favs.some((f) => f.id.toString() === id.toString()));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFavorite = async () => {
    const stored = await AsyncStorage.getItem("favorites");
    let favs = stored ? JSON.parse(stored) : [];
    if (isFavorite) {
      favs = favs.filter((f) => f.id.toString() !== id.toString());
      setIsFavorite(false);
    } else {
      favs.push(item);
      setIsFavorite(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favs));
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={styles.center}>
        <Text>Not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: COLORS.primary, marginTop: 10 }}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScreenHeaderBtn />
      <ScrollView contentContainerStyle={{ padding: SIZES.medium }}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.target}>{item.target} • {item.duration}</Text>
        <Text style={styles.desc}>{item.description || item.shortDescription}</Text>

        <TouchableOpacity
          onPress={toggleFavorite}
          testID="favoriteBtn"
          style={[styles.favBtn, { backgroundColor: isFavorite ? COLORS.primary : "#FFF" }]}
        >
          <Text style={[styles.favText, { color: isFavorite ? "#FFF" : COLORS.primary }]}>
            {isFavorite ? "❤️ Remove from Favorites" : "🤍 Add to Favorites"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 300, borderRadius: 16 },
  title: { fontSize: 24, fontFamily: FONT.medium, color: COLORS.primary, marginTop: 16 },
  target: { fontSize: SIZES.medium, color: COLORS.gray, marginTop: 8 },
  desc: { fontSize: SIZES.medium, lineHeight: 24, marginTop: 16 },
  favBtn: { marginTop: 24, padding: 16, borderRadius: 12, alignItems: "center", borderWidth: 1, borderColor: COLORS.primary },
  favText: { fontSize: 16, fontWeight: "bold" },
});

export default MeditationDetails;