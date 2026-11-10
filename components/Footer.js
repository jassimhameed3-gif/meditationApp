import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { COLORS, SIZES } from "../constants/theme";

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.container} testID="footer">
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/home")}
        testID="footerHomeBtn"
      >
        <Text style={[styles.text, pathname === "/home" && styles.active]}>🏠 Home</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/Favourites")}
        testID="footerFavoriteBtn"
      >
        <Text style={[styles.text, (pathname === "/Favourites" || pathname === "/settings/Favourites") && styles.active]}>❤️ Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
  },
  btn: { padding: 10 },
  text: { fontSize: SIZES.medium, color: COLORS.gray },
  active: { color: COLORS.primary, fontWeight: "bold" },
});

export default Footer;