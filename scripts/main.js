class Focus {
  constructor() {
    this.isFocusMode = false;
    this.container = this.createContainer();
  }

  updateFocusMode() {
    this.container.classList.toggle("active", this.isFocusMode);
    document
      .querySelector(".blocks")
      .classList.toggle("__beecatalyst-focus", this.isFocusMode);
  }

  createContainer() {
    const container = document.createElement("a");
    container.role = "button";
    container.id = "__beecatalyst-container";
    container.innerText = "Focus Mode";
    container.title = "Ctrl + Q";
    return container;
  }

  onFocusModeChange() {
    this.isFocusMode = !this.isFocusMode;
    this.updateFocusMode();
  }

  focusChange() {
    this.container.addEventListener("click", () => this.onFocusModeChange());
  }

  addShortcutListener() {
    document.addEventListener("keydown", e => {
      if (e.key === "q" && e.ctrlKey) {
        this.onFocusModeChange();
      }
    });
  }

  init() {
    const problemActions = document.querySelector(".problem-actions");
    if (problemActions) {
      problemActions.appendChild(this.container);
      this.focusChange();
      this.addShortcutListener();
    }
  }
}

class CopyOutputAndInput {
  constructor() {
    this.styles = `
      tbody > tr > td {
        position: relative;
      }

      tbody > tr > td:hover .beecatalyst-button {
        opacity: 1;
        transform: scale(1.0);
      }

      .beecatalyst-button {
        border: #bbb solid 1px;
        border-radius: 3px;
        font-size: 12px;
        padding: 4px 8px;
        text-transform: uppercase;
        position: absolute;
        right: 4px;
        top: 4px;
        display: flex;
        align-items: center;
        justify-content: end;
        cursor: pointer;
        opacity: 0;
        transform: scale(0.9);
        transition: all 200ms ease;
      }

      .beecatalyst-button:hover {
        background-color: rgb(82, 29, 105);
        border-color: rgb(125, 44, 161);
        color: rgb(232, 230, 227);
      }
    `;
  }

  addCopyButtonToTableCell(td) {
    const button = document.createElement("button");
    button.classList.add("beecatalyst-button");
    button.innerText = "Copiar";
    td.appendChild(button);

    button.addEventListener("click", () => {
      const paragraphs = [...td.querySelectorAll("p")];
      let text = paragraphs.map(paragraph => paragraph.innerText).join("\n");
      navigator.clipboard.writeText(text);
    });
  }

  addStylesToDocument(iframeDocument) {
    const stylesElement = document.createElement("style");
    stylesElement.innerHTML = this.styles;
    iframeDocument.body.appendChild(stylesElement);
  }

  addCopyButtonsToTableCells(iframeDocument) {
    const tableCells = iframeDocument.querySelectorAll("tbody > tr > td");
    tableCells.forEach(td => {
      this.addCopyButtonToTableCell(td);
    });
  }

  init() {
    const iframe = document.querySelector("iframe");
    if (iframe && iframe.contentDocument) {
      const iframeDocument = iframe.contentDocument;
      this.addStylesToDocument(iframeDocument);
      this.addCopyButtonsToTableCells(iframeDocument);
    }
  }
}

class Extension {
  init() {
    const isProblemView = window.location.pathname.includes("/problems/view");
    const isChallengeView =
      window.location.pathname.includes("/challenges/view/");

    if (isProblemView || isChallengeView) {
      const focus = new Focus();
      const copyOutputAndInput = new CopyOutputAndInput();
      focus.init();
      copyOutputAndInput.init();
    }
  }
}

const extension = new Extension();
extension.init();
