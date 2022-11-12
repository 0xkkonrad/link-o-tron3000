var granimInstance = new Granim({
    element: "#canvas-image-blending",
    direction: "top-bottom",
    isPausedWhenNotInView: true,
    image: {
      source:
        "https://images.pexels.com/photos/1287145/pexels-photo-1287145.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      blendingMode: "multiply"
    },
    states: {
      "default-state": {
        gradients: [
          ["#834D9B", "#D04ED6"],
          ["#1CD8D2", "#93EDC7"],
          ["#12c2e9", "#c471ed"],
          ["#b92b27", "#1565C0"],
          ["#373B44", "#4286f4"],
          ["#2980B9", "#6DD5FA"],
          ["#6b6b83", "#3b8d99"]
        ],
        transitionSpeed: 3000
      }
    }
  });
  