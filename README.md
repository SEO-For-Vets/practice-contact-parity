# Practice Contact Parity

Practice Contact Parity compares an approved branch register with supplied website contact records. It helps an editor spot missing details, conflicting branch information and formatting differences that do not change the underlying number.

The checker does not verify a live service, place calls or advise on veterinary care. A practice must review and approve its own information. Maintained by [SEO for Vets](https://seoforvets.co.uk/), operated by JW Digital Services Ltd.

![Complete example](docs/preview.png)

## Live demo

[Try Practice Contact Parity](https://seo-for-vets.github.io/practice-contact-parity/). The demo runs in your browser; entered data is not uploaded by the tool. GitHub provides the hosting and handles request logs.

## Start locally

Requires Node.js 22 or later. No runtime dependencies or account required.

```sh
npm ci
npm test
npm run build
npm run serve
```

Open http://127.0.0.1:4173/ for the complete local demonstration. Browser examples do not upload or persist entered data. The optional development server binds to loopback only.

## Input and output

Supply practice, branches [{branch_id,name,address,phone,opening_hours,out_of_hours_contact,out_of_hours_note,approved_on,approver}] and observations [{branch_id,page,field,value}]. Branch IDs are explicit; no records are merged by name. Synthetic demo contact strings are nondialable.

Use [examples/input.json](examples/input.json) as the complete input contract. Compare the generated [JSON result](examples/output.json), [Markdown report](examples/output.md) and [complete HTML](examples/output.html). The demo is in [demo/index.html](demo/index.html). It needs the local server for JavaScript modules. HTML reports can be opened as standalone files.

```sh
node cli.mjs examples/input.json --format json
node cli.mjs examples/input.json --format html --output report.html
node cli.mjs examples/input.json --format md --output report.md
```

This resource uses nested JSON input. See the complete example and `node cli.mjs --help`.

## Worked example

Use two clearly fictional branches. One web page has a phone-spacing difference that should compare as equal; another has the wrong branch number; a third omits the approved out-of-hours note. Use reserved/example strings for phone values so nobody can mistake the fixture for a service. No real patient, owner or staff details are included.

All supplied example records are synthetic. No clients, outcomes, current professional advice or real service availability are represented by them. Keep real records private and review output before sharing it.

## Checks

- Spacing differences compare correctly, while changed digits and extensions remain meaningful differences.
- Similar branch names never cause automatic record merging. Missing IDs require a review decision.
- Missing and conflicting out-of-hours wording stay prominent and unchanged; the checker never invents a replacement instruction.
- Source page and approved-record date remain attached to each finding. An old approval date does not become current through a rerun.
- Tests make no calls or external requests. Public output contains only synthetic nondialable contact data and safe escaped text.

The automated results and browser checks performed for this release are recorded in [verification.md](docs/verification.md). Manual screen-reader testing has not been performed. A passing automated check is not accessibility certification.

## Contribute and maintain

Use [Issues](https://github.com/SEO-For-Vets/practice-contact-parity/issues) for a reproducible bug and [Discussions](https://github.com/SEO-For-Vets/practice-contact-parity/discussions) for questions and improvements. Follow [CONTRIBUTING.md](CONTRIBUTING.md); report vulnerabilities privately using [SECURITY.md](SECURITY.md). See [CHANGELOG.md](CHANGELOG.md) for releases. Maintenance is best effort.

Code, original illustrations and synthetic fixtures are MIT licensed. There is no required website backlink when reusing the resource. Commercial brand assets and third-party material are not included.
