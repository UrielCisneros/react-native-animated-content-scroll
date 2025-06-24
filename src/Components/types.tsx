import type { ReactNode } from "react";

//<<<<<<<<<<<< Animated Container Scroll >>>>>>>>>>>>>>

export type AnimationDirection = "left" | "right" | "top" | "bottom";

export type PropsAnimatedScrollContent = {
  children: ReactNode;
  index?: number;
  direction?: AnimationDirection;
  distance?: number;
  duration?: number;
  margin?: number;
};

//<<<<<<<<<<<< Animated List Container >>>>>>>>>>>>>>

export interface ListItem {
  id: string | number;
  [key: string]: any;
}

export type AnimatedListProps<T extends ListItem> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  direction?: AnimationDirection;
  distance?: number;
  duration?: number;
  margin?: number;
  keyExtractor?: (item: T) => string | number;
};

export interface InternalItem<T> extends ListItem {
  data: T;
  isExiting: boolean;
  hasEntryAnimated: boolean;
}