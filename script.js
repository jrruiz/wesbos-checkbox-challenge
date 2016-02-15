(function init(window, document) {
  var shiftKey = false;
  var checkboxes;
  var lastCheckedIndex;

  window.addEventListener('load', function onLoadHandler() {
    var checkboxNodeList = document.querySelectorAll('input[type="checkbox"]');
    checkboxes = Array.prototype.slice.call(checkboxNodeList);
  });

  document.addEventListener('change', function changeHandler(event) {
    var target = event.target;

    if (target.tagName.toLowerCase() == 'input' && target.type == 'checkbox') {
      var targetIndex = checkboxes.indexOf(target);

      if (target.checked && shiftKey && lastCheckedIndex != null) {
        checkboxes
          .slice(
            Math.min(targetIndex, lastCheckedIndex) + 1,
            Math.max(targetIndex, lastCheckedIndex)
          )
          .forEach(function(item) {
            item.checked = true;
          });
      }
      
      lastCheckedIndex = target.checked ? targetIndex : null;
    }
  });

  document.addEventListener('keydown', function keydownHandler(event) {
    if (event.keyCode == 16) {
      shiftKey = true;
    }
  });

  document.addEventListener('keyup', function keyupHandler(event) {
    if (event.keyCode == 16) {
      shiftKey = false;
    }
  });
})(window, document);
