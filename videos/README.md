# Videos

Drop the three lesson recordings in this folder, then replace the matching
placeholder block in `index.html`.

Suggested filenames:

| File                        | Lesson                              |
| --------------------------- | ----------------------------------- |
| `01-create-repo.mp4`        | Create a repository and push        |
| `02-github-pages.mp4`       | Deploy with GitHub Pages            |
| `03-collaborators.mp4`      | Add collaborators                   |

Each placeholder in `index.html` looks like this:

```html
<div class="video-empty"> ... </div>
```

Swap it for either a local file:

```html
<video controls playsinline preload="metadata" poster="videos/01-poster.jpg">
  <source src="videos/01-create-repo.mp4" type="video/mp4">
</video>
```

…or a YouTube embed:

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Create a repository"
        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
        allowfullscreen></iframe>
```

The styling and 16:9 framing are already handled by `.video-frame` — no extra CSS needed.

## A note on file size

GitHub blocks any single file over 100 MB, and Pages serves from a soft ~1 GB
site budget. If a recording is large, host it on YouTube or Vimeo and use the
iframe form instead of committing the file.
