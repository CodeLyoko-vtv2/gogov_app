import { Tabs } from "expo-router";
import React from "react";
// Import Component thanh Tab của bạn
import RescueBottomTab from "../../../src/components/RescueBottomTab";

export default function RescueTabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <RescueBottomTab {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" />
      <Tabs.Screen name="missions" />
      <Tabs.Screen name="ThongBao" />
      <Tabs.Screen name="profile" />
    </Tabs>
  );
}
