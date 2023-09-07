class Extension {
  constructor() {
    this.isFocusMode = false;
    this.container = this.createContainer();
    this.addEventListeners();
  }

  createContainer() {
    const container = document.createElement("div");
    container.id = "__beecatalyst-container-beecatalyst__";
    container.innerHTML = `
      <input type="checkbox" id="focus" name="focus" />
      <label for="focus">Focus</label>
    `;
    return container;
  }

  updateFocusMode() {
    document.querySelector("#focus").checked = this.isFocusMode;
    localStorage.setItem("focus", this.isFocusMode.toString());
    document
      .querySelector(".blocks")
      .classList.toggle("__beecatalyst-focus", this.isFocusMode);
  }

  onFocusModeChange(e) {
    this.isFocusMode = e.target.checked;
    this.updateFocusMode();
  }

  focusChange() {
    const focus = document.querySelector("#focus");
    focus.addEventListener("change", this.onFocusModeChange.bind(this));
  }

  addShortcutListener() {
    document.addEventListener("keydown", e => {
      if (e.key === "q" && e.ctrlKey) {
        this.onFocusModeChange({ target: { checked: !this.isFocusMode } });
      }
    });
  }

  addCopyButtonToTableCells() {
    const iframe = document.querySelector("iframe");
    if (iframe) {
      const styles = document.createElement("style");
      styles.innerHTML = `
        tbody > tr > td {
          position: relative;
        }

        tbody > tr > td:hover #__beecatalyst-button {
          opacity: 1;
          transform: scale(1.0);
        }

        #__beecatalyst-button {
          border: #bbb solid 1px;
          border-radius: 3px;
          font-size: 8px;
          padding: 4px 8px;
          text-transform: uppercase;
          position: absolute;
          right: 4px;
          top: 4px;
          display: flex;
          align-items: center;
          justify-content: end;
          cursor: pointer;
          font-size: 12px;
          opacity: 0;
          transform: scale(0.9);
          transition: all 200ms ease;
        }

        #__beecatalyst-button:hover {
          background-color: rgb(82, 29, 105);
          border-color: rgb(125, 44, 161);
          color: rgb(232, 230, 227);
        }
      `;
      iframe.contentDocument.body.append(styles);

      [...iframe.contentDocument.querySelectorAll("tbody > tr > td")].forEach(
        td => {
          const button = document.createElement("button");
          button.id = "__beecatalyst-button";
          button.innerText = "copiar";
          td.append(button);
          button.addEventListener("click", e => {
            navigator.clipboard.writeText(td.querySelector("p").innerText);
          });
        },
      );
    }
  }

  addEventListeners() {
    this.container.addEventListener(
      "change",
      this.onFocusModeChange.bind(this),
    );
    this.addShortcutListener();
  }

  init() {
    const contentBigPage = document.querySelector(".content-big.page");
    if (contentBigPage) {
      contentBigPage.appendChild(this.container);
      this.focusChange();
      this.isFocusMode = localStorage.getItem("focus") === "true";
      this.updateFocusMode();
    }

    this.addCopyButtonToTableCells();
  }
}

const isProblemView = window.location.pathname.includes("/problems/view");
const isChallengeView = window.location.pathname.includes("/challenges/view/");

if (isProblemView || isChallengeView) {
  const extension = new Extension();
  extension.init();
}
