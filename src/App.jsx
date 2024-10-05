import { useState } from 'react';
import { marked } from "https://cdn.skypack.dev/marked@4.0.0";
import Prism from "https://cdn.skypack.dev/prismjs@1.29.0";
import './App.css'

marked.setOptions({
  breaks: true,
  highlight: function (code) {
    return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  }
});

const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}</a>`;
};

const defaultContent =  `
# Header 1

## Header 2

[Link](https://www.example.com)

Inline \`code\`

\`\`\`
Code block
\`\`\`

- List item

> Blockquote

![Alt text](https://via.placeholder.com/150)

**Bold text**
`;

const App = () => {
  const [content, setContent] = useState(defaultContent);
  
  const handleContent = (event) => {
    setContent(event.target.value);
  }
  
  return (
    <div className="container">
      <div className="editorAndLabel">
        <p className="editor_label"><i className="fa fa-free-code-camp" /> Editor</p>
        <textarea id="editor" onChange={handleContent} cols="60" rows="10" value={content}></textarea>
      </div>
      <div className="previewerAndLabel">
        <p className="previewer_label"><i className="fa fa-free-code-camp" /> Previewer</p>
      <div id="preview" dangerouslySetInnerHTML={{ __html: marked(content, { renderer }) }} />
      </div>
    </div>
  );
}

export default App
