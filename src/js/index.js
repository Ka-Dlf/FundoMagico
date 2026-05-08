document.addEventListener("DOMContentLoaded", function () {
  function setLoading(isLoading) {
    const buttonSpan = document.querySelector(".btn-magic span");
    if (isLoading) {
      buttonSpan.innerHTML = "Gerando Background...";
    } else {
      buttonSpan.innerHTML = "Gerar Background Mágico";
    }
  }
  function applyGeneratedPreview(html, css) {
    const preview = document.getElementById("preview-section");
    preview.style.display = "block";
    preview.innerHTML = html;

    const previousStyle = document.getElementById("dynamic-style");
    if (previousStyle) previousStyle.remove();

    if (css) {
      const styleElement = document.createElement("style");
      styleElement.id = "dynamic-style";
      styleElement.textContent = css;
      document.head.appendChild(styleElement);
    }
  }
  const form = document.querySelector(".form-group");
  const textarea = document.getElementById("description");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const description = textarea.value.trim();

    if (!description) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://k-dlf.app.n8n.cloud/webhook/b0790620-8a4f-4d65-b33d-fce7eefb01bf",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ description }),
        },
      );

      const data = await response.json();
      console.log(data);

      const htmlCode = document.getElementById("html-code");
      const cssCode = document.getElementById("css-code");

      htmlCode.textContent = data.html || "";
      cssCode.textContent = data.css || "";

      applyGeneratedPreview(data.html, data.css);
    } catch (error) {
      console.error("erro ao gerar o fundo", error);

      htmlCode.textContent = "não consegui gerar o HTML. Tente novamente.";

      cssCode.textContent = "não consegui gerar o CSS. Tente novamente.";

      preview.innerHTML = "";
      console.log(error);
    } finally {
      setLoading(false);
    }
  });
});
