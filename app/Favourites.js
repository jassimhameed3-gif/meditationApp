import { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "expo-router";
import { COLORS, SIZES, FONT } from "../constants/theme";
import ScreenHeaderBtn from "../components/ScreenHeaderBtn";
import Footer from "../components/Footer";

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadFavorites = async () => {
    setIsLoading(true);
    try {
      const stored = await AsyncStorage.getItem("favorites");
      setFavorites(stored ? JSON.parse(stored) : []);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const removeFavorite = async (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    await AsyncStorage.setItem("favorites", JSON.stringify(updated));
  };

  if (isLoading) {
    return (
      <View style={styles.center} testID="loading">
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <ScreenHeaderBtn />
      <Text style={styles.title}>My Favorites</Text>
      {favorites.length === 0 ? (
        <View style={styles.center} testID="emptyFavorites">
          <Text style={styles.emptyText}>No favorites yet ❤️</Text>
          <Text style={styles.emptySub}>Tap the heart to add meditations here</Text>
        </View>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          testID="favoritesList"
          contentContainerStyle={{ padding: SIZES.medium }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text numberOfLines={1}>{item.target}</Text>
                <Text>{item.duration}</Text>
              </View>
              <TouchableOpacity onPress={() => removeFavorite(item.id)} testID={`remove-${item.id}`}>
                <Text style={{ fontSize: 22 }}>❤️</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  title: { fontSize: SIZES.large, fontFamily: FONT.medium, color: COLORS.primary, padding: SIZES.medium },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, fontWeight: "bold" },
  emptySub: { color: COLORS.gray, marginTop: 8 },
  card: { flexDirection: "row", backgroundColor: "#FFF", borderRadius: 12, padding: 12, marginBottom: 12, alignItems: "center", gap: 12 },
  image: { width: 70, height: 70, borderRadius: 10 },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
});

export default Favourites;