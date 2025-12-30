export function goToFieldPage() {
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("field-page").classList.remove("hidden");

  document.getElementById("header1").classList.add("hidden");
  document.getElementById("header-secondary").classList.remove("hidden");

  document.getElementById("ranking-parameters").classList.add("hidden");
  document.getElementById("ranking-process").classList.add("hidden");
  document.getElementById("abc").classList.add("hidden");
  document.getElementById("pdf").classList.add("hidden");
}

export function goBack() {
  const rankingPage = document.getElementById("ranking-page");
  const fieldPage = document.getElementById("field-page");

  if (!rankingPage.classList.contains("hidden")) {
    // Ranking → Field
    rankingPage.classList.add("hidden");
    fieldPage.classList.remove("hidden");
  } else {
    // Field → Landing
    fieldPage.classList.add("hidden");
    document.getElementById("landing-page").classList.remove("hidden");

    document.getElementById("header-secondary").classList.add("hidden");
    document.getElementById("header1").classList.remove("hidden");

    document.getElementById("ranking-parameters").classList.remove("hidden");
    document.getElementById("ranking-process").classList.remove("hidden");
    document.getElementById("abc").classList.remove("hidden");
    document.getElementById("pdf").classList.remove("hidden");
  }
}
