import JsxDom from 'jsx-dom'
import morphdom from 'morphdom'

const root = document.getElementById('root')

if (root) {
  morphdom(root, <h1>A</h1>)
}
