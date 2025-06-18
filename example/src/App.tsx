import { AnimatedContentScroll } from 'react-native-animated-content-scroll';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View style={{ padding: 20 }}>
      {[...Array(5)].map((_, index) => (
        <AnimatedContentScroll key={index} index={index}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Item {index + 1}
          </Text>
        </AnimatedContentScroll>
      ))}
    </View>
  );
}
