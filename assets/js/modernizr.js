/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-audio-canvas-csstransitions-prefixed-prefixedcss-setclasses !*/
! function (e, n, t) {
    function r(e, n) {
        return typeof e === n
    }

    function o() {
        var e, n, t, o, a, s, i;
        for (var l in C)
            if (C.hasOwnProperty(l)) {
                if (e = [], n = C[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
                    for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
                for (o = r(n.fn, "function") ? n.fn() : n.fn, a = 0; a < e.length; a++) s = e[a], i = s.split("."), 1 === i.length ? Modernizr[i[0]] = o : (!Modernizr[i[0]] || Modernizr[i[0]] instanceof Boolean || (Modernizr[i[0]] = new Boolean(Modernizr[i[0]])), Modernizr[i[0]][i[1]] = o), h.push((o ? "" : "no-") + i.join("-"))
            }
    }

    function a(e) {
        var n = x.className,
            t = Modernizr._config.classPrefix || "";
        if (_ && (n = n.baseVal), Modernizr._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            n = n.replace(r, "$1" + t + "js$2")
        }
        Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), _ ? x.className.baseVal = n : x.className = n)
    }

    function s(e) {
        return e.replace(/([a-z])-([a-z])/g, function (e, n, t) {
            return n + t.toUpperCase()
        }).replace(/^-/, "")
    }

    function i(e) {
        return e.replace(/([A-Z])/g, function (e, n) {
            return "-" + n.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function l() {
        return "function" != typeof n.createElement ? n.createElement(arguments[0]) : _ ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
    }

    function u(e, n) {
        return !!~("" + e).indexOf(n)
    }

    function f(e, n) {
        return function () {
            return e.apply(n, arguments)
        }
    }

    function c(e, n, t) {
        var o;
        for (var a in e)
            if (e[a] in n) return t === !1 ? e[a] : (o = n[e[a]], r(o, "function") ? f(o, t || n) : o);
        return !1
    }

    function p() {
        var e = n.body;
        return e || (e = l(_ ? "svg" : "body"), e.fake = !0), e
    }

    function d(e, t, r, o) {
        var a, s, i, u, f = "modernizr",
            c = l("div"),
            d = p();
        if (parseInt(r, 10))
            for (; r--;) i = l("div"), i.id = o ? o[r] : f + (r + 1), c.appendChild(i);
        return a = l("style"), a.type = "text/css", a.id = "s" + f, (d.fake ? d : c).appendChild(a), d.appendChild(c), a.styleSheet ? a.styleSheet.cssText = e : a.appendChild(n.createTextNode(e)), c.id = f, d.fake && (d.style.background = "", d.style.overflow = "hidden", u = x.style.overflow, x.style.overflow = "hidden", x.appendChild(d)), s = t(c, e), d.fake ? (d.parentNode.removeChild(d), x.style.overflow = u, x.offsetHeight) : c.parentNode.removeChild(c), !!s
    }

    function y(n, r) {
        var o = n.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; o--;)
                if (e.CSS.supports(i(n[o]), r)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in e) {
            for (var a = []; o--;) a.push("(" + i(n[o]) + ":" + r + ")");
            return a = a.join(" or "), d("@supports (" + a + ") { #modernizr { position: absolute; } }", function (e) {
                return "absolute" == getComputedStyle(e, null).position
            })
        }
        return t
    }

    function m(e, n, o, a) {
        function i() {
            c && (delete z.style, delete z.modElem)
        }
        if (a = r(a, "undefined") ? !1 : a, !r(o, "undefined")) {
            var f = y(e, o);
            if (!r(f, "undefined")) return f
        }
        for (var c, p, d, m, v, g = ["modernizr", "tspan", "samp"]; !z.style && g.length;) c = !0, z.modElem = l(g.shift()), z.style = z.modElem.style;
        for (d = e.length, p = 0; d > p; p++)
            if (m = e[p], v = z.style[m], u(m, "-") && (m = s(m)), z.style[m] !== t) {
                if (a || r(o, "undefined")) return i(), "pfx" == n ? m : !0;
                try {
                    z.style[m] = o
                } catch (h) {}
                if (z.style[m] != v) return i(), "pfx" == n ? m : !0
            }
        return i(), !1
    }

    function v(e, n, t, o, a) {
        var s = e.charAt(0).toUpperCase() + e.slice(1),
            i = (e + " " + P.join(s + " ") + s).split(" ");
        return r(n, "string") || r(n, "undefined") ? m(i, n, o, a) : (i = (e + " " + b.join(s + " ") + s).split(" "), c(i, n, t))
    }

    function g(e, n, r) {
        return v(e, t, t, n, r)
    }
    var h = [],
        C = [],
        w = {
            _version: "3.3.1",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0
            },
            _q: [],
            on: function (e, n) {
                var t = this;
                setTimeout(function () {
                    n(t[e])
                }, 0)
            },
            addTest: function (e, n, t) {
                C.push({
                    name: e,
                    fn: n,
                    options: t
                })
            },
            addAsyncTest: function (e) {
                C.push({
                    name: null,
                    fn: e
                })
            }
        },
        Modernizr = function () {};
    Modernizr.prototype = w, Modernizr = new Modernizr;
    var x = n.documentElement,
        _ = "svg" === x.nodeName.toLowerCase();
    Modernizr.addTest("audio", function () {
        var e = l("audio"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType('audio/mpeg; codecs="mp3"').replace(/^no$/, ""), n.opus = e.canPlayType('audio/ogg; codecs="opus"') || e.canPlayType('audio/webm; codecs="opus"').replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (t) {}
        return n
    }), Modernizr.addTest("canvas", function () {
        var e = l("canvas");
        return !(!e.getContext || !e.getContext("2d"))
    });
    var S = "Moz O ms Webkit",
        P = w._config.usePrefixes ? S.split(" ") : [];
    w._cssomPrefixes = P;
    var T = function (n) {
        var r, o = prefixes.length,
            a = e.CSSRule;
        if ("undefined" == typeof a) return t;
        if (!n) return !1;
        if (n = n.replace(/^@/, ""), r = n.replace(/-/g, "_").toUpperCase() + "_RULE", r in a) return "@" + n;
        for (var s = 0; o > s; s++) {
            var i = prefixes[s],
                l = i.toUpperCase() + "_" + r;
            if (l in a) return "@-" + i.toLowerCase() + "-" + n
        }
        return !1
    };
    w.atRule = T;
    var b = w._config.usePrefixes ? S.toLowerCase().split(" ") : [];
    w._domPrefixes = b;
    var E = {
        elem: l("modernizr")
    };
    Modernizr._q.push(function () {
        delete E.elem
    });
    var z = {
        style: E.elem.style
    };
    Modernizr._q.unshift(function () {
        delete z.style
    }), w.testAllProps = v;
    var N = w.prefixed = function (e, n, t) {
        return 0 === e.indexOf("@") ? T(e) : (-1 != e.indexOf("-") && (e = s(e)), n ? v(e, n, t) : v(e, "pfx"))
    };
    w.prefixedCSS = function (e) {
        var n = N(e);
        return n && i(n)
    };
    w.testAllProps = g, Modernizr.addTest("csstransitions", g("transition", "all", !0)), o(), a(h), delete w.addTest, delete w.addAsyncTest;
    for (var $ = 0; $ < Modernizr._q.length; $++) Modernizr._q[$]();
    e.Modernizr = Modernizr
}(window, document);