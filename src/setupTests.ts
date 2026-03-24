/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

global.console = {
  ...console,
  warn: jest.fn(),
};

// Mock supabase globally to avoid import.meta issues
const mockAuthStateChange = jest.fn();

jest.mock("./lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: jest.fn((callback) => {
        mockAuthStateChange.mockImplementation(callback);
        return {
          data: { subscription: { unsubscribe: jest.fn() } },
        };
      }),
      signUp: jest.fn().mockImplementation(async (params) => {
        const user = {
          id: "1",
          email: params.email,
          user_metadata: { username: params.options?.data?.username },
          created_at: "2025-01-01",
        };
        // Simulate auth state change
        mockAuthStateChange("SIGNED_IN", { user });
        return { data: { user }, error: null };
      }),
      signInWithPassword: jest.fn().mockImplementation(async (params) => {
        const user = {
          id: "1",
          email: params.email,
          user_metadata: { username: "test" },
          created_at: "2025-01-01",
        };
        // Simulate auth state change
        mockAuthStateChange("SIGNED_IN", { user });
        return { data: { user }, error: null };
      }),
      signOut: jest.fn().mockImplementation(async () => {
        // Simulate auth state change
        mockAuthStateChange("SIGNED_OUT", null);
        return { error: null };
      }),
      updateUser: jest.fn().mockResolvedValue({
        data: { user: { id: "1", email: "test@test.com" } },
        error: null,
      }),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
  },
}));

jest.mock("./lib/supabase", () => ({
  supabase: {
    auth: {
      getSession: jest.fn().mockResolvedValue({ data: { session: null }, error: null }),
      onAuthStateChange: jest.fn().mockReturnValue({ data: { subscription: { unsubscribe: jest.fn() } } }),
      signUp: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
      signInWithPassword: jest.fn().mockResolvedValue({ data: { user: null }, error: null }),
      signOut: jest.fn().mockResolvedValue({ error: null }),
      updateUser: jest.fn().mockResolvedValue({ data: null, error: null }),
    },
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockResolvedValue({ data: [], error: null }),
    insert: jest.fn().mockReturnThis(),
    update: jest.fn().mockReturnThis(),
    delete: jest.fn().mockReturnThis(),
    eq: jest.fn().mockReturnThis(),
    order: jest.fn().mockReturnThis(),
  },
}));
