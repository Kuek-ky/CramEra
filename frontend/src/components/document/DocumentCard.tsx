import { Text, StyleSheet, Pressable, Image, View } from "react-native";
import { Document } from "@/types/document";

import Card from "@/components/common/Card";

import {
    Colors,
    Spacing,
    Typography
} from "@/theme/Index";
import {getStoredUserId} from "@/services/asyncStoreUser";

const bookmarkOutline = require("../../../assets/images/bookmark-outline.png")
const bookmarkFilled = require("../../../assets/images/bookmark-filled.png")
const editIcon = require("../../../assets/images/editIcon.png")

interface Props {
    document: Document;
    onBookmarkPress?: () => void;
    viewDocPage?: () => void;
    onUpdatePress?: () => void;
    userId: number;
}

export default function DocumentCard({
    document,
    onBookmarkPress,
    viewDocPage,
    onUpdatePress,
    userId
 }: Props) {
    return (
        <Pressable
            onPress={viewDocPage}
        >
            <Card style={styles.card}>
                <View style={styles.topRow}>
                    <Text style={Typography.caption}>
                        {document.module}
                    </Text>

                    <View style={styles.topRow}>
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
                        {
                            document.ownerUserID == userId
                            ?
                                <Pressable
                                onPress={onUpdatePress}
                                hitSlop={10}
                            >
                                <Image
                                    source={editIcon}
                                    style={styles.bookmark}
                                />
                                </Pressable>
                            : null
                        }
                    </View>
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