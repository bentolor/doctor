import { encode } from 'html-entities';
import md = require('markdown-it');
import hljs = require('highlight.js');
import { MarkdownSettings } from '../models';
import { ShortcodesHelpers } from './ShortcodesHelpers';

export class MarkdownHelper {

  /**
   * Retrieve the JSON data for the web part
   * @param webPartTitle 
   * @param markdown 
   */
  public static async getJsonData(webPartTitle: string, markdown: string, mdOptions: MarkdownSettings | null): Promise<string> {
    const converter = md({ html: true, breaks: true, highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${hljs.highlight(lang, str, true).value}</code></pre>`;
        } catch (__) {}
      }
  
      return '<pre class="hljs"><code>' + (md as any).utils.escapeHtml(str) + '</code></pre>';
    } }).use(require('markdown-it-shortcode-tag'), await ShortcodesHelpers.get());

    const tilePh = `WEBPARTTITLE-PLACEHOLDER`;
    const markdownPh = `MARKDOWN-PLACEHOLDER`;
    const htmlPh = `HTML-PLACEHOLDER`;

    const allowHtml = mdOptions && mdOptions.allowHtml;
    const theme = mdOptions && mdOptions.theme ? mdOptions.theme.toLowerCase() : "dark";

    let wpData = `'{"title":"${tilePh}","serverProcessedContent": { ${allowHtml ? `"htmlStrings": \{ "html": "${htmlPh}" },` : ""}"searchablePlainTexts": {"code": "${markdownPh}"}},"dataVersion": "2.0","properties": {"displayPreview": true,"lineWrapping": true,"miniMap": {"enabled": false},"previewState": "Show","theme": "${theme === "dark" ? "Monokai" : "Base16Light"}"}}'`;

    // Update the quotes for Windows
    const isWIn = process.platform === "win32";
    if (isWIn) {
      wpData = wpData.replace(/\"/g, `""`).replace(/\'/g, `"`);
    }
    const mdConverted = this.parseMarkdown(markdown, isWIn);
    wpData = wpData.replace(tilePh, webPartTitle).replace(markdownPh, encode(mdConverted));

    if (allowHtml) {
      let htmlMarkup = converter.render(markdown);
      htmlMarkup = `<style>${this.getStyles(theme === "light")}</style>${htmlMarkup}`;
      htmlMarkup = htmlMarkup.replace(/\r/g, '\\r').replace(/\n/g, '\\n').replace(/\"/g, `\\\"`);
      wpData = wpData.replace(htmlPh, htmlMarkup);
    }

    return wpData;
  }

  /**
   * make the markdown ready for cross-platform publishing
   * @param markdown 
   * @param isWin 
   */
  private static parseMarkdown(markdown: string, isWin: boolean = false) {
    markdown = markdown.replace(/\r/g, '~r~').replace(/\n/g, '~n~');
    markdown = markdown.replace(/\\/g, `\\\\`);
    markdown = markdown.replace(/</g, `&lt;`);
    markdown = markdown.replace(/>/g, `&gt;`);
    markdown = markdown.replace(/~r~/g, '\\r').replace(/~n~/g, '\\n');
    if (isWin) {
      return markdown.replace(/\"/g, `&quot;`);
    }
    return markdown.replace(/"/g, `&quot;`);
  }

  /**
   * Retrieve the CSS styles for code highlighting
   * @param light 
   */
  private static getStyles(light: boolean = false) {
    if (light) {
      return `.hljs {
        display: block;
        overflow-x: auto;
        padding: 0.5em;
        color: #333;
        background: #f8f8f8;
      }
      
      .hljs-comment,
      .hljs-quote {
        color: #998;
        font-style: italic;
      }
      
      .hljs-keyword,
      .hljs-selector-tag,
      .hljs-subst {
        color: #333;
        font-weight: bold;
      }
      
      .hljs-number,
      .hljs-literal,
      .hljs-variable,
      .hljs-template-variable,
      .hljs-tag .hljs-attr {
        color: #008080;
      }
      
      .hljs-string,
      .hljs-doctag {
        color: #d14;
      }
      
      .hljs-title,
      .hljs-section,
      .hljs-selector-id {
        color: #900;
        font-weight: bold;
      }
      
      .hljs-subst {
        font-weight: normal;
      }
      
      .hljs-type,
      .hljs-class .hljs-title {
        color: #458;
        font-weight: bold;
      }
      
      .hljs-tag,
      .hljs-name,
      .hljs-attribute {
        color: #000080;
        font-weight: normal;
      }
      
      .hljs-regexp,
      .hljs-link {
        color: #009926;
      }
      
      .hljs-symbol,
      .hljs-bullet {
        color: #990073;
      }
      
      .hljs-built_in,
      .hljs-builtin-name {
        color: #0086b3;
      }
      
      .hljs-meta {
        color: #999;
        font-weight: bold;
      }
      
      .hljs-deletion {
        background: #fdd;
      }
      
      .hljs-addition {
        background: #dfd;
      }
      
      .hljs-emphasis {
        font-style: italic;
      }
      
      .hljs-strong {
        font-weight: bold;
      }`;
    }

    return `.hljs {
      display: block;
      overflow-x: auto;
      padding: 0.5em;
      background: #272822;
      color: #ddd;
    }
    
    .hljs-tag,
    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-literal,
    .hljs-strong,
    .hljs-name {
      color: #f92672;
    }
    
    .hljs-code {
      color: #66d9ef;
    }
    
    .hljs-class .hljs-title {
      color: white;
    }
    
    .hljs-attribute,
    .hljs-symbol,
    .hljs-regexp,
    .hljs-link {
      color: #bf79db;
    }
    
    .hljs-string,
    .hljs-bullet,
    .hljs-subst,
    .hljs-title,
    .hljs-section,
    .hljs-emphasis,
    .hljs-type,
    .hljs-built_in,
    .hljs-builtin-name,
    .hljs-selector-attr,
    .hljs-selector-pseudo,
    .hljs-addition,
    .hljs-variable,
    .hljs-template-tag,
    .hljs-template-variable {
      color: #a6e22e;
    }
    
    .hljs-comment,
    .hljs-quote,
    .hljs-deletion,
    .hljs-meta {
      color: #75715e;
    }
    
    .hljs-keyword,
    .hljs-selector-tag,
    .hljs-literal,
    .hljs-doctag,
    .hljs-title,
    .hljs-section,
    .hljs-type,
    .hljs-selector-id {
      font-weight: bold;
    }`;
  }
}