import * as $ from 'jquery';
import './babel';
import Post from '@models/Post';
import json from '@/assets/json';
import xml from '@/assets/data.xml';
import csv from '@/assets/data.csv';
import WebpackLogo from '@/assets/webpack-logo';
import './styles/styles';
import './styles/style.less';
import './styles/scss.scss';
import React from 'react';
import { render } from 'react-dom';

const App = () => <div className="container">
    <h1>Webpack train</h1>
    <hr />
    <div className="logo"></div>
    <hr />
    <pre></pre>
    <hr />
    <div className="box">
        <h2>Header</h2>
    </div>
    <hr />
    <div className="card">
        <h2>SCSS</h2>
    </div>
    <hr />
</div>;

render(<App />, document.getElementById('root'));

const post = new Post('Учим вебпак вместе!', WebpackLogo);

$('pre').addClass('code').html(post.toString());

const img = document.createElement('img');

img.src = WebpackLogo;
img.style.maxWidth = '300px';

document.body.appendChild(img);

console.log(post, post.toString());

console.log(json);

console.log(xml);

console.log(csv);