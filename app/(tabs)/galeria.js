import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFotos } from "../../contexts/FotosContext";

export default function GaleriaScreen() {
  const { fotos } = useFotos();

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={fotos}
        keyExtractor={(foto) => foto.uri}
        numColumns={2}
        columnWrapperStyle={styles.coluna}
        contentContainerStyle={styles.lista}
        ListEmptyComponent={
          <Text style={styles.vazio}>
            Nenhuma foto ainda. Tire uma na aba Câmera.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.uri }} style={styles.foto} />
            <Text style={styles.data}>{item.data}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },
  lista: {
    padding: 24,
    gap: 16,
  },
  coluna: {
    justifyContent: "space-between",
  },
  item: {
    width: "48%",
    gap: 6,
  },
  foto: {
    width: "100%",
    aspectRatio: 3 / 4,
    borderRadius: 16,
    backgroundColor: "#d0e2ff",
  },
  data: {
    fontSize: 13,
    color: "#334e68",
    textAlign: "center",
  },
  vazio: {
    fontSize: 16,
    color: "#334e68",
    textAlign: "center",
  },
});