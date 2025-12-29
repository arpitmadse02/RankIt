export function goToFieldPage() {
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("ranking-parameters").classList.add("hidden");
  document.getElementById("ranking-process").classList.add("hidden");
  document.getElementById("abc").classList.add("hidden");
  document.getElementById("pdf").classList.add("hidden");
  document.getElementById("header1").classList.add("hidden");

  document.getElementById("field-page").classList.remove("hidden");
}



