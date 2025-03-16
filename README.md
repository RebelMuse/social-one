# SocialOne Privacy Policy

This repository contains the privacy policy for SocialOne, hosted on GitHub Pages.

## Setup Instructions

1. **DNS Configuration**
   - Add a CNAME record for `socialone.suite.to` pointing to `[your-github-username].github.io`
   - The CNAME record should look like:
     ```
     Type: CNAME
     Host: socialone.suite.to
     Value: [your-github-username].github.io
     TTL: 3600
     ```

2. **GitHub Pages Configuration**
   - Go to repository Settings > Pages
   - Under "Build and deployment":
     - Source: GitHub Actions
     - Branch: main
   - Under "Custom domain":
     - Enter: socialone.suite.to
     - Check "Enforce HTTPS"

3. **Meta Developer Console Update**
   After the site is live, update your Meta Developer Console with:
   ```
   Privacy Policy URL: https://socialone.suite.to/privacy
   ```

## Local Development

To test locally, you can use Python's built-in HTTP server:
```bash
cd privacy-policy
python -m http.server 8000
```
Then visit `http://localhost:8000` in your browser.

## File Structure

```
.
├── .github/
│   └── workflows/
│       └── deploy.yml    # GitHub Actions workflow
├── privacy-policy/
│   └── index.html       # Privacy policy page
└── README.md            # This file
```
