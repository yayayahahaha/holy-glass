var team_rwby = {
    "ruby": "https://puu.sh/oXDLO/7b5a932ef1.jpg",
    "weiss": "https://puu.sh/oXDNd/169a74d36c.jpg",
    "blake": "https://puu.sh/oXDNQ/bec8c790e4.jpg",
    "yang": "https://puu.sh/oXDO9/3c169032d0.jpg"
};

/*
    [
        [1, 3, 5, 6],
        [2, 3, 4],
        [4, 5, 6]
    ]
*/

document.addEventListener("DOMContentLoaded", function() {

    var w = window.innerWidth,
        h = window.innerHeight;

    new Vue({
        el: "#app",
        data: {
            width: w,
            height: h,
            s1: [0, 0],
            s2: [w, 0],
            unitHeight: 150,
            typeMap: [0, 1, 2],
            set: [],
            array: [],
            main_color: Math.round(Math.random() * 255)
        },
        created: function() {
            console.log("vue created");
        },
        methods: {
            createPolySet: function() {
                var type = this.typeMap[(this.set.length / 3) % 3];

                var p1, p2, p3, p4, p5, p6;

                /* create point 1 */
                p1 = this.s1;

                /* create point 2 */
                p2 = this.s2;

                /* create point 3 */
                if (type === 0) {
                    p3 = [
                        p1[0] + (p2[0] - p1[0]) * 0.75,
                        p1[1] + (p2[1] - p1[1]) * 0.75
                    ];
                } else {
                    p3 = [
                        p1[0] + (p2[0] - p1[0]) * 0.5,
                        p1[1] + (p2[1] - p1[1]) * 0.5
                    ];
                }

                /* create point 4 */
                if (type === 1) {
                    p4 = [
                        p1[0],
                        p1[1] + this.unitHeight
                    ];
                } else {
                    p4 = [
                        p2[0],
                        p2[1] + this.unitHeight
                    ];
                }

                /* create point 5 */
                if (type === 1) {
                    p5 = [
                        p4[0] + (p3[0] - p4[0]) * 0.5,
                        p4[1] + (p3[1] - p4[1]) * 0.5
                    ];
                } else {
                    p5 = [
                        p3[0] + (p4[0] - p3[0]) * 0.5,
                        p3[1] + (p4[1] - p3[1]) * 0.5
                    ];
                }

                /* create point 6 */
                if (type === 1) {
                    p6 = [
                        p2[0],
                        p4[1] + this.unitHeight
                    ];
                } else {
                    p6 = [
                        p1[0],
                        p4[1] + this.unitHeight
                    ];
                }

                /* create polygon */
                this.set.push({
                    d: make_path([p3, p2, p4]),
                    fill: create_color(this.main_color),
                    stroke: create_color(255)
                }, {
                    d: make_path([p1, p3, p5, p6]),
                    fill: create_color(this.main_color),
                    stroke: create_color(255)
                }, {
                    d: make_path([p4, p5, p6]),
                    fill: create_color(this.main_color),
                    stroke: create_color(255)
                });

                /* change start point */
                if (type === 1) {
                    this.s1 = p4;
                    this.s2 = p6;
                } else {
                    this.s1 = p6;
                    this.s2 = p4;
                }
            }
        },
        mounted: function() {
            this.createPolySet();
            this.createPolySet();
            this.createPolySet();
            this.createPolySet();
        }
    });
    var paper = Snap("#svg");

    /* this polygons' array include coordinates and image's source  */
    var polygons = [];

    function make_path() {
        d = "M";
        coordinates = arguments[0];
        for (var i = 0; i < coordinates.length; i++) {
            if (i === 0) {
                d += coordinates[i][0] + " " + coordinates[i][1];
            } else {
                d += "L" + coordinates[i][0] + " " + coordinates[i][1];
            }
        }
        return d + "z";
        // return d;
    }

    function randomColor() {
        var color = 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')';
        return color;
    }

    function create_color(input) {
        main_color = input ? input : Math.round(Math.random() * 255);
        hue = Math.ceil(Math.random() * 360);
        saturation = (Math.random() * 50) + 50 + "%";
        lightness = 60 - (Math.random() * 20) + "%";

        return "hsl(" + main_color + "," + saturation + "," + lightness + ")";
    }
});