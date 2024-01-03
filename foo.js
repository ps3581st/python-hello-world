function getCfphash() {
    var b1 = document.createElement('canvas');
    b1.width = 2000;
    b1.height = 200;
    console.log(b1.width, b1.height);
    if (b1.getContext) {
        try {
            var b2 = [];
            b1.style.display = 'inline';
            var b3 = b1.getContext('2d');
            if (!b3) {
                console.log(false);
            }

            b3.rect(0, 0, 10, 10);
            b3.rect(2, 2, 6, 6);
            b2.push('canvas winding:' + (b3.isPointInPath(5, 5, 'evenodd') === false ? 'yes' : 'no'));

            b3.textBaseline = 'alphabetic';
            b3.fillStyle = '#f60';
            b3.fillRect(125, 1, 62, 20);
            b3.fillStyle = '#069';
            b3.font = '11pt no-real-font-123';
            b3.fillText('Cwm fjordbank glyphs vext quiz, \uD83D\uDE03', 2, 15);
            b3.fillStyle = 'rgba(102, 204, 0, 0.2)';
            b3.font = '18pt Arial';
            b3.fillText('Cwm fjordbank glyphs vext quiz, \uD83D\uDE03', 4, 45);
            b3.globalCompositeOperation = 'multiply';
            b3.fillStyle = 'rgb(255,0,255)';
            b3.beginPath();
            b3.arc(50, 50, 50, 0, Math.PI * 2, !0);
            b3.closePath();
            b3.fill();
            b3.fillStyle = 'rgb(0,255,255)';
            b3.beginPath();
            b3.arc(100, 50, 50, 0, Math.PI * 2, !0);
            b3.closePath();
            b3.fill();
            b3.fillStyle = 'rgb(255,255,0)';
            b3.beginPath();
            b3.arc(75, 100, 50, 0, Math.PI * 2, !0);
            b3.closePath();
            b3.fill();
            b3.fillStyle = 'rgb(255,0,255)';
            b3.arc(75, 75, 75, 0, Math.PI * 2, !0);
            b3.arc(75, 75, 25, 0, Math.PI * 2, !0);
            b3.fill('evenodd');
            b2.push('canvas fp:' + b1.toDataURL());
            var src = b1.toDataURL();
            const hash1 = cfpHash(b2.join('~'));
            
            return hash1;
        } catch (b4) {
            console.log(false);
        }
    }
}

function cfpHash(t) {
    if (Array.prototype.reduce) return t.split("").reduce((function (t, e) {
        return (t = (t << 5) - t + e.charCodeAt(0)) & t
    }), 0);
    var s = 0;
    if (0 === t.length) return s;
    for (var f = 0; f < t.length; f++) s = (s << 5) - s + t.charCodeAt(f), s &= s;
    return s
}

function getInner() {
    const availableWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const availableHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

    return availableWidth, availableHeight;
}

var innerWidth, innerHeight = getInner();

var screenWidth = window.screen.width;
var screenHeight = window.screen.height;







const fpPromise1 = import('https://cfp.ruthlessproxies.com/finger.js')
    .then(FingerprintJS => FingerprintJS.load())

// Get the visitor identifier when you need it.
fpPromise1
    .then(fp => fp.get())
        .then(res => {
            var result = res.components;
            // This is the visitor identifier:
            // const visitorId = result.visitorId;
            // console.log(result);
            const colorDepth = result.colorDepth.value;
            const screen = result.screenResolution.value;
            const hardwareConcurrency = result.hardwareConcurrency.value;
            const platform = result.platform.value;
            const webGlBasics = result.webGlBasics.value;
            const webGlExtensions = result.webGlExtensions.value.parameters;
            

            const data = {
                innerHeight,
                innerWidth,
                screenHeight,
                screenWidth,
                colorDepth,
                screen,
                hardwareConcurrency,
                platform,
                webGlBasics,
                webGlExtensions,
                cfp_hash: getCfphash()
            }

            fetch('https://cfp.ruthlessproxies.com/fetch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // You may need to include additional headers like authorization tokens
                },
                body: JSON.stringify(data),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // or response.text() if the response is not JSON
            })
            .then(data => {
                // Handle the data from the server
                console.log(data);
            })
            .catch(error => {
                // Handle errors
                console.error('Fetch error:', error);
            });
        }
    )





