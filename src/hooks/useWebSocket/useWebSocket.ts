import { useState, useEffect, useCallback, useRef } from 'react';
import type { UseWebSocketOptions, UseWebSocketReturn, WebSocketStatus } from './useWebSocket.types';

/**
 * useWebSocket - WebSocket connection management
 * 
 * @example
 * ```tsx
 * const { status, lastMessage, send, sendJson, isConnected } = useWebSocket('wss://echo.websocket.org', {
 *   onMessage: (event) => console.log('Received:', event.data),
 *   onOpen: () => console.log('Connected!'),
 *   onClose: () => console.log('Disconnected!'),
 * });
 * 
 * return (
 *   <div>
 *     <p>Status: {status}</p>
 *     <button onClick={() => sendJson({ type: 'ping' })}>Send Ping</button>
 *   </div>
 * );
 * ```
 */
export function useWebSocket<T = unknown>(
  url: string,
  options: UseWebSocketOptions = {}
): UseWebSocketReturn<T> {
  const {
    autoConnect = true,
    autoReconnect = true,
    reconnectAttempts = 5,
    reconnectInterval = 3000,
    protocols,
    onOpen,
    onClose,
    onError,
    onMessage,
  } = options;

  const [status, setStatus] = useState<WebSocketStatus>('closed');
  const [lastMessage, setLastMessage] = useState<T | null>(null);
  const [error, setError] = useState<Event | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const reconnectCountRef = useRef(0);
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountedRef = useRef(false);

  // Keep callback refs updated
  const onOpenRef = useRef(onOpen);
  const onCloseRef = useRef(onClose);
  const onErrorRef = useRef(onError);
  const onMessageRef = useRef(onMessage);

  useEffect(() => {
    onOpenRef.current = onOpen;
    onCloseRef.current = onClose;
    onErrorRef.current = onError;
    onMessageRef.current = onMessage;
  }, [onOpen, onClose, onError, onMessage]);

  const clearReconnectTimeout = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }
  }, []);

  const connect = useCallback(() => {
    if (typeof window === 'undefined') return;
    if (socketRef.current?.readyState === WebSocket.OPEN) return;

    clearReconnectTimeout();
    setStatus('connecting');
    setError(null);

    try {
      socketRef.current = new WebSocket(url, protocols);

      socketRef.current.onopen = (event) => {
        if (unmountedRef.current) return;
        setStatus('open');
        reconnectCountRef.current = 0;
        onOpenRef.current?.(event);
      };

      socketRef.current.onclose = (event) => {
        if (unmountedRef.current) return;
        setStatus('closed');
        onCloseRef.current?.(event);

        // Auto-reconnect
        if (autoReconnect && reconnectCountRef.current < reconnectAttempts && !unmountedRef.current) {
          reconnectCountRef.current += 1;
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, reconnectInterval);
        }
      };

      socketRef.current.onerror = (event) => {
        if (unmountedRef.current) return;
        setError(event);
        onErrorRef.current?.(event);
      };

      socketRef.current.onmessage = (event) => {
        if (unmountedRef.current) return;
        try {
          const data = JSON.parse(event.data) as T;
          setLastMessage(data);
        } catch {
          setLastMessage(event.data as T);
        }
        onMessageRef.current?.(event);
      };
    } catch (err) {
      setStatus('closed');
      setError(err as Event);
    }
  }, [url, protocols, autoReconnect, reconnectAttempts, reconnectInterval, clearReconnectTimeout]);

  const disconnect = useCallback((code?: number, reason?: string) => {
    clearReconnectTimeout();
    reconnectCountRef.current = reconnectAttempts; // Prevent auto-reconnect
    
    if (socketRef.current) {
      setStatus('closing');
      socketRef.current.close(code, reason);
      socketRef.current = null;
    }
  }, [clearReconnectTimeout, reconnectAttempts]);

  const send = useCallback((data: string | ArrayBuffer | Blob) => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(data);
    }
  }, []);

  const sendJson = useCallback((data: unknown) => {
    send(JSON.stringify(data));
  }, [send]);

  const getSocket = useCallback(() => socketRef.current, []);

  // Auto-connect on mount
  useEffect(() => {
    unmountedRef.current = false;
    
    if (autoConnect) {
      connect();
    }

    return () => {
      unmountedRef.current = true;
      clearReconnectTimeout();
      if (socketRef.current) {
        socketRef.current.close();
        socketRef.current = null;
      }
    };
  }, [autoConnect, connect, clearReconnectTimeout]);

  return {
    status,
    isConnected: status === 'open',
    lastMessage,
    error,
    send,
    sendJson,
    connect,
    disconnect,
    getSocket,
  };
}

export default useWebSocket;
