import { Tabs } from "expo-router";
import { FotosProvider } from "../../contexts/FotosContext";

export default function TabsLayout() {
  return (

    <FotosProvider>
      <Tabs
        screenOptions={{
          headerShadowVisible: false,
          tabBarActiveTintColor: "#0f62fe",
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Câmera",
            headerTitle: "Diário Fotográfico",
          }}
        />
        <Tabs.Screen
          name="galeria"
          options={{
            title: "Galeria",
            headerTitle: "Fotos",
          }}
        />
      </Tabs>
    </FotosProvider>
  );
}