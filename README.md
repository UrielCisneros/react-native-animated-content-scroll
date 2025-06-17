# React Native Animated Content Scroll

A lightweight and smooth animated content scroll component for React Native with directional slide-in animations.

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

function MyComponent() {
  return (
    <AnimatedContentScroll direction="right">
      <Text>This content slides in from the right</Text>
    </AnimatedContentScroll>
  );
}
```

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
## Props

| Prop        | Tipo                                  | Default       | Descripción                                                             |
| ----------- | ------------------------------------- | ------------- | ----------------------------------------------------------------------- |
| `children`  | `ReactNode`                           | **requerido** | El contenido que se desea animar.                                       |
| `index`     | `number`                              | `10`          | Controla el `delay` de la animación en función del orden de aparición.  |
| `direction` | `"left"` `"right"` `"top"` `"bottom"` | `"bottom"`    | Dirección desde donde aparece el contenido.                             |
| `distance`  | `number`                              | `50`          | Cuánta distancia se mueve el contenido desde su posición inicial.       |
| `duration`  | `number`                              | `500`         | Tiempo en milisegundos que dura la animación.                           |
| `margin`    | `number`                              | `5`           | Margen aplicado en la dirección opuesta para dar espacio al movimiento. |


## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
