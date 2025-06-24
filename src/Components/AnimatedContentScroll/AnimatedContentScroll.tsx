import { useEffect, useRef } from "react";
import { Animated } from "react-native";
import type { AnimationDirection, PropsAnimatedScrollContent } from "../types";


export function AnimatedContentScroll({
  children,
  index = 10,
  direction = "right",
  distance = 50,
  duration = 500,
  margin = 5
}: PropsAnimatedScrollContent) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Configurar valores iniciales según la dirección
    const initialValues = getInitialValues(direction, distance);
    translateX.setValue(initialValues.x);
    translateY.setValue(initialValues.y);

    // Ejecutar animación
    const animation = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration,
        useNativeDriver: true,
        delay: index * 20,
      }),
      Animated.timing(translateX, {
        toValue: 0,
        duration,
        useNativeDriver: true,
        delay: index * 20,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true,
        delay: index * 20,
      }),
    ]);

    animation.start();

    // Cleanup function
    return () => {
      animation.stop();
    };
  }, [opacity, translateX, translateY, index, direction, distance, duration]);

  // Calcular márgenes para reservar espacio (solo horizontales)
  const getContainerMargins = (direction: AnimationDirection, margin: number) => {
    switch (direction) {
      case "left":
        return { marginLeft: margin };
      case "right":
        return { marginRight: margin };
      case "top":
      case "bottom":
        return {}; // No agregar márgenes verticales
      default:
        return {};
    }
  };

  return (
    <Animated.View
      style={{
        overflow: 'visible',
        position: 'relative',
        ...getContainerMargins(direction, margin)
      }}
    >
      <Animated.View
        style={{
          opacity,
          position: 'relative',
          transform: [
            { translateX },
            { translateY }
          ]
        }}
      >
        {children}
      </Animated.View>
    </Animated.View>
  );
}

// Función auxiliar para obtener valores iniciales según la dirección
function getInitialValues(direction: AnimationDirection, distance: number) {
  switch (direction) {
    case "left":
      return { x: -distance, y: 0 };
    case "right":
      return { x: distance, y: 0 };
    case "top":
      return { x: 0, y: -distance };
    case "bottom":
      return { x: 0, y: distance };
    default:
      return { x: 0, y: 0 };
  }
}