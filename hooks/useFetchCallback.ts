import { useState, useCallback } from "react";

interface UseFetchParams {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: unknown;
}

export function useFetchCallback<T = unknown>() {
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState<unknown>(null);
  const [data, setData] = useState<T | null>(null);
  // const [error, setError] = useState<unknown>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchNow = useCallback(
    async ({
      url,
      method = "GET",
      headers = {},
      body = null,
    }: UseFetchParams) => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          mode: "cors",
        });
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.mensaje);
        }
        // setData(json);
        setData(json as T);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("Unknown error"));
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, data, error, fetchNow };
}

// TO TEST
// se puede añadir cache TODO
// type State<T> = {
//   data?: T;
//   error?: Error;
//   isLoading: boolean;
// };

// type Action<T> =
//   | { type: "FETCH_INIT" }
//   | { type: "FETCH_SUCCESS"; payload: T }
//   | { type: "FETCH_ERROR"; payload: Error };

// function fetchReducer<T>(state: State<T>, action: Action<T>): State<T> {
//   switch (action.type) {
//     case "FETCH_INIT":
//       return { ...state, isLoading: true };
//     case "FETCH_ERROR":
//       return { ...state, isLoading: false, error: action.payload };
//     case "FETCH_SUCCESS":
//       return { ...state, isLoading: false, data: action.payload };
//   }
// }

// function useFetch<T>(url: string): State<T> {
//   const [{ data, error, isLoading }, dispatch] = useReducer(fetchReducer<T>, {
//     data: undefined,
//     error: undefined,
//     isLoading: false,
//   });

//   //memoization
//   const fetchData = useCallback(async () => {
//     dispatch({ type: "FETCH_INIT" });
//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error(response.statusText);
//       }

//       const data = await response.json();
//       dispatch({ type: "FETCH_SUCCESS", payload: data });
//     } catch (error) {
//       dispatch({ type: "FETCH_ERROR", payload: error as Error });
//     }
//   }, [url]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   return { isLoading, error, data };
// }

// export default useFetch;
