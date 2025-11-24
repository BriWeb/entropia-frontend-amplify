import { useState, useEffect } from "react";

interface UseFetchParams {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: HeadersInit;
  body?: unknown;
  requiredAuth?: boolean;
}

export function useFetch<T = unknown>({
  url,
  method = "GET",
  headers = {},
  body = null,
  requiredAuth = false,
}: UseFetchParams) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Si requiere autenticación entonces no hacer nada en SSR, esperar al cliente
    if (requiredAuth && typeof window === "undefined") return;

    // para evitar setState si se desmonta
    let isMounted = true;

    const fetchNow = async () => {
      setLoading(true);
      setError(null);
      setData(null);

      try {
        let finalHeaders: HeadersInit = {
          ...(headers || {}),
          ...(method !== "GET" && { "Content-Type": "application/json" }),
        };

        if (requiredAuth) {
          const token = localStorage.getItem("myToken");
          if (!token) {
            throw new Error("No hay token");
          }
          finalHeaders = {
            ...finalHeaders,
            Authorization: `Bearer ${token}`,
          };
        }

        const response = await fetch(url, {
          method,
          headers: finalHeaders,
          body: body ? JSON.stringify(body) : undefined,
          mode: "cors",
        });
        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.mensaje || "Error en la solicitud");
        }
        if (isMounted) {
          setData(json);
        }
      } catch (error) {
        if (isMounted) {
          if (error instanceof Error) {
            setError(error);
          } else {
            setError(new Error("Unknown error"));
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchNow();
    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    url,
    method,
    JSON.stringify(headers),
    JSON.stringify(body),
    requiredAuth,
  ]);

  return { loading, data, error };
}
