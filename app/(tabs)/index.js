import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import React, { useRef, useState } from "react";
import { Image, Linking, Pressable, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFotos } from "../../contexts/FotosContext";

export default function CameraScreen() {
  const [permissao, pedirPermissao] = useCameraPermissions();
  const [lado, setLado] = useState("back");
  const [flash, setFlash] = useState("off");
  const [zoom, setZoom] = useState(0);

  const camera = useRef(null);
  const { fotos, adicionarFoto } = useFotos();

  const ultimaFoto = fotos && fotos.length > 0 ? fotos[fotos.length - 1]?.uri : null;

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
            style={styles.buttonPermissao}
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
    if (camera.current) {
      const resultado = await camera.current.takePictureAsync();
      adicionarFoto(resultado.uri);
    }
  }

  function virarCamera() {
    setLado((prev) => (prev === "back" ? "front" : "back"));
  }

  function alternarFlash() {
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* 1. TOPO DA CÂMERA */}
      <View style={styles.header}>
        <Pressable style={styles.iconCircle} onPress={alternarFlash}>
          <Ionicons
            name={flash === "on" ? "flash" : "flash-outline"}
            size={20}
            color="#FFFFFF"
          />
        </Pressable>
        <Text style={styles.headerTitle}>FOTO</Text>
        <Pressable style={styles.iconCircle}>
          <Ionicons name="settings-outline" size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* 2. ÁREA DA CÂMERA COM GRADES E ZOOM SOBREPOSTO */}
      <View style={styles.cameraContainer}>
        <CameraView
          ref={camera}
          facing={lado}
          enableTorch={flash === "on"}
          zoom={zoom}
          style={styles.camera}
        >
          {/* Linhas da Grade 3x3 */}
          <View style={styles.gridOverlay}>
            <View style={styles.gridRow}>
              <View style={styles.gridCell} />
              <View style={[styles.gridCell, styles.borderHorizontal]} />
              <View style={styles.gridCell} />
            </View>
            <View style={[styles.gridRow, styles.borderVertical]}>
              <View style={styles.gridCell} />
              {/* Foco Central */}
              <View style={[styles.gridCell, styles.borderHorizontal, styles.focoContainer]}>
                <View style={styles.focoBox} />
              </View>
              <View style={styles.gridCell} />
            </View>
            <View style={styles.gridRow}>
              <View style={styles.gridCell} />
              <View style={[styles.gridCell, styles.borderHorizontal]} />
              <View style={styles.gridCell} />
            </View>
          </View>
{/* Botões de Zoom Sobrepostos */}
          <View style={styles.zoomContainer}>
            <Pressable
              style={[styles.zoomButton, zoom === 0.1 && styles.zoomButtonActive]}
              onPress={() => setZoom(0.1)}
            >
              <Text style={[styles.zoomText, zoom === 0.1 && styles.zoomTextActive]}>1x</Text>
            </Pressable>
            <Pressable
              style={[styles.zoomButton, zoom === 0.3 && styles.zoomButtonActive]}
              onPress={() => setZoom(0.3)}
            >
              <Text style={[styles.zoomText, zoom === 0.3 && styles.zoomTextActive]}>2x</Text>
            </Pressable>
          </View>
        </CameraView>
      </View>

      {/* 3. CONTROLES INFERIORES */}
      <View style={styles.footer}>
        <View style={styles.galeriaContainer}>
          {ultimaFoto ? (
            <Image source={{ uri: ultimaFoto }} style={styles.galeriaImage} />
          ) : (
            <View style={styles.galeriaPlaceholder} />
          )}
        </View>

        <Pressable style={styles.shutterBorder} onPress={tirarFoto}>
          <View style={styles.shutterInner} />
        </Pressable>

        <Pressable style={styles.iconCircleLarge} onPress={virarCamera}>
          <Ionicons name="sync" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#07060B",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#17151F",
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    marginHorizontal: 16,
    borderRadius: 32,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#1F1B2E",
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },
  gridOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "column",
  },
  gridRow: {
    flex: 1,
    flexDirection: "row",
  },
  gridCell: {
    flex: 1,
  },
  borderHorizontal: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  borderVertical: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  focoContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  focoBox: {
    width: 70,
    height: 70,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "#A78BFA",
  },
  zoomContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 20,
    padding: 4,
    gap: 8,
  },
  zoomButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  zoomButtonActive: {
    backgroundColor: "#7C3AED",
  },
  zoomText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  zoomTextActive: {
    fontWeight: "700",
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 32,
    paddingVertical: 20,
  },
  galeriaContainer: {
    width: 52,
    height: 52,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#7C3AED",
  },
  galeriaImage: {
    width: "100%",
    height: "100%",
  },
  galeriaPlaceholder: {
    flex: 1,
    backgroundColor: "#1F1B2E",
  },
  shutterBorder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  shutterInner: {
    flex: 1,
    width: "100%",
    backgroundColor: "#8B5CF6",
    borderRadius: 34,
  },
  iconCircleLarge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#17151F",
    alignItems: "center",
    justifyContent: "center",
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
    color: "#8B5CF6",
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#8B8A9D",
  },
  buttonPermissao: {
    borderRadius: 18,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8B5CF6",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#FFFFFF",
  },
});