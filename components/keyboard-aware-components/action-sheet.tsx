import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "@/components/ui/actionsheet";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  TextInput,
  UIManager,
  View,
} from "react-native";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type KeyboardAwareActionsheetProps = ScrollViewProps & {
  isOpen: boolean;
  onClose: () => void;
};

export default function KeyboardAwareActionsheet({
  children,
  isOpen,
  onClose,
  ...props
}: KeyboardAwareActionsheetProps) {
  const scrollRef = useRef<ScrollView>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", onKeyboardShow);
    const hideSub = Keyboard.addListener("keyboardDidHide", onKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const onKeyboardShow = (e: KeyboardEvent) => {
    setKeyboardHeight(e.endCoordinates.height);

    const focusedInput = TextInput.State.currentlyFocusedInput
      ? TextInput.State.currentlyFocusedInput()
      : null;

    if (!focusedInput) return;

    focusedInput.measure((x, y, width, height, pageX, pageY) => {
      const inputBottom = pageY + height;
      const screenHeight = e.endCoordinates.screenY;

      if (inputBottom > screenHeight - 20) {
        const offset =
          inputBottom - (screenHeight - e.endCoordinates.height) + 20;
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        scrollRef.current?.scrollTo({ y: offset, animated: true });
      }
    });
  };

  const onKeyboardHide = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setKeyboardHeight(0);
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <ActionsheetBackdrop />
      <ActionsheetContent
        style={[
          styles.container,
          { paddingBottom: keyboardHeight || 24, paddingHorizontal: 0 },
        ]}
      >
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>

        <ScrollView
          ref={scrollRef}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: 40,
            width: "100%",
            paddingHorizontal: 24,
          }}
          style={{ width: "100%", alignSelf: "stretch" }}
          {...props}
        >
          <View
            style={{
              width: "100%",
            }}
          >
            {children}
          </View>
        </ScrollView>
      </ActionsheetContent>
    </Actionsheet>
  );
}

const styles = StyleSheet.create({
  container: {
    maxHeight: "80%",
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
});
