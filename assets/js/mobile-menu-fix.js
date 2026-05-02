(function () {
  function closeMenu() {
    document.body.classList.remove("jully-mobile-menu-open");
    var panel = document.querySelector(".jully-mobile-menu-panel");
    if (panel) {
      panel.setAttribute("aria-hidden", "true");
    }
  }

  function openMenu() {
    var panel = ensureMenu();
    if (!panel) return;
    document.body.classList.add("jully-mobile-menu-open");
    panel.setAttribute("aria-hidden", "false");
    var closeButton = panel.querySelector(".jully-mobile-menu-close");
    if (closeButton) closeButton.focus();
  }

  function ensureMenu() {
    var existing = document.querySelector(".jully-mobile-menu-panel");
    if (existing) return existing;

    var sourceMenu = document.querySelector(
      ".h-menu.has-offcanvas-mobile .colibri-menu"
    );
    if (!sourceMenu) {
      sourceMenu = document.querySelector(
        ".project-nav-links, .nav .menu, .eco-calc-nav, .topbar-nav"
      );
    }
    if (!sourceMenu) return null;

    var backdrop = document.createElement("div");
    backdrop.className = "jully-mobile-menu-backdrop";
    backdrop.addEventListener("click", closeMenu);

    var panel = document.createElement("nav");
    panel.className = "jully-mobile-menu-panel";
    panel.setAttribute("aria-hidden", "true");
    panel.setAttribute("aria-label", "Mobile menu");

    var header = document.createElement("div");
    header.className = "jully-mobile-menu-header";
    header.innerHTML =
      '<span>Menu</span><button type="button" class="jully-mobile-menu-close" aria-label="Close menu">&times;</button>';

    var menu = sourceMenu.cloneNode(true);
    menu.removeAttribute("id");
    menu.className = "jully-mobile-menu-list";

    if (!menu.querySelector("li")) {
      var list = document.createElement("ul");
      list.className = "jully-mobile-menu-list";
      Array.prototype.forEach.call(menu.querySelectorAll("a"), function (link) {
        var item = document.createElement("li");
        item.appendChild(link.cloneNode(true));
        list.appendChild(item);
      });
      menu = list;
    }

    Array.prototype.forEach.call(menu.querySelectorAll("li"), function (item) {
      var submenu = item.querySelector(":scope > ul");
      var link = item.querySelector(":scope > a");
      if (!submenu || !link) return;

      var toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "jully-submenu-toggle";
      toggle.setAttribute("aria-label", "Open submenu");
      toggle.innerHTML = "+";
      toggle.addEventListener("click", function (event) {
        event.preventDefault();
        item.classList.toggle("is-open");
        toggle.innerHTML = item.classList.contains("is-open") ? "-" : "+";
      });
      link.insertAdjacentElement("afterend", toggle);

      if (!link.getAttribute("href") || link.getAttribute("href") === "#") {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          toggle.click();
        });
      }
    });

    panel.appendChild(header);
    panel.appendChild(menu);
    document.body.appendChild(backdrop);
    document.body.appendChild(panel);

    panel
      .querySelector(".jully-mobile-menu-close")
      .addEventListener("click", closeMenu);

    Array.prototype.forEach.call(panel.querySelectorAll("a[href]"), function (
      link
    ) {
      link.addEventListener("click", function () {
        if (link.getAttribute("href") !== "#") closeMenu();
      });
    });

    return panel;
  }

  document.addEventListener(
    "click",
    function (event) {
      var target = event.target;
      var button =
        target && target.closest ? target.closest(".h-hamburger-button") : null;
      if (!button) return;
      event.preventDefault();
      event.stopPropagation();
      openMenu();
    },
    true
  );

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });

  function addSimpleMenuButtons() {
    Array.prototype.forEach.call(
      document.querySelectorAll(
        ".project-nav, .nav, .eco-calc-header-inner, .topbar-inner"
      ),
      function (nav) {
        if (
          nav.querySelector(".h-hamburger-button") ||
          !nav.querySelector(
            ".project-nav-links, .menu, .eco-calc-nav, .topbar-nav"
          )
        ) {
          return;
        }

        var button = document.createElement("button");
        button.type = "button";
        button.className = "h-hamburger-button project-mobile-menu-button";
        button.setAttribute("aria-label", "Open menu");
        button.innerHTML =
          '<span></span><span></span><span></span>';
        nav.appendChild(button);
      }
    );
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", addSimpleMenuButtons);
  } else {
    addSimpleMenuButtons();
  }
})();
