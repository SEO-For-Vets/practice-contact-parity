# Vet New Client Journey Planner

Plan clear registration, routine booking and out-of-hours information for people finding your practice for the first time.

**For veterinary practice owners and managers. No coding knowledge needed.**

[Open the free tool](https://seo-for-vets.github.io/practice-contact-parity/) · [See a fictional worked example](https://seo-for-vets.github.io/practice-contact-parity/examples/customer-output.html)

![Desktop preview](docs/preview.png)

## How to use it

1. Open the tool in your browser. No installation or account is needed.
2. Use your own business details in the labelled fields, or choose **Try a fictional example**.
3. Choose **Build my new-client plan** and review the result.
4. Adjust your answers, then copy the result, download a text file or choose **Print / Save PDF**.

A practical website brief your reception team can review and use.

## What to expect

Use the practice’s actual arrangements. This plans the information your website should explain; it does not register a client or request treatment.

This is an administrative planning tool, not veterinary advice or triage. Use only practice-approved urgent and out-of-hours instructions.

Your answers are processed in the browser tab. They are not uploaded, emailed or saved by the tool. Refreshing or closing the tab clears them. Save your result before leaving. GitHub provides hosting and handles normal request logs. Example details are fictional, not customer results.

## Design and maintenance

The interface uses the colours, typography and visual treatment of [SEO for Vets](https://seoforvets.co.uk/). The tool is maintained by SEO for Vets, operated by JW Digital Services Ltd. The commercial website is a separate project.

## For developers

The customer tool uses native HTML controls and small browser modules, with no runtime framework. Its planning or calculation rules are in `src/customer.js`; presentation helpers are in `src/customer-ui.js`.

```sh
npm ci --ignore-scripts
npm test
npm run build
npm run serve
```

Open the local address printed by the server. `npm run build:pages` prepares the static GitHub Pages artifact. Tests cover the customer rules and output escaping.

The original v0.1 developer helpers remain in `src/index.js` for compatibility, with their original examples. They are not needed to use the customer tool. The existing repository name and Pages URL are retained so earlier links keep working.

## Licence and feedback

MIT for tool code. Bundled typefaces retain their original licence notices in `demo/assets/font-licences`. [Ideas and feedback](https://github.com/SEO-For-Vets/practice-contact-parity/discussions/1).
