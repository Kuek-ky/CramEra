import { Text, StyleSheet, Pressable, Image, View } from "react-native";
import { Document } from "@/types/document";

import Card from "@/components/common/Card";

import {
    Colors,
    Spacing,
    Typography
} from "@/theme/Index";

const bookmarkOutline = require("../../../assets/images/bookmark-outline.png")
const bookmarkFilled = require("../../../assets/images/bookmark-filled.png")

interface Props {
    document: Document;
    onBookmarkPress?: () => void;
}

export default function DocumentCard({
    document,
    onBookmarkPress,
 }: Props) {
    return (
        <Pressable>
            <Card style={styles.card}>
                <View style={styles.topRow}>
                    <Text style={Typography.caption}>
                        {document.module}
                    </Text>

                    <Pressable
                        onPress={onBookmarkPress}
                        hitSlop={10}
                    >
                        <Image
                            source={
                                document.saved
                                    ? bookmarkFilled
                                    : bookmarkOutline
                            }
                            style={styles.bookmark}
                        />
                    </Pressable>
                </View>

                <Text
                    style={[
                        Typography.h3,
                        {
                            marginTop: Spacing.xs,
                            marginBottom: Spacing.sm,
                        },
                    ]}
                >
                    {document.title}
                </Text>

                <Text
                    numberOfLines={2}
                    style={Typography.body}
                >
                    {document.description}
                </Text>

                {document.author !== "" && (
                    <Text style={styles.author}>
                        {document.author}
                    </Text>
                )}
            </Card>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        marginBottom: 12
    },

    author: {
        marginTop: Spacing.sm,
        color: Colors.textSecondary,
    },

    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    bookmark: {
        width: 24,
        height: 24,
        resizeMode: "contain",
    },
});