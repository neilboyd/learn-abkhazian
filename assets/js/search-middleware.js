const searchMiddlewareModule = (function () {
  const templateMiddleware = function (prop, value, template, query) {
    if (prop === 'categories') {
      if (value === '') {
        return '';
      } else {
        return `<div class="me-sm-4"><i class="far fa-folder fa-fw"></i>${value}</div>`;
      }
    }

    if (prop === 'tags') {
      if (value === '') {
        return '';
      } else {
        return `<div><i class="fa fa-tag fa-fw"></i>${value}</div>`;
      }
    }

    if (prop === 'content') {
      return HighlightMatchedText(value, query);
    }
  };

  return {
    templateMiddleware,
  };
})();
