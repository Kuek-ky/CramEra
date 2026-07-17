import { View, Text, StyleSheet } from "react-native";
import { Typography, Spacing } from "@/theme";

interface HeaderProps {
    title: string;
    subtitle?: string;
    rightComponent?: React.ReactNode;
}

export default function Header({
    title,
    subtitle,
    rightComponent,
}: HeaderProps) {
    return (
        <View style={styles.container}>
            <View>
                {subtitle && (
                    <Text style={Typography.bodySmall}>
                        {subtitle}
                    </Text>
                )}

                <Text style={Typography.h1}>
                    {title}
                </Text>
            </View>

            {rightComponent}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Spacing.lg,
    },
});