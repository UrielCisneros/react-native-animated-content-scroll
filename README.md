<p align="center">
  <img src="./assets/demostration/banner.jpg" width="800" />
</p>
# React Native Animated Content Scroll

A lightweight and smooth animated content scroll component for React Native with directional slide-in animations.

## Vista previa

<p align="center">
  <img src="./assets/demostration/demostration-done-gift.gif" width="350" />
</p>



## ✨ Features

- 🎯 **4 directional animations**: left, right, top, bottom
- ⚡ **Smooth performance**: Uses native driver for 60fps animations
- 🎨 **Customizable**: Control duration, distance, margins, and staggered delays
- 📦 **TypeScript support**: Full type definitions included
- 🪶 **Lightweight**: Zero dependencies (only React Native peer dependency)

## 📦 Installation

```bash
npm install react-native-animated-content-scroll
```

## 🚀 Usage

## Basic Usage
```ts 
import { AnimatedContentScroll } from 'react-native-animated-content-scroll';

export default function MyScreen() {
  return (
    <View style={{ padding: 20 }}>
      {[...Array(5)].map((_, index) => (
        <AnimatedContentScroll key={index} index={index}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>Item {index + 1}</Text>
        </AnimatedContentScroll>
      ))}
    </View>
  );
}
```

## ⚙️ Props

| Prop        | Type                                  | Default      | Description                                                                |
| ----------- | ------------------------------------- | ------------ | -------------------------------------------------------------------------- |
| `children`  | `ReactNode`                           | **required** | The content to animate.                                                    |
| `index`     | `number`                              | `10`         | Controls the animation delay based on item position.                       |
| `direction` | `"left"` `"right"` `"top"` `"bottom"` | `"right"`    | Direction the element animates from.                                       |
| `distance`  | `number`                              | `50`         | How far the content moves during the animation.                            |
| `duration`  | `number`                              | `500`        | Duration of the animation in milliseconds.                                 |
| `margin`    | `number`                              | `5`          | Adds horizontal margin to account for movement (used for left/right only). |

## 💡 Advanced Examples

## Staggered List Animation

```ts 
import { AnimatedContentScroll } from 'react-native-animated-content-scroll';

function MyList() {
  const items = ['Item 1', 'Item 2', 'Item 3'];
  
  return (
    <View>
      {items.map((item, index) => (
        <AnimatedContentScroll 
          key={index}
          direction="left" 
          index={index}
          duration={600}
        >
          <Text>{item}</Text>
        </AnimatedContentScroll>
      ))}
    </View>
  );
}
```

## Advanced Usage

```ts 
<AnimatedContentScroll 
  direction="top" 
  distance={100}
  duration={800}
  margin={10}
  index={0}
>
  <Card>
    <Text>Custom animated card</Text>
  </Card>
</AnimatedContentScroll>
```
## 🛠️ How It Works

- Uses React Native's `Animated.Value` to control `opacity`, `translateX`, and `translateY`.
- `index` is multiplied by 20ms to stagger animations for multiple components.
- Only applies margin on `left` or `right` to prevent layout issues with vertical animations.


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
