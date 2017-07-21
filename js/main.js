var team_rwby = {
    "ruby": "https://puu.sh/oXDLO/7b5a932ef1.jpg",
    "weiss": "https://puu.sh/oXDNd/169a74d36c.jpg",
    "blake": "https://puu.sh/oXDNQ/bec8c790e4.jpg",
    "yang": "https://puu.sh/oXDO9/3c169032d0.jpg"
};

team_rwby_arry = [
    "https://puu.sh/oXDLO/7b5a932ef1.jpg",
    "https://puu.sh/oXDNd/169a74d36c.jpg",
    "https://puu.sh/oXDNQ/bec8c790e4.jpg",
    "https://puu.sh/oXDO9/3c169032d0.jpg"
];

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
            unitHeight: w/5 ,
            typeMap: [0, 1, 2],
            set: [],
            array: [],
            main_color: Math.round(Math.random() * 255)
        },
        created: function() {
            
        },
        methods: {
            createPolySet: function(input) {
                var type = this.typeMap[(this.set.length / 3) % 3];
                var p1, p2, p3, p4, p5, p6;


                /* create point 1 */
                p1 = this.s1;

                /* create point 2 */
                p2 = this.s2;

                /* create point 3 */
                randomNumber = 0.25 + (Math.random() * 5) / 10;
                p3 = [
                    p1[0] + (p2[0] - p1[0]) * randomNumber,
                    p1[1] + (p2[1] - p1[1]) * randomNumber
                ];

                /* create point 4 */
                p4 = [
                    p2[0],
                    p2[1] + this.unitHeight
                ];

                /* create point 5 */
                randomNumber = 0.25 + (Math.random() * 5) / 10;
                p5 = [
                    p3[0] + (p4[0] - p3[0]) * randomNumber,
                    p3[1] + (p4[1] - p3[1]) * randomNumber
                ];

                /* create point 6 */
                p6 = [
                    p1[0],
                    p4[1] + this.unitHeight
                ];

                var poly234 = [p2, p3, p4],
                    poly1356 = [p1, p3, p5, p6],
                    poly456 = [p4, p5, p6];

                poly234 = sortCoordinate(poly234);
                poly1356 = sortCoordinate(poly1356);
                poly456 = sortCoordinate(poly456);

                /* create polygon */
                this.set.push({
                    d: make_path([p2, p3, p4]),
                    fill: create_color(this.main_color),
                    stroke: "white",
                    id: input.id + 0,
                    position: {
                        x: poly234.sX,
                        y: poly234.sY
                    },
                    size: {
                        width:  poly234.bX - poly234.sX,
                        height: poly234.bY - poly234.sY
                    },
                    imageSrc: team_rwby_arry[(this.set.length) % 4]
                }, {
                    d: make_path([p1, p3, p5, p6]),
                    fill: create_color(this.main_color),
                    stroke: "white",
                    id: input.id + 1,
                    position: {
                        x: poly1356.sX,
                        y: poly1356.sY
                    },
                    size: {
                        width:  poly1356.bX - poly1356.sX,
                        height: poly1356.bY - poly1356.sY
                    },
                    imageSrc: team_rwby_arry[(this.set.length+1) % 4]
                }, {
                    d: make_path([p4, p5, p6]),
                    fill: create_color(this.main_color),
                    stroke: "white",
                    id: input.id + 2,
                    position: {
                        x: poly456.sX,
                        y: poly456.sY
                    },
                    size: {
                        width:  poly456.bX - poly456.sX,
                        height: poly456.bY - poly456.sY
                    },
                    imageSrc: team_rwby_arry[(this.set.length+2) % 4]
                });

                /* change start point */
                this.s1 = p4;
                this.s2 = p6;

                this.height = p6[1];

            }
        },
        mounted: function() {
            for (var i = 0; i < 10; i++) {
                this.createPolySet({
                    id: 'id' + i
                });
            }
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

    function sortCoordinate(input) {
        var tempA = input.slice();
        tempA.sort(function(a, b) {
            return a[0] - b[0];
        });
        sX = tempA[0][0];
        bX = tempA[tempA.length - 1][0];

        /* get largest and smallest ycoordinate */
        tempA.sort(function(a, b) {
            return a[1] - b[1];
        });
        sY = tempA[0][1];
        bY = tempA[tempA.length - 1][1];

        return {
            sX: sX,
            bX: bX,
            sY: sY,
            bY: bY
        };
    }
});