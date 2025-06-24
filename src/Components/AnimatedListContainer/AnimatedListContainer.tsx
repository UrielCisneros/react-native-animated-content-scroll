import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';
import { Animated, FlatList } from 'react-native';
import type {
  AnimatedListProps,
  AnimationDirection,
  InternalItem,
  ListItem,
} from '../types';

export function AnimatedListContainer<T extends ListItem>({
  items,
  renderItem,
  direction = 'right',
  distance = 50,
  duration = 500,
  margin = 5,
  keyExtractor = (item) => item.id,
}: AnimatedListProps<T>) {
  const [internalItems, setInternalItems] = useState<InternalItem<T>[]>(
    items.map((item) => ({
      id: keyExtractor(item),
      data: item,
      isExiting: false,
      hasEntryAnimated: false,
    }))
  );

  // Detectar cambios en los items
  useEffect(() => {
    const currentIds = items.map(keyExtractor);

    setInternalItems((prevInternal) => {
      let hasChanges = false;
      const newInternal = prevInternal.map((internalItem) => {
        // Marcar items que ya no están en la lista como "saliendo"
        if (!currentIds.includes(internalItem.id) && !internalItem.isExiting) {
          hasChanges = true;
          return { ...internalItem, isExiting: true };
        }
        return internalItem;
      });

      // Agregar nuevos items
      items.forEach((item) => {
        const itemId = keyExtractor(item);
        const existingIndex = newInternal.findIndex(
          (internal) => internal.id === itemId
        );

        if (existingIndex === -1) {
          hasChanges = true;
          newInternal.push({
            id: itemId,
            data: item,
            isExiting: false,
            hasEntryAnimated: false,
          });
        } else if (existingIndex >= 0) {
          // Actualizar datos del item existente (por si cambió algo)
          const existing = newInternal[existingIndex];
          if (
            existing &&
            JSON.stringify(existing.data) !== JSON.stringify(item)
          ) {
            hasChanges = true;
            newInternal[existingIndex] = {
              id: existing.id,
              data: item,
              isExiting: existing.isExiting,
              hasEntryAnimated: existing.hasEntryAnimated,
            };
          }
        }
      });

      // Solo retornar nuevo array si hubo cambios
      return hasChanges ? newInternal : prevInternal;
    });
  }, [items, keyExtractor]);

  const handleExitComplete = useCallback((itemId: string | number) => {
    setInternalItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const handleEntryAnimated = useCallback((itemId: string | number) => {
    setInternalItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, hasEntryAnimated: true } : item
      )
    );
  }, []);

  return (
    <FlatList
      data={internalItems}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <AnimatedItem
          item={item}
          index={index}
          direction={direction}
          distance={distance}
          duration={duration}
          margin={margin}
          onExitComplete={handleExitComplete}
          onEntryAnimated={handleEntryAnimated}
          renderItem={renderItem}
        />
      )}
    />
  );
}

// Componente interno para cada item animado
interface AnimatedItemProps<T extends ListItem> {
  item: InternalItem<T>;
  index: number;
  direction: AnimationDirection;
  distance: number;
  duration: number;
  margin: number;
  onExitComplete: (itemId: string | number) => void;
  onEntryAnimated: (itemId: string | number) => void;
  renderItem: (item: T, index: number) => ReactNode;
}

function AnimatedItem<T extends ListItem>({
  item,
  index,
  direction,
  distance,
  duration,
  margin,
  onExitComplete,
  onEntryAnimated,
  renderItem,
}: AnimatedItemProps<T>) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Animación de entrada
  useEffect(() => {
    if (!item.hasEntryAnimated && !item.isExiting) {
      // Configurar valores iniciales
      const initialValues = getInitialValues(direction, distance);
      translateX.setValue(initialValues.x);
      translateY.setValue(initialValues.y);
      opacity.setValue(0);

      // Ejecutar animación de entrada
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

      animation.start(() => {
        onEntryAnimated(item.id);
      });

      return () => {
        animation.stop();
      };
    }

    // Retornar función vacía si no se ejecuta la animación
    return () => {};
  }, [
    item.hasEntryAnimated,
    item.isExiting,
    opacity,
    translateX,
    translateY,
    direction,
    distance,
    duration,
    index,
    item.id,
    onEntryAnimated,
  ]);

  // Animación de salida
  useEffect(() => {
    if (item.isExiting) {
      const exitAnimation = Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: duration * 0.8,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 100, // Siempre sale hacia la derecha
          duration: duration * 0.8,
          useNativeDriver: true,
        }),
      ]);

      exitAnimation.start((finished) => {
        if (finished) {
          onExitComplete(item.id);
        }
      });

      return () => {
        exitAnimation.stop();
      };
    }

    // Retornar función vacía si no se ejecuta la animación
    return () => {};
  }, [item.isExiting, opacity, translateX, duration, item.id, onExitComplete]);

  // Calcular márgenes
  const getContainerMargins = (
    direction: AnimationDirection,
    margin: number
  ) => {
    switch (direction) {
      case 'left':
        return { marginLeft: margin };
      case 'right':
        return { marginRight: margin };
      case 'top':
      case 'bottom':
        return {};
      default:
        return {};
    }
  };

  return (
    <Animated.View
      style={{
        overflow: 'visible',
        position: 'relative',
        ...getContainerMargins(direction, margin),
      }}
    >
      <Animated.View
        style={{
          opacity,
          position: 'relative',
          transform: [{ translateX }, { translateY }],
        }}
      >
        {renderItem(item.data, index)}
      </Animated.View>
    </Animated.View>
  );
}

// Función auxiliar para obtener valores iniciales según la dirección
function getInitialValues(direction: AnimationDirection, distance: number) {
  switch (direction) {
    case 'left':
      return { x: -distance, y: 0 };
    case 'right':
      return { x: distance, y: 0 };
    case 'top':
      return { x: 0, y: -distance };
    case 'bottom':
      return { x: 0, y: distance };
    default:
      return { x: 0, y: 0 };
  }
}
