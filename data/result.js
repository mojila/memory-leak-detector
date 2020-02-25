var datalayerClientWeb = function(n) {
  "use strict";

  function c(n) {
    return n instanceof Array
  }

  function d(n) {
    return "string" == typeof n
  }

  function f(n) {
    return "function" == typeof n
  }

  function l(n, e, t) {
    var r = 2 < arguments.length && void 0 !== t ? t : {};
    if (!r.debug) {
      var i, o = c(e) ? e : [e];
      r.style && (o = ["%c " + (c(e) ? e.join(" ") : e), r.style]), (i = console)[n].apply(i, function(n) {
        if (Array.isArray(n)) {
          for (var e = 0, t = Array(n.length); e < n.length; e++) t[e] = n[e];
          return t
        }
        return Array.from(n)
      }(o))
    }
  }

  function v(n, e) {
    return !(!window || !document || window.pollingDone) && (f(e) ? (n.map(function(n) {
      return e([], n)
    }), window.pollingDone = !0) : c(e) && e.forEach(function(e) {
      f(e) && (n.map(function(n) {
        return e([], n)
      }), window.pollingDone = !0)
    }), !0)
  }

  function o(n, e, t) {
    var i = 0 < arguments.length && void 0 !== n ? n : "dataLayer",
      o = e,
      r = 2 < arguments.length && void 0 !== t ? t : "GTM-TN8CNF";
    if (window && document && !window.init_iris) try {
      window[i] = window[i] || [], o || window[i].push({
        "gtm.start": (new Date).getTime(),
        event: "gtm.js"
      });
      var a = document.getElementsByTagName("script")[0],
        u = document.createElement("script"),
        s = "dataLayer" !== i ? "&l=" + i : "";
      return u.async = !0, u.src = "//www.googletagmanager.com/gtm.js?id=" + r + s, o && u.addEventListener("load", function() {
        var r = window[i].push;
        window[i].push = function() {
          for (var n = arguments.length, e = Array(n), t = 0; t < n; t++) e[t] = arguments[t];
          try {
            r.apply(void 0, e)
          } catch (n) {
            console.log("error: ", n)
          }
          f(o) ? (v(window[i], o), o.apply(void 0, [window[i]].concat(e))) : c(o) && o.forEach(function(n) {
            f(n) && (v(window[i], n), n.apply(void 0, [window[i]].concat(e)))
          })
        }, window[i].push({
          "gtm.start": (new Date).getTime(),
          event: "gtm.js"
        })
      }), a.parentNode.insertBefore(u, a), window.init_iris = !0
    } catch (n) {
      return l("error", "[GTM] Error Initializing GTM"), l("error", n), !1
    }
    return l("warn", "[GTM] Warning! window or document object not found"), !1
  }

  function t(n, e) {
    return "boolean" == typeof e || "number" == typeof e || null == e || "symbol" === (void 0 === e ? "undefined" : m(e)) ? String(e) : (c(e) && e.forEach(function(n) {
      t(void 0, n)
    }), e)
  }

  function r(n) {
    return JSON.stringify(n, t)
  }
  var u, s, m = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(n) {
      return typeof n
    } : function(n) {
      return n && "function" == typeof Symbol && n.constructor === Symbol && n !== Symbol.prototype ? "symbol" : typeof n
    }, w = Object.assign || function(n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (n[r] = t[r])
      }
      return n
    }, a = function(n, e) {
      if (Array.isArray(n)) return n;
      if (Symbol.iterator in Object(n)) return function(n, e) {
        var t = [],
          r = !0,
          i = !1,
          o = void 0;
        try {
          for (var a, u = n[Symbol.iterator](); !(r = (a = u.next()).done) && (t.push(a.value), !e || t.length !== e); r = !0);
        } catch (n) {
          i = !0, o = n
        } finally {
          try {
            !r && u.
            return &&u.
            return ()
          } finally {
            if (i) throw o
          }
        }
        return t
      }(n, e);
      throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }, g = "ISID",
    p = [
      ["domainHash", "string"],
      ["uuid", "string"],
      ["initialVisit", "number"],
      ["beginningPrev", "number"],
      ["beginningCurr", "number"],
      ["counter", "number"]
    ],
    h = 18e5,
    y = 31536e6,
    i = "function" == typeof fetch ? fetch.bind() : function(i, o) {
      return o = o || {}, new Promise(function(n, e) {
        var t = new XMLHttpRequest;
        for (var r in t.open(o.method || "get", i, !0), o.headers) t.setRequestHeader(r, o.headers[r]);

        function u() {
          var r, i = [],
            o = [],
            a = {};
          return t.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(n, e, t) {
            i.push(e = e.toLowerCase()), o.push([e, t]), r = a[e], a[e] = r ? r + "," + t : t
          }), {
            ok: 2 == (t.status / 100 | 0),
            status: t.status,
            statusText: t.statusText,
            url: t.responseURL,
            clone: u,
            text: function() {
              return Promise.resolve(t.responseText)
            },
            json: function() {
              return Promise.resolve(t.responseText).then(JSON.parse)
            },
            blob: function() {
              return Promise.resolve(new Blob([t.response]))
            },
            headers: {
              keys: function() {
                return i
              },
              entries: function() {
                return o
              },
              get: function(n) {
                return a[n.toLowerCase()]
              },
              has: function(n) {
                return n.toLowerCase() in a
              }
            }
          }
        }
        t.withCredentials = "include" == o.credentials, t.onload = function() {
          n(u())
        }, t.onerror = e, t.send(o.body)
      })
    }, b = "https://hub.tokopedia.com/iris/v1/track/event";

  function x(n) {
    var e;
    return e = i("https://hub.tokopedia.com/iris/v1/track/multi-event", w({}, n, {
      method: "POST",
      body: r({
        data: u
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })), u = [], e
  }

  function S(n) {
    var e = void 0,
      t = ("; " + document.cookie).split("; " + n + "=");
    if (2 === t.length && (e = t.pop().split(";").shift()), e) try {
      e = decodeURIComponent(e)
    } catch (n) {
      console.error(n)
    }
    return e
  }

  function T(n, e, t) {
    var r = w({
      domain: "tokopedia.com"
    }, t);
    return document.cookie = n + "=" + encodeURIComponent(e) + Object.keys(r).map(function(n) {
      return ";" + (d(e = n) && e.replace(/[A-Z]/g, function(n) {
        return "-" + n.toLowerCase()
      }) || e) + "=" + r[n];
      var e
    }).join("") + ";path=/", !0
  }

  function E(n, e, t) {
    var r = (new Date).getTime(),
      i = void 0;
    n ? (i = n, e && e.increment && (i.counter += 1), (e && e.midnight || r - i.beginningCurr >= h) && (i.beginningPrev = i.beginningCurr, i.beginningCurr = r)) : i = {
      domainHash: btoa(t),
      uuid: function() {
        for (var n = "", e = 4294967296 * Math.random() >>> 0, t = 0; t < 32; t++) {
          var r = "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx" [t - 1],
            i = 15 & e;
          n += "-" === r || "4" === r ? r : ("x" === r ? i : 3 & i | 8).toString(16), e = t % 8 == 0 ? 4294967296 * Math.random() >>> 0 : e >> 4
        }
        return n.toString()
      }(),
      initialVisit: r,
      beginningPrev: r,
      beginningCurr: r,
      counter: 1
    };
    var o = p.reduce(function(n, e) {
      var t = a(e, 1)[0];
      return n += "." + i[t]
    }, "").slice(1);
    return {
      sessionData: i,
      sessionString: o
    }
  }

  function I(n, e) {
    var t = function(n) {
      var e = S(g),
        t = void 0,
        i = void 0,
        r = void 0;
      if (e) {
        try {
          t = JSON.parse(e)
        } catch (n) {
          l("error", n)
        }
        t && t[n] && (i = {}, (r = t[n]).split(".").forEach(function(n, e) {
          var t = a(p[e], 2),
            r = t[0];
          switch (t[1]) {
            case "number":
              i[r] = parseInt(n, 10);
              break;
            case "string":
            default:
              i[r] = n
          }
        }))
      }
      return {
        sessionData: i,
        sessionString: r
      }
    }(n).sessionData,
      r = E(t, e, n).sessionString;
    return window.irisSessionRaw = r, window.irisSession = window.irisSessionRaw.split(".").slice(0, 3).join("."),
    function(n, e, t) {
      var r = S(g),
        i = r ? JSON.parse(r) : {};
      i[n] = e;
      try {
        T(g, JSON.stringify(i), t)
      } catch (n) {
        return l("error", n), !1
      }
      return !0
    }(n, r, {
      domain: window.location.hostname,
      maxAge: e.maxAge
    })
  }

  function k(d) {
    return I(d, {
      increment: !0,
      maxAge: y
    }),
    function n(e, t) {
      var r = 0 < arguments.length && void 0 !== e ? e : h,
        i = t,
        o = new Date,
        a = new Date(o.getTime() + h),
        u = r,
        s = !1;
      if (o.getDate() !== a.getDate()) {
        var c = (new Date).setHours(24, 0, 0, 0);
        u = c - o.getTime(), s = !0
      }
      setTimeout(function() {
        I(d, i), n(u, {
          midnight: s,
          maxAge: y
        })
      }, u)
    }(h, {
      maxAge: y
    }), !0
  }

  function j(s) {
    return function(n, e) {
      try {
        var t = void 0;
        if ("object" !== (void 0 === (u = e) ? "undefined" : m(u)) || c(u) || null === u) d(e) ? (t = {}, s.customEventField ? (t[s.customEventField] = event, t.event = s.defaultEventValue || "default_v2") : t.event = event) : l("warn", "[Iris Tracker] Iris tracker only accepts object or string!");
        else if (e.event) {
          var r = e.event,
            i = function(n, e) {
              var t = {};
              for (var r in n) 0 <= e.indexOf(r) || Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
              return t
            }(e, ["event"]);
          i["gtm.element"] && (i["gtm.element"] = (i["gtm.element"].id && "" !== i["gtm.element"].id ? "#" + i["gtm.element"].id : "") + (i["gtm.element"].className && "" !== i["gtm.element"].className ? "." + i["gtm.element"].className.replace(/\s/g, ".") : "")), t = i, s.customEventField ? (t[s.customEventField] = r, t.event = s.defaultEventValue || "default_v2") : t.event = r
        } else l("warn", "[Iris Tracker] Event pushed without event name, data will be rejected"), l("warn", e); if (t && ("string" == typeof(a = t).event && !a.event_ga.includes("gtm."))) {
          var o = w({
            container: s.container,
            iris_session_id: window.irisSession
          }, t);
          s.batching ? A.trackIrisEventBatch(o) : navigator && navigator.sendBeacon ? A.beaconDispatch(o) : A.trackIrisEvent(o)
        }
        return !0
      } catch (n) {
        return l("error", "[Iris Tracker] PUSH event error"), l("error", n), !1
      }
      var a, u
    }
  }
  var A = {
    trackIrisEvent: function(n, e) {
      return i(b, w({}, e, {
        method: "POST",
        body: r({
          data: n
        }),
        headers: {
          "Content-Type": "application/json"
        }
      })).then(function() {})
    },
    trackIrisEventBatch: (u = [], s = void 0, function(n, e) {
      var t = !0,
        r = !1,
        i = void 0;
      try {
        for (var o, a = u[Symbol.iterator](); !(t = (o = a.next()).done); t = !0)
          if (o.value["gtm.uniqueEventId"] === n["gtm.uniqueEventId"]) return {
            then: function() {}
          }
      } catch (n) {
        r = !0, i = n
      } finally {
        try {
          !t && a.
          return &&a.
          return ()
        } finally {
          if (r) throw i
        }
      }
      return u.push(n), s = s || setTimeout(function() {
        return s = void 0, x(e)
      }, 2e3), 5 <= u.length ? (clearTimeout(s), s = void 0, x(e)) : {
        then: function() {}
      }
    }),
    beaconDispatch: function(n) {
      try {
        return navigator.sendBeacon(b, JSON.stringify({
          data: n
        })), !0
      } catch (n) {
        return console.error("[Failed Send Beacon]"), !1
      }
      return !0
    }
  };
  return n.initializeGTM = o, n.initializeGTMWithIris = function(n, e, t) {
    var r = n.sessionName,
      i = void 0 === r ? window.location.hostname : r;
    k(i), o(e, j(n), t)
  }, n.initializeIris = function(n, e, t) {
    var r = 1 < arguments.length && void 0 !== e ? e : "dataLayer",
      i = t;
    if (window && document && !window.init_iris) try {
      var o = n.sessionName,
        a = void 0 === o ? window.location.hostname : o;
      if (k(a), window[r] = [], window[r].push = j(n), i) {
        var u = window[r].push;
        window[r].push = function() {
          for (var n = arguments.length, e = Array(n), t = 0; t < n; t++) e[t] = arguments[t];
          u.apply(void 0, [window[r]].concat(e)), "function" == typeof i ? i.apply(void 0, [window[r]].concat(e)) : i instanceof Array && i.forEach(function(n) {
            "function" == typeof n && n.apply(void 0, [window[r]].concat(e))
          })
        }
      }
      return window.init_iris = !0
    } catch (n) {
      return l("error", "[Iris Tracker] Error initializing Iris instance"), l("error", n), !1
    }
    return l("error", "[Iris Tracker] No window and document instance found"), !1
  }, n
}({});