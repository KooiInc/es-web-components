import {createElement,
  numberFactory,
  CreateComponent,
  setComponentStyleFor,
  createOrRetrieveShadowRoot,} from "../Common/CommonHelpers.js";

export default createStarRatingComponent;

function createStarRatingComponent( { min, max, nDefault } = {} ) {
  const { NR, inRange, gte, } = numberFactory();
  const { componentName, componentStyle, createStar, limits, appStrings } =
    retrieveComponentConstants({min, max, nDefault});
  const [ add, remove, inActiveClass, resetQS, initialQS, div,
    containerClass, starsClass, resetTtlAndClass, initialTtl,
    initialClss, starsQS, starQS, containerQS, existsInfo ] = appStrings;
  
  if ( customElements.get(componentName) ) {
    return console.info(existsInfo)
  }
  
  CreateComponent({ componentName, onConnect, });
  
  function onConnect(componentNode) {
    const shadow = createOrRetrieveShadowRoot(componentNode);
    const starContainer = createStarContainerElement(componentNode);
    shadow.append(starContainer);
    shadow.adoptedStyleSheets = [setComponentStyleFor(componentNode, componentStyle)];
    shadow.addEventListener(`click`, handleShadowrootClick);
  }
  
  function handleShadowrootClick(evt) {
    const origin = evt.target;
    const shadowRoot = origin.getRootNode();
    const host = shadowRoot.host;
    const starsElement = shadowRoot.querySelector(starsQS);
    const initialScore = NR(origin.dataset.setScore, -1);
    const score = initialScore >= 0 ? initialScore : getScore(starsElement, origin);
    const shouldChangeScore = NR(score, -1) >= 0 && NR(host.dataset.score) !== score;
    
    return  shouldChangeScore ? setStarRating(starsElement, host, score) : true;
  }
  
  function createStarContainerElement(componentNode) {
    checkLimits4AmountOfStars(componentNode);
    const score = NR(componentNode.dataset.score);
    const nStars = NR(componentNode.dataset.stars, limits.nDefault);
    const starContainer = createElement(div, { className: containerClass });
    const content = createElement( div, { className: starsClass }, { max: nStars, score } );
    
    starContainer.append(content);
    starContainer.append(createElement( div, {
      title: resetTtlAndClass, className: resetTtlAndClass }, { setScore: 0, stars: nStars } ) );
    starContainer.append(createElement( div, {
      title: initialTtl, className: initialClss }, {setScore: score, stars: nStars} ) );
    
    return setStarRating(content, componentNode, score);
  }
  
  function checkLimits4AmountOfStars(componentNode) {
    let nStars = NR(+componentNode.dataset?.stars, limits.nDefault);
    const initialScore = NR(+componentNode.dataset.initial, 0);
    const score = initialScore > 0 ? initialScore : NR(componentNode.dataset.score, 0);
    nStars = inRange(nStars, limits.min, limits.max) ? nStars : limits.nDefault;
    componentNode.dataset.stars = nStars;
    componentNode.dataset.initial = +initialScore <= nStars ? initialScore : 0;
    componentNode.dataset.score = +score <= nStars ? score : 0;
  }
  
  function rateIt(rating, nStars) {
    const result = [];
    for (let i = 0; i < rating; i += 1) { result.push(createStar(true)); }
    for (let i = 0; i < nStars - rating; i += 1) { result.push(createStar()); }
    return result;
  }
  
  function getScore(starsElement, clickedStar) {
    if (starsElement === clickedStar) { return 0; }
    
    let score = 1;
    
    for (let star of starsElement.querySelectorAll(starQS)) {
      if (star === clickedStar) {
        return score;
      }
      
      score += 1;
    }
  }
  
  function setStarRating(starsElement, host, score) {
    const ratedStars = rateIt(score, +starsElement.dataset.max);
    const stars = starsElement.querySelectorAll(starQS);
    const nStars = ratedStars.length;
    const starContainer = starsElement.closest(containerQS);
    
    for (let i = 0; i < nStars; i += 1) {
      stars.length < 1 ? starsElement.append(ratedStars[i]) :
        stars[i].replaceWith(ratedStars[i]);
    }
    
    host.dataset.score = starsElement.dataset.score = score;
    btnsActivation(starContainer, score, NR(host.dataset.initial));
    
    return starContainer;
  }
  
  function btnsActivation(starContainer, score, initialValue) {
    const reset = score < 1 ? add : remove;
    const initial = initialValue === 0 ||
    initialValue > 0 && score === initialValue ? add : remove;
    starContainer.querySelector(resetQS).classList[reset](inActiveClass);
    starContainer.querySelector(initialQS).classList[initial](inActiveClass);
  }
  
  function limitsContract(currentValues, defaults) {
    const nDefault = NR(currentValues.nDefault, defaults.nDefault);
    const rv = {
      min: gte(NR(currentValues.min, defaults.min), defaults.min),
      max: NR(currentValues.max, defaults.max),
    };
    
    return {...rv, nDefault: inRange(nDefault, rv.min, rv.max) ? nDefault : defaults.nDefault};
  }
  
  function retrieveComponentConstants(starLimits) {
    const limitsDefault = { min: 3, max: 10, nDefault: 5 };
    const componentName = `star-rater`;
    const existsInfo = `✔ The <star-rater> web component can only be created once. `+
      `It already exists and is ready for use. Enjoy!`
    const btnActivationStrings = [`add`, `remove`, `inactive`, `.reset`, `.initial`];
    const appStrings =  [ `div`, `starContainer`, `stars`, `reset`, `revert to initial`, `initial`,
      `.stars`, `.star`, `.starContainer` ];
    
    return {
      limits: limitsContract( starLimits , limitsDefault ),
      appStrings: btnActivationStrings.concat(appStrings).concat(existsInfo),
      componentName,
      componentStyle: `
          :host {
            font-weight: normal;
            display: block;
            font-style: normal;
            .initial:after, .reset:after {
              letter-spacing: initial;
              font-weight: bold;
              color: #c45525;
              background-color: #EEE;
              padding: 2px 4px;
              position: relative;
              text-align: center;
              margin-left: 5px;
              top: -5px;
              cursor: pointer;
              min-width: 48px;
            }
            .starContainer {
              padding: 0.4rem 0;
              display: inline-block;
              .initial, .reset { display: inline-block; }
              .reset:after { content: '\u21B6 'attr(data-set-score)'/'attr(data-stars); }
              .initial:after { content: '↺ 'attr(data-set-score)'/'attr(data-stars); }
              .reset.inactive, .initial.inactive { display: none;  }
              .stars {
                display: inline-block;
                cursor: pointer;
                letter-spacing: 2px;
                .star {
                  font-size: 2rem;
                  -webkit-text-stroke: 1px #999;
                  text-shadow: 1px 1px 4px #999;
                  color: white;
                  &:before { content: '★'; }
                  &.rated:before { color: gold; }
                  &:hover:before {
                    color: gold;
                    -webkit-text-stroke: 1px #c45525;
                    text-shadow: 1px 1px 4px #c45525;
                  }
                }
              }
            }
          }`,
      createStar(rated) { return createElement(`span`, {className: `star${rated ? ` rated` : ``}`}); },
    };
  }
}