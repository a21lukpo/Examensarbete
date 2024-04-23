// ==UserScript==
// @name         Examensarbete
// @namespace    http://tampermonkey.net/
// @version      2024-03-18
// @description  try to take over the world!
// @author       You
// @match        localhost/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_deleteValue
// ==/UserScript==

const words = new Array("button", "sleeve", "double", "online", "tall", "side", "two", "fabric", "dress", "trench", "collection", "knit", "tweed", "cropped", "wool", "leather", "bomber", "denim", "americana", "straight", "foil", "faux",
                       "knitted", "design", "recycled", "chaqueta", "adidas", "asos", "love", "pockets", "jacket", "new", "creating", "classic", "high-street", "mix", "vintage", "wash", "short", "flowy", "heavy", "structure", "gallo",
                       "biker", "cazadora", "ovine", "rain", "weekend", "spin", "london", "relaxed", "turtleneck", "tailored", "red", "sleeveless", "pinstripe", "premium", "manteco", "belted", "look", "emma", "miss", "bershka", "coat",
                       "trends", "matter", "key", "originals", "functional", "zip", "eye", "beat", "own", "black", "cotton", "oversize", "neck", "italian", "handmade", "medium", "nike", "selfridge", "exclusive", "fit", "your", "inspiration",
                       "best", "think", "quality", "reversible", "porteo", "piece", "structured", "beyond", "technical", "skinny", "jogger", "satin", "elastic", "waist");
const maxSearches = 80;

function jsf32(a, b, c, d) {
  a |= 0; b |= 0; c |= 0; d |= 0;
  var t = a - (b << 23 | b >>> 9) | 0;
  a = b ^ (c << 16 | c >>> 16) | 0;
  b = c + (d << 11 | d >>> 21) | 0;
  b = c + d | 0;
  c = d + t | 0;
  d = a + t | 0;
  return (d >>> 0) / 4294967296;
}

Math.random = function() {
    var ran=jsf32(0xF1EA5EED,Math.randSeed+6871,Math.randSeed+1889,Math.randSeed+56781);
    Math.randSeed+=Math.floor(ran*37237);
    return(ran)
}

Math.setSeed = function(seed){
    Math.randSeed=seed;
    for(var i=0;i<7;i++) Math.random();
}

var origRandom = Math.random;

(function() {
    'use strict';

    //GM_setValue('counter', 0);
    //var counter = GM_getValue('counter');
    //GM_deleteValue('results');

    var searchbar = document.querySelector("#searchbar");
    var searchButton = document.querySelector("#searchButton");
    var counter = GM_getValue('counter', 0);
    var timer = 0;
    var results = GM_getValue('results', {resultsArray: [] });

    function searches(searchString){
        searchbar.value = searchString;
        startTimer();
        searchButton.click();
    }

    function startTimer(){
        timer = performance.now();
    }

    function measureTime(searchString){
        const stopTime = performance.now();
        const loadingTime = stopTime - timer;
        counter++;

        var result = {
            searchString: searchString,
            searchTime: loadingTime,
        };
        results.resultsArray = results.resultsArray || [];
        results.resultsArray.push(result);
        GM_setValue('results', results);
        GM_setValue('counter', counter);
        console.log(counter);
    }

    function download(){
        const resultsJSON = JSON.stringify(results.resultsArray, null, 2);
        const file = new Blob([resultsJSON], {type: 'application/json'});
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(file);
        downloadLink.download = 'results.json';
        downloadLink.textContent = 'Download Results';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }


    if(counter <= maxSearches){
        var searchString;
        Math.setSeed(counter);
        var randomIndex = Math.floor(Math.random() * words.length);
        searchString = words[randomIndex];

        searches(searchString);
        measureTime(searchString);
    }else{
        download();
    }
})();