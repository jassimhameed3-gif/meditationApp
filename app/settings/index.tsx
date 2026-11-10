import { View, Text, StyleSheet, Switch } from 'react-native';
import { useState } from 'react';

export default function Settings() {
  const [dark, setDark] = useState(false);
  const [notif, setNotif] = useState(true);
  const [sound, setSound] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Notifications</Text>
        <Switch value={notif} onValueChange={setNotif} />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Sound</Text>
        <Switch value={sound} onValueChange={setSound} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
  label: { fontSize: 18 },
});