import {Text} from "react-native";
import {Typography} from "@/theme/typography"

interface Props {
  title: string;
}

export default function SectionTitle({ title }: Props) {
  return (
    <Text style={Typography.caption}>
      {title}
    </Text>
  );
}