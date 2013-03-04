/**
 *This file creates the graphics, and wires for the logicgates used in Tutorial 1
 *I am using a library called d3 to draw the shapes and add the wire fields for
 *each gate. They all follow a similar structure, and usually you would have some helper
 *functions to reduce the amount of code that's repeated. For these tutorials though
 *I want, as much as possible, to not have to have you hunt through a bunch of function
 *calls to see what's going on. Each gate draws itself, then draws its wire and output
 *"wires", and then adds the wire and output text fields. 
 */

            /**
             *This function just returns a sting for use in the svg path's d attribute
             */
            function pp(type, x, y) {
            return type+x+","+y+" ";
        }
        
        /**
         *The NOT gate looks like a triangle with a circle on the top. We draw the triangle with a path
         *(svg has a polygon type which you would normally use for shapes like this, but I wanted to stay
         *consistent with the other gates). 
         */
        function notGate(svg, x, y) {
            var path = pp("M",x,y)+pp("L",x+30,y+10)+pp("L",x,y+20)+pp("",x,y-2),
                gate = {};
                
            svg.append("path")
                .attr("d", path)
                .attr("stroke", "#000")
                .attr("fill", "none")
                .attr("stroke-width", 3);
            svg.append("circle")
                .attr("cx", x+35)
                .attr("cy", y+10)
                .attr("r", 5)
                .attr("stroke", "#000")
                .attr("stroke-width",2)
                .attr("fill", "none");
            svg.append("text")
                .text("NOT")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "black")
                .attr("x", x + 5)
                .attr("y", y+45);
                
                
            gate.wire0 = svg.append("path")
                            .attr("d", pp("M",x,y+9)+pp("L",x-10,y+9))
                            .attr("stroke", "#000")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.output = svg.append("path")
                            .attr("d", pp("M",x+39,y+10)+pp("L",x+55,y+10))
                            .attr("stroke", "#090")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.input0 = d3.select("body").append("input")
                            .attr("value", "0")
                            .attr("style", "position: absolute; left: "+(x-20)+"px; top: "+(y+5)+"px;");
                            
            gate.fieldOut = d3.select("body").append("input")
                            .attr("value", "1")
                            .attr("disabled", true)
                            .attr("style", "position: absolute; left: "+(x+58)+"px; top: "+(y+5)+"px;");
                            
            gate.output.state = function(bool) {
                if(bool) {
                    gate.output.attr("stroke", "#090");
                    gate.fieldOut.property("value", 1);       
                } else {
                    gate.output.attr("stroke", "#000");
                    gate.fieldOut.property("value", 0);
                }
            }
            gate.input0.on("change", function() {
                if(parseInt(gate.input0.property("value")) == 1) {
                    gate.wire0.attr("stroke", "#090");
                    gate.output.state(logic.not(gate));
                    return;
                }
                if(parseInt(gate.input0.property("value")) == 0) {
                    gate.wire0.attr("stroke", "#000");
                    gate.output.state(logic.not(gate));
                    return;
                }
                gate.wire0.attr("stroke", "#900");
            });
        }
        
        /**
         *The OR gate is a little tricky in that it has two curved lines. You can see how the points for them work with
         *the points that start with Q.
         */
        function orGate(svg, x, y) {
            var path = pp("M",x,y)+pp("L",x+10,y)+pp("Q",x+60,y+15)+pp("",x+10,y+30)+pp("L",x,y+30)+pp("Q",x+20,y+15)+pp("",x,y-2),
                gate = {};
                
            svg.append("path")
                .attr("d", path)
                .attr("stroke", "#000")
                .attr("fill", "none")
                .attr("stroke-width", 3);
            svg.append("text")
                .text("OR")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "black")
                .attr("x", x + 5)
                .attr("y", y+45);
                
            gate.wire0 = svg.append("path")
                            .attr("d", pp("M",x+5,y+5)+pp("L",x-10,y+5))
                            .attr("stroke", "#000")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.wire1 = svg.append("path")
                            .attr("d", pp("M",x+4,y+25)+pp("L",x-10,y+25))
                            .attr("stroke", "#000")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.output = svg.append("path")
                            .attr("d", pp("M",x+37,y+15)+pp("L",x+55,y+15))
                            .attr("stroke", "#000")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.input0 = d3.select("body").append("input")
                            .attr("value", "0")
                            .attr("style", "position: absolute; left: "+(x-20)+"px; top: "+y+"px;");
                            
            gate.input1 = d3.select("body").append("input")
                            .attr("value", "0")
                            .attr("style", "position: absolute; left: "+(x-20)+"px; top: "+(y+20)+"px;");
                            
            gate.fieldOut = d3.select("body").append("input")
                            .attr("value", "0")
                            .attr("disabled", true)
                            .attr("style", "position: absolute; left: "+(x+58)+"px; top: "+(y+10)+"px;");
                            
            gate.output.state = function(bool) {
                if(bool) {
                    gate.output.attr("stroke", "#090");
                    gate.fieldOut.property("value", 1);       
                } else {
                    gate.output.attr("stroke", "#000");
                    gate.fieldOut.property("value", 0);
                }
            }
                            
            gate.input0.on("change", function() {
                if(parseInt(gate.input0.property("value")) == 1) {
                    gate.wire0.attr("stroke", "#090");
                    gate.output.state(logic.or(gate));
                    return;
                }
                if(parseInt(gate.input0.property("value")) == 0) {
                    gate.wire0.attr("stroke", "#000");
                    gate.output.state(logic.or(gate));
                    return;
                }
                gate.wire0.attr("stroke", "#900");
            });
            gate.input1.on("change", function() {
                if(parseInt(gate.input1.property("value")) === 1) {
                    gate.wire1.attr("stroke", "#090");
                    gate.output.state(logic.or(gate));
                   return;
                }
                if(parseInt(gate.input1.property("value")) === 0) {
                    gate.wire1.attr("stroke", "#000");
                    gate.output.state(logic.or(gate));
                    return;
                }
                gate.wire1.attr("stroke", "#900");
            });
        }
        
        /**
         *The AND gate looks like a rectangle with one curved line at the output. 
         */
        function andGate(svg, x, y) {
            var path = pp("M",x,y)+pp("L",x+30,y)+pp("Q",x+50,y+15)+pp("",x+30,y+30)+pp("L",x,y+30)+pp("L",x,y-2),
                gate = {};
                
            svg.append("path")
                .attr("d", path)
                .attr("stroke", "#000")
                .attr("fill", "none")
                .attr("stroke-width", 3);
            svg.append("text")
                .text("AND")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "black")
                .attr("x", x + 5)
                .attr("y", y+45);
                
            gate.wire0 = svg.append("path")
                            .attr("d", pp("M",x,y+5)+pp("L",x-10,y+5))
                            .attr("stroke", "#000")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.wire1 = svg.append("path")
                            .attr("d", pp("M",x,y+25)+pp("L",x-10,y+25))
                            .attr("stroke", "#000")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.output = svg.append("path")
                            .attr("d", pp("M",x+40,y+15)+pp("L",x+55,y+15))
                            .attr("stroke", "#000")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.input0 = d3.select("body").append("input")
                            .attr("value", "0")
                            .attr("style", "position: absolute; left: "+(x-20)+"px; top: "+y+"px;");
                            
            gate.input1 = d3.select("body").append("input")
                            .attr("value", "0")
                            .attr("style", "position: absolute; left: "+(x-20)+"px; top: "+(y+20)+"px;");
                            
            gate.fieldOut = d3.select("body").append("input")
                            .attr("disabled", true)
                            .attr("value", "0")
                            .attr("style", "position: absolute; left: "+(x+58)+"px; top: "+(y+10)+"px;");
                            
            gate.output.state = function(bool) {
                if(bool) {
                    gate.output.attr("stroke", "#090");
                    gate.fieldOut.property("value", 1);       
                } else {
                    gate.output.attr("stroke", "#000");
                    gate.fieldOut.property("value", 0);
                }
            }
                            
            gate.input0.on("change", function() {
                if(parseInt(gate.input0.property("value")) == 1) {
                    gate.wire0.attr("stroke", "#090");
                    gate.output.state(logic.and(gate));
                    return;
                }
                if(parseInt(gate.input0.property("value")) == 0) {
                    gate.wire0.attr("stroke", "#000");
                    gate.output.state(logic.and(gate));
                    return;
                }
                gate.wire0.attr("stroke", "#900");
            });
            gate.input1.on("change", function() {
                if(parseInt(gate.input1.property("value")) === 1) {
                    gate.wire1.attr("stroke", "#090");
                    gate.output.state(logic.and(gate));
                   return;
                }
                if(parseInt(gate.input1.property("value")) === 0) {
                    gate.wire1.attr("stroke", "#000");
                    gate.output.state(logic.and(gate));
                    return;
                }
                gate.wire1.attr("stroke", "#900");
            });
        }
        
        /**
         *The NAND gate looks like an AND gate with a circle at its output. It has the opposite logic of the AND gate.
         */
        
        function nandGate(svg, x, y) {
            var path = pp("M",x,y)+pp("L",x+25,y)+pp("Q",x+45,y+15)+pp("",x+25,y+30)+pp("L",x,y+30)+pp("L",x,y-2),
                gate = {};
                
            svg.append("path")
                .attr("d", path)
                .attr("stroke", "#000")
                .attr("fill", "none")
                .attr("stroke-width", 3);
                
            svg.append("circle")
                .attr("cx", x+39)
                .attr("cy", y+15)
                .attr("r", 5)
                .attr("stroke", "#000")
                .attr("stroke-width",2)
                .attr("fill", "none");
                
            svg.append("text")
                .text("NAND")
                .attr("font-family", "sans-serif")
                .attr("font-size", "11px")
                .attr("fill", "black")
                .attr("x", x + 5)
                .attr("y", y+45);
                
            gate.wire0 = svg.append("path")
                            .attr("d", pp("M",x,y+5)+pp("L",x-10,y+5))
                            .attr("stroke", "#000")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.wire1 = svg.append("path")
                            .attr("d", pp("M",x,y+25)+pp("L",x-10,y+25))
                            .attr("stroke", "#000")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.output = svg.append("path")
                            .attr("d", pp("M",x+42,y+15)+pp("L",x+57,y+15))
                            .attr("stroke", "#090")
                            .attr("fill", "none")
                            .attr("stroke-width", 3);
                            
            gate.input0 = d3.select("body").append("input")
                            .attr("value", "0")
                            .attr("style", "position: absolute; left: "+(x-20)+"px; top: "+y+"px;");
                            
            gate.input1 = d3.select("body").append("input")
                            .attr("value", "0")
                            .attr("style", "position: absolute; left: "+(x-20)+"px; top: "+(y+20)+"px;");
                            
            gate.fieldOut = d3.select("body").append("input")
                            .attr("value", "1")
                            .attr("disabled", true)
                            .attr("style", "position: absolute; left: "+(x+60)+"px; top: "+(y+10)+"px;");
                            
            gate.output.state = function(bool) {
                if(bool) {
                    gate.output.attr("stroke", "#090");
                    gate.fieldOut.property("value", 1);       
                } else {
                    gate.output.attr("stroke", "#000");
                    gate.fieldOut.property("value", 0);
                }
            }
                            
            gate.input0.on("change", function() {
                if(parseInt(gate.input0.property("value")) == 1) {
                    gate.wire0.attr("stroke", "#090");
                    gate.output.state(logic.nand(gate));
                    return;
                }
                if(parseInt(gate.input0.property("value")) == 0) {
                    gate.wire0.attr("stroke", "#000");
                    gate.output.state(logic.nand(gate));
                    return;
                }
                gate.wire0.attr("stroke", "#900");
            });
            gate.input1.on("change", function() {
                if(parseInt(gate.input1.property("value")) === 1) {
                    gate.wire1.attr("stroke", "#090");
                    gate.output.state(logic.nand(gate));
                   return;
                }
                if(parseInt(gate.input1.property("value")) === 0) {
                    gate.wire1.attr("stroke", "#000");
                    gate.output.state(logic.nand(gate));
                    return;
                }
                gate.wire1.attr("stroke", "#900");
            });
        }