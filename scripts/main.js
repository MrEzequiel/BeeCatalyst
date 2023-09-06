const extension = {
  isFocusMode: false,

  updateFocusMode() {
    document.querySelector("#focus").checked = this.isFocusMode;
  },

  onFocusModeChange(e) {
    if (e.target.checked) {
      document.querySelector(".blocks").classList.add("__beecatalyst-focus");
      this.isFocusMode = true;
      this.updateFocusMode();
      localStorage.setItem("focus", "true");
    } else {
      document.querySelector(".blocks").classList.remove("__beecatalyst-focus");
      this.isFocusMode = false;
      this.updateFocusMode();
      localStorage.setItem("focus", "false");
    }
  },

  focusChange() {
    const focus = document.querySelector("#focus");

    focus.addEventListener("change", this.onFocusModeChange);
  },

  addShutcutListener() {
    document.addEventListener("keydown", e => {
      if (e.key === "q" && e.ctrlKey) {
        this.onFocusModeChange({ target: { checked: !this.isFocusMode } });
      }
    });
  },

  init() {
    const container = document.createElement("div");
    container.id = "__beecatalyst-container-beecatalyst__";
    container.innerHTML = `
      <input type="checkbox" id="focus" name="focus" />
      <label for="focus">Focus</label>
    `;

    document.querySelector(".content-big.page").appendChild(container);
    this.addShutcutListener();
    this.focusChange();
    this.onFocusModeChange({
      target: { checked: localStorage.getItem("focus") == "true" },
    });
  },
};

if (
  window.location.pathname.search("/problems/view") !== -1 ||
  window.location.pathname.search("/challenges/view/") !== -1
) {
  extension.init();
}
