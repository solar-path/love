// flashMessage.tsx
import { useEffect } from "preact/hooks";
import { Toast } from "flowbite-react";
import { CircleCheck, CircleX } from "lucide-react";
import { signal } from "@preact/signals";

export const FlashMessageProps = signal({
  state: false,
  type: "",
  message: "",
});

export default function FlashMessageUI() {
  // Access the value of FlashMessageProps directly
  const isVisible = FlashMessageProps.value.state;
  const type = FlashMessageProps.value.type;
  const message = FlashMessageProps.value.message;

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        FlashMessageProps.value = { ...FlashMessageProps.value, state: false }; // Hide after 5 seconds
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50">
          <Toast>
            <div
              className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                type === "success"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-500"
              }`}
            >
              {type === "success" ? (
                <CircleCheck size="20" />
              ) : (
                <CircleX size="20" />
              )}
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <Toast.Toggle />
          </Toast>
        </div>
      )}
    </>
  );
}
