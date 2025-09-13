import { useState, useEffect } from "react";
import api from "../services/api";

interface Url {
  id: string;
  slug: string;
  longUrl: string;
  clicks: number;
  createdAt: string;
}

// Função que retorna o ícone da plataforma
function getPlatformIcon(longUrl: string) {
  const url = longUrl.toLowerCase().split("?")[0];

  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return (
      <svg width={20} height={20} viewBox="0 0 24 24">
        <title>YouTube</title>
        <path
          fill="#FF0000"
          d="M23.498 6.186a2.994 2.994 0 0 0-2.11-2.112C19.517 3.5 12 3.5 12 3.5s-7.518 0-9.389.574a2.994 2.994 0 0 0-2.11 2.112A31.013 31.013 0 0 0 0 12a31.013 31.013 0 0 0 .501 5.814 2.994 2.994 0 0 0 2.11 2.112C4.482 20.5 12 20.5 12 20.5s7.517 0 9.389-.574a2.994 2.994 0 0 0 2.11-2.112A31.013 31.013 0 0 0 24 12a31.013 31.013 0 0 0-.502-5.814z"
        />
        <path fill="#fff" d="M9.75 15.5v-7l6 3.5-6 3.5z" />
      </svg>
    );
  }

  if (url.includes("google.com")) {
    return (
      <svg width={20} height={20} viewBox="0 0 24 24">
        <title>Google</title>
        <circle cx="12" cy="12" r="10" fill="#4285F4" />
      </svg>
    );
  }

  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#6c757d"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <title>Site</title>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
  );
}

export default function UrlList() {
  const [urls, setUrls] = useState<Url[]>([]);

  const fetchUrls = async () => {
    try {
      const res = await api.get("/");
      setUrls(res.data);
    } catch (err) {
      console.error("Erro ao buscar URLs:", err);
    }
  };

  useEffect(() => {
    fetchUrls();
    const interval = setInterval(fetchUrls, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleRedirect = (slug: string) => {
    window.open(`http://localhost:3000/api/url/${slug}`, "_blank");
    fetchUrls();
  };

  return (
    <ul className="url-list">
      <li className="list-header">
        <h2>Cliques</h2>
      </li>
      {urls.map((u) => (
        <li key={u.id} className="url-item">
          <div className="url-info">
            <button
              onClick={() => handleRedirect(u.slug)}
              className="btn-link fw-bold"
            >
              {u.slug}
            </button>
            <span className="url-long text-truncate">{u.longUrl}</span>
          </div>
          <div className="url-stats">
            <span className="badge bg-success rounded-pill">
              {u.clicks} cliques
            </span>
            {getPlatformIcon(u.longUrl)}
          </div>
        </li>
      ))}
    </ul>
  );
}
