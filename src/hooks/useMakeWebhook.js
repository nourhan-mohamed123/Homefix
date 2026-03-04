import { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../config/api.js';

/**
 * useMakeWebhook — Fetches slider data from the Make.com Webhook.
 *
 * @param {'services' | 'category' | 'provider'} pageType
 *   Must match the Router filter values in your Make.com scenario.
 *
 * @returns {{ data: Array<{name:string, image:string}>, loading: boolean, error: string|null }}
 *
 * The hook:
 *  - Skips the fetch if MAKE_WEBHOOK is still a placeholder.
 *  - Aborts in-flight requests on unmount / pageType change.
 *  - Accepts both the legacy `pageType` query param and the new `page_type` param.
 */
export default function useMakeWebhook(pageType) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const webhookUrl = API_ENDPOINTS.MAKE_WEBHOOK;

    // Skip fetch if webhook URL is not yet configured
    if (!webhookUrl || webhookUrl.includes('YOUR_WEBHOOK_ID_HERE')) {
      console.warn(
        `[useMakeWebhook] Webhook URL not configured. ` +
        `Using fallback data for "${pageType}". ` +
        `Set MAKE_WEBHOOK in src/config/api.js to enable live data.`
      );
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Support both query param names used across Make.com scenarios
        const url = `${webhookUrl}?page_type=${encodeURIComponent(pageType)}&pageType=${encodeURIComponent(pageType)}`;

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();

        // Normalise: accept a top-level array OR { data: [...] }
        const list = Array.isArray(json) ? json : (json?.data ?? []);

        // Normalise field names: accept { name, image } or { Item_Name, Image_URL }
        const normalised = list.map((item) => ({
          name:  item.name  || item.Item_Name  || item.title || '',
          image: item.image || item.Image_URL  || item.icon  || '',
        }));

        setData(normalised);
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error(`[useMakeWebhook] Error fetching "${pageType}":`, err);
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [pageType]);

  return { data, loading, error };
}
