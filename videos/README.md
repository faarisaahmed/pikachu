# Videos

The three lesson recordings, encoded for the web and wired into `index.html`.

| File                     | Lesson                       | Length  | Size |
| ------------------------ | ---------------------------- | ------- | ---- |
| `01-create-repo.mp4`     | Create a repository and push | 3:48    | 11 MB |
| `02-github-pages.mp4`    | Deploy with GitHub Pages     | 1:30    | 4.8 MB |
| `03-collaborators.mp4`   | Add collaborators            | 0:31    | 1.3 MB |

Each has a matching `0N-poster.jpg` — the still frame shown before playback starts.

## Replacing or adding a recording

The raw screen recordings are Retina captures: 2880×1800 at 60 fps, which is
roughly 10× more detail than a screencast needs and put the first file at 384 MB.
GitHub rejects any file over 100 MB, so recordings must be re-encoded before
they are committed. This brings a 384 MB capture down to about 11 MB with no
visible loss of terminal text:

```bash
ffmpeg -i "Screen Recording.mov" \
  -vf "scale=1920:-2,fps=30" \
  -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
  -movflags +faststart \
  -c:a aac -b:a 96k \
  videos/01-create-repo.mp4
```

- `scale=1920:-2` halves the Retina resolution, keeping the aspect ratio.
- `crf 26` sets quality; lower is better and larger, 18–28 is the useful range.
- `+faststart` moves the index to the front of the file so playback can begin
  before the whole video has downloaded — important over Pages.

Generate the poster frame from three seconds in:

```bash
ffmpeg -ss 3 -i videos/01-create-repo.mp4 -frames:v 1 -q:v 4 videos/01-poster.jpg
```

The original `.mov` files are ignored by git (see `.gitignore`) so the raw
captures stay on your machine and out of the repository's history.

## If a video ever needs to be larger than 100 MB

Don't commit it. Upload it to YouTube or Vimeo and swap the `<video>` element in
`index.html` for an embed — the browser then loads it from there instead of from
Pages:

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID" title="Create a repository"
        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
        allowfullscreen></iframe>
```

The 16:9 framing in `.video-frame` handles either element, so no CSS changes are needed.
