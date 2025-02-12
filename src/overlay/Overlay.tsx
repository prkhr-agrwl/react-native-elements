import React from 'react';
import {
  View,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Modal,
  ModalProps,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { withTheme } from '../config';
import { RneFunctionComponent } from '../helpers';

export type OverlayProps = ModalProps & {
  isVisible: boolean;
  backdropStyle?: StyleProp<ViewStyle>;
  overlayStyle?: StyleProp<ViewStyle>;
  onBackdropPress?(): void;
  fullScreen?: boolean;
  ModalComponent?: React.ComponentClass;
};

const Overlay: RneFunctionComponent<OverlayProps> = ({
  children,
  backdropStyle,
  overlayStyle,
  onBackdropPress,
  fullScreen,
  ModalComponent,
  isVisible,
  ...rest
}) => (
  <ModalComponent
    visible={isVisible}
    onRequestClose={onBackdropPress}
    transparent
    {...rest}
  >
    <TouchableWithoutFeedback
      onPress={onBackdropPress}
      testID="RNE__Overlay__backdrop"
    >
      <View
        testID="backdrop"
        style={StyleSheet.flatten([styles.backdrop, backdropStyle])}
      />
    </TouchableWithoutFeedback>

    <View style={styles.container} pointerEvents="box-none">
      <View
        style={StyleSheet.flatten([
          styles.overlay,
          fullScreen && styles.fullscreen,
          overlayStyle,
        ])}
      >
        {children}
      </View>
    </View>
  </ModalComponent>
);

Overlay.defaultProps = {
  fullScreen: false,
  onBackdropPress: () => null,
  ModalComponent: Modal,
};

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullscreen: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 10,
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0, 0, 0, .3)',
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
      },
    }),
  },
});

export { Overlay };
export default withTheme(Overlay, 'Overlay');
