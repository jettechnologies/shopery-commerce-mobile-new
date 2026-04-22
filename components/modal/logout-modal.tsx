import { X } from "lucide-react-native";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { AppButton } from "../app-button";

interface LogoutModalProps {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({
  isVisible,
  onClose,
  onConfirm,
}: LogoutModalProps) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          {/* Close Button */}
          <Pressable onPress={onClose} style={styles.closeButton}>
            <X size={24} color="#1f2937" />
          </Pressable>

          <View style={styles.content}>
            <Text style={styles.title}>Are you sure you want to logout?</Text>

            <View style={styles.buttonContainer}>
              <AppButton title="Cancel" onPress={onClose} />

              <Pressable onPress={onConfirm} style={styles.logoutLink}>
                <Text style={styles.logoutText}>Log Out</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  container: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    zIndex: 10,
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    lineHeight: 26,
    marginBottom: 28,
  },
  buttonContainer: {
    width: "100%",
    gap: 16,
  },
  logoutLink: {
    paddingVertical: 12,
    alignItems: "center",
  },
  logoutText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "700",
  },
});
