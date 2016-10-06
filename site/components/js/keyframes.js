var keyFrames = [
  {
    theme: "init",
    duration: 0
  },
  {
    key: "animals-init",
    target: ".main",
    theme: "init",
    duration: 0
  },
  {
    key: "animals-meet",
    target: ".weapon, .animal",
    theme: "init",
    duration: 4
  },
  {
    key: "animals-stare",
    target: ".main",
    theme: "init",
    duration: 0.5
  },
  {
    key: "animals-talk-in",
    target: ".animal",
    theme: "init",
    duration: 4
  },
  {
    key: "animals-talk-out",
    target: ".animal",
    theme: "init",
    duration: 1
  }
]

var attack = [
  [ // cats
    {
    key: "raygun-engage-charge",
    target: ".main",
    theme: "init",
    duration: 1.2
    },
    {
      key: "raygun-engage-shoot",
      target: ".main",
      theme: "laser-1 laser-2",
      duration: 0.75
    },
    {
      key: "raygun-engage-hit",
      target: ".main",
      theme: "laser-hit-1 laser-hit-2",
      duration: 2
    },
    {
      key: "weapon-disengage",
      target: ".main",
      theme: "init",
      duration: 3
    },
    {
      key: "",
      target: ".main",
      theme: "init",
      duration: 0
    }
  ],
  [ // dogs
    {
    key: "cannon-engage-aim",
    target: ".main",
    theme: "init",
    duration:1.8
    },
    {
      key: "cannon-engage-shoot",
      target: ".main",
      theme: "light",
      duration:1
    },
    {
      key: "cannon-engage-hit",
      target: ".main",
      theme: "expl-1 expl-2 expl-3",
      duration: 1.5
    },
    {
      key: "weapon-disengage",
      target: ".main",
      theme: "init",
      duration: 3
    },
    {
      key: "",
      target: ".main",
      theme: "init",
      duration: 0
    }
  ]
]