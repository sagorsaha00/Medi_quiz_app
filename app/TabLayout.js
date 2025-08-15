import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfileScreen from "../app/(extra)/profile"; // Adjust the import path as needed
import ExamSection from "./(exam_section)/exam";
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="exam-section" component={ExamSection} />
    </Tab.Navigator>
  );
}
