(function () {
  function makeMessage(form) {
    var existing = form.querySelector(".form-feedback-message");
    if (existing) return existing;

    var message = document.createElement("div");
    message.className = "form-feedback-message";
    message.setAttribute("role", "status");
    message.setAttribute("aria-live", "polite");
    form.appendChild(message);
    return message;
  }

  function showToast(title, text, type) {
    var toast = document.querySelector(".site-form-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "site-form-toast";
      toast.setAttribute("role", "status");
      toast.setAttribute("aria-live", "polite");
      document.body.appendChild(toast);
    }

    toast.className = "site-form-toast is-visible is-" + type;
    toast.innerHTML =
      "<strong>" + escapeHtml(title) + "</strong><span>" + escapeHtml(text) + "</span>";

    window.clearTimeout(toast._timer);
    toast._timer = window.setTimeout(function () {
      toast.classList.remove("is-visible");
    }, 6500);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function setBusy(form, busy) {
    var button = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!button) return;

    if (busy) {
      button.dataset.originalText = button.textContent || button.value || "Submit";
      button.disabled = true;
      if (button.tagName === "INPUT") button.value = "Sending...";
      else button.textContent = "Sending...";
    } else {
      button.disabled = false;
      if (button.dataset.originalText) {
        if (button.tagName === "INPUT") button.value = button.dataset.originalText;
        else button.textContent = button.dataset.originalText;
      }
    }
  }

  async function submitForm(form) {
    var message = makeMessage(form);
    message.className = "form-feedback-message is-info";
    message.textContent = "Sending...";
    setBusy(form, true);

    try {
      var response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
          "X-Requested-With": "fetch",
        },
      });
      var data = await response.json();
      var type = response.ok && data.ok !== false ? "success" : "error";
      var title = data.title || (type === "success" ? "Sent" : "Could not send");
      var text = data.message || "Please try again.";

      message.className = "form-feedback-message is-" + type;
      message.textContent = text;
      showToast(title, text, type);

      if (type === "success") {
        form.reset();
      }
    } catch (error) {
      var text = "Please check your connection and try again.";
      message.className = "form-feedback-message is-error";
      message.textContent = text;
      showToast("Could not send", text, "error");
    } finally {
      setBusy(form, false);
    }
  }

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || !form.matches) return;

    var isNewsletter = form.matches(".newsletter-signup-form");
    var action = form.getAttribute("action") || "";
    var isContact = action.indexOf("send-form.php") !== -1;

    if (!isNewsletter && !isContact) return;

    event.preventDefault();
    submitForm(form);
  });

  document.addEventListener(
    "submit",
    function (event) {
      var form = event.target;
      if (!form || !form.matches) return;
      if (!form.matches('[data-form-feedback], .newsletter-signup-form')) return;

      var message = makeMessage(form);
      if (!message.textContent) {
        message.className = "form-feedback-message is-info";
        message.textContent = "Sending...";
      }
    },
    true
  );
})();
