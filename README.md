<h1 align="center">React Native Animated Content Scroll</h1>

<p align="center">
  <img src="./assets/demostration/banner.jpg" width="800" />
</p>

A lightweight and smooth animated content scroll component for React Native with directional slide-in animations.

## Example 

<p align="center">
  <img src="./assets/demostration/Animated-container-scroll.gif" width="350" />
  <img src="./assets/demostration/List-animated-content.gif" width="350" />
</p>

<p align="center">
  <sub>Left: AnimatedContentScroll • Right: AnimatedListContainer</sub>
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
A simple animated wrapper for static or scrollable lists with directional animations.

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

## ⚙️ Props AnimatedContentScroll

| Prop        | Type                                  | Default      | Description                                                                |
| ----------- | ------------------------------------- | ------------ | -------------------------------------------------------------------------- |
| `children`  | `ReactNode`                           | **required** | The content to animate.                                                    |
| `index`     | `number`                              | `10`         | Controls the animation delay based on item position.                       |
| `direction` | `"left"` `"right"` `"top"` `"bottom"` | `"right"`    | Direction the element animates from.                                       |
| `distance`  | `number`                              | `50`         | How far the content moves during the animation.                            |
| `duration`  | `number`                              | `500`        | Duration of the animation in milliseconds.                                 |
| `margin`    | `number`                              | `5`          | Adds horizontal margin to account for movement (used for left/right only). |


## Example AnimatedContentScroll

<p align="center">
  <img src="./assets/demostration/Animated-container-scroll.gif" width="350" />
</p>



## 🧩 AnimatedListContainer
A more advanced list animation component that supports dynamic enter/exit animations when the data array changes.

```ts 
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { AnimatedListContainer } from 'react-native-animated-content-scroll';

export default function BasicAnimatedList() {
  const [items, setItems] = useState([
    { id: 1, label: "Item One" },
    { id: 2, label: "Item Two" },
    { id: 3, label: "Item Three" },
    { id: 4, label: "Item Four" },
    { id: 5, label: "Item Five" },
    { id: 6, label: "Item Six" },
  ]);

  const removeLastItem = () => {
    setItems((prev) => prev.slice(0, -1));
  };

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: "center" }}>
      <Button title="Remove Last Item" onPress={removeLastItem} />
      <AnimatedListContainer
        items={items}
        direction="right"
        renderItem={(item) => (
          <View
            style={{
              backgroundColor: "#f2f2f2",
              padding: 12,
              marginVertical: 6,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text>{item.label}</Text>
          </View>
        )}
      />
    </View>
  );
}

```

## ⚙️ Props AnimatedListContainer

| Prop           | Type                                    | Default           | Description                                                       |
| -------------- | --------------------------------------- | ----------------- | ----------------------------------------------------------------- |
| `items`        | `T[]`                                   | **required**      | The list of items to render.                                      |
| `renderItem`   | `(item: T, index: number) => ReactNode` | **required**      | Render function for each item.                                    |
| `direction`    | `"left"` `"right"` `"top"` `"bottom"`   | `"right"`         | Direction from which items animate in.                            |
| `distance`     | `number`                                | `50`              | Distance items move during animation.                             |
| `duration`     | `number`                                | `500`             | Animation duration in milliseconds.                               |
| `margin`       | `number`                                | `5`               | Optional horizontal margin (used for left/right animations only). |
| `keyExtractor` | `(item: T) => string \| number`         | `item => item.id` | Unique identifier extractor for list items.                       |


## Example AnimatedListContainer

<p align="center">
  <img src="./assets/demostration/List-animated-content.gif" width="350" />
</p>

## 🔁 Dynamic Behavior

- When items are added, they animate in.
- When items are removed, they animate out to the right.
- Internally handles animation lifecycle and cleanup.

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
