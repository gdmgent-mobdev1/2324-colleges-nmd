const $settings = document.getElementById("settings");
const $quiz = document.getElementById("quiz");
const $result = document.getElementById("result");

let currentView: "quiz" | "result" | "settings" = "settings";

const init = () => {
  showUI();
};

const showUI = () => {
  if (currentView === "quiz") {
    $quiz?.classList.remove("hidden");
    $settings?.classList.add("hidden");
    $result?.classList.add("hidden");
    // todo
  } else if (currentView === "settings") {
    $quiz?.classList.add("hidden");
    $settings?.classList.remove("hidden");
    $result?.classList.add("hidden");

    // todo
  } else if (currentView === "result") {
    $quiz?.classList.add("hidden");
    $settings?.classList.add("hidden");
    $result?.classList.remove("hidden");
  }
};

export { init };
