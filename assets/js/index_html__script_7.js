(function () {
          function setHeaderTopSpacing() {

              // forEach polyfill
              if(!NodeList.prototype.forEach){
                  NodeList.prototype.forEach = function (callback) {
                      for(var i=0;i<this.length;i++){
                          callback.call(this,this.item(i));
                      }
                  }
              }

            // '[data-colibri-component="navigation"][data-overlap="true"]' selector is backward compatibility
            var navigation = document.querySelector('[data-colibri-navigation-overlap="true"], [data-colibri-component="navigation"][data-overlap="true"]')
            if (navigation) {
              var els = document
              .querySelectorAll('.h-navigation-padding');
              if (els.length) {
                els.forEach(function (item) {
                  item.style.paddingTop = navigation.offsetHeight + "px";
                });
              }
            }
          }
          setHeaderTopSpacing();
        })();
