import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardEvent,
  LayoutAnimation,
  Modal,
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

type KeyboardAvoidingModalProps = ScrollViewProps & {
  isVisible: boolean;
  onClose: () => void;
};

export default function KeyboardAvoidingModal({
  children,
  isVisible,
  onClose,
  ...props
}: KeyboardAvoidingModalProps) {
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
        // Extra 20px padding
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
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { paddingBottom: keyboardHeight }]}>
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
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // modal overlay
    justifyContent: "flex-end",
  },
  container: {
    maxHeight: "80%", // modal height
    backgroundColor: "#fff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 16,
  },
});
