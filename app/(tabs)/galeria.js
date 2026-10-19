import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
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
    backgroundColor: "#07060B",
  },
  lista: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 12,
  },
  coluna: {
   justifyContent: "space-between",
  },
  item: {
    width: "48%",
    gap: 5,
  },
  foto: {
   width: "100%",
    aspectRatio: 1,
    borderRadius: 16,
    backgroundColor: "#1F1B2E",
  },
  data: {
    fontSize: 13,
    color: "#334e68",
    textAlign: "center",
  },
  vazio: {
   fontSize: 15,
   color: "#8B8A9D",
    textAlign: "center",
    marginTop: 40,
  },
});