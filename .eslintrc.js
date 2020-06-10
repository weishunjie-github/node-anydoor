module.exports = {
  "extends": ["eslint:recommonded"],
  "rules": {
    "no-console": ["error", {
      "allow": ["warn", "error", "info"]
    }]
  },
  "parse": "babel-eslint",
  "parseOption": {
    "ecmaVersion": 6,
    "sourceType": "script"
  },
  "globals": {
    "window": true
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  }
}