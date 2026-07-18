import { View, StyleSheet } from "react-native";
import { Radius} from "@/theme/radius";
import { Shadows} from "@/theme/shadow";
import { Colors} from "@/theme/colors";
import { Spacing} from "@/theme/spacing";

interface CardProps {
  children: React.ReactNode;
  style?: any;
}

export default function Card({ children, style }: CardProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.md,
    padding: Spacing.md,
    ...Shadows.card,
  },
});