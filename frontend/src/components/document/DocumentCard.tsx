import { Text, StyleSheet, Pressable } from "react-native";
import { Document } from "@/types/document";

import Card from "@/components/common/Card";

import {
    Colors,
    Spacing,
    Typography
} from "@/theme/Index";

interface Props {

    document: Document;

}

export default function DocumentCard({ document }: Props) {
    return (
        <Pressable>
            <Card style={styles.card}>
                <Text style={Typography.caption}>
                    {document.module}
                </Text>

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

});