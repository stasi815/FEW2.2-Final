const template = document.createElement('template')
    template.innerHTML = `
        <style>
            .container {
                padding: 1em;
                border: 1px solid;
                width: 100%;
                overflow: hidden;
                background-color: white;
            }

            .inner {
                width: 100%;
                padding-left: 100%;
            }

            @keyframes ticker {
                0% { transform: translate3d(0, 0, 0); }
                100% { transform: translate3d(-100%, 0, 0); }
            }

            .inner-ticker {
                white-space: nowrap;
                padding-right: 150%;
                animation-iteration-count: infinite;
                animation-timing-function: linear;
                animation-name: ticker;
                animation-duration: 10s;
                color: var(--color-info);
                font-weight: bold;
            }

        </style>
        <div class="container">
            <div class="inner">
                <div class="inner-ticker">
                    Hello World!
                </div>
            </div>
        </div>
    `


    class TickerTape extends HTMLElement {
        constructor() {
            super();

            const tempNode = template.content.cloneNode(true)
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tempNode)


            this._transition = this.getAttribute('animation-duration')


            this._container = this._shadowRoot.querySelector('.container')
            this._inner = this._shadowRoot.querySelector('.inner')
            this._innerTicker = this.shadowRoot.querySelector('.inner-ticker')

            this._innerTicker.style.animationDuration = '10s'

            this._container.appendChild(this._inner)
            this._inner.appendChild(this._innerTicker)
            this._shadowRoot.appendChild(this._container)

            this._innerTicker.innerHTML = this.innerHTML
        }

        static get observedAttributes() {
            return ['animation-duration'];
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (name === 'animation-duration') {
                this._transition = parseInt(newValue)
            }
        }

    }

customElements.define('ticker-tape', TickerTape)
