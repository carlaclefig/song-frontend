# 🎵 Song Frontend

Frontend para el **Music Streaming Server** — un catálogo de canciones con reproductor de YouTube integrado.

**Demo:** [track-library.netlify.app](https://track-library.netlify.app) · **Backend:** [song-server-production.up.railway.app](https://song-server-production.up.railway.app)

---

## Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **Tailwind CSS** — estilos
- **Lucide React** — iconos

---

## Funcionalidades

- Listar, agregar, editar y eliminar canciones
- Búsqueda en tiempo real por título o artista
- Filtros por género y artista
- Reproductor de YouTube embebido (por canción)
- Diseño responsive — mobile y desktop
- Animaciones y waveform animado

---

## Estructura

```
src/
├── components/
│   ├── DeleteModal.tsx       # Modal de confirmación de eliminación
│   ├── SongCard.tsx          # Fila de canción con botón play
│   ├── SongModal.tsx         # Modal para crear/editar canción
│   ├── Waveform.tsx          # Animación de barras de audio
│   └── YouTubePlayer.tsx     # Player flotante de YouTube
├── hooks/
│   └── useSongs.ts           # Hook CRUD con estado global
├── pages/
│   └── HomePage.tsx          # Página principal
├── services/
│   └── songService.ts        # Llamadas a la API REST
└── types/
    └── song.ts               # Tipo Song + SongFormData
```

---

## Correr en local

**1. Clonar el repo**
```bash
git clone https://github.com/carlaclefig/song-frontend.git
cd song-frontend
```

**2. Instalar dependencias**
```bash
npm install
```

**3. Crear archivo `.env`**
```env
VITE_API_URL=http://localhost:3000
```

**4. Levantar el servidor de desarrollo**
```bash
npm run dev
```

Abrí [http://localhost:5173](http://localhost:5173)

> El backend tiene que estar corriendo. Repositorio: [song-server](https://github.com/carlaclefig)

---

## Variables de entorno

| Variable | Descripción | Ejemplo |
|---|---|---|
| `VITE_API_URL` | URL base del backend | `https://song-server.up.railway.app` |

---

## Deploy

El frontend está deployado en **Netlify** con deploy automático desde la rama `main`.

Para deployar manualmente:
```bash
npm run build
# subir la carpeta /dist a cualquier servicio de hosting estático
```

---

## API que consume

El frontend se conecta al backend REST en `/api/songs`:

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/songs` | Obtener todas las canciones |
| GET | `/api/songs/:id` | Obtener canción por ID |
| POST | `/api/songs` | Crear canción |
| PUT | `/api/songs/:id` | Editar canción |
| DELETE | `/api/songs/:id` | Eliminar canción |

---

## Modelo de canción

```typescript
type Song = {
  id: number;
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  url?: string; // URL de YouTube (opcional)
}
```

