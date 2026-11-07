import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import { COLORS, FONT, SIZES, SHADOWS } from "../constants/theme";
import axios from "axios";
import { useRouter } from "expo-router";

const PopularMeditation = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const [selectedMeditation, setSelectedMeditation] = useState();

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
    setIsLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardPress = (item) => {
    router.push(`/meditation-details/${item.id}`);
    setSelectedMeditation(item.id);
  };

  const renderMeditationCard = ({ item }) => (
    <TouchableOpacity
      style={styles.container(selectedMeditation, item)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity style={styles.logoContainer(selectedMeditation, item)}>
        <Image
          source={{ uri: item?.image }}
          resizeMode="cover"
          style={styles.logoImage}
        />
      </TouchableOpacity>
      <View style={styles.tabsContainer}>
        <Text style={styles.companyName} numberOfLines={1}>
          {item.target}
        </Text>
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={styles.meditationName(selectedMeditation, item)}
          numberOfLines={1}
        >
          {item.title}
        </Text>
        <View style={styles.infoWrapper}>
          <Text style={styles.publisher(selectedMeditation, item)}>
            {item?.shortDescription}
          </Text>
        </View>
      </View>
      <Text style={styles.location}> {item.duration}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.cardsContainer} testID="popularMeditationCards">
      <View style={styles.header} testID="popularHeader">
        <Text style={styles.headerTitle}>Popular Meditations</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something went wrong</Text>
        ) : (
          <FlatList
            data={data}
            renderItem={renderMeditationCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ columnGap: SIZES.medium }}
            horizontal
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (selectedMeditation, item) => ({
    width: 270,
    padding: SIZES.xLarge,
    marginHorizontal: SIZES.small,
    marginTop: SIZES.xLarge,
    backgroundColor: selectedMeditation === item.id ? COLORS.primary : "#FFF",
    borderRadius: SIZES.medium,
    justifyContent: "space-between",
    ...SHADOWS.medium,
    shadowColor: COLORS.white,
  }),
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: COLORS.primary,
  },
  headerBtn: {
    fontSize: SIZES.medium,
    fontFamily: FONT.medium,
    color: COLORS.gray,
  },
  cardsContainer: {
    marginTop: SIZES.medium,
  },
  logoContainer: (selectedMeditation, item) => ({
    width: "100%",
    height: 140,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  }),
  logoImage: {
    width: "100%",
    height: "100%",
    borderRadius: SIZES.large,
  },
  tabsContainer: {
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    marginTop: SIZES.medium,
    width: "100%",
  },
  companyName: {
    fontSize: SIZES.small,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small / 1.5,
    paddingVertical: SIZES.small / 2.5,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: COLORS.gray2,
  },
  infoContainer: {
    marginTop: SIZES.large,
  },
  meditationName: (selectedMeditation, item) => ({
    fontSize: SIZES.large,
    fontFamily: FONT.medium,
    color: selectedMeditation === item.id ? COLORS.white : COLORS.primary,
  }),
  infoWrapper: {
    flexDirection: "row",
    marginTop: 5,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  publisher: (selectedMeditation, item) => ({
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: selectedMeditation === item.id ? COLORS.white : COLORS.primary,
  }),
  location: {
    fontSize: SIZES.medium - 2,
    fontFamily: FONT.regular,
    color: "#B3AEC6",
    marginTop: SIZES.small,
  },
});

export default PopularMeditation;