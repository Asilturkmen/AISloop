// Capture screenshots of web pages for research and review boards.
//
//   node tools/capture.mjs --url <url> --out <path-without-extension>
//        [--widths 1440x900,390x844] [--full] [--scale 2] [--wait 2000]
//        [--el "<css selector>"] [--dark] [--hide "<css selector>,<css selector>"]
//        [--browser "<path to chrome/edge>"]
//
// Writes <out>-<width>.png for each size (or <out>-<width>-el.png with --el) and prints
// one JSON line per shot: file, url, title, font actually used, console errors.
// Third-party screenshots belong in research/_private/ (ignored by git).
import { chromium } from 'playwright-core'
import { existsSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

const argv = process.argv.slice(2)
const args = {}
for (let i = 0; i < argv.length; i++) {
  if (!argv[i].startsWith('--')) continue
  const next = argv[i + 1]
  args[argv[i].slice(2)] = next === undefined || next.startsWith('--') ? 'true' : next
}
if (!args.url || !args.out) {
  console.error('usage: node tools/capture.mjs --url <url> --out <path> [options]')
  process.exit(2)
}

const candidates = [
  args.browser,
  process.env.CAPTURE_BROWSER,
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
].filter(Boolean)
const executablePath = candidates.find((p) => existsSync(p))
if (!executablePath) {
  console.error('no Chrome/Edge found; pass --browser <path>')
  process.exit(2)
}

const widths = (args.widths ?? '1440x900').split(',').map((s) => s.split('x').map(Number))
const scale = Number(args.scale ?? 1)
const wait = Number(args.wait ?? 2000)
mkdirSync(dirname(args.out), { recursive: true })

const browser = await chromium.launch({ executablePath })
try {
  for (const [width, height] of widths) {
    const ctx = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: scale,
      colorScheme: args.dark === 'true' ? 'dark' : 'light',
      isMobile: width < 700,
      hasTouch: width < 700,
      locale: 'en-US',
    })
    const page = await ctx.newPage()
    const errors = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 200)))
    try {
      await page.goto(args.url, { waitUntil: 'domcontentloaded', timeout: 60000 })
      await page.waitForLoadState('load', { timeout: 30000 }).catch(() => {})
      await page.waitForTimeout(wait)
      if (args.hide) {
        await page.addStyleTag({ content: `${args.hide} { display: none !important; }` })
      }
      const info = await page.evaluate(() => {
        const el = document.querySelector('h1, h2, p, li') || document.body
        return {
          title: document.title,
          font: getComputedStyle(el).fontFamily.slice(0, 100),
          loadedFonts: [...new Set([...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family))].slice(0, 6),
        }
      })
      let file = `${args.out}-${width}.png`
      if (args.el) {
        file = `${args.out}-${width}-el.png`
        await page.locator(args.el).first().screenshot({ path: file })
      } else {
        await page.screenshot({ path: file, fullPage: args.full === 'true' })
      }
      console.log(JSON.stringify({ ok: true, file, url: args.url, width, ...info, errors: errors.slice(0, 3) }))
    } catch (e) {
      console.log(JSON.stringify({ ok: false, url: args.url, width, error: e.message.split('\n')[0] }))
    }
    await ctx.close()
  }
} finally {
  await browser.close()
}
