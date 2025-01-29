// hooks/useClickOutside.ts
import { type RefObject, useEffect } from "react";

export function useClickOutside(
    ref: RefObject<HTMLElement>,
    handler: (event: MouseEvent | TouchEvent) => void,
    excludeRefs: RefObject<HTMLElement>[] = [],
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const target = event.target as Node;

            // Check if the click was outside the main ref
            if (!ref.current?.contains(target)) {
                // Check if the click was inside any of the excluded elements
                const clickedInside = excludeRefs.some((excludeRef) => excludeRef.current?.contains(target));

                if (!clickedInside) {
                    handler(event);
                }
            }
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler, excludeRefs]);
}
