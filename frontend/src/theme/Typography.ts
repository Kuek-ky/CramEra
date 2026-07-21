import { TextStyle } from "react-native";
import { Colors } from "./Colors";

export const Typography: Record<string, TextStyle> = {
  h1: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  h2: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
  },

  h3: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.text,
  },

  title: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },

  body: {
    fontSize: 16,
    color: Colors.text,
  },

  bodySmall: {
    fontSize: 14,
    color: Colors.textSecondary,
  },

  caption: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },

  button: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
  },
};