# Portfolio hosting

This repository is hosted directly in the owner's Cloudflare account.

- Production: https://springcotton.com
- Source: https://github.com/bom25da/portfolio (`main`)
- Cloudflare Worker: `springcotton-portfolio`
- Deployment configuration: `cloudflare.config.ts`

Use the `cf` CLI and `npm run deploy`. The script runs type checking, builds the
static assets, prerenders the HTML, and deploys the existing Build Output with
`cf deploy --prebuilt`. A plain `cf deploy` skips the project's prerender step.

Do not create, restore, or publish this portfolio through ChatGPT Sites. The
former Sites project was deleted at the owner's request.

Keep credentials out of source control. Authenticate with `cf auth login` or the
`CLOUDFLARE_API_TOKEN` environment variable.
