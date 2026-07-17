import { Text, StyleSheet, Pressable } from "react-native";
import { Document } from "@/types/document";

import Card from "@/components/common/Card";

import {
    Colors,
    Radius,
    Shadows,
    Spacing,
    Typography,
} from "@/theme/Index";

interface Props {

    document: Document;

}

export default function DocumentCard({ document }: Props) {

    return (
        <Pressable>

            <Card>

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

                <Text style={styles.author}>
                    {document.author}
                </Text>

            </Card>

        </Pressable>
    );
}

const styles = StyleSheet.create({

    author: {
        marginTop: Spacing.sm,
        color: Colors.textSecondary,
    },

});