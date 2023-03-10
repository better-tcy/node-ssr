/**
 *
 * @param {String} html - Node层渲染的html字符串
 * @param {Object} data - 数据层返回的数据
 * @returns
 */

function entranceHtml(html, data) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <title>Vue SSR Demo</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify({ data })}
      </script>
      <script src="https://unpkg.com/vue@next"></script>
      <script type="module" src="/client.js"></script>
    </body>
  </html>
`
}

export default entranceHtml
