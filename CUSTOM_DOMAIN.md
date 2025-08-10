# Use a Custom Domain (nusaijaleel.com) with GitHub Pages

This guide explains how to move your site from the GitHub Pages default domain to your custom domain `nusaijaleel.com`.

## 1) Configure DNS at Your Domain Registrar

- Point the apex domain (nusaijaleel.com) to GitHub Pages IPs using A records:
  - 185.199.108.153
  - 185.199.109.153
  - 185.199.110.153
  - 185.199.111.153
- Point the www subdomain to GitHub Pages with a CNAME:
  - Host: `www`
  - Value: `xdaguy.github.io`
- Optional: If your DNS supports ALIAS/ANAME for apex, you can point `nusaijaleel.com` directly to `xdaguy.github.io` instead of A records.

DNS changes may take anywhere from a few minutes to 24–48 hours to fully propagate.

## 2) Set the Custom Domain in GitHub Pages

- Go to GitHub → Repository Settings → Pages.
- Under "Custom domain", enter: `nusaijaleel.com` and save.
- Enable "Enforce HTTPS" (let the SSL certificate provision; this can take a bit).
- GitHub automatically creates or updates a `CNAME` file at the repository root with `nusaijaleel.com`.

## 3) Update Site Files for the New Domain

Update URLs from the GitHub Pages project path to your custom domain.

- `robots.txt`
  - Replace sitemap line with:
    ```
    Sitemap: https://nusaijaleel.com/sitemap.xml
    ```
- `sitemap.xml`
  - Ensure homepage URL is:
    ```xml
    <loc>https://nusaijaleel.com/</loc>
    ```
  - Update `<lastmod>` with the migration date.
- `404.html`
  - Change the homepage button link from `/NusaiJaleel/` to `/`.
- `index.html` `<head>`
  - Set canonical:
    ```html
    <link rel="canonical" href="https://nusaijaleel.com/">
    ```
  - Ensure Open Graph/Twitter/JSON-LD image and URL references use `https://nusaijaleel.com/...`.
- Internal links
  - Prefer root-relative (`/path`) or relative (`path`) links after switching. Avoid hardcoding `/NusaiJaleel/`.

## 4) Search Console & Analytics

- Google Search Console
  - Add and verify the Domain property: `nusaijaleel.com`.
  - Submit the new sitemap: `https://nusaijaleel.com/sitemap.xml`.
  - Keep the old property temporarily to monitor the transition.
- Google Analytics
  - If GA is installed, confirm it’s collecting for the new domain.
  - If not installed, add your Measurement ID in `js/main.js`.

## 5) Redirect Strategy (Optional)

Choose a canonical host (apex or www). Common choice: apex `nusaijaleel.com`.
- Configure your registrar to redirect `www.nusaijaleel.com` → `https://nusaijaleel.com/` (or the reverse if you prefer www).

## 6) Post‑Switch Checklist

- [ ] `https://nusaijaleel.com/` loads over HTTPS
- [ ] `https://nusaijaleel.com/robots.txt` is accessible
- [ ] `https://nusaijaleel.com/sitemap.xml` is accessible and correct
- [ ] 404 page works on a random path (e.g., `/this-should-404`)
- [ ] Canonical URL and OG/Twitter tags point to `nusaijaleel.com`
- [ ] Internal links work without `/NusaiJaleel/`
- [ ] Search Console property verified and sitemap submitted
- [ ] GA receiving traffic for the new domain

## Notes

- You can prepare these file changes on a branch and merge once DNS + HTTPS are ready to avoid mixed states.
- After migration, keep an eye on Search Console coverage and Core Web Vitals. Update `sitemap.xml` when significant content changes.
