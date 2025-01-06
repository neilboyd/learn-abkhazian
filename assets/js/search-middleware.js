const searchMiddlewareModule = (function () {

    const templateMiddleware = function(prop, value, template, query) {
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
        // for exact search highlight full text, otherwise highlight each word
        let results = query.startsWith('"') && query.endsWith('"')
          ? [query.substring(1, query.length - 1)]
          : query.split(' ');
        results.forEach(result => {
          let j = 0;
          while (true) {
            j = value.toLowerCase().indexOf(result.toLowerCase(), j);
            if (j < 0) {
              break;
            }
            let k = j + result.length;
            value = value.substring(0, j) + '<b>' + value.substring(j, k) + '</b>' + value.substring(k);
            j += 4; // move past the previous match
          }
        });
        let i = value.indexOf('<b>');
        if (i > 100) {
          // trim start so that match is visible
          value = value.substring(i - 100);
        }
        if (value.length > 200) {
          // trim the amount of text shown
          value = value.substring(0, 200 + query.length);
        }
        return value;
      }
    }
  
    return {
      templateMiddleware
    };
  })();