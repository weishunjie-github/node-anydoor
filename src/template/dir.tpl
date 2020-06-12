<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <style>
    body {
      margin: 30px;
    }

    a {
      display: block;
      font-size: 30px;
    }
  </style>
</head>

<body>
  <h1>{{dir}}</h1>
  <h2>{{a1}}</h2>
  <h3>{{a2}}</h3>
  <h3>{{dir1}}</h3>
  
  {{#each files}}
  <a href="{{../dir}}/{{this}}">{{this}}</a>
  {{/each}}
</body>

</html>