(function () {
          var c = document.currentScript.parentNode;
          setTimeout(function () {
            var x = new window.XMLHttpRequest();
            x.onload = function () {
              if (this.status == 200 && this.responseText == "f")
                c.outerHTML = "";
            };
            x.open("GET.html", "?seraph_accel_gbnr", true);
            x.send();
          }, 0);
        })();
