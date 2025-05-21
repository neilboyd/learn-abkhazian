const searchMiddlewareModule = (function () {
  const templateMiddleware = function (prop, value, template, query) {
    if (prop === 'content') {
      return HighlightMatchedText(value, query);
    }
  };

  return {
    templateMiddleware,
  };
})();
