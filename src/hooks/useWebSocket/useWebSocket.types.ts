/**
 * useWebSocket hook types
 */

export type WebSocketStatus = 'connecting' | 'open' | 'closing' | 'closed';

export interface UseWebSocketOptions {
  /** Auto-connect on mount (default: true) */
  autoConnect?: boolean;
  /** Auto-reconnect on disconnect (default: true) */
  autoReconnect?: boolean;
  /** Reconnect attempts (default: 5) */
  reconnectAttempts?: number;
  /** Reconnect interval in ms (default: 3000) */
  reconnectInterval?: number;
  /** WebSocket protocols */
  protocols?: string | string[];
  /** Callback when connection opens */
  onOpen?: (event: Event) => void;
  /** Callback when connection closes */
  onClose?: (event: CloseEvent) => void;
  /** Callback when error occurs */
  onError?: (event: Event) => void;
  /** Callback when message received */
  onMessage?: (event: MessageEvent) => void;
}

export interface UseWebSocketReturn<T = unknown> {
  /** Current connection status */
  status: WebSocketStatus;
  /** Whether the connection is open */
  isConnected: boolean;
  /** Last received message data */
  lastMessage: T | null;
  /** Last error */
  error: Event | null;
  /** Send a message */
  send: (data: string | ArrayBuffer | Blob) => void;
  /** Send JSON data */
  sendJson: (data: unknown) => void;
  /** Connect to WebSocket */
  connect: () => void;
  /** Disconnect from WebSocket */
  disconnect: (code?: number, reason?: string) => void;
  /** Get the raw WebSocket instance */
  getSocket: () => WebSocket | null;
}
