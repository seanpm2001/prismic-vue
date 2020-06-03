import PrismicDOM, { RichText } from 'prismic-dom';
import prismicJS from 'prismic-javascript';

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var Embed = {
  name: 'PrismicEmbed',
  functional: true,
  props: {
    field: {
      type: Object,
      required: true
    },
    wrapper: {
      type: String,
      required: false,
      "default": 'div'
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;
    var field = props.field,
        wrapper = props.wrapper;

    if (!field || !field.html) {
      return null;
    }

    var embedUrl = field.embed_url,
        type = field.type,
        providerName = field.provider_name;

    var attrs = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, data.attrs), embedUrl && {
      'data-oembed': embedUrl
    }), type && {
      'data-oembed-type': type
    }), providerName && {
      'data-oembed-provider': providerName
    });

    return h(wrapper, _objectSpread2(_objectSpread2({}, Object.assign(data, {
      attrs: attrs
    })), {}, {
      domProps: {
        innerHTML: field.html
      }
    }));
  }
};

var Image = {
  name: 'PrismicImage',
  functional: true,
  props: {
    field: {
      type: Object,
      required: true
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data;
    var _props$field = props.field,
        url = _props$field.url,
        alt = _props$field.alt,
        copyright = _props$field.copyright;
    return h('img', Object.assign(data, {
      attrs: _objectSpread2(_objectSpread2({}, data.attrs), {}, {
        src: url,
        alt: alt,
        copyright: copyright
      })
    }));
  }
};

var Link = (function (_ref) {
  var _ref$component = _ref.component,
      component = _ref$component === void 0 ? 'a' : _ref$component;
  return {
    name: 'PrismicLink',
    functional: true,
    props: {
      field: {
        type: Object,
        required: true
      },
      linkResolver: {
        type: Function,
        required: false,
        "default": function _default() {
          return null;
        }
      }
    },
    render: function render(h, _ref2) {
      var props = _ref2.props,
          data = _ref2.data,
          children = _ref2.children,
          parent = _ref2.parent;
      var field = props.field,
          linkResolver = props.linkResolver;

      if (!field) {
        return null;
      }

      var url = parent.$prismic ? parent.$prismic.asLink(field, linkResolver) : PrismicDOM.Link.url(field, linkResolver);

      if (url.indexOf('/') === 0) {
        data.props = data.props || {};
        data.props.to = url;
        return h(component, data, children);
      }

      data.attrs = _objectSpread2(_objectSpread2({}, data.attrs), {}, {
        href: url
      }, field.target && {
        target: field.target,
        rel: 'noopener'
      });
      return h('a', data, children);
    }
  };
});

var RichText$1 = {
  name: 'PrismicRichText',
  functional: true,
  props: {
    field: {
      type: Array,
      required: true
    },
    htmlSerializer: {
      type: Function,
      required: false
    },
    wrapper: {
      type: String,
      required: false,
      "default": 'div'
    }
  },
  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        children = _ref.children,
        parent = _ref.parent;
    var field = props.field,
        htmlSerializer = props.htmlSerializer,
        wrapper = props.wrapper;
    var innerHTML = RichText.asHtml(field, parent.$prismic.linkResolver, htmlSerializer || parent.$prismic.htmlSerializer);
    return h(wrapper, _objectSpread2(_objectSpread2({}, data), {}, {
      domProps: {
        innerHTML: innerHTML
      }
    }));
  }
};

var NuxtLink = Link({
  component: 'nuxt-link'
});
var VueRouterLink = Link({
  component: 'router-link'
});
var exp = {
  common: {
    Embed: Embed,
    Image: Image,
    RichText: RichText$1
  },
  nuxt: {
    Link: NuxtLink
  },
  vueRouter: {
    Link: VueRouterLink
  }
};

function asHtml(richText, linkResolver, htmlSerializer) {
  if (richText) {
    return PrismicDOM.RichText.asHtml(richText, linkResolver, htmlSerializer);
  }
}
function asText(richText, joinString) {
  if (richText) {
    return PrismicDOM.RichText.asText(richText, joinString);
  }

  return '';
}
function asLink(link, linkResolver) {
  if (link) {
    return PrismicDOM.Link.url(link, linkResolver);
  }
}
function asDate(date) {
  if (date) {
    return PrismicDOM.Date(date);
  }
}

function attachMethods(Vue, options) {
  Vue.prototype.$prismic.asHtml = function (richText, linkResolver, htmlSerializer) {
    return asHtml(richText, linkResolver || options.linkResolver, htmlSerializer || options.htmlSerializer);
  };

  Vue.prototype.$prismic.asText = asText;
  Vue.prototype.$prismic.richTextAsPlain = asText;
  Vue.prototype.$prismic.asDate = asDate;

  Vue.prototype.$prismic.asLink = function (link, linkResolver) {
    return asLink(link, linkResolver || options.linkResolver);
  };
}

var PrismicVue = {
  install: function install(Vue, options) {
    var _options$linkType = options.linkType,
        linkType = _options$linkType === void 0 ? 'vueRouter' : _options$linkType;
    Vue.prototype.$prismic = prismicJS;
    Vue.prototype.$prismic.endpoint = options.endpoint;
    Vue.prototype.$prismic.linkResolver = options.linkResolver;
    Vue.prototype.$prismic.htmlSerializer = options.htmlSerializer;
    Vue.prototype.$prismic.client = prismicJS.client(options.endpoint, options.apiOptions);
    attachMethods(Vue, options);

    var components = _objectSpread2(_objectSpread2({}, exp.common), exp[linkType]);
    /**
     * Global registration of common components + stack specific components.
     * Currently, only Nuxt links differ though. Use `linkType: 'nuxt'` in that case.
     */


    Object.entries(components).forEach(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          _ = _ref2[0],
          c = _ref2[1];

      Vue.component(c.name, c);
    });
  }
};

export default PrismicVue;
