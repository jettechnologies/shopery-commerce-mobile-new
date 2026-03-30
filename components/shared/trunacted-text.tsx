// components/TruncatedText.tsx
import { useState } from "react";
import { Pressable, Text } from "react-native";

type TruncatedTextProps = {
  text: string;
  previewWords?: number;
  expandedWords?: number;
  className?: string;
};

export function TruncatedText({
  text,
  previewWords = 200,
  expandedWords = 250,
  className = "text-gray-500",
}: TruncatedTextProps) {
  const [expanded, setExpanded] = useState(false);

  const words = text.split(/\s+/);

  const displayedWords = expanded
    ? words.slice(0, expandedWords)
    : words.slice(0, previewWords);

  const isTruncated = words.length > displayedWords.length;

  const classNames = [
    className,
    isTruncated ? "line-clamp-3" : "line-clamp-none",
    "text-gray-500 text-base",
  ].join(" ");

  return (
    <>
      <Text className={classNames}>
        {displayedWords.join(" ")}
        {isTruncated && !expanded ? "..." : ""}
      </Text>

      {words.length > previewWords && (
        <Pressable onPress={() => setExpanded(!expanded)}>
          <Text className="text-purple-500 font-semibold mt-1">
            {expanded ? "Show less" : "Read more"}
          </Text>
        </Pressable>
      )}
    </>
  );
}
