import { useEffect } from "react";
type QrSessionEvent = {
  accessToken: string;
  refreshToken: string;
};

interface UseQrSessionEventsProps {
  sessionId: string;
  onAuthenticated?: (data: QrSessionEvent) => void;
}

export function useQrSessionEvents({
  sessionId,
  onAuthenticated,
}: UseQrSessionEventsProps) {
  useEffect(() => {
    const eventSource = new EventSource(
      `http://192.168.1.9:3000/sessions/${sessionId}/events`,
    );

    eventSource.addEventListener("connected", (event) => {
      const data = JSON.parse(event.data);

      console.log("SSE connected:", data);
    });

    eventSource.addEventListener("authenticated", (event) => {
      const data = JSON.parse(event.data);

      console.log("SSE authenticated:", data);

      onAuthenticated?.(data);
    });

    eventSource.onerror = (error) => {
      console.error("SSE error:", error);
    };

    return () => {
      eventSource.close();
    };
  }, [sessionId, onAuthenticated]);
}
