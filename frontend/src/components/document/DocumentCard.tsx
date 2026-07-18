import { Text, StyleSheet, Pressable } from "react-native";
import { Document } from "@/types/document";

import Card from "@/components/common/card";

import {Colors} from "@/theme/colors"
import {Radius} from "@/theme/radius"
import {Shadows} from "@/theme/shadow"
import {Sizes} from "@/theme/sizes"
import {Spacing} from "@/theme/spacing"
import {Typography} from "@/theme/typography"

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