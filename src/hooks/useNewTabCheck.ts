import { useEffect } from "react";

export const useNewTabCheck = (onTabChange: () => void) => {
  useEffect(() => {
    const channel = new BroadcastChannel("tab-check");
    const tabId = Date.now().toString();
    let activeTabId: string | null = null;

    const sendTabId = () => channel.postMessage({ type: "tabId", tabId });

    const handleMessage = ({ data }: MessageEvent) => {
      if (data.type === "tabId" && data.tabId !== tabId) {
        activeTabId = data.tabId;
      }
    };

    const handleFocus = () => {
      if (activeTabId && activeTabId !== tabId) {
        onTabChange();
      }
      sendTabId();
    };

    channel.addEventListener("message", handleMessage);
    window.addEventListener("focus", handleFocus);

    if (document.hasFocus()) {
      sendTabId();
    }

    return () => {
      channel.removeEventListener("message", handleMessage);
      channel.close();
      window.removeEventListener("focus", handleFocus);
    };
  }, [onTabChange]);
};
