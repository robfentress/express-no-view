/*@license
ARIA Accordion Module 3.0 for Apex 4X
Author: Bryan Garaventa (https://www.linkedin.com/in/bgaraventa)
Home: WhatSock.com  :  Download: https://github.com/whatsock/apex
License: MIT (https://opensource.org/licenses/MIT)
*/

(function() {
  if (!("setAccordion" in $A)) {
    $A.import("RovingTabIndex", {
      name: "AccordionModule",
      props: props,
      once: true,
      call: function(props) {
        $A.addWidgetProfile("Accordion", {
          configure: function(dc) {
            return {
              exposeBounds: true,
              exposeHiddenClose: false,
              ariaControls: true,
              ariaLabelledby: true,
              isToggle: false,
              allowMultiple: false,
              escToClose: false,
              returnFocus: false,
              click: function(ev, dc) {
                ev.stopPropagation();
              },
              onCreate: function(dc) {
                $A.setAttr(dc.trigger, "aria-expanded", "false");
              },
              afterRender: function(dc, container) {
                if (dc.trackPage) $A.setPage(dc.id);
              }
            };
          },
          role: function(dc) {
            return {
              role: "region"
            };
          },
          duringRender: function(dc, container) {
            $A.setAttr(dc.triggerNode, "aria-expanded", "true");
          },
          beforeRemove: function(dc, container) {
            $A.setAttr(dc.triggerNode, "aria-expanded", "false");
          }
        });

        $A.extend({
          setAccordion: function(o, config) {
            if (this._4X) {
              config = o;
              o = this._X;
            }

            if ($A.isPlainObject(o)) {
              config = o;
              o = config.trigger || config.content || null;
            }
            if (!o) return null;
            var triggers = null;

            if ($A.isArray(o)) triggers = o;
            else if ($A.isStr(o))
              triggers = (config.context || document).querySelectorAll(o);

            var dcArray = [],
              active = [],
              startIndex = 0;

            $A.loop(triggers, function(i, o) {
              if (
                !$A.isNative(o) &&
                ["button", "link"].indexOf(
                  $A.getAttr(o, "role").toLowerCase() || "false"
                ) === -1
              )
                $A.setAttr(o, "role", "button");
              $A.svgFix(o);
              var panelContainer = $A.get($A.getAttr(o, "data-root")),
                dc = $A.toDC(
                  o,
                  $A.extend(
                    {
                      widgetType: "Accordion",
                      root: panelContainer
                    },
                    config || {}
                  )
                );
              dcArray.push(dc);
              if ($A.hasAttr(o, "data-active")) {
                active.push(dc);
                startIndex = i;
              }
            });

            $A.map({
              siblings: dcArray
            });
            $A.updateDisabled(dcArray);

            if (config.singleTabStop)
              var RTI = new $A.RovingTabIndex(
                $A.extend(
                  {
                    nodes: triggers,
                    startIndex: startIndex,
                    orientation: 2,
                    autoSwitch: config.autoSwitch || "full",
                    autoLoop: true,
                    onClick: function(ev, triggerNode, RTI, DC) {
                      DC.render();
                      ev.preventDefault();
                    },
                    onSpace: function(ev, triggerNode, RTI, DC) {
                      DC.render();
                      ev.preventDefault();
                    },
                    onEnter: function(ev, triggerNode, RTI, DC) {
                      DC.render();
                      ev.preventDefault();
                    }
                  },
                  config.extendRTI || {}
                )
              );

            if (!$A.hasHash(dcArray))
              $A.loop(
                active,
                function(i, dc) {
                  dc.render();
                },
                "array"
              );

            return dcArray.length === 1 ? dcArray[0] : dcArray;
          }
        });
      }
    });
  }
})();
