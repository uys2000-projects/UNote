export const animateCSS = (
  element: Element,
  animation: string,
  prefix = "animate__"
) =>
  new Promise((resolve, reject) => {
    element.classList.add(`${prefix}animated`, `${prefix}${animation}`);
    element.addEventListener(
      "animationend",
      (e) => {
        e.stopPropagation();
        element.classList.remove(`${prefix}animated`, `${prefix}${animation}`);
        resolve(e);
      },
      { once: true }
    );
  }) as Promise<Event>;

export const animateCssOnIn = (
  element: Element,
  animation: string,
  rootElement: Element = document.body,
  prefix = "animate__"
): Promise<() => void> =>
  new Promise((resolve, reject) => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animateCSS(element, animation, prefix).then((e: Event) => {
            element.classList.remove("opacity-0");
            element.classList.add("opacity-1");
            resolve(() => observer.unobserve(element));
          });
        } else {
          element.classList.remove("opacity-1");
          element.classList.add("opacity-0");
        }
      },
      {
        root: rootElement,
        threshold: 0.1, // set offset 0.1 means trigger if atleast 10% of element in viewport
      }
    );
    observer.observe(element);
  });

export const animateCssOnOut = (
  element: Element,
  animation: string,
  rootElement: Element = document.body,
  prefix = "animate__"
): Promise<() => void> =>
  new Promise((resolve, reject) => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) {
          animateCSS(element, animation, prefix).then((e: Event) => {
            element.classList.remove("opacity-1");
            element.classList.add("opacity-0");
            resolve(() => observer.unobserve(element));
          });
        } else {
          element.classList.remove("opacity-0");
          element.classList.add("opacity-1");
        }
      },
      {
        root: rootElement,
        threshold: 0.3, // set offset 0.1 means trigger if atleast 10% of element in viewport
      }
    );
    observer.observe(element);
  });
