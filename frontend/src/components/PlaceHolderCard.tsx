import { Text, StyleSheet, Pressable } from "react-native";
import { Document } from "@/types/document";

import Card from "@/components/common/Card";

import {
    Colors,
    Spacing,
    Typography
} from "../theme/Index";

export default function PlaceholderCard() {
    return (
        <Card
            style={{
                backgroundColor: Colors.primaryLight,
                marginTop: Spacing.sm,
            }}
        >
            <Text style={Typography.body}>
                This is a placeholder, keep an eye on it!
            </Text>
        </Card>
    );
}
