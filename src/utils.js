import { unescape } from "lodash";

export default function escapeHtml(text) {
  return (
    unescape(text)
      .replace("&amp;", "&")
      .replace("&lt;", "<")
      .replace("&gt;", ">")
      .replace("&quot;", '"')
      .replace("&deg;", "°")
      .replace("&#039;", "'")
  );
}
