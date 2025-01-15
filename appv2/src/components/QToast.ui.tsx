// flashMessage.tsx
import { useEffect } from "preact/hooks";
import { Toast } from "flowbite-react";
import { CircleCheck, CircleX } from "lucide-preact";
import { signal } from "@preact/signals";

export const QToastProps = signal({
  state: false,
  type: "",
  message: "",
});

export const fillToast = (type: string, message: string) => {
  QToastProps.value = {
    state: true,
    type,
    message,
  };
};

export default function QToast() {
  // Access the value of FlashMessageProps directly
  const isVisible = QToastProps.value.state;
  const type = QToastProps.value.type;
  const message = QToastProps.value.message;
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        QToastProps.value = { ...QToastProps.value, state: false }; // Hide after 5 seconds
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
