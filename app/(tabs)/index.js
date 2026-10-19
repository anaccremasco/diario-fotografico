import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef, useState } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFotos } from "../../contexts/FotosContext";

export default function CameraScreen() {
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [lado, setLado] = useState("back");
  const camera = useRef(null);

  const { adicionarFoto } = useFotos();

  if (!permissao) {
    return <SafeAreaView style={styles.safeArea} />;
  }

  if (!permissao.granted) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centro}>
          <Text style={styles.title}>Precisamos da câmera</Text>
          <Text style={styles.description}>
            {permissao.canAskAgain
              ? "O app usa a câmera para registrar os equipamentos do laboratório."
              : "A permissão foi negada. Ative a câmera nas configurações do celular."}
          </Text>
          <Pressable
            style={styles.button}
            onPress={() =>
              permissao.canAskAgain ? pedirPermissao() : Linking.openSettings()
            }
          >
            <Text style={styles.buttonText}>
              {permissao.canAskAgain ? "Permitir câmera" : "Abrir configurações"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  async function tirarFoto() {
    const resultado = await camera.current.takePictureAsync();
    adicionarFoto(resultado.uri);
  }

  function virarCamera() {
    setLado(lado === "back" ? "front" : "back");
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CameraView ref={camera} facing={lado} style={styles.camera} />

        <View style={styles.linha}>
          <Pressable style={[styles.button, styles.botaoFlex]} onPress={tirarFoto}>
            <Text style={styles.buttonText}>Tirar foto</Text>
          </Pressable>
          <Pressable style={styles.botaoIcone} onPress={virarCamera}>
            <Ionicons name="camera-reverse-outline" size={28} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fbff",
  },
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
  },
  centro: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    gap: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#102542",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#334e68",
  },
  camera: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
  },
  linha: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    alignItems: "center",
    backgroundColor: "#102542",
  },
  botaoFlex: {
    flex: 1,
  },
  botaoIcone: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#102542",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#ffffff",
  },
});