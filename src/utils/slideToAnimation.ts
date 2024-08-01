export type OptionsType = {
  startDelay?: number;
  endDelay?: number;
  duration?: number;
  easing?: string;
  deepClone?: boolean;
  onfinish?: () => void;
};

export type SlideToAnimationType = (
  element: HTMLDivElement,
  container: HTMLDivElement,
  options?: OptionsType
) => void;

const slideToAnimation: SlideToAnimationType = (
  element,
  container,
  options
) => {
  const {
    startDelay = undefined,
    duration = 2000,
    easing = "ease-out",
    deepClone,
    onfinish,
  } = options ?? {};
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const clonedElement = element.cloneNode(deepClone) as HTMLDivElement;
  const scale = containerRect.width / elementRect.width;

  const heightDiff = (containerRect.height - elementRect.height) / 2;
  const widthDiff = (containerRect.width - elementRect.width) / 2;

  const deltaY = elementRect.top - containerRect.top - heightDiff;
  const deltaX = elementRect.left - containerRect.left - widthDiff;

  if (elementRect) {
    Object.assign(clonedElement.style, {
      position: "fixed",
      margin: "0px",
      top: `${elementRect.top}px`,
      left: `${elementRect.left}px`,
      zIndex: "999",
    } as CSSStyleDeclaration);
  }

  const animation = clonedElement.animate(
    [
      { transform: "translate(0,0)" },
      {
        transform: `translate(${-deltaX}px, ${-deltaY}px) scale(${scale})`,
        opacity: "0.2",
      },
    ],
    {
      delay: startDelay,
      duration,
      easing,
    }
  );

  animation.onfinish = () => {
    document.body.removeChild(clonedElement);
    onfinish?.();
  };

  document.body.appendChild(clonedElement);
};

export default slideToAnimation;
