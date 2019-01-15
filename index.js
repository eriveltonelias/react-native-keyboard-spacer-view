import * as React from 'react';
import {
  View,
  Platform,
  Keyboard,
  UIManager,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';

export default class KeyboardSpacerView extends React.PureComponent {
  static defaultProps = {
    backgroundColor: '#f6f6f6',
    extraSpace: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      bottom: 0,
    };
    // Enable `LayoutAnimation` for Android.
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentDidMount() {
    const keyboardShowEvent =
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow';
    const keyboardHideEvent =
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide';

    this.keyboardShowListener = Keyboard.addListener(
      keyboardShowEvent,
      this.keyboardShow
    );
    this.keyboardHideListener = Keyboard.addListener(
      keyboardHideEvent,
      this.keyboardHide
    );
  }

  componentWillUnmount() {
    this.keyboardShowListener && this.keyboardShowListener.remove();
    this.keyboardHideListener && this.keyboardHideListener.remove();
  }

  keyboardShow = e => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      bottom: e.endCoordinates.height + this.props.extraSpace,
    });
  };

  keyboardHide = e => {
    LayoutAnimation.easeInEaseOut();
    this.setState({
      bottom: 0,
    });
  };

  render() {
    const { bottom } = this.state;
    const { children, backgroundColor } = this.props;

    if (!children) {
      console.warn(`Missing children on KeyboardSpacerView component.`);
    }

    return (
      <View style={[styles.container, { backgroundColor, bottom }]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
