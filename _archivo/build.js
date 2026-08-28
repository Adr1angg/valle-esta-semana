// Wraps core.html (artifact-format fragment) into a standalone index.html for hosting.
const fs=require('fs');
const core=fs.readFileSync('core.html','utf8');
const SITE='https://valle-esta-semana.pages.dev';
const DESC='Todo lo que pasa en Valle de Bravo esta semana — noches, mercados, agua y montaña. Se actualiza los jueves.';
const html=`<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="${DESC}">
<meta name="theme-color" content="#0f1312" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#f7f6f3" media="(prefers-color-scheme: light)">
<link rel="canonical" href="${SITE}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Valle Esta Semana">
<meta property="og:title" content="Valle Esta Semana">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="${SITE}/">
<meta property="og:locale" content="es_MX">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Valle Esta Semana">
<meta name="twitter:description" content="${DESC}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23163f4a'/%3E%3Cpath d='M8 74 L30 44 L44 62 L62 30 L80 58 L92 44 L92 82 L8 82 Z' fill='%23e8ddc8'/%3E%3Ccircle cx='72' cy='22' r='9' fill='%23f2c88a'/%3E%3C/svg%3E">
<style>*{margin:0}</style>
${core}
</body>
</html>`.replace('<title>','</head>\n<body>\n<title>');
// move the <title>/<link>/<style> block into <head>: simpler = keep them in body-adjacent position,
// browsers hoist <title> and <link rel=stylesheet> fine, but do it properly:
const m=core.match(/^([\s\S]*?)(<div class="grain")/);
const headBits=m?m[1]:'';
const bodyBits=m?core.slice(m[1].length):core;
const proper=`<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="description" content="${DESC}">
<meta name="theme-color" content="#0f1312" media="(prefers-color-scheme: dark)">
<meta name="theme-color" content="#f7f6f3" media="(prefers-color-scheme: light)">
<link rel="canonical" href="${SITE}/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Valle Esta Semana">
<meta property="og:title" content="Valle Esta Semana">
<meta property="og:description" content="${DESC}">
<meta property="og:url" content="${SITE}/">
<meta property="og:locale" content="es_MX">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="Valle Esta Semana">
<meta name="twitter:description" content="${DESC}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23163f4a'/%3E%3Cpath d='M8 74 L30 44 L44 62 L62 30 L80 58 L92 44 L92 82 L8 82 Z' fill='%23e8ddc8'/%3E%3Ccircle cx='72' cy='22' r='9' fill='%23f2c88a'/%3E%3C/svg%3E">
<style>*{margin:0}</style>
${headBits.trim()}
</head>
<body>
${bodyBits.trim()}
</body>
</html>
`;
fs.writeFileSync('index.html',proper);
console.log('index.html written,',(proper.length/1024).toFixed(1),'KB');
