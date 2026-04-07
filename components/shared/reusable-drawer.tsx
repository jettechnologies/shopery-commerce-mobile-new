import React from 'react';
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  DrawerCloseButton,
} from '@/components/ui/drawer';
import { Icon, CloseIcon } from '@/components/ui/icon';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ReusableDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
  anchor?: 'left' | 'right' | 'top' | 'bottom';
}

export const ReusableDrawer: React.FC<ReusableDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  anchor = 'right',
}) => {
  const insets = useSafeAreaInsets();
  
  const isBottom = anchor === 'bottom';

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      size={size}
      anchor={anchor}
    >
      <DrawerBackdrop />
      <DrawerContent 
        className={`${isBottom ? 'rounded-t-[32px]' : (size === 'full' ? 'rounded-0' : 'rounded-l-[32px]')} p-0`}
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        {isBottom && (
          <View className="items-center pt-3 pb-2">
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
          </View>
        )}
        
        {((title !== undefined) || (onClose !== undefined)) && (
          <DrawerHeader className={`px-6 py-4 border-b border-gray-100 ${!isBottom ? 'pt-2' : ''}`}>
            {title && <Text className="text-lg font-bold text-gray-900">{title}</Text>}
            <DrawerCloseButton>
              <Icon as={CloseIcon} className="text-gray-500" />
            </DrawerCloseButton>
          </DrawerHeader>
        )}

        <DrawerBody className="px-6 py-2">
          {children}
        </DrawerBody>

        {footer && (
          <DrawerFooter className="px-6 py-6 border-t border-gray-100 bg-white">
            {footer}
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};
